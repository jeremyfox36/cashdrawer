function checkCashRegister(price, cash, cid) {
  debugger;
  var returnObj = {
    status: "",
    change: []
  };
  var denoms = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
    ]

//subtract price from payment to get total change due
var changeAmount = Math.abs(price - cash); 
changeAmount = Math.round((changeAmount + 0.00001) * 100) / 100//fix pesky floating point malarkey
//get the total cid so that we can check if there's enough in the cash drawer
var totalcid = cid.reduce((total, denom) => total + denom[1],0);
totalcid = Math.round((totalcid + 0.00001) * 100) / 100//fix pesky floating point malarkey

//initial condition is not enough change or change is the same as cid
if(changeAmount > totalcid){//currently doesn't handle when cid is high enough but we don't have the righht change.  Could check max denomination to see if it's big enough too.
  returnObj.status = "INSUFFICIENT_FUNDS";
  returnObj.change = [];
} else if(changeAmount === totalcid){
  returnObj.status = "CLOSED";
  returnObj.change = cid;
  //last option is to work out what change to give
} else{//don't really need this condition, just carry on or could add a function call to get returnObj.change
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
      //console.log(result);
    }
  })
})
result = result.reverse();//change so it goes from high to low denominations because the highest is checked first then pushed to the result array returnObj.change
for(let i=0; i<=result.length-1; i++){
//debugger;
  var thisDenom = 0;
  var changeArr = [];
  while(changeAmount >0 && result[i][1] >0 && changeAmount >result[i][2]){
    //create a temporary array to hold the first denom for change
   
    changeAmount -= result[i][2];
    result[i][1] -= result[i][2];
	
	thisDenom += result[i][2];//track amount of the current denom
	changeArr = [result[i][0], thisDenom];
 	changeAmount = Math.round((changeAmount + 0.00001) * 100) / 100//fix pesky floating point malarkey
  }
returnObj.change.push(changeArr);
if(changeAmount == 0){
	break;
}
}
// if after going through all coins you find that your changeOwed is > $0.00 then return insuffient funds
// else if changeAmount is $0.00 then return your array of coins you will give as change

return returnObj;
}
