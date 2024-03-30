const API = 'https://randomuser.me/api/?results=10'

const pedirPosts = async() =>{
    const respuesta= await fetch(API)
    const data = await respuesta.json()
    const container = document.querySelector("#container")
    data.results.forEach((person)=>{
    const div2 = document.createElement("div");
    div2.innerHTML = `
    <p>Nombre: ${person.name.first} ${person.name.last}</p>
    <p>Numero de telefono: ${person.phone}</p>
    <p>Fecha de nacimiento: ${new Date(person.dob.date).toLocaleDateString()}</p>
    <p>Genero: ${person.gender}</p>`;
    container.appendChild(div2)
    })
}
pedirPosts()

