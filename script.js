const inputs = document.querySelectorAll("input[type='text']");
const formulas = document.querySelectorAll("custom-formula");

document.addEventListener("DOMContentLoaded", function () {
    function calculateFormulas() {
        formulas.forEach((formula) => {
            const expression = formula.evaluator;
            formulas.forEach((formula) => {
                formula.render()
            })
        });
    }

    inputs.forEach((input) => {
        input.addEventListener("input", calculateFormulas);
    });

    calculateFormulas();
});

class MyFormula extends HTMLElement {
    constructor() {
        super();
        this.render()
    }

    render() {
        let expression = this.getAttribute('evaluator') || '';
        let evaluatedExpression = expression;
        let flag = true;
        inputs.forEach((input) => {
            const value = input.value.trim();
            const numberValue = value === "" ? 0 : parseFloat(value);
            if (isNaN(numberValue) || value.length === 0) {
                flag = false;
            }
            const inputId = input.id;
            let regex = new RegExp(`\\b${inputId}\\b`, "g");
            evaluatedExpression = evaluatedExpression.replaceAll(regex, numberValue);
        });
        const result = eval(evaluatedExpression);
        this.innerHTML = flag ? `<p>${evaluatedExpression} = ${result}</p>` : `<p>Invalid Formula</p>`
    }
}

customElements.define("custom-formula", MyFormula);
