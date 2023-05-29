function actualNew() {
    //Pivotear forms entre Login y Nuevo Usuario
    if (document.getElementById("nuevoUsuario").style.visibility == "hidden") {
        document.getElementById("nuevoUsuario").style.visibility = "visible";
        document.getElementById("login").style.visibility = "hidden";
        document.getElementById("actualNew").innerHTML = "Ya tengo mi cuenta";
    } else {
        document.getElementById("nuevoUsuario").style.visibility = "hidden";
        document.getElementById("actualNew").innerHTML = "No Tengo cuenta";
        document.getElementById("login").style.visibility = "visible";
    }
};
function login() {
    //(utilizar provisionalmente localStorage)
    if (localStorage.getItem("usuario")) {
        let cliente = JSON.parse(localStorage.getItem("usuario"));
        let usuarioOk = false;
        let passOk = false;
        if (document.getElementById("em").value == cliente.em) {
            usuarioOk = true;
            alert("usuario ok");
        }
        if (document.getElementById("passw").value == cliente.passw) {
            passOk = true;
            alert("pass ok");
        }
        if ((usuarioOk == true) && (passOk == true)) {
            localStorage.setItem("logueado", "true");
            alert("Bienvenido " + cliente.nombre);
        } else {
            alert("Usuario o contraseña incorrectos ");
            localStorage.setItem("logueado", "false");
        }
    } else {
        alert("No existe ningún usuario dado de alta");
    };
};
function nuevoUsuario() {
    // paso los datos a un objeto. Solo para manejarlo mejor
    let perfil = {
        nombre: (document.getElementById("nombre").value),
        em: document.getElementById("nem").value,
        passw: document.getElementById("npassw").value,
        nac: document.getElementById("nac").value,
        tel: document.getElementById("tel").value,
        calle: document.getElementById("calle").value,
        altura: document.getElementById("altura").value,
        adicDomicilio: document.getElementById("adicDomicilio").value,
        localidad: document.getElementById("localidad").value,
        provincia: document.getElementById("provincia").value,
        pais: document.getElementById("pais").value
    };
    //chequear para el nuevo usuario
    altaOk = false;
    // que no exista otro igual en la base de datos (a implementar con BD)
    // que el usuario confirme su alta desde un mail enviado a su casilla de correo 

    // que la contraseña sea igual a su reingreso    
    let clavesIguales = perfil.passw == document.getElementById("npasswc").value ? true : alert("Las claves no coinciden");
    // que la contraseña cumpla con los parámetros mínimos
    let claveOk = (perfil.passw.length > 3) && !isNaN(perfil.passw) ? true : alert("la clave debe ser numérica de al menos 4 dígitos");
    // que sea mayor de edad
    let edadOk = false
    let arrNac = nac.value.split("-");
    let hoy = new Date();
    let edadAnios = hoy.getFullYear() - arrNac[0];
    let edadMeses = hoy.getMonth() - arrNac[1];
    let edadDias = hoy.getDate() - arrNac[2];
    if (edadDias > -1) {
        edadMeses++;
    };
    if (edadMeses < 0) {
        edadAnios--;
    };
    if (edadAnios > 17) {
        edadOk = true;
    } else{
        alert("Debe ser mayor de edad para registrarse");
    }

    //que sea un mail válido
    let validaEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let mailOk = validaEmail.test(perfil.em) && perfil.em.includes("@") && perfil.em.includes(".")? true:alert("introduzca una dirección de mail válida");

    // si todos los datos son correctos --> grabar desde funcion utilizando localStorage provisoriamente
    altaOk = clavesIguales && claveOk && edadOk && mailOk;
    if (altaOk == true) {
        altaNuevoUsuario(perfil);
    }else{
        alert("Por favor, complete correctamente el formulario");
    }
}
function altaNuevoUsuario(perfil) {
    // utiliza provisoriamente localStorage
    localStorage.setItem("usuario", JSON.stringify(perfil));
    alert(perfil.nombre + ", ya tienes tu cuenta registrada");
}


