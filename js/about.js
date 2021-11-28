var item = 1;
var foods = [];
var foodIndex = 0;

function calcRecommended() {
  var error = document.getElementById("errorBody");
  error.innerHTML = "";

  var name = document.getElementById("name");
  if (name.value == "") {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter a name!";
  }
  var logName = document.getElementById("logName");
  logName.innerHTML = name.value;

  var age = document.getElementById("age");
  if (age.value == "") {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter an age!";
  } else if (age.value < 0 || age.value > 140) {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter a valid age!";
  }
  var heightFt = document.getElementById("heightft");
  if (heightFt.value == "") {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter in a proper height!";
  } else if (heightFt.value < 0 || heightFt.value > 12) {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter in a proper height!";
  }
  var heightIn = document.getElementById("heightin");
  if (heightIn.value == "") {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter in a proper height!";
  } else if (heightIn.value < 0 || heightIn.value > 11) {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter in a proper height!";
  }
  var weight = document.getElementById("weight");
  if (weight.value == "") {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter in a weight!";
  } else if (weight.value <= 0 || weight.value > 700) {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must enter in a proper weight!";
  }

  var bmr = 0;
  var calorieNeed = 0;
  var fiberNeed = 0;
  var waterNeed = 0;

  if (document.getElementById("male").checked) {
    bmr = 66 + (6.3 * weight.value) + (12.9 * ((heightFt.value * 12) + +heightIn.value)) - (6.8 * age.value);
    if (age.value > 50) {
      fiberNeed = 30;
    } else {
      fiberNeed = 38;
    }
  } else if(document.getElementById("female").checked) {
    bmr = 655 + (4.3 * weight.value) + (4.7 * ((heightFt.value * 12) + +heightIn.value)) - (4.7 * age.value);
    if (age.value > 50) {
      fiberNeed = 21;
    } else {
      fiberNeed = 25;
    }
  } else {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must select a gender for recommended nutritional needs!";
  }

  if (document.getElementById("sedentary").checked) {
    calorieNeed = bmr * 1.2;
  } else if(document.getElementById("lightly active").checked) {
    calorieNeed = bmr * 1.375;
  } else if(document.getElementById("moderately active").checked) {
    calorieNeed = bmr * 1.55;
  } else if(document.getElementById("very active").checked) {
    calorieNeed = bmr * 1.725;
  } else if(document.getElementById("extra active").checked) {
    calorieNeed = bmr * 1.9;
  } else {
    var error = document.getElementById("errorBody");
    error.innerHTML = "You must select an activity level for recommended nutritional needs!";
  }

  if (age.value > 55) {
    waterNeed = weight.value / 2.2 * 30 / 28.3 / 8;
  } else if (age.value > 30) {
    waterNeed = weight.value / 2.2 * 35 / 28.3 / 8;
  } else {
    waterNeed = weight.value / 2.2 * 40 / 28.3 / 8;
  }

  var caloriesRecommended = document.getElementById("caloriesRecommended");
  caloriesRecommended.innerHTML = calorieNeed.toFixed(0) + " kcal";
  fiberRecommended.innerHTML = fiberNeed + " g";
  waterRecommended.innerHTML = waterNeed.toFixed(2) + " cups";

  calorieNeed = changeCalories(calorieNeed);

  var proteinPercent = document.getElementById("proteinPercent");
  var fatPercent = document.getElementById("fatPercent");
  var carbsPercent = document.getElementById("carbsPercent");

  if (+proteinPercent.value == 0 && +fatPercent.value == 0 && +carbsPercent.value == 0) {
    var proteinRecommended = document.getElementById("proteinRecommended");
    proteinRecommended.innerHTML = ((.2 * calorieNeed) / 4).toFixed(0) + " g";
    var fatRecommended = document.getElementById("fatRecommended");
    fatRecommended.innerHTML = ((.25 * calorieNeed) / 9).toFixed(0) + " g";
    var carbsRecommended = document.getElementById("carbsRecommended");
    carbsRecommended.innerHTML = ((.55 * calorieNeed) / 4).toFixed(0) + " g";
  } else if ((+proteinPercent.value + +fatPercent.value + +carbsPercent.value) < 100) {
    var error = document.getElementById("errorBody");
    error.innerHTML = "Your macronutrient percents should add up to 100! Your total is too low!";
  } else if ((+proteinPercent.value + +fatPercent.value + +carbsPercent.value) > 100) {
    var error = document.getElementById("errorBody");
    error.innerHTML = "Your macronutrient percents should add up to 100! Your total is too high!";
  } else if ((+proteinPercent.value + +fatPercent.value + +carbsPercent.value) == 100) {
    var proteinRecommended = document.getElementById("proteinRecommended");
    proteinRecommended.innerHTML = ((proteinPercent.value / 100 * calorieNeed) / 4).toFixed(0) + " g";
    var fatRecommended = document.getElementById("fatRecommended");
    fatRecommended.innerHTML = ((fatPercent.value / 100 * calorieNeed) / 9).toFixed(0) + " g";
    var carbsRecommended = document.getElementById("carbsRecommended");
    carbsRecommended.innerHTML = ((carbsPercent.value / 100 * calorieNeed) / 4).toFixed(0) + " g";
  }

}

function changeCalories(calories) {
  var error = document.getElementById("errorCalories");
  error.innerHTML = "";

  var calorieChange = document.getElementById("caloriesChanged");

  if (calorieChange.value > 1500 || calorieChange.value < -1500) {
    var error = document.getElementById("errorCalories");
    error.innerHTML = "The change in calories can't be less than -1500 or greater than 1500!";
  } else {
    var caloriesRecommended = document.getElementById("caloriesRecommended");
    caloriesRecommended.innerHTML = (+calorieChange.value + +calories).toFixed(0) + " kcal";
  }

  return (+calorieChange.value + +calories);
}

async function addRow() {
          
    var food = document.getElementById("food");
    var table = document.getElementById("myTableData");

    if (food.value == "") {
      var error = document.getElementById("errorLog");
      error.innerHTML = "You must enter a food!";
    } else {
      var error = document.getElementById("errorLog");
      error.innerHTML = "";
 
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);

      await userAction(food.value, item);

      row.insertCell(0).innerHTML= '<input type="button" class="button" value = "Delete" onClick="Javascript:deleteRow(this)">';
      row.insertCell(1).innerHTML= item;
      row.insertCell(2).innerHTML= food.value;
      row.insertCell(3).innerHTML= foods[foodIndex].Qty;
      row.insertCell(4).innerHTML= '<input type="button" class="button" value = "&#8593;" onClick="Javascript:upQty(this)">';
      row.insertCell(5).innerHTML= '<input type="button" class="button" value = "&#8595;" onClick="Javascript:downQty(this)">';
      row.insertCell(6).innerHTML= foods[foodIndex].Serving;
      row.insertCell(7).innerHTML= foods[foodIndex].Calories;

      updateNutrition();

      item += 1;
      foodIndex += 1;
    }
}
 
function deleteRow(obj) {
      
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("myTableData");
  table.deleteRow(index);

  foods.splice(index-2, 1);

  foodIndex -= 1;
  item -= 1;

  for (let i = index; i < (foodIndex + 2) ; i++) {
    foods[i - 2].Item -= 1;

    table.rows[i].cells[1].innerHTML = foods[i - 2].Item;
  }

  updateNutrition();
}

function upQty(obj) {
  var index = obj.parentNode.parentNode.rowIndex;
  var x = document.getElementById("myTableData").rows[index].cells;

  if (x[3].innerHTML >= 0) {

    for (let i = 0; i < foods.length; i++) {
      if (foods[i].Item == x[1].innerHTML) {
        foods[i].Qty += 1;
        indexFood = i;
        i = foods.length;
      }
    }

    x[3].innerHTML = foods[indexFood].Qty;
    x[7].innerHTML = foods[indexFood].Calories * foods[indexFood].Qty; 

    updateNutrition();
  }
}

function downQty(obj) {
  var index = obj.parentNode.parentNode.rowIndex;
  var x = document.getElementById("myTableData").rows[index].cells;

  if (x[3].innerHTML > 0) {

    for (let i = 0; i < foods.length; i++) {
      if (foods[i].Item == x[1].innerHTML) {
        foods[i].Qty -= 1;
        indexFood = i;
        i = foods.length;
      }
    }

    x[3].innerHTML = foods[indexFood].Qty;
    x[7].innerHTML = foods[indexFood].Calories * foods[indexFood].Qty; 

    updateNutrition();
  }
}

async function userAction (foodname, itemNum) {

  var str1 = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=quUbj48gALTdXJ1SyIdw8e7RTALfRyIUNTmhqy79&query=";
  res = str1.concat(foodname);
  const response = await fetch(res);
  const myJson = await response.json(); //extract JSON from the http response
  var servingUnit = myJson.foods[0].servingSizeUnit;
  var servingSize = myJson.foods[0].servingSize;
  var serving = servingSize + " " + servingUnit;
  if (serving == "undefined undefined") {
    serving = "N/A";
  }

  var protein = 0;
  var fat = 0;
  var carbs = 0;
  var calories = 0;
  var alcohol = 0;
  var water = 0;
  var caffeine = 0;
  var fiber = 0;
  var calcium = 0;
  var iron = 0;
  var magnesium = 0;
  var phosphorus = 0;
  var potassium = 0;
  var sodium = 0;
  var zinc = 0;
  var copper = 0;
  var selenium = 0;
  var vitaminA = 0;
  var vitaminE = 0;
  var vitaminD = 0;
  var vitaminC = 0;
  var b1 = 0;
  var b2 = 0;
  var b3 = 0;
  var b6 = 0;
  var folate = 0;
  var b12 = 0;
  var vitaminK = 0;
  var cholesterol = 0;
  var transFats = 0;
  var saturatedFats = 0;
  var monosaturatedFats = 0;
  var polyunsaturatedFats = 0;
  var sugar = 0;
  
  for (let i = 0; i < myJson.foods[0].foodNutrients.length; i++) {
    if (myJson.foods[0].foodNutrients[i].nutrientId == 1003) {
      protein = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1004) {
      fat = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1005) {
      carbs = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1008) {
      calories = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1018) {
      alcohol = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1051) {
      water = myJson.foods[0].foodNutrients[i].value / 128;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1057) {
      caffeine = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1079) {
      fiber = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1087) {
      calcium = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1089) {
      iron = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1090) {
      magnesium = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1091) {
      phosphorus = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1092) {
      potassium = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1093) {
      sodium = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1095) {
      zinc = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1098) {
      copper = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1103) {
      selenium = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1104) {
      vitaminA = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1106) {
      vitaminA = myJson.foods[0].foodNutrients[i].value * 40;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1109) {
      vitaminE = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1114) {
      vitaminD = myJson.foods[0].foodNutrients[i].value * 40;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1162) {
      vitaminC = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1165) {
      b1 = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1166) {
      b2 = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1167) {
      b3 = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1175) {
      b6 = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1177) {
      folate = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1178) {
      b12 = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1185) {
      vitaminK = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1253) {
      cholesterol = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1257) {
      transFats = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1258) {
      saturatedFats = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1292) {
      monosaturatedFats = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 1293) {
      polyunsaturatedFats = myJson.foods[0].foodNutrients[i].value;
    } else if (myJson.foods[0].foodNutrients[i].nutrientId == 2000) {
      sugar = myJson.foods[0].foodNutrients[i].value;
    }
  } 

  foods.push({
    Item: itemNum,
    Food: foodname,
    Serving: serving,
    Qty: 1,
    Protein: protein,
    Fat: fat,
    Carbs: carbs,
    Calories: calories,
    Alcohol: alcohol,
    Water: water,
    Caffeine: caffeine,
    Fiber: fiber,
    Calcium: calcium,
    Iron: iron,
    Magnesium: magnesium,
    Phosphorus: phosphorus,
    Potassium: potassium,
    Sodium: sodium,
    Zinc: zinc,
    Copper: copper,
    Selenium: selenium,
    VitaminA: vitaminA,
    VitaminE: vitaminE,
    VitaminD: vitaminD,
    VitaminC: vitaminC,
    VitaminB1: b1,
    VitaminB2: b2,
    VitaminB3: b3,
    VitaminB6: b6,
    Folate: folate,
    VitaminB12: b12,
    VitaminK: vitaminK,
    Cholesterol: cholesterol,
    TransFats: transFats,
    SaturatedFats: saturatedFats,
    MonosaturatedFats: monosaturatedFats,
    PolyunsaturatedFats: polyunsaturatedFats,
    Sugar: sugar
  });
 
}

function updateNutrition() {

  var protein = 0;
  var fat = 0;
  var carbs = 0;
  var calories = 0;
  var alcohol = 0;
  var water = 0;
  var caffeine = 0;
  var fiber = 0;
  var calcium = 0;
  var iron = 0;
  var magnesium = 0;
  var phosphorus = 0;
  var potassium = 0;
  var sodium = 0;
  var zinc = 0;
  var copper = 0;
  var selenium = 0;
  var vitaminA = 0;
  var vitaminE = 0;
  var vitaminD = 0;
  var vitaminC = 0;
  var b1 = 0;
  var b2 = 0;
  var b3 = 0;
  var b6 = 0;
  var folate = 0;
  var b12 = 0;
  var vitaminK = 0;
  var cholesterol = 0;
  var transFats = 0;
  var saturatedFats = 0;
  var monosaturatedFats = 0;
  var polyunsaturatedFats = 0;
  var sugar = 0;

  for (let i = 0; i < foods.length; i++) {
    protein += foods[i].Protein * foods[i].Qty;
    fat += foods[i].Fat * foods[i].Qty;
    carbs += foods[i].Carbs * foods[i].Qty;
    calories += foods[i].Calories * foods[i].Qty;
    alcohol += foods[i].Alcohol * foods[i].Qty;
    water += foods[i].Water * foods[i].Qty;
    caffeine += foods[i].Caffeine * foods[i].Qty;
    fiber += foods[i].Fiber * foods[i].Qty;
    calcium += foods[i].Calcium * foods[i].Qty;
    iron += foods[i].Iron * foods[i].Qty;
    magnesium += foods[i].Magnesium * foods[i].Qty;
    phosphorus += foods[i].Phosphorus * foods[i].Qty;
    potassium += foods[i].Potassium * foods[i].Qty;
    sodium += foods[i].Sodium * foods[i].Qty;
    zinc += foods[i].Zinc * foods[i].Qty;
    copper += foods[i].Copper * foods[i].Qty;
    selenium += foods[i].Selenium * foods[i].Qty;
    vitaminA += foods[i].VitaminA * foods[i].Qty;
    vitaminE += foods[i].VitaminE * foods[i].Qty;
    vitaminD += foods[i].VitaminD * foods[i].Qty;
    vitaminC += foods[i].VitaminC * foods[i].Qty;
    b1 += foods[i].VitaminB1 * foods[i].Qty;
    b2 += foods[i].VitaminB2 * foods[i].Qty;
    b3 += foods[i].VitaminB3 * foods[i].Qty;
    b6 += foods[i].VitaminB6 * foods[i].Qty;
    folate += foods[i].Folate * foods[i].Qty;
    b12 += foods[i].VitaminB12 * foods[i].Qty;
    vitaminK += foods[i].VitaminK * foods[i].Qty;
    cholesterol += foods[i].Cholesterol * foods[i].Qty;
    transFats += foods[i].TransFats * foods[i].Qty;
    saturatedFats += foods[i].SaturatedFats * foods[i].Qty;
    monosaturatedFats += foods[i].MonosaturatedFats * foods[i].Qty;
    polyunsaturatedFats += foods[i].PolyunsaturatedFats * foods[i].Qty;
    sugar += foods[i].Sugar * foods[i].Qty;
  }

  document.getElementById("protein").innerHTML = protein.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("fat").innerHTML = fat.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("carbs").innerHTML = carbs.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("calories").innerHTML = calories.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " kcal";
  document.getElementById("alcohol").innerHTML = alcohol.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("water").innerHTML = water.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " cups";
  document.getElementById("caffeine").innerHTML = caffeine.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("fiber").innerHTML = fiber.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("calcium").innerHTML = calcium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("iron").innerHTML = iron.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("magnesium").innerHTML = magnesium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("phosphorus").innerHTML = phosphorus.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("potassium").innerHTML = potassium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("sodium").innerHTML = sodium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("zinc").innerHTML = zinc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("copper").innerHTML = copper.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("selenium").innerHTML = selenium.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " µg";
  document.getElementById("vitaminA").innerHTML = vitaminA.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " IU";
  document.getElementById("vitaminE").innerHTML = vitaminE.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("vitaminD").innerHTML = vitaminD.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " IU";
  document.getElementById("vitaminC").innerHTML = vitaminC.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("b1").innerHTML = b1.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("b2").innerHTML = b2.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("b3").innerHTML = b3.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("b6").innerHTML = b6.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("folate").innerHTML = folate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " µg";
  document.getElementById("b12").innerHTML = b12.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " µg";
  document.getElementById("vitaminK").innerHTML = vitaminK.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " µg";
  document.getElementById("cholesterol").innerHTML = cholesterol.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " mg";
  document.getElementById("transFats").innerHTML = transFats.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("saturatedFats").innerHTML = saturatedFats.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("monosaturatedFats").innerHTML = monosaturatedFats.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("polyunsaturatedFats").innerHTML = polyunsaturatedFats.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
  document.getElementById("sugar").innerHTML = sugar.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " g";
}

async function createIngredients() {
  var max = [[0, ""], [0, ""], [0, ""], [0, ""]];

  var calciumRecommended = document.getElementById("calciumRecommended");
  var calcium = document.getElementById("calcium");
  console.log(calciumRecommended.name);
  console.log(calcium.name);
  var calciumPercent = +calcium.value / +calciumRecommended.value;
  console.log(calciumPercent);

  comparePercents(calciumPercent, "unsweetened plain soy milk", max);

  var ironRecommended = document.getElementById("ironRecommended");
  var iron = document.getElementById("iron");
  iron.value = iron.value / ironRecommended.value;

  comparePercents(iron.value, "red beans", max);

  var fiberRecommended = document.getElementById("fiberRecommended");
  var fiber = document.getElementById("fiber");
  fiber.value = fiber.value / fiberRecommended.value;

  comparePercents(fiber.value, "oats", max);

  var vitaminARecommended = document.getElementById("vitaminARecommended");
  var vitaminA = document.getElementById("vitaminA");
  vitaminA.value = vitaminA.value / vitaminARecommended.value;

  comparePercents(vitaminA.value, "carrot", max);

  var vitaminCRecommended = document.getElementById("vitaminCRecommended");
  var vitaminC = document.getElementById("vitaminC");
  vitaminC.value = vitaminC.value / vitaminCRecommended.value;

  comparePercents(vitaminC.value, "broccoli florets", max);

  var vitaminDRecommended = document.getElementById("vitaminDRecommended");
  var vitaminD = document.getElementById("vitaminD");
  vitaminD.value = vitaminD.value / vitaminDRecommended.value;

  comparePercents(vitaminD.value, "unsweetened plain soy milk", max);

  var b12Recommended = document.getElementById("b12Recommended");
  var b12 = document.getElementById("b12");
  b12.value = b12.value / b12Recommended.value;

  comparePercents(b12.value, "unsweetened plain soy milk", max);

  var magnesiumRecommended = document.getElementById("magnesiumRecommended");
  var magnesium = document.getElementById("magnesium");
  magnesium.value = magnesium.value / magnesiumRecommended.value;

  comparePercents(magnesium.value, "brown lentils", max);

  var potassiumRecommended = document.getElementById("potassiumRecommended");
  var potassium = document.getElementById("potassium");
  potassium.value = potassium.value / potassiumRecommended.value;

  comparePercents(potassium.value, "russet potato", max);

  var vitaminKRecommended = document.getElementById("vitaminKRecommended");
  var vitaminK = document.getElementById("vitaminK");
  vitaminK.value = vitaminK.value / vitaminKRecommended.value;

  comparePercents(vitaminK.value, "spinach", max);

  var vitaminERecommended = document.getElementById("vitaminERecommended");
  var vitaminE = document.getElementById("vitaminE");
  vitaminE.value = vitaminE.value / vitaminERecommended.value;

  comparePercents(vitaminE.value, "almonds", max);

  var phosphorusRecommended = document.getElementById("phosphorusRecommended");
  var phosphorus = document.getElementById("phosphorus");
  phosphorus.value = phosphorus.value / phosphorusRecommended.value;

  comparePercents(phosphorus.value, "unsweetened plain soy milk", max);

  var folateRecommended = document.getElementById("folateRecommended");
  var folate = document.getElementById("folate");
  folate.value = folate.value / folateRecommended.value;

  comparePercents(folate.value, "navy beans", max);

  var b1Recommended = document.getElementById("b1Recommended");
  var b1 = document.getElementById("b1");
  b1.value = b1.value / b1Recommended.value;

  comparePercents(b1.value, "quinoa", max);

  var b2Recommended = document.getElementById("b2Recommended");
  var b2 = document.getElementById("b2");
  b2.value = b2.value / b2Recommended.value;

  comparePercents(b2.value, "unsweetened plain soy milk", max);

  var b3Recommended = document.getElementById("b3Recommended");
  var b3 = document.getElementById("b3");
  b3.value = b3.value / b3Recommended.value;

  comparePercents(b3.value, "mushroom ravioli", max);

  var b6Recommended = document.getElementById("b6Recommended");
  var b6 = document.getElementById("b6");
  b6.value = b6.value / b6Recommended.value;

  comparePercents(b6.value, "flax seed", max);

  var zincRecommended = document.getElementById("zincRecommended");
  var zinc = document.getElementById("zinc");
  zinc.value = zinc.value / zincRecommended.value;

  comparePercents(zinc.value, "pine nuts", max);

  var copperRecommended = document.getElementById("copperRecommended");
  var copper = document.getElementById("copper");
  copper.value = copper.value / copperRecommended.value;

  comparePercents(copper.value, "russet potato", max);

  var seleniumRecommended = document.getElementById("seleniumRecommended");
  var selenium = document.getElementById("selenium");
  selenium.value = selenium.value / seleniumRecommended.value;

  comparePercents(selenium.value, "peanut butter", max);

  var foodList = [];

  foodList.push({
    food1: max[0][1],
    food2: max[1][1],
    food3: max[2][1],
    food4: max[3][1]
  });

  //console.log(foodList);

  await getRecipe(foodList);
}

function comparePercents(percent, name, maxNumList) {
  if (percent > maxNumList[0][0]) {
    maxNumList.unshift([percent, name]);
    maxNumList.pop();
  } else if (percent > maxNumList[1][0]) {
    maxNumList.splice(1, 0, [percent, name]);
    maxNumList.pop();
  } else if (percent > maxNumList[2][0]) {
    maxNumList.splice(2, 0, [percent, name]);
    maxNumList.pop();
  } else if (percent > maxNumList[3][0]) {
    maxNumList.splice(3, 0, [percent, name]);
    maxNumList.pop();
  }

  //console.log(maxNumList);
}

async function getRecipe (ingredients) {
  var str1 = "https://hungies.herokuapp.com/ingredients/";
  res = str1.concat(ingredients[0].food1 + "/");
  res = res.concat(ingredients[0].food2 + "/");
  res = res.concat(ingredients[0].food3 + "/");
  res = res.concat(ingredients[0].food4);
  const response = await fetch(res);
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson)
  //var recipe = myJson.recipe for: corn.recipe_link;

  document.getElementById("recipe").innerHTML = recipe;
}