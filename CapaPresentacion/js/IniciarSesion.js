
$(document).ready(function () {

    show();
})



function show() {
    //document.getElementById('cap').innerHTML = "dwggwu";
    let character = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    let com = '';
    for (let i = 0; i < 6; i++) {
        let store = character.charAt(Math.floor(Math.random() * character.length));
        com = com + store;
        //com += store;
    }
    $("#muestracapchap").text(com);
    //document.getElementById('cap').innerHTML = com;
}

//$("#txtIdUsuario").text(modelo.IdUsuario);


$('#btnIniciarSesion').on('click', function () {

    var captchaCode = $("#capcha").val().trim(); // Elimina espacios adicionales.
    var captchaGenerado = $("#muestracapchap").text().trim();

    if ($("#username").val().trim() === "" || $("#password").val().trim() === "") {
        swal("Mensaje", "Debe Ingrese un Correo y Contraseña", "warning");
        return;
    }

    //if (captchaCode === "") {
    //    swal("Mensaje", "Debe ingresar el CAPTCHA", "warning");
    //    return;
    //}

    //if (captchaGenerado === captchaCode) {
    //    loginUsuarioLoad();
    //} else {
    //    show();
    //    swal("Mensaje", "CAPTCHA incorrecto, intente nuevamente", "warning");
    //}

    loginUsuarioLoad();
})

function loginUsuarioLoad() {

    $.ajax({
        type: "POST",
        url: "IniciarSesion.aspx/Iniciar",
        data: JSON.stringify({ Usuario: $("#username").val().trim(), Clave: $("#password").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {

            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {

                sessionStorage.setItem('tokenSesionsti', response.d.Valor);
                // Almacenar el objeto usuario completo en sessionStorage
                sessionStorage.setItem('usuarioSt', JSON.stringify(response.d.Data));
                $("#username").val("");
                $("#password").val("");
                window.location.href = 'Inicio.aspx';
            } else {
                swal("Mensaje!", "No se encontro el usuario verifique correo y contraseña", "warning")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}