let cargarDatos = () =>{  
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml").then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    console.log(xml);

    let escritores = xml.getElementsByTagName('escritor');
    

    for(let escritor of escritores){
        let id = escritor.getElementsByTagName('id')[0].textContent;
        let nombre = escritor.getElementsByTagName('nombre')[0].textContent;
        
        let plantilla = `<option value= "${id}">${nombre}</option>`
        document.querySelector('div.input-group > select').innerHTML += plantilla
    }   
  })
  .catch(console.error);
}

window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
});

const selectElement = document.querySelector('select');
selectElement.addEventListener('change', (event) => {
const frases = document.getElementById('frases');

  fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
  .then(response => response.json())
  .then(data => {
    console.log(data);

  for(let elem in data){
    let frase = elem[0].getElementsByTagName('texto');

    document.getElementById('frases').innerHTML += plantilla.txt.textContent;
  }
  })

  .catch(console.error);
});

  