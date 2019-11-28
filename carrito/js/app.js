// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners

cargarEventListeners();

function cargarEventListeners(){
     // Dispara cuando se presiona "Agregar Carrito"
     cursos.addEventListener('click', comprarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Vaciar todo el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     // Al cargar el documento, mostrar LocalStorage
     document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


// Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e) {
     e.preventDefault();

     // Delegation para agragr-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          //Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id')
     }
     
     insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
     const row = document.createElement('tr');
     row.innerHTML = `
          <td><img src="${curso.imagen}" width=100></td>
          <td>${curso.titulo}</td>
          <td>${curso.precio}</td>
          <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
     `;
     listaCursos.appendChild(row);
     guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();

     let curso, cursoID;
     if(e.target.classList.contains('borrar-curso')) {
          e.target.parentElement.parentElement.remove();
          curso = e.target.parentElement.parentElement;
          cursoID = curso.querySelector('a').getAttribute('data-id');
     }
     eliminarCursoLocalStorage(cursoID);
}

// Vaciar todo el carrito en el DOM
function vaciarCarrito(e){
     // forma lenta
     //listaCursos.innerHTML = '';

     //forma rápida (recomendada)
     while(listaCursos.firstChild) {
          listaCursos.removeChild(listaCursos.firstChild);
     }

     // Vaciar Local Storage
     vaciarLocalStorage();

     return false;
}

// Guardar cursos del carrito en el Local Storage
function guardarCursoLocalStorage(curso){
     let cursos;

     cursos = obtenerCursosLocalStorage();

     // El curso seleccionado se agrega al arreglo
     cursos.push(curso);

     // Arreglo se guarda en LS
     localStorage.setItem('cursos', JSON.stringify(cursos));
}

// Comprueba que haya elementos en el local storage
function obtenerCursosLocalStorage(){
     let cursoLS;

     // Comprobar si hay algo en el LS
     if(localStorage.getItem('cursos') === null) {
          cursoLS = [];
     } else {
          cursoLS = JSON.parse(localStorage.getItem('cursos'));
     }
     return cursoLS;
}

// Imprime los cursos de local storage en el carrito
function leerLocalStorage(){
     let cursosLS;

     cursosLS = obtenerCursosLocalStorage();

     cursosLS.forEach(function(curso){
          const row = document.createElement('tr');
          row.innerHTML = `
               <td><img src="${curso.imagen}" width=100></td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
          `;
          listaCursos.appendChild(row);
     });
}

// Eliminar un curso del Local Storage
function eliminarCursoLocalStorage(cursoID){
     let cursosLS;

     cursosLS = obtenerCursosLocalStorage();

     // Se compara el ID del curso borrado con el LS
     cursosLS.forEach(function(cursoLS, index){
          if(cursoLS.id === cursoID) {
               cursosLS.splice(index, 1);
          }
     });

     // Actualiza Local Storage
     localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Elimina todos los cursos de Local Storage
function vaciarLocalStorage(){
     localStorage.clear();
}