class App{
    generateInput: HTMLInputElement;

    userInputs: HTMLInputElement;

    newInput: HTMLInputElement;

    // input1: HTMLInputElement;
    // input2: HTMLInputElement;
    // input3: HTMLInputElement;
    // input4: HTMLInputElement;

    sum_input: HTMLInputElement;
    avg_input: HTMLInputElement;
    min_input: HTMLInputElement;
    max_input: HTMLInputElement;

    constructor(){
        this.start();
    }

    start(){
        this.getInputs();
        this.checkValues();
    }

    getInputs(){
        this.generateInput = document.querySelector('#generateInput');
        this.userInputs = document.querySelector('#userInputs');
        // this.input1 = document.querySelector('#input1');
        // this.input2 = document.querySelector('#input2');
        // this.input3 = document.querySelector('#input3');
        // this.input4 = document.querySelector('#input4');
        this.sum_input = document.querySelector('#sum');
        this.avg_input = document.querySelector('#avg');
        this.min_input = document.querySelector('#min');
        this.max_input = document.querySelector('#max');
    }

    checkValues(){
        this.generateInput.addEventListener('input', () => this.generateInputs());
        
        // this.input1.addEventListener('input', () => this.getCalculatedValues());
        // this.input2.addEventListener('input', () => this.getCalculatedValues());
        // this.input3.addEventListener('input', () => this.getCalculatedValues());
        // this.input4.addEventListener('input', () => this.getCalculatedValues());
    }

    generateInputs(){
        const generateValue = +this.generateInput.value;

        while (this.userInputs.hasChildNodes()){
            this.userInputs.removeChild(this.userInputs.lastChild);
        }

        for (let i = 1; i <= generateValue; i++){
            let generatedInput = document.createElement('input');
            generatedInput.type = 'text';
            generatedInput.id = 'input' + i;
            this.userInputs.appendChild(generatedInput);
        }

        this.getGeneratedInputs(generateValue)
    }

    getGeneratedInputs(generateValue){
        for (let i = 1; i <= generateValue; i++){
            this.newInput = document.querySelector('#input' + i);
        }
        this.newInput.addEventListener('input', () => this.getCalculatedValues());
    }

    getCalculatedValues(){
        const value1 = +this.input1.value;
        const value2 = +this.input2.value;
        const value3 = +this.input3.value;
        const value4 = +this.input4.value;

        const sum = value1 + value2 + value3 + value4;
        const avg = sum/4;
        const min = Math.min(value1,value2,value3,value4);
        const max = Math.max(value1,value2,value3,value4);

        this.showResults(sum,avg,min,max);
    }

    showResults(sum: number, avg: number, min:number, max:number){
        this.sum_input.value = sum.toString();
        this.avg_input.value = avg.toString();
        this.min_input.value = min.toString();
        this.max_input.value = max.toString();
    }
};

const app = new App();