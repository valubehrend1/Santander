//Variables 
var d = document;

//VAR INPUTS
var inputDate = d.getElementById('inputDate');
var firstDateFormatted = new Date(actualDate().getTime() + (24*60*60*1000)).toISOString().substring(0, 10);
var maxLimit = new Date(actualDate().getTime() + (4*24*60*60*1000)).toISOString().substring(0, 10);
var inputValueCity = d.getElementById('inputValue-city');
var selectMoment = d.getElementById('selectMoment');
var defaultSelect = d.getElementById('defaultSelect');
var incompleteField = d.getElementById('incomplete-field');

var button = d.getElementsByClassName('btn-calc')[0];

//VAR CLIMA CALC
var cityName = d.querySelector('.city-name');
var tempDescription = d.querySelector('.temp-description');
var degree = d.querySelector('.degree');
var weatherIcon = d.getElementById('weatherIcon');
var alertDescription = d.getElementById('temp-description');

var inputDateValue; 
var degreeValue;

//CÁLCULO CLIMA
var beerRatio;
var caja = 'caja';
var people = d.getElementById('peopleNumber');
var recommend = d.getElementsByClassName('recommend')[0];

//FUNCTIONS 
function actualDate() {
  return new Date(new Date().getTime() - (3*60*60*1000));  
}

function beerBoxesCalc() {        
    var beerBoxes = Math.ceil((beerRatio * Number(people.value)) / 6);
    if (beerBoxes === 1) {
        caja = 'CAJA';
    } else {
        caja = 'CAJAS';
    }
    return(beerBoxes);
}
//INPUT ONLOAD 
window.onload = () => {  
  inputDate.innerHTML = `<input id="date" class="form-control mb-2" type="date" min="${firstDateFormatted}" max="${maxLimit}"/>`;
  inputDateValue = d.getElementById('date');
}
//CLIMA BTN CALC
button.addEventListener('click', function() {
//Campos incompletos
    if (inputDateValue.value == 0 || inputValueCity.value.length == 0 || selectMoment.value === defaultSelect.value) {
        incompleteField.innerHTML = "Todos los campos son obligatorios";
        return false;
    }
    if (people.value <= 0) {
        incompleteField.innerHTML = "Ingrese un número correcto";
        return false;
    } else {
        incompleteField.innerHTML = '';
    }  
//Vínculo con api/Lugar, Día y horario
fetch('http://api.openweathermap.org/data/2.5/forecast?q='+inputValueCity.value+'&units=metric&appid=2563b0ad8c89759de2024abd69c7371e')
  .then(response => response.json())
  .then (data => {
  var cityNameValue = data['city']['name'];
  cityName.innerHTML = cityNameValue;

  let dayHours = [];
  for (i = 0; i < data['list'].length; i++) {
    if (data['list'][i].dt_txt.substring(0, 10) == inputDateValue.value) {
      dayHours.push(data['list'][i]);
    }
  }
    let tempMidd = Math.round(dayHours[4].main.temp);
    let tempAfternoon = Math.round(dayHours[6].main.temp);
    let tempNight = Math.round(dayHours[7].main.temp);

    let midIcon = dayHours[4].weather[0].id;
    let afternoonIcon = dayHours[6].weather[0].id;
    let nightIcon = dayHours[7].weather[0].id;
     
     if (selectMoment.value == 1) {
       degreeValue = tempMidd;
       weatherIcon.className = "owf owf-3x owf-" + midIcon;
     } else if (selectMoment.value == 2) {
       degreeValue = tempAfternoon;
       weatherIcon.className = "owf owf-3x owf-" + afternoonIcon;
     } else if (selectMoment.value == 3) {
       degreeValue = tempNight;
       weatherIcon.className = "owf owf-3x owf-" + nightIcon;
     };

     degree.innerHTML = degreeValue + "°C";

     //Cálculo cajas de birra
    if (degreeValue < 20) {
        beerRatio = 0.75; 
    } else if (degreeValue >= 20 && degreeValue <= 24) {
        beerRatio = 1;
    } else if (degreeValue > 24) {
        beerRatio = 3;
    } 
    recommend.innerHTML = "RECOMENDAMOS COMPRAR " + beerBoxesCalc() + " " + caja + " DE BIRRA"; 
    
 //Condicional descripción de clima
    if (degreeValue < 15) {
        alertDescription.innerHTML = "Para el fresquito un abrigo, para la sed una birra";  
        } else if (degreeValue >=15 && degreeValue <= 20) {
        alertDescription.innerHTML = "Se asoma el calorcito, se asoman las birras";
        } else if (degreeValue > 20) {
        alertDescription.innerHTML = "Lindo día para una birra";
        }   
    return window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
        });
    });
});

