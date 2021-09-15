class App {
    generateInput: HTMLInputElement;
    generateInputsWrapper: HTMLInputElement;
    userInputsWrapper: HTMLInputElement;
    answerInputs: HTMLInputElement;

    sum_input: HTMLInputElement;
    avg_input: HTMLInputElement;
    min_input: HTMLInputElement;
    max_input: HTMLInputElement;

    inputValues: Array<number> = [];
    countNumber: number = 1;

    constructor(){
        this.start();
    }

    start(){
        this.getInputs();
        this.checkGenerationValues();
    }

    getInputs(){
        this.generateInput = document.querySelector('#generateInput');
        this.generateInputsWrapper = document.querySelector('#generateInputs');
        this.userInputsWrapper = document.querySelector('#userInputs');
        this.answerInputs = document.querySelector('#answerInputs');
        this.sum_input = document.querySelector('#sum');
        this.avg_input = document.querySelector('#avg');
        this.min_input = document.querySelector('#min');
        this.max_input = document.querySelector('#max');
    }

    checkGenerationValues() {
        this.generateInput.addEventListener('input', (e: Event) => {

            const target = e.target as HTMLInputElement;
            this.countNumber = Number(target.value);
            this.pushCalculations(this.countNumber, this.inputValues);

        });

        this.pushCalculations(this.countNumber, this.inputValues);
    }

    pushCalculations(inputCount: number, values: Array<number>) : void {

        const calc = new Calculations;

        const sections: Array<number> = [];

        this.generateNumberInputs(inputCount, values);

        const countValues = values.slice(0, inputCount);

        sections.push(this.generateStat(this.sum_input, calc.sum, countValues));
        sections.push(this.generateStat(this.avg_input, calc.average, countValues));
        sections.push(this.generateStat(this.min_input, calc.min, countValues));
        sections.push(this.generateStat(this.max_input, calc.max, countValues));

    }

    generateNumberInputs(count: number, values: Array<number>): void{
        while (this.userInputsWrapper.hasChildNodes()){
            this.userInputsWrapper.removeChild(this.userInputsWrapper.lastChild);
        }

        for (let i = 0; i < count; i++) {
            const input = new InputDetails(i,count, values).render();
            this.userInputsWrapper.appendChild(input);
        }
    }

    generateStat(inputType: any, calculations: Function, values: Array<number>) : number {

        inputType.value = calculations(values);

        return inputType.value;
    }
}

class InputDetails {

    userInput: HTMLInputElement;
    inputDeleteBtn: HTMLButtonElement;
    generateInput: HTMLInputElement;

    constructor(id: number, count: number, values: Array<number>){
        this.start(id, count, values);
    }

    start(id: number, count: number, values: Array<number>){
        this.inputCreation(id, count, values);
        this.buttonCreation(id, count, values);
    }

    inputCreation(id: number, count: number, values: Array<number>){
        this.userInput = document.createElement('input');
        this.userInput.type = "text";
        this.userInput.value = values[id] ? String(values[id]) : '0';
        this.userInput.id = `input-${id}`;
        values[id] = Number(this.userInput.value);
        this.userInput.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            values[id] = Number(target.value);
            
            new App().pushCalculations(count, values);
        });
    }

    buttonCreation(id: number, count: any, values: Array<number>){
        this.inputDeleteBtn = document.createElement('button');
        this.inputDeleteBtn.innerText = "Delete";

        this.inputDeleteBtn.addEventListener('click', (e: Event) => {

            this.generateInput = document.getElementById('generateInput') as HTMLInputElement;
            console.log(values);
            values[id] = 0;
            values.splice(id,1);
            count -= 1;
            this.generateInput.value = count;
            console.log({count});

            new App().pushCalculations(count, values);
        });
    }

    render() : HTMLDivElement {
        const container = document.createElement('div');
        container.appendChild(this.userInput);
        container.appendChild(this.inputDeleteBtn);

        return container;
    }
}

class Calculations {

    sum(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return sum;
    }

    average(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return Number((sum / values.length).toFixed(2));
    }

    min(values: Array<number>): number {
        return Math.min(...values);
    }

    max(values: Array<number>): number {
        return Math.max(...values);
    }
}

const app = new App();