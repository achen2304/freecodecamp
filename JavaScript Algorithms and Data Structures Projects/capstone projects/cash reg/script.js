let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const currencyValueMap = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const inputCash = document.getElementById("cash");
const output = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

const calcualteCidTotal = (cid) => {
  return cid.reduce((acc, curr) => {
    return acc + curr[1];
  }, 0);
};

purchaseBtn.addEventListener("click", () => {
  output.innerHTML = "";
  const cash = parseFloat(inputCash.value);
  const change = checkCashRegister(price, cash, cid);
});

function checkCashRegister(price, cash, cid) {
  // base case 
  if (price > cash) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  // base case 
  if (price === cash) {
    output.innerHTML = "No change due - customer paid with exact cash";
    return;
  }


  const changeDue = cash - price;
  // if CID doesn't have enough money to give change
  console.log(calcualteCidTotal(cid).toFixed(2), changeDue);
  if (calcualteCidTotal(cid).toFixed(2) < changeDue) {
    output.innerHTML = "Status: INSUFFICIENT_FUNDS";
    // console.log("INSUFFICIENT_FUNDS");
    return;
  }

  // if CID has exact change
  if (calcualteCidTotal(cid).toFixed(2) === changeDue) {
    output.innerHTML = "Status: CLOSED";
    return;
  }

  //othercases
  reduceCid(cid, changeDue);
}

//other cases
const reduceCid = (cid, changeDue) => {
  let changeDueLeft = changeDue; 
  const change = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    const currencyName = cid[i][0];
    const currencyValue = currencyValueMap[currencyName];
    let currencyAvailable = Math.round(cid[i][1] * 100) / 100;
    let currencyAmountToGive = 0.00;

    while (changeDueLeft >= currencyValue && currencyAvailable >= currencyValue) {
      changeDueLeft = Math.round((changeDueLeft - currencyValue) * 100) / 100;
      currencyAvailable = Math.round((currencyAvailable - currencyValue) * 100) / 100;
      currencyAmountToGive = Math.round((currencyAmountToGive + currencyValue) * 100) / 100;
    }

    if (currencyAmountToGive > 0) {
      change.push([currencyName, currencyAmountToGive]);
    }

    cid[i][1] = currencyAvailable; 
    
  }

  console.log("Updated cid:", cid);
  console.log("Updated change:", change);

  if(calcualteCidTotal(change).toFixed(2) !== changeDue.toFixed(2)){
    output.innerHTML = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  printarray(change);
};

//print array
const printarray = (array) => {
  console.log(calcualteCidTotal(cid).toFixed(2));
  if(parseFloat(calcualteCidTotal(cid).toFixed(2)) === 0){
    output.innerHTML = "Status: CLOSED ";
  } else output.innerHTML = "Status: OPEN ";

  for (let i = 0; i < array.length; i++) {
    if (array[i][1] > 0) {}
      output.innerHTML += `${array[i][0]}: $${array[i][1]} <br>`;
    }
  }


