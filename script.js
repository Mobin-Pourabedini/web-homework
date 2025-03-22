const inputs = document.querySelectorAll("input[type='text']");
const formulas = document.querySelectorAll("custom-formula");

document.addEventListener("DOMContentLoaded", function () {
    console.log(inputs)
    console.log(formulas)

    function calculateFormulas() {
        console.log("formula has been run")
        formulas.forEach((formula) => {
            console.log("ins")
            const expression = formula.evaluator; // دریافت فرمول
            console.log(`exp=${expression}`)
            formulas.forEach((formula) => {
                formula.render()
            })
        });
    }

    inputs.forEach((input) => {
        input.addEventListener("input", calculateFormulas);
        console.log("##### addEventListerner #####")
    });

    calculateFormulas();
});

class MyFormula extends HTMLElement {
    constructor() {
        super();
        this.render()
    }

    render() {
        let expression = this.getAttribute('formula') || '';
        let evaluatedExpression = expression;
        inputs.forEach((input) => {
            const value = input.value.trim();
            const numberValue = value === "" ? 0 : parseFloat(value);
            const inputId = input.id;
            let regex = new RegExp(`\\b${inputId}\\b`, "g");
            evaluatedExpression = evaluatedExpression.replaceAll(regex, numberValue);
        });
        console.log(`evaled exp=${evaluatedExpression}`)
        const result = eval(evaluatedExpression);
        this.innerHTML = `<p>${evaluatedExpression} = ${result}</p>`
    }
}

customElements.define("custom-formula", MyFormula);
