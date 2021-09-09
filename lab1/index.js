var App = /** @class */ (function () {
    function App() {
        this.start();
    }
    App.prototype.start = function () {
        this.getInputs();
        this.checkValues();
    };
    App.prototype.getInputs = function () {
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
    };
    App.prototype.checkValues = function () {
        var _this = this;
        this.generateInput.addEventListener('input', function () { return _this.generateInputs(); });
        // this.input1.addEventListener('input', () => this.getCalculatedValues());
        // this.input2.addEventListener('input', () => this.getCalculatedValues());
        // this.input3.addEventListener('input', () => this.getCalculatedValues());
        // this.input4.addEventListener('input', () => this.getCalculatedValues());
    };
    App.prototype.generateInputs = function () {
        var generateValue = +this.generateInput.value;
        while (this.userInputs.hasChildNodes()) {
            this.userInputs.removeChild(this.userInputs.lastChild);
        }
        for (var i = 1; i <= generateValue; i++) {
            var generatedInput = document.createElement('input');
            generatedInput.type = 'text';
            generatedInput.id = 'input' + i;
            this.userInputs.appendChild(generatedInput);
        }
        this.getGeneratedInputs(generateValue);
    };
    App.prototype.getGeneratedInputs = function (generateValue) {
        var _this = this;
        for (var i = 0; i <= generateValue; i++) {
            this.newInput = document.querySelector('#input' + i);
        }
        this.newInput.addEventListener('input', function () { return _this.getCalculatedValues(); });
    };
    App.prototype.getCalculatedValues = function () {
        var value1 = +this.input1.value;
        var value2 = +this.input2.value;
        var value3 = +this.input3.value;
        var value4 = +this.input4.value;
        var sum = value1 + value2 + value3 + value4;
        var avg = sum / 4;
        var min = Math.min(value1, value2, value3, value4);
        var max = Math.max(value1, value2, value3, value4);
        this.showResults(sum, avg, min, max);
    };
    App.prototype.showResults = function (sum, avg, min, max) {
        this.sum_input.value = sum.toString();
        this.avg_input.value = avg.toString();
        this.min_input.value = min.toString();
        this.max_input.value = max.toString();
    };
    return App;
}());
;
var app = new App();
