function checkCashRegister(price, cash, cid) {
  var change = {
    status: "",
    change: []
  };
  var denominations = {
"PENNY": 0.01,
"NICKEL": 0.05,
"DIME": 0.1,
"QUARTER": 0.25,
"DOLLAR": 1,
"FIVE": 5,
"TEN": 10,
"TWENTY": 20,
"ONE HUNDRED": 100}

  //subtract price from payment
var changeAmount = Math.abs(price - cash); 
  // Here is your change, ma'am.
//get the total cid so that we can check if there's enough
var totalcid = cid.reduce((total, denom) => total + denom[1],0);

//initial return is not enough change or change is the same as cid
if(changeAmount > totalcid){
  change.status = "INSUFFICIENT_FUNDS";
  change.change = [];
} else if(changeAmount === totalcid){
  change.status = "CLOSED";
  change.change = cid;
} else{
  change.status = "OPEN";
  change.change = calculateChange
}
//find all denominations less than changeAmount
var filteredDenoms = denoms.filter(denom => denom[1] < changeAmount);
var result = [];//holds the relevant denoms from cid

cid.forEach(function(item){//go through cid and get all the denoms need to make up change
	filteredDenoms.forEach(function(denom){
		if(item[0] === denom[0]){
			result.push(item);
    }
  })
})

//find biggest denomination less than changeAmount

// subtract this amount from changeAmount
// add this amount to change.change
// subtract this amount from your cash drawer (so if $1 is the highest amount then take $1 out of cash drawer
// repeat until you have gone through the smallest coin you have available in your cash drawer
// if after going through all coins you find that your changeOwed is > $0.00 then return insuffient funds
// else if changeOwed is $0.00 then return your array of coins you will give as change

return change;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);