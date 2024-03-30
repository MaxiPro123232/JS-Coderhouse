//array del historial
let historial = [];
//crear div del historial
const historialOutputDiv = document.createElement('div');
historialOutputDiv.id = 'historialOutput';
document.body.appendChild(historialOutputDiv)
//crear boton para borrar el historial
const botonclean = document.createElement('button');
botonclean.id = 'calcularButton2'
botonclean.innerText = "Borrar historial"
document.body.appendChild(botonclean)
//funcion que carga el historial de la memoria local
function loadFromLocalStorage() {
const savedHistorial = localStorage.getItem('historial');
if (savedHistorial) {
historial = JSON.parse(savedHistorial);
displayHistorial();
}
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
Toast.fire({
    icon: "success",
    title: "Inicio Exitoso!"
});
}
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
//borrar el historial
function clearHistorial() {
historial = [];
saveToLocalStorage(); 
displayHistorial(); 
}
//funcionamiento del boton de calcular
document.getElementById('calcularButton').addEventListener('click', () => {
let nombre = document.getElementById('nombreInput').value.trim();
let salario = parseFloat(document.getElementById('salarioInput').value);
let porcentaje = parseFloat(document.getElementById('porcentajeInput').value);

// Validación del nombre
if (!/^[a-zA-Z]+$/.test(nombre)) {
document.getElementById('nombreError').textContent = "El nombre solo puede contener letras.";
} else {
document.getElementById('nombreError').textContent = "";
}

// Validación del salario
if (isNaN(salario) || salario <= 0) {
document.getElementById('salarioError').textContent = "El salario debe ser un número mayor que cero.";
} else {
document.getElementById('salarioError').textContent = "";
}

// Validación del porcentaje
if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
document.getElementById('porcentajeError').textContent = "El porcentaje debe ser un número entre 0 y 100.";
} else {
document.getElementById('porcentajeError').textContent = "";
}
if (/^[a-zA-Z]+$/.test(nombre) && !isNaN(salario) && salario > 0 && !isNaN(porcentaje) && porcentaje >= 0 && porcentaje <= 100) {
const total = salario * (1 + porcentaje / 100);
const pagaimp = total > 1000000 ? "SI" : "NO";
const operacionAGuardar = {
nombre: nombre,
resultado: total,
pagaimp: pagaimp
};
Swal.fire({
title: "Quiere guardar los cambios realizados?",
showDenyButton: true,
showCancelButton: true,
confirmButtonText: "Guardar",
denyButtonText: `No Guardar`
}).then((result) => {
if (result.isConfirmed) {
Swal.fire("Guardado!", "", "success");
historial.push(operacionAGuardar);
saveToLocalStorage();
displayHistorial();
} else if (result.isDenied) {
Swal.fire("Los cambios no han sido guardados", "", "info");
}
});
}
});

//funcion del boton de borrar historial
document.getElementById('calcularButton2').addEventListener('click',
clearHistorial
)
//invocar a la funcion para cargar el historial
loadFromLocalStorage();

// const API = 'https://randomuser.me/api/?results=10'

// const respuesta= await fetch(API)
// console.log(respuesta)



// fetch(API)
// .then((response)=>{
//     return response.json();
// })
// .then((data)=>{
//     console.log(data)
//     const container = document.querySelector("#container")

//     data.results.forEach((person)=>{
//         const div2 = document.createElement("div");
//         div2.innerHTML = `
//         <p>Nombre: ${person.name.first} ${person.name.last}</p>
//         <p>Numero de telefono: ${person.phone}</p>
//         <p>Fecha de nacimiento: ${new Date(person.dob.date).toLocaleDateString()}</p>
//         <p>Genero: ${person.gender}</p>`;
//         container.appendChild(div2)
//     })
// })
// .catch((error)=>{
// console.log(error)
// })