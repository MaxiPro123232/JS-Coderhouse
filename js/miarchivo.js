const API = 'https://randomuser.me/api/?results=10'
const pedirPosts = async() =>{
    const respuesta= await fetch(API)
    const data = await respuesta.json()
    data.results.forEach((person)=>{
        guardarnombres.push(person.name.first)
    })
}
pedirPosts()

const guardarnombres = []

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
//funcion para validar nombre

function nombrevalido(nombre){
    let result = false
    guardarnombres.forEach((person)=>{
        if(person === nombre){
            result = true
        }
    })
    return result
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

const nmv = nombrevalido(nombre)

// Validación del nombre
if (!/^[a-zA-Z]+$/.test(nombre) && !nmv) {
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
if (/^[a-zA-Z]+$/.test(nombre)&& !nmv && !isNaN(salario) && salario > 0 && !isNaN(porcentaje) && porcentaje >= 0 && porcentaje <= 100) {
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

