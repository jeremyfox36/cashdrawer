function checkCashRegister(price, cash, cid) {
  var returnObj = {
    status: "",
    change: []
  };
  var denoms = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["DOLLAR", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
    ]

//subtract price from payment
var changeAmount = Math.abs(price - cash); 

//get the total cid so that we can check if there's enough in the cash drawer
var totalcid = cid.reduce((total, denom) => total + denom[1],0);

//initial return is not enough change or change is the same as cid
if(changeAmount > totalcid){
  returnObj.status = "INSUFFICIENT_FUNDS";
  returnObj.change = [];
} else if(changeAmount === totalcid){
  returnObj.status = "CLOSED";
  returnObj.change = cid;
  //last optipn is to work out what change to give
} else{
  returnObj.status = "OPEN";
  returnObj.change = [];
}
//find all denominations less than changeAmount
var filteredDenoms = denoms.filter(denom => denom[1] < changeAmount);
var result = [];//holds the relevant denoms from cid with their total values

cid.forEach(function(item){//go through cid and get all the denoms needed to make up change
	filteredDenoms.forEach(function(denom){
		if(item[0] === denom[0]){
			result.push([...item, denom[1]]);//results in a 2D array of the cid that I can use to make up change
      console.log(result);
    }
  })
})
result = result.reverse();//change so it goes form high to low denominations because the highest is checked first then
//pushed ot the result array change.change
for(let i=0; i<=result.length; i++){
debugger;
  var thisDenom = 0;
  var changeArr = [];
  while(changeAmount >0 && result[i][1] >0){
    //create a temporary array to hold the first denom for change
    
    changeAmount -= result[i][2];
    result[i][1] -= result[i][2];
	
	thisDenom += result[i][2];//variable to track amount of this denom
	changeArr[i] = [result[i][0], thisDenom];
  }
returnObj.change.push(changeArr);
if(changeAmount == 0){
	break;
}
}

// if after going through all coins you find that your changeOwed is > $0.00 then return insuffient funds
// else if changeOwed is $0.00 then return your array of coins you will give as change

return returnObj;
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
