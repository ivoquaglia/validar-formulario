const firebaseConfig = {
    apiKey: "AIzaSyADDH3UMTLlJizdg0faJkIC0VkqDlXqojI",
    authDomain: "datos-de-formularios.firebaseapp.com",
    projectId: "datos-de-formularios",
    storageBucket: "datos-de-formularios.appspot.com",
    messagingSenderId: "904966420015",
    appId: "1:904966420015:web:1cfead268206debcd438da",
    measurementId: "G-R1ZBHYETR2"
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();




formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (event) => {
    
    event.preventDefault();

    let entradaNombre = document.getElementById("name");
    let errorNombre = document.getElementById("nameError");

    if(entradaNombre.value.trim() === ""){
        errorNombre.textContent = "Por favor, Introducí tu nombre";
        errorNombre.classList.add(`error-message`);
    }else{
        errorNombre.textContent = "";
        errorNombre.classList.remove(`error-message`);
    }

    let emailEntrada = document.getElementById("email");
    let emailError = document.getElementById("emailError");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = "Por favor, Introducí un email valido";
        emailError.classList.add(`error-message`);
    }else{
        emailError.textContent = "";
        emailError.classList.remove(`error-message`);
    }

    let contrasenaEntrada = document.getElementById("password");
    let contrasenaError = document.getElementById("passwordError");
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = "La contrasela debe tener al menos 8 caracteres, numeros, mayusculas, minusculas y caracteres especiales";
        contrasenaError.classList.add(`error-message`);
    }else{
        contrasenaError.textContent = "";
        contrasenaError.classList.remove(`error-message`);
    }

    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            console.log("Documento escrito con ID: ", docRef.id);
            alert("El formulario se ha enviado correctamente");
            document.getElementById("formulario").reset();
        })
        .catch((error) => {
            console.error("Error al agregar documento: ", error);
        });


    }
});