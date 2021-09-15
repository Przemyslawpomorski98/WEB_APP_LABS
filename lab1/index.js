var App = /** @class */ (function () {
    function App() {
        this.inputValues = [];
        this.countNumber = 1;
        this.start();
    }
    App.prototype.start = function () {
        this.getInputs();
        this.checkGenerationValues();
    };
    App.prototype.getInputs = function () {
        this.generateInput = document.querySelector('#generateInput');
        this.generateInputsWrapper = document.querySelector('#generateInputs');
        this.userInputsWrapper = document.querySelector('#userInputs');
        this.answerInputs = document.querySelector('#answerInputs');
        this.sum_input = document.querySelector('#sum');
        this.avg_input = document.querySelector('#avg');
        this.min_input = document.querySelector('#min');
        this.max_input = document.querySelector('#max');
    };
    App.prototype.checkGenerationValues = function () {
        var _this = this;
        this.generateInput.addEventListener('input', function (e) {
            var target = e.target;
            _this.countNumber = Number(target.value);
            _this.pushCalculations(_this.countNumber, _this.inputValues);
        });
        this.pushCalculations(this.countNumber, this.inputValues);
    };
    App.prototype.pushCalculations = function (inputCount, values) {
        var calc = new Calculations;
        var sections = [];
        this.generateNumberInputs(inputCount, values);
        var countValues = values.slice(0, inputCount);
        sections.push(this.generateStat(this.sum_input, calc.sum, countValues));
        sections.push(this.generateStat(this.avg_input, calc.average, countValues));
        sections.push(this.generateStat(this.min_input, calc.min, countValues));
        sections.push(this.generateStat(this.max_input, calc.max, countValues));
    };
    App.prototype.generateNumberInputs = function (count, values) {
        while (this.userInputsWrapper.hasChildNodes()) {
            this.userInputsWrapper.removeChild(this.userInputsWrapper.lastChild);
        }
        for (var i = 0; i < count; i++) {
            var input = new InputDetails(i, count, values).render();
            this.userInputsWrapper.appendChild(input);
        }
    };
    App.prototype.generateStat = function (inputType, calculations, values) {
        inputType.value = calculations(values);
        return inputType.value;
    };
    return App;
}());
var InputDetails = /** @class */ (function () {
    function InputDetails(id, count, values) {
        this.start(id, count, values);
    }
    InputDetails.prototype.start = function (id, count, values) {
        this.inputCreation(id, count, values);
        this.buttonCreation(id, count, values);
    };
    InputDetails.prototype.inputCreation = function (id, count, values) {
        this.userInput = document.createElement('input');
        this.userInput.type = "text";
        this.userInput.value = values[id] ? String(values[id]) : '0';
        this.userInput.id = "input-" + id;
        values[id] = Number(this.userInput.value);
        this.userInput.addEventListener('input', function (e) {
            var target = e.target;
            values[id] = Number(target.value);
            new App().pushCalculations(count, values);
        });
    };
    InputDetails.prototype.buttonCreation = function (id, count, values) {
        var _this = this;
        this.inputDeleteBtn = document.createElement('button');
        this.inputDeleteBtn.innerText = "Delete";
        this.inputDeleteBtn.addEventListener('click', function (e) {
            _this.generateInput = document.getElementById('generateInput');
            console.log(values);
            values[id] = 0;
            values.splice(id, 1);
            count -= 1;
            _this.generateInput.value = count;
            console.log({ count: count });
            new App().pushCalculations(count, values);
        });
    };
    InputDetails.prototype.render = function () {
        var container = document.createElement('div');
        container.appendChild(this.userInput);
        container.appendChild(this.inputDeleteBtn);
        return container;
    };
    return InputDetails;
}());
var Calculations = /** @class */ (function () {
    function Calculations() {
    }
    Calculations.prototype.sum = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    };
    Calculations.prototype.average = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return Number((sum / values.length).toFixed(2));
    };
    Calculations.prototype.min = function (values) {
        return Math.min.apply(Math, values);
    };
    Calculations.prototype.max = function (values) {
        return Math.max.apply(Math, values);
    };
    return Calculations;
}());
var app = new App();
