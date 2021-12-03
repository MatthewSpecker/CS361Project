var item = 1; //tracks a number to represent how many food entries are in the food log
var foods = []; //stores all nutritional data and key info on each food in the food log
var foodIndex = 0; //current index of foods[], represents how many foods in food log
var foodEaten = [0]; //stores amount of each nutrient eaten thus far
var foodRecommended = [0]; //stores amount of each nutrient recommended to eat per day

//submitting body info and nutrition goals triggers this function
//the function calculates how many calories, protein, carbs, fat, water, and fiber you need
function calcRecommended() {

  //check for valid input for all user submitted info
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

  //initialize values we need to calculate
  var bmr = 0;
  var calorieNeed = 0;
  var fiberNeed = 0;
  var waterNeed = 0;

  //using gender, age, weight, and height, determine BMR and fiber needs
  //also ensure a gender was selected
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

  //ensure an activity level was selected
  //determine caloric needs of user using activity level and BMR
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

  //using age and weight, determine water needs of user
  if (age.value > 55) {
    waterNeed = weight.value / 2.2 * 30 / 28.3 / 8;
  } else if (age.value > 30) {
    waterNeed = weight.value / 2.2 * 35 / 28.3 / 8;
  } else {
    waterNeed = weight.value / 2.2 * 40 / 28.3 / 8;
  }

  //update recommended caloric, water, and fiber intake on web page
  var caloriesRecommended = document.getElementById("caloriesRecommended");
  caloriesRecommended.innerHTML = calorieNeed.toFixed(0) + " kcal";
  fiberRecommended.innerHTML = fiberNeed + " g";
  waterRecommended.innerHTML = waterNeed.toFixed(2) + " cups";

  //if user wanted to add a deficit or increase to recommended caloric intake, add it in to recommended calories
  calorieNeed = changeCalories(calorieNeed);

  //take in percent of calories user wants to get from each macro nutrient
  var proteinPercent = document.getElementById("proteinPercent");
  var fatPercent = document.getElementById("fatPercent");
  var carbsPercent = document.getElementById("carbsPercent");

  //ensure the 3 macronutrient percents add up to 100. send an error if they do not
  if (+proteinPercent.value == 0 && +fatPercent.value == 0 && +carbsPercent.value == 0) {
    //if percentages weren't entered by user, user defaults
    //calculate recommended amount of protein, carbs, and fat for user and update on web page
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
    //if percentages add up to 100, calculate recommended amount of protein, carbs, and fat for user and update on web page
    var proteinRecommended = document.getElementById("proteinRecommended");
    proteinRecommended.innerHTML = ((proteinPercent.value / 100 * calorieNeed) / 4).toFixed(0) + " g";
    var fatRecommended = document.getElementById("fatRecommended");
    fatRecommended.innerHTML = ((fatPercent.value / 100 * calorieNeed) / 9).toFixed(0) + " g";
    var carbsRecommended = document.getElementById("carbsRecommended");
    carbsRecommended.innerHTML = ((carbsPercent.value / 100 * calorieNeed) / 4).toFixed(0) + " g";
  }

  foodRecommended.pop();

  //store amount of recommended daily nutritient into index 0 of global array: foodRecommended
  foodRecommended.push({
    fiber: fiberNeed,
    calcium: 1000,
    iron: 8,
    magnesium: 400,
    phosphorus: 700,
    potassium: 3400,
    zinc: 11,
    copper: 0.9,
    selenium: 55,
    vitaminA: 36000,
    vitaminE: 15,
    vitaminD: 600,
    vitaminC: 90,
    b1: 1.2,
    b2: 1.3,
    b3: 16,
    b6: 1.3,
    folate: 400,
    b12: 2.4,
    vitaminK: 120
  });

}

//If user submitted a value to reduce or increase caloric intake
function changeCalories(calories) {
  //clear out old error message
  var error = document.getElementById("errorCalories");
  error.innerHTML = "";

  var calorieChange = document.getElementById("caloriesChanged");

  //ensure caloric intake change value is valid
  if (calorieChange.value > 1500 || calorieChange.value < -1500) {
    var error = document.getElementById("errorCalories");
    error.innerHTML = "The change in calories can't be less than -1500 or greater than 1500!";
  } else {
    var caloriesRecommended = document.getElementById("caloriesRecommended");
    //update recommended calories on webpage
    caloriesRecommended.innerHTML = (+calorieChange.value + +calories).toFixed(0) + " kcal";
  }

  return (+calorieChange.value + +calories);
}

//When the user clicks 'Add' on the food log table to add a food entry
//Adds a new row to food log table, finds given food in nutrition database, and updates nutrition eaten in food log and nutrition data tables
async function addRow() {
          
    //grab new entry and food log table
    var food = document.getElementById("food");
    var table = document.getElementById("myTableData");

    //confirm a new food entry was actually given
    if (food.value == "") {
      var error = document.getElementById("errorLog");
      error.innerHTML = "You must enter a food!";
    } else {
      var error = document.getElementById("errorLog");
      error.innerHTML = "";
      
      //add row to food log table for new food entry
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);

      //find new food entry in nutrition database
      await userAction(food.value, item);

      //add cells into new row with relevant information
      row.insertCell(0).innerHTML= '<input type="button" class="button" value = "Delete" onClick="Javascript:deleteRow(this)">'; //delete button
      row.insertCell(1).innerHTML= item; //table entry number
      row.insertCell(2).innerHTML= food.value; //new food entry name
      row.insertCell(3).innerHTML= foods[foodIndex].Qty; //servings of food eaten
      row.insertCell(4).innerHTML= '<input type="button" class="button" value = "&#8593;" onClick="Javascript:upQty(this)">'; //button to increase amount of food eaten
      row.insertCell(5).innerHTML= '<input type="button" class="button" value = "&#8595;" onClick="Javascript:downQty(this)">'; //buton to decrease amount of food eaten
      row.insertCell(6).innerHTML= foods[foodIndex].Serving; //serving size of food
      row.insertCell(7).innerHTML= foods[foodIndex].Calories; //calories eaten with all servings of food combined

      //calculate consumed nutrition now that more food has been eaten
      updateNutrition();

      //update food item number for next entry in food log
      item += 1;
      //update index to track how many foods have been able to the foods array
      foodIndex += 1;
    }
}

//called when the user wants to remove an entry from the food log
function deleteRow(obj) {
  
  //get index of row to be deleted
  var index = obj.parentNode.parentNode.rowIndex;
  var table = document.getElementById("myTableData");
  table.deleteRow(index); //deletes row

  foods.splice(index-2, 1); //remove all data on delete food item

  //adjust numbers that track the most recent food entry added
  foodIndex -= 1;
  item -= 1;

  //correct any item number values in the food log table that need to be decreased now
  for (let i = index; i < (foodIndex + 2) ; i++) {
    foods[i - 2].Item -= 1;

    table.rows[i].cells[1].innerHTML = foods[i - 2].Item;
  }

  //recalculate the consumed nutrition now that a food is no longer considered eaten
  updateNutrition();
}

//called when the user increases the food serving eaten by 1
function upQty(obj) {

  //get index of row in food log
  var index = obj.parentNode.parentNode.rowIndex;
  var x = document.getElementById("myTableData").rows[index].cells;

  //ensure food quantity is not a negative number
  if (x[3].innerHTML >= 0) {

    //update quantity in foods[]
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].Item == x[1].innerHTML) {
        foods[i].Qty += 1;
        indexFood = i;
        i = foods.length;
      }
    }

    //update quantity in food log and update calories consumed for that item
    x[3].innerHTML = foods[indexFood].Qty;
    x[7].innerHTML = foods[indexFood].Calories * foods[indexFood].Qty; 

    //recalculate consumed nutrition now that more food has been eaten
    updateNutrition();
  }
}

//called when the user decreases the food serving eaten by 1
function downQty(obj) {

  //get index of row in food log
  var index = obj.parentNode.parentNode.rowIndex;
  var x = document.getElementById("myTableData").rows[index].cells;

  //ensure food quantity is at least 1, so a negative number is avoided
  if (x[3].innerHTML > 0) {

    //update quantity in foods[]
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].Item == x[1].innerHTML) {
        foods[i].Qty -= 1;
        indexFood = i;
        i = foods.length;
      }
    }

    //update quantity in food log and update calories consumed for that item
    x[3].innerHTML = foods[indexFood].Qty;
    x[7].innerHTML = foods[indexFood].Calories * foods[indexFood].Qty; 

    //recalculate consumed nutrition now that more food has been eaten
    updateNutrition();
  }
}

//calls a food nutrition database API with new food entry given by user
//finds all nutrition given by food and puts data into foods[]
async function userAction (foodname, itemNum) {

  //call food database API
  var str1 = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=quUbj48gALTdXJ1SyIdw8e7RTALfRyIUNTmhqy79&query=";
  res = str1.concat(foodname);
  const response = await fetch(res);
  const myJson = await response.json(); //extract JSON from the http response

  //find serving size information
  var servingUnit = myJson.foods[0].servingSizeUnit;
  var servingSize = myJson.foods[0].servingSize;
  var serving = servingSize + " " + servingUnit;

  //if there isn't a serving size available for food item, change serving size to 'N/A'
  if (serving == "undefined undefined") {
    serving = "N/A";
  }

  //initialize all nutrition categories to 0. if a food doesn't have some nutrition category, we want the value to be 0
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
  
  //the food database API has nutrient IDs for the different nutrient categories
  //this loop grabs all nutrient categories by matching data to nutrient IDs
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

  //push all nutritional data to foods[] for later use
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

//takes in all data in foods[] and calculates the total amount of nutrition eaten
//results are placed in nutrition data table on web page
function updateNutrition() {

  //initialize all nutrient categories to 0
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

  //loop through all food item in foods[] and add the nutritional data of each food item with serving quantity factored in
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

  foodEaten.pop();

  //store amount of food eaten of each nutritient into index 0 of global array: foodEaten
  foodEaten.push({
    fiber: fiber,
    calcium: calcium,
    iron: iron,
    magnesium: magnesium,
    phosphorus: phosphorus,
    potassium: potassium,
    zinc: zinc,
    copper: copper,
    selenium: selenium,
    vitaminA: vitaminA,
    vitaminE: vitaminE,
    vitaminD: vitaminD,
    vitaminC: vitaminC,
    b1: b1,
    b2: b2,
    b3: b3,
    b6: b6,
    folate: folate,
    b12: b12,
    vitaminK: vitaminK
  });

  //update results into nutrition data table on web page
  //'toFixed(2)' limits numbers to 2 decimals
  //'toString()...' is a regex expression that adds commas for the thousands place and so on
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

//activated when user asks for a recipe
//calculates the percentage of missing nutrition for user's day
//for the 4 nutrient categories with the biggest missing percentage of nutrition, an ingredient associated with lot of that missing nutrient will be recommended
//generates a downloadable file of recipes for user
async function createIngredients() {
  var max = [[0, "unsweetened plain soy milk"], [0, "red beans"], [0, "oats"], [0, "carrot"]];

  var calciumPercent = foodEaten[0].calcium / foodRecommended[0].calcium;

  comparePercents(calciumPercent, "unsweetened plain soy milk", max);

  var ironPercent = foodEaten[0].iron / foodRecommended[0].iron;

  comparePercents(ironPercent, "red beans", max);

  var fiberPercent = foodEaten[0].fiber / foodRecommended[0].fiber;

  comparePercents(fiberPercent, "oats", max);

  var vitaminAPercent = foodEaten[0].vitaminA / foodRecommended[0].vitaminA;

  comparePercents(vitaminAPercent, "carrot", max);

  var vitaminCPercent = foodEaten[0].vitaminC / foodRecommended[0].vitaminC;

  comparePercents(vitaminCPercent, "broccoli florets", max);

  var vitaminDPercent = foodEaten[0].vitaminD / foodRecommended[0].vitaminD;

  comparePercents(vitaminDPercent, "unsweetened plain soy milk", max);

  var b12Percent = foodEaten[0].b12 / foodRecommended[0].b12Recommended;

  comparePercents(b12Percent, "unsweetened plain soy milk", max);

  var magnesiumPercent = foodEaten[0].magnesium / foodRecommended[0].magnesium;

  comparePercents(magnesiumPercent, "brown lentils", max);

  var potassiumPercent = foodEaten[0].potassium / foodRecommended[0].potassium;

  comparePercents(potassiumPercent, "russet potato", max);

  var vitaminKPercent = foodEaten[0].vitaminK / foodRecommended[0].vitaminK;

  comparePercents(vitaminKPercent, "spinach", max);

  var vitaminEPercent = foodEaten[0].vitaminE / foodRecommended[0].vitaminE;

  comparePercents(vitaminEPercent, "almonds", max);

  var phosphorusPercent = foodEaten[0].phosphorus / foodRecommended[0].phosphorus;

  comparePercents(phosphorusPercent, "unsweetened plain soy milk", max);

  var folatePercent = foodEaten[0].folate / foodRecommended[0].folate;

  comparePercents(folatePercent, "navy beans", max);

  var b1Percent = foodEaten[0].b1 / foodRecommended[0].b1;

  comparePercents(b1Percent, "quinoa", max);

  var b2Percent = foodEaten[0].b2 / foodRecommended[0].b2;

  comparePercents(b2Percent, "unsweetened plain soy milk", max);

  var b3Percent = foodEaten[0].b3 / foodRecommended[0].b3;

  comparePercents(b3Percent, "mushroom ravioli", max);

  var b6Percent = foodEaten[0].b6 / foodRecommended[0].b6;

  comparePercents(b6Percent, "flax seed", max);

  var zincPercent = foodEaten[0].zinc / foodRecommended[0].zinc;

  comparePercents(zincPercent, "pine nuts", max);

  var copperPercent = foodEaten[0].copper / foodRecommended[0].copper;

  comparePercents(copperPercent, "russet potato", max);

  var seleniumPercent = foodEaten[0].selenium / foodRecommended[0].selenium;

  comparePercents(seleniumPercent, "peanut butter", max);

  //foodList[] stores the 4 ingredients to find recipes with
  var foodList = [];


  foodList.push({
    food1: max[0][1],
    food2: max[1][1],
    food3: max[2][1],
    food4: max[3][1]
  });

  //get downloadable file with recipes with the 4 ingredients
  await getRecipe(foodList);
}

//updates an ordered array if a newly given number is bigger than the 4 numbers stored in the ordered array
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
}

//calls teammates microservice to generate a recipe download
async function getRecipe (ingredients) {

  //create url with 4 ingredients to send to microservice
  var str1 = "https://hungies.herokuapp.com/ingredients/";
  req = str1.concat('"' + ingredients[0].food1 + '"/"');
  req = req.concat(ingredients[0].food2 + '"/"');
  req = req.concat(ingredients[0].food3 + '"/"');
  req = req.concat(ingredients[0].food4 + '"');

  //send request to teammate's microservice and get a downloadable file of recipes
  fetchDown(req, 'recipes.json');
}

//takes in the request url with our 4 ingredients and calls a teammate's microservice
//a json file with recipes with be downloaded for user to look at
function fetchDown (url, saveas) {
  // (A) FETCH FILE
  fetch(url)
 
  // (B) RETURN AS BLOB
  .then((result) => {
    if (result.status != 200) { throw new Error("Bad server response"); }
    return result.blob();
  })
 
  // (C) BLOB DATA
  .then((data) => {
    // (C1) FILE DATA IS "READY FOR USE"
    console.log(data);
 
    // (C2) TO "FORCE DOWNLOAD"
    var url = window.URL.createObjectURL(data),
    anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = saveas;
    anchor.click();
 
    // (C3) CLEAN UP
    window.URL.revokeObjectURL(url);
  })
}