var d = document;
var user = d.getElementById('user');
var password = d.getElementById('pass');
var addText = d.getElementById('incomplete-field');
var button = d.getElementById('submit-btn');

button.addEventListener('click', function(){

if (user.value.length == 0 || password.value.length == 0) {
    addText.innerHTML = "Todos los campos son obligatorios";  
    } else if (user.value.length !== 0 && password.value.length !== 0) {
    addText.innerHTML = "";
    }
});