let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const inputCash = document.getElementById("cash");
const output = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cidTotal = 0;

purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(inputCash.value);
  const change = checkCashRegister(price, cash, cid);
  output.innerHTML = change;
});

function checkCashRegister(price, cash, cid) {
  if (price > cash) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (price === cash) {
    output.innerHTML = "No change due - customer paid with exact cash";
    return;
  }
  console.log(calcualteCidTotal(cid).toFixed(2));
  if (calcualteCidTotal(cid).toFixed(2) < cash - price) {
    output.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }
}

const calcualteCidTotal = (cid) => {
  return cid.reduce((acc, curr) => {
    return acc + curr[1];
  }, 0);
};
