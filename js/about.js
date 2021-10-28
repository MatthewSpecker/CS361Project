var item = 1;
var foods = [];
var foodIndex = 0;

async function addRow() {
          
    var food = document.getElementById("food");
    var qty = document.getElementById("qty");
    var table = document.getElementById("myTableData");
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    await userAction(food.value, qty.value, item);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javascript:deleteRow(this)">';
    row.insertCell(1).innerHTML= item;
    row.insertCell(2).innerHTML= food.value;
    row.insertCell(3).innerHTML= qty.value;
    row.insertCell(4).innerHTML= foods[foodIndex].cal;

    updateNutrition();

    item += 1;
    foodIndex += 1;
}
 
function deleteRow(obj) {
      
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("myTableData");
  table.deleteRow(index);

  foods.splice(index-2, 1);

  foodIndex -= 1;

  updateNutrition();
}

async function userAction (foodname, quantity, itemNum) {
  var str1 = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=quUbj48gALTdXJ1SyIdw8e7RTALfRyIUNTmhqy79&query=";
  res = str1.concat(foodname);
  const response = await fetch(res);
  const myJson = await response.json(); //extract JSON from the http response
  var protein = myJson.foods[0].foodNutrients[0].value;
  var fat = myJson.foods[0].foodNutrients[1].value;
  var carbs = myJson.foods[0].foodNutrients[2].value;
  var calories = myJson.foods[0].foodNutrients[3].value * quantity;

  foods.push({
    item: itemNum,
    food: foodname,
    qty: quantity,
    cal: calories,
    pro: protein,
    fat: fat,
    carbs: carbs
  });
 
}

function updateNutrition() {
  var protein = 0;
  var fat = 0;
  var carbs = 0;
  var calories = 0;

  for (let i = 0; i < foods.length; i++) {
    protein += foods[i].pro;
    fat += foods[i].fat;
    carbs += foods[i].carbs;
    calories += foods[i].cal;
  }

  document.getElementById("calories").innerHTML = calories;
  document.getElementById("protein").innerHTML = protein;
  document.getElementById("fat").innerHTML = fat;
  document.getElementById("carbs").innerHTML = carbs;
}