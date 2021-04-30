const fromType = document.querySelector("#from_currency");
const toType = document.querySelector("#to_currency");
const from_Amount = document.querySelector(".from-amount");
const to_amount = document.querySelector(".to-amount");
const exchangeBtn = document.querySelector(".exchange");
const exchanges = document.querySelector(".exchanges");

var docx = document.querySelector(".error");
fromType.addEventListener("change", calculation);
toType.addEventListener("change", calculation);
from_Amount.addEventListener("input", calculation);
to_amount.addEventListener("input", calculation);

exchangeBtn.addEventListener("click", function () {
  const temp = fromType.value;
  fromType.value = toType.value;
  toType.value = temp;
  calculation();
});

function calculation() {
  to_amount.disabled = true;
  const fromCurrency = fromType.value;
  const toCurrency = toType.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/e8b5437b028ed2b00c6bc2ea/latest/${fromCurrency}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rates = data["conversion_rates"];
      const to = rates[toCurrency];
      exchanges.innerHTML = `1 ${fromCurrency} = ${to} ${toCurrency}`;
      to_amountVal = rates[toCurrency];
      x = from_Amount.value * to;
      console.log(to);
      to_amount.value = Math.round(x * 100) / 100;
      document.querySelector(".changes").innerHTML =
        "$1 United states equals " + to + " " + toType.value;
    })
    .catch((err) => console.log(err));
}

from_Amount.addEventListener("change", () => {
  if (from_Amount.value <= 0 || from_Amount.value == NaN) {
    from_Amount.value = 1;
  }
});
