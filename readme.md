# تمرین دستگرمی درس برنامه‌سازی وب

*این ریپازیتوری مطابق دستورالعمل داده شده در [این pfd](./instructions.pdf) طراحی شده است.*

در این ریپازیتوری یک صفحه html طراحی شده است که دارای ۳ ورودی متفاوت متناظر با `قیمت` `تعداد` و `تخفیف` است.
به علاوه ۳ فرمول متفاوت برای محاسبه مبلغ نهایی پرداخت که این فرمول ها عبارت اند از:<br>
1. $(fee*count - discount)$
2. $(fee* count *1.09 - discount)$
3. $((fee-discount)*count)$<br>


این مقادیر به شکل برخط همزمان با تغییر ورودی ها بروزرسانی می‌شوند و مقادیر جدید را نشان می‌دهند.<br>


نکات مدنظر:
* تعریف کردن یک المان جدید برای فرمول ها که سبب پیروی از ذهنیت شی‌گرایی و دوباره قابل استفاده بودن کد می‌شود.

* قرار دادن `EventListener` برای ورودی ها که در صورت تغییر مقادیر را بروزرسانی کند

* استفاده از `regex` برای جاگذاری `id` ها با مقادیر همان ورودی


## جزئیات پیاده‌سازی

### javaScript:

#### MyFormula tag definition

```javascript
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
```

این المان دصورت صدا شدن متود `render` اش فرمول داده شده به آن را دوباره روی ورودی ها اعمال می‌کند و پاسخ جدید رو به نمایش درمی‌آورد.<br>
در قسمت ساخته شدن آن یکبار متود `render` صدا می‌شود تا برای اولین بار به نمایش دربیاید.


در متود `render` با استفاده از regex تمامی `exact_match` های رشته فرمول با `id` های ورودی ها جایگذاری می‌شوند و در درصورت تولید کردن `NaN` از `Invalid Formula` برای خروجی استفاده می‌کند.

در خط آخر المان جدید را با اسم `custom-formula` ثبت کرده ایم.

#### EventListener
```javascript
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
```

در این قسمت روی لیست `inputs` eventListener قرار می‌دهیم و به ازای هر تغییر روی آنها همه المان های `custom-formula` را دوباره render میکنیم.



### Html

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Formula evaluation</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Formula evaluation</h2>

        <label>Unit price:</label>
        <input type="text" id="fee" placeholder="price per unit">

        <label>Count:</label>
        <input type="text" id="count" placeholder="totol count">

        <label>Discount:</label>
        <input type="text" id="discount" placeholder="Discount">

        <custom-formula id="f1" evaluator="fee*count - discount">hello</custom-formula>  
        <custom-formula id="f2" evaluator="fee* count *1.09 - discount"></custom-formula>
        <custom-formula id="f3" evaluator="(fee-discount)*count"></custom-formula>

    <script src="script.js"></script>
</body>
</html>
```

در این قسمت مطابق موارد گفته شده در pdf تمرین سه ورودی و سه فرمول متفاوت ساخته شده است که المان `custom-formula` را خودمان در قسمت قبل تعریف کردیم.

