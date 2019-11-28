// Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

// Event Listener

eventListeners();

function eventListeners() {
    // Inicio de la aplicacion y deshabilitar ubmit
    document.addEventListener('DOMContentLoaded', inicioApp);

    // Campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    // Boton de enviar en el email
    formularioEnviar.addEventListener('submit', enviarEmail);

    // boton de reset
    resetBtn.addEventListener('click', resetFormulario);
}


// Funciones

function inicioApp(){
    // deshabilitar el envío
    btnEnviar.disabled = true;
}

function validarCampo(){
    // Se valida la longitud del texto y que no esté vacio
    validarLongitud(this);

    // Validar unicamente el email
    if(this.type === 'email') {
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');

        if(errores.length === 0){
            btnEnviar.disabled = false;
        } else {
            btnEnviar.disabled = true;
        }
    
}

// Resetear el formulario
function resetFormulario(e){
    e.preventDefault();
    formularioEnviar.reset();
    btnEnviar.disabled = true;
}

function enviarEmail(e){
    e.preventDefault();

    //Spinner al presionar enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    // Gif de email enviado
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    // Ocultar spinnerGif y mostrar email gif
    setTimeout(() => {
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);
        
        setTimeout(() => {
            enviado.remove();
            formularioEnviar.reset();    
            btnEnviar.disabled = true;
        }, 5000);
    }, 3000);
}


// Verifica que cada campo tenga datos
function validarLongitud(campo){
    if(campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

// Verifica que sea un email válido
function validarEmail(campo){
    const email = campo.value;
        
    if(email.indexOf('@') !== -1) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}


