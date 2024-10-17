


$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const IdActivo = urlParams.get('id')

    if (IdActivo !== null) {
        CargarDatosActivo(IdActivo);
    } else {
        alert("No hay parámetro recibido. El formulario se cerrará.");
        window.close();
    }

    //const IdActivo = 2;
    //CargarDatosActivo(IdActivo);
});

function CargarDatosActivo($IdActivo) {
    $('#tbproductos tbody').html(''); // Limpiamos la tabla de productos antes de agregar datos

    var request = {
        IdActivo: $IdActivo
    };

    $.ajax({
        type: "POST",
        url: "FrmActivo.aspx/DetalleActivo",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                var activo = response.d.Data;
                console.log(activo);

                $("#codi").text("Nro: " + activo.Codigo);
                $("#txtitem").text(activo.Item.Descripcion);
                $("#txtact").text(activo.Descripcion);
                $("#txtcarre").text(activo.Carrera.Descripcion);
                $("#txtgest").text(activo.Gestion.Descripcion);
                //txtobs
                

                $("#txtrespo").text(activo.Responsable);
                $("#txtubic").text(activo.Ubicacion);
                $("#txtobse").text(activo.Observacion);
                $("#txtestafi").text(activo.EstadoFisico.Descripcion);

                $("#imgqr").attr("src", activo.CodBarra);
                $("#txtcaracte").text(activo.Caracteristicas);

                var estado = activo.Activo ? 'El Activo esta Habilitado' : 'El Activo esta Inhabilitado';  // Manejo del bool Estado

                var totalCosto = activo.Total;
                var preccio = activo.ValorActivo;

                var canti = activo.Cantidad;
                var unidad = canti > 1 ? "Uds" : "Ud";

                $("#txtacti").text(estado);
                //$("#txtcantii").text(activo.Cantidad);
                $("#txtcantii").text(canti + " " + unidad);
                //$("#txtpre").text(activo.ValorActivo);
                $("#txtpre").text(preccio.toFixed(2) + " /Bs.");
                $("#txttotl").text(totalCosto.toFixed(2) + " /Bs.");
                //$("#txttotl").text(activo.Total);

                var currentDate = new Date().toLocaleDateString();
                //txttofo
                $("#txtfech").text(currentDate);
                $("#txttofo").text(totalCosto.toFixed(2) + " /Bs.");
                

            } else {
                alert("Ocurrió un error. El formulario se cerrará.");
                window.close();
            }
        }
    });
}

function imprSelec(nombre) {
    var printContents = document.getElementById(nombre).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
function hide() {
    document.getElementById('Imprimir').style.visibility = "hidden";
}

window.addEventListener('beforeunload', function (e) {
    var confirmationMessage = '¿Seguro que quieres salir?';

    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
});

window.addEventListener('unload', function (e) {
    setTimeout(function () {
        window.close();
    }, 3000);
});

function CargarDatosActivoOri($IdActivo) {
    $('#tbproductos tbody').html(''); // Limpiamos la tabla de productos antes de agregar datos

    var request = {
        IdActivo: $IdActivo
    };

    $.ajax({
        type: "POST",
        url: "FrmActivo.aspx/DetalleActivo",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                var activo = response.d.Data;
                console.log(activo);
                // Actualizar el código del activo en el <td> correcto
                $('p.title2').closest('table').find('tr:nth-child(2) td').text(activo.Codigo);

                // Insertar los valores dinámicos en los <p class="text">
                // Columna izquierda
                //$('p.title:contains("Descripcion")').closest('td').next().find('p.text').text(activo.Item.Descripcion);
                //$('p.title:contains("Activo")').closest('td').next().find('p.text').text(activo.Descripcion);
                //$('p.title:contains("Carrera")').closest('td').next().find('p.text').text(activo.Carrera.Descripcion);
                //$('p.title:contains("Gestion")').closest('td').next().find('p.text').text(activo.Gestion.Descripcion);

                // Columna izquierda
                var descripcionActivo = activo.Item.Descripcion || '';
                var descripcionActivoGeneral = activo.Descripcion || '';
                var carreraDescripcion = activo.Carrera.Descripcion || '';
                var gestionDescripcion = activo.Gestion.Descripcion || '';

                var columnaIzquierda = $('table:eq(0) td:eq(1)');  // Tabla de la columna izquierda
                columnaIzquierda.find('p.text:eq(0)').text(descripcionActivo);  // Descripción
                columnaIzquierda.find('p.text:eq(1)').text(descripcionActivoGeneral);  // Activo
                columnaIzquierda.find('p.text:eq(2)').text(carreraDescripcion);  // Carrera
                columnaIzquierda.find('p.text:eq(3)').text(gestionDescripcion);  // Gestión


                // Columna derecha
                //$('p.title:contains("Responsable")').closest('td').next().find('p.text').text(activo.Responsable);
                //$('p.title:contains("Ubicacion")').closest('td').next().find('p.text').text(activo.Ubicacion);
                //$('p.title:contains("Observacion")').closest('td').next().find('p.text').text(activo.Observacion);
                //$('p.title:contains("Estado")').closest('td').next().find('p.text').text(activo.EstadoFisico.Descripcion);

                // Columna derecha
                var responsable = activo.Responsable || '';
                var ubicacion = activo.Ubicacion || '';
                var observacion = activo.Observacion || '';
                var estadoFisico = activo.EstadoFisico.Descripcion || '';

                var columnaDerecha = $('table:eq(2) td:eq(1)');  // Tabla de la columna derecha
                columnaDerecha.find('p.text:eq(0)').text(responsable);  // Responsable
                columnaDerecha.find('p.text:eq(1)').text(ubicacion);  // Ubicación
                columnaDerecha.find('p.text:eq(2)').text(observacion);  // Observación
                columnaDerecha.find('p.text:eq(3)').text(estadoFisico);  // Estado

                // Código QR
                $('img[src="Imagenes/sinimagen.png"][style="width: 100px; height: 100px"]').attr('src', activo.CodBarra);

                // Características del activo
                $('p.title:contains("CARACTERISTICAS ACTIVO")').closest('td').next().find('p.text').text(activo.Caracteristicas);

                // Llenar la tabla de productos (primera fila)
                var estado = activo.Activo ? 'Habilitado' : 'Inhabilitado';  // Manejo del bool Estado
                var cantidad = activo.Cantidad || '';
                var precio = activo.ValorActivo || '';
                var total = activo.Total || '';

                // Reemplazar en la primera fila de productos
                var primeraFila = $('.tbproductos tbody tr:first-child');
                primeraFila.find('.td-item:eq(0) p').text(estado);  // Estado
                primeraFila.find('.td-item:eq(1) p').text(cantidad);  // Cantidad
                primeraFila.find('.td-item:eq(2) p').text(precio);  // Precio
                primeraFila.find('.td-item:eq(3) p').text(total);  // Total (fondo color #EDF6F9)

                // Agregar la fecha actual en la fila de "Fecha actual"
                var currentDate = new Date().toLocaleDateString();
                $('.item-3:contains("poner fecha actual")').text(currentDate);

                // Llenar el valor del total en la última fila
                var totalFinal = activo.Total || '';
                $('.item-3:last-child p').text(totalFinal);  // Total en la última celda

            } else {
                alert("Ocurrió un error. El formulario se cerrará.");
                window.close();
            }
        }
    });
}