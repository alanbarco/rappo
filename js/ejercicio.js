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



  let selectElement = document.querySelector('div.input-group > select');
  selectElement.addEventListener('change', function() {
      fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
        .then(response => response.json())
        .then(data => {
          let frases = data["frases"];
          let plantilla, texto, autor;
          document.getElementById('frases').innerHTML = '';
          frases.filter(frase => frase['id_autor'] == selectElement.value).forEach(frase => {
            texto = frase['texto'];
            autor = this.options[selectElement.selectedIndex].text;
            plantilla = `<div class="col-lg-3">
                            <div class="test-inner ">
                                <div class="test-author-thumb d-flex">
                                    <div class="test-author-info">
                                        <h4>${autor}</h4>                                            
                                    </div>
                                </div>
                                <span>${texto}</span>
                                <i class="fa fa-quote-right"></i>
                            </div>
                        </div>`;
              document.querySelector('div#frases').innerHTML += plantilla;

          });
        }).catch(console.error);
  });
};
window.addEventListener('DOMContentLoaded', (event)=> cargarDatos());