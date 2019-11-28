const cotizador = new API('6419680034b75a20794371e7e40fa20b8c9338af2da8d9cc1a88c1f79ffea28d');
const ui = new Interfaz();


document.addEventListener("DOMContentLoaded", function(event) {
     const listaNombres = document.getElementById('nombres').children;

     const cantidadNombres = listaNombres.length;

     let divCheckbox = document.getElementById('checkbox');

     for(let i=0; i<cantidadNombres; i++){
          let input = document.createElement('input');
          input.type = "checkbox";
          input.name = listaNombres[i].value;
          input.value = listaNombres[i].value;
          input.id = listaNombres[i].value;

          let label = document.createElement('label');
          label.htmlFor = "id";
          label.appendChild(document.createTextNode(listaNombres[i].innerHTML));

          let br = document.createElement('br');
                
          divCheckbox.appendChild(input);
          divCheckbox.appendChild(label);
          divCheckbox.appendChild(br);
     }

   });

// Leer el formulario
const formulario = document.querySelector('#formulario');

// EventListener
formulario.addEventListener('submit', (e) => {
     e.preventDefault();

     // Leer la moneda seleccionada
     const monedaSelect = document.querySelector('#moneda');
     const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

     // Leer la criptomoneda Seleccionada
     const criptoMonedaSelect = document.querySelector('#criptomoneda');
     const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

     // Comprobar que ambos campos tengan algo seleccionado
     if(monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
          // arrojar una alerta de error
          ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
     } else {
          // todo bien, consumir API
          cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
               .then(data => {
                    ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
               })
     }
});