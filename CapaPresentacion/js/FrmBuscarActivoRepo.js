

let opcion = false;

$(document).ready(function () {

    $("#btnImpr").hide();
    $("#btnDesac").hide();

})

$('#btnbuscar').on('click', function () {


    if ($("#txtcodigoac").val().trim() == "") {
        swal("Mensaje", "Ingrese un codigo para buscar el activo", "warning");
        return;
    }
    buscarDatosActivo();
})

function buscarDatosActivo() {

    var request = {
        Codigoa: $("#txtcodigoac").val().trim()
    };

    $.ajax({
        type: "POST",
        url: "FrmBuscarActivoRepo.aspx/DetalleActivoCodigo",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                var activo = response.d.Data;
                //console.log(activo);

                //$("#codi").text("Nro: " + activo.Codigo);
                $("#txtIdActivo").val(activo.IdActivo);
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

                $("#btnDesac").show();
                $("#btnImpr").show();

                opcion = activo.Activo;

                // Cambiar el texto del botón basado en el estado de 'opcion'
                if (opcion) {
                    $("#btnDesac").text("Suspender el Activo");
                } else {
                    $("#btnDesac").text("Reactivar el Activo");
                }

                var estado = activo.Activo ? 'El Activo esta Habilitado' : 'El Activo esta Suspendido';  // Manejo del bool Estado

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


            } else {
                swal("oops!", "No se encontro el Activo", "warning")
            }
        }
    });
}

$('#btnImpr').on('click', function () {
    var idAct = parseInt($("#txtIdActivo").val());

    if (idAct === 0) {
        swal("Mensaje", "Ingrese un codigo para Imprimir el activo", "warning");
        return;
    }
    var url = 'DocActivo.aspx?id=' + idAct;

    $("#overlayc").LoadingOverlay("show");
    var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

    var timer = setInterval(function () {
        if (popup.closed) {
            clearInterval(timer);
            $("#overlayc").LoadingOverlay("hide");
        }
    }, 500);

})

$('#btnDesac').on('click', function () {
    var idAct = parseInt($("#txtIdActivo").val());

    if (idAct === 0) {
        swal("Mensaje", "Ingrese un codigo para dar de baja el activo", "warning");
        return;
    }
    //$("#txtact").text(activo.Descripcion);
    var act = $("#txtact").text();
    swal({
        title: "Mensaje de Confirmacion",
        text: "¿Desea dar de baja el activo: " + act,
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },

        function (respuesta) {
            if (respuesta) {
                $(".showSweetAlert").LoadingOverlay("show");
                var request = {
                    IdActivo: parseInt($("#txtIdActivo").val()),
                    Estado: !opcion
                };
                $.ajax({
                    type: "POST",
                    url: "FrmBuscarActivoRepo.aspx/CambiarEstadoActivo",
                    data: JSON.stringify(request),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                    },
                    success: function (response) {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        if (response.d.Estado) {
                            buscarDatosActivo();
                            swal("Mensaje", response.d.Mensaje, "success");
                        } else {
                            swal("Mensaje", response.d.Mensaje, "error");
                        }

                    }
                });
                //swal("Mensaje", "El activo Fue dado de baja", "success");
                //registerDataAjaxP();
            }

        });

})