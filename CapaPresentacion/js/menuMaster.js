
$(document).ready(function () {
    // Validar si existen tanto el token como el usuario en sessionStorage
    const tokenSesion = sessionStorage.getItem('tokenSesionsti');
    const usuarioL = sessionStorage.getItem('usuarioSt');

    if (tokenSesion && usuarioL) {
        // Parsear el usuario almacenado
        var usuParaenviar = JSON.parse(usuarioL);
        var idUsu = usuParaenviar.IdUsuario; // Obtener IdUsuario

        // Llamar a obtenerDetalleUsuarioR pasando el IdUsuario
        oBtenerDetalleUsuario(idUsu);
    } else {
        // Si no hay sesión, redirigir al login
        window.location.href = 'IniciarSesion.aspx';
    }

    //obtenerDetalleUsuarioR();
});
async function oBtenerDetalleUsuario(idUsu) {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "Inicio.aspx/ObtenerToken",
            data: JSON.stringify({ IdUsu: idUsu }), // Puedes dejarlo como JSON vacío
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });

        if (response.d.Estado) {
            const tokenSession = sessionStorage.getItem('tokenSesionsti');
            if (tokenSession !== response.d.Valor) {
                await cerrarSesion(); // Llama a la función para cerrar sesión
            } else {
                // Actualiza la información del usuario en la interfaz nuevo
                const usuarioL = sessionStorage.getItem('usuarioSt');

                if (usuarioL) {
                    var usuario = JSON.parse(usuarioL);

                    $("#nombreusuariome").append(usuario.Apellidos);
                    $("#rolnomme").text(usuario.Orol.Descripcion);
                    $("#imgUsuarioMe").attr("src", usuario.ImageFull);
                    $("#imageUserMe").attr("src", usuario.ImageFull);
                    $("#rolusuariome").append(usuario.Orol.Descripcion);
                    if (usuario.IdRol === 1) {
                        $(".adminic").show();
                    } else {
                        $(".adminic").hide();
                    }
                } else {
                    console.error('No se encontró información del usuario en sessionStorage.');
                    window.location.href = 'IniciarSesion.aspx'; // Redirigir si no hay usuario válido
                }
            }
        } else {
            window.location.href = 'IniciarSesion.aspx';
        }
    } catch (error) {
        // Manejo de error de la llamada AJAX
        console.error('Error al obtener los datos del usuario:', error);
        window.location.href = 'IniciarSesion.aspx'; // Redirigir si hay error grave
    }
}

$(document).on('click', '#close', async function (e) {
    e.preventDefault(); // Evitar comportamiento predeterminado de un enlace

    // Llamar a la función de cerrar sesión
    await cerrarSesion();
});


async function cerrarSesion() {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "Inicio.aspx/CerrarSesion",
            contentType: 'application/json; charset=utf-8',
            dataType: "json"
        });

        if (response.d.Estado) {
            sessionStorage.clear(); // Limpia el almacenamiento de sesión
            window.location.replace('Default.aspx'); // Redirige al login
        }
    } catch (error) {
        console.error('Error al cerrar la sesión:', error);
    }
}