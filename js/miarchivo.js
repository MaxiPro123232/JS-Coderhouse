let historial = [];
//creo el boton del historial
const historialButton = document.createElement("button");
historialButton.id = "calcularButton2"
historialButton.innerHTML ="Ver Historial"
document.body.appendChild(historialButton);
//creo el div del historial
const historialOutputDiv = document.createElement('div');
historialOutputDiv.id = 'historialOutput';
document.body.appendChild(historialOutputDiv)
//funcionamiento del boton de calcular
document.getElementById('calcularButton').addEventListener('click', () => {
const nombre = document.getElementById('nombreInput').value;
const salary = parseFloat(document.getElementById('salarioInput').value);

if (!/^[a-zA-Z]+$/.test(nombre)) {
nombre = document.getElementById('nombreInput').value;
}
if (isNaN(salary) || salary <= 0) {
salary = parseFloat(document.getElementById('salarioInput').value);
}

const porcentaje = parseFloat(document.getElementById('porcentajeInput').value);

if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
porcentaje = parseFloat(document.getElementById('porcentajeInput').value);
}

const total = salary * (1 + porcentaje / 100);
const pagaimp = total > 1000000 ? "SI" : "NO";

const operacionAGuardar = {
nombre: nombre,
resultado: total,
pagaimp: pagaimp
};
Swal.fire({
title: "Do you want to save the changes?",
showDenyButton: true,
showCancelButton: true,
confirmButtonText: "Save",
denyButtonText: `Don't save`
}).then((result) => {
if (result.isConfirmed) {
Swal.fire("Saved!", "", "success");
historial.push(operacionAGuardar);
saveToLocalStorage();
} else if (result.isDenied) {
Swal.fire("Changes are not saved", "", "info");
}
});
});
//funcionamiento del boton de ver historial
document.getElementById('calcularButton2').addEventListener('click', () => {
Swal.fire(appendChild(historialOutputDiv))
});

//funcion del display del historial
function displayHistorial() {
const historialOutputDiv = document.getElementById('historialOutput');
historialOutputDiv.innerHTML = '';

historial.forEach(operacion => {

if (operacion.resultado !== null && operacion.resultado !== undefined) {
const h2 = document.createElement("h2");
h2.id= "clientes";
h2.textContent = `${operacion.nombre}: ${operacion.pagaimp} paga impuesto a la ganancia`;
historialOutputDiv.appendChild(h2);
const mensaje = `${operacion.nombre} su salario equivale a ${operacion.resultado.toFixed(2)}<br>`;
historialOutputDiv.innerHTML += mensaje;
}
});
}

//funcion que guarda el array del historial a la memoria local
function saveToLocalStorage() {
localStorage.setItem('historial', JSON.stringify(historial));
}
//funcion que carga el historial de la memoria local
function loadFromLocalStorage() {
const savedHistorial = localStorage.getItem('historial');
if (savedHistorial) {
historial = JSON.parse(savedHistorial);
displayHistorial();
}
}
//invocar a la funcion para cargar el historial
loadFromLocalStorage();
