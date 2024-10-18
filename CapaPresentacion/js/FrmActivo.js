
var table;

const MODELO_BASE = {
    IdActivo: 0,
    IdGestion: 0,
    IdCarrera: 0,
    IdEstado: 0,
    IdItem: 0,
    Cantidad: 0,
    Descripcion: "",
    Caracteristicas: "",
    ValorActivo: 0.0, // Inicializado como float
    Responsable: "",
    Ubicacion: "",
    Observacion: "",
    Total: 0.0,
    Activo: true
}

function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {

    $("#btnNuevoReg").hide();
    //$("#txtFechaRegis").val(ObtenerFecha());
    cargarGestiones();
    cargarItems();
    cargarCarreras();
    cargarEstadosFisi();
    //$("#cboEstadoA").prop("disabled", true);

})

function dtListaActivosId() {
    if ($.fn.DataTable.isDataTable("#tbActivos")) {
        $("#tbActivos").DataTable().destroy();
        $('#tbActivos tbody').empty();
    }

    var request = {
        IdGestion: $("#cboGestion").val(),
        IdCarrera: $("#txtIdCarrera").val(),
        IdItem: $("#cboItem").val()
    };

    table = $("#tbActivos").DataTable({
        responsive: true,
        "ajax": {
            "url": 'FrmActivo.aspx/ObtenerActivosTresId',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdActivo", "visible": false, "searchable": false },
            { "data": "Gestion.Descripcion" },
            {
                "data": "Activo", render: function (data) {
                    if (data == true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            { "data": "Codigo" },
            { "data": "Cantidad" },
            { "data": "Descripcion" },
            { "data": "ValorActivo" },
            { "data": "EstadoFisico.Descripcion" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                                  '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "Bfrtip",
        "buttons": [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Informe Activos',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7] // Ajusta según las columnas que desees exportar
                }
            }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbActivos tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const modelo = table.row(filaSeleccionada).data();

    $("#txtIdActivo").val(modelo.IdActivo);
    //$("#cboGestion").val(modelo.IdGestion);
    //$("#txtIdCarrera").val(modelo.IdCarrera);
    //$("#txtNombreCarrera").val(modelo.Carrera.Descripcion);
    $("#cboestadofi").val(modelo.IdEstado);
    //$("#cboItem").val(modelo.IdItem);
    $("#txtcantidad").val(modelo.Cantidad);
    $("#txtDescripcion").val(modelo.Descripcion);
    $("#txtCaracteristicas").val(modelo.Caracteristicas);
    $("#txtvalorAct").val(modelo.ValorActivo);
    $("#txtResponsable").val(modelo.Responsable);
    $("#txtUbicacion").val(modelo.Ubicacion);
    $("#txtObservacion").val(modelo.Observacion);
    $("#txtTotal").val(modelo.Total);

    $("#cboEstadoA").val(modelo.Activo ? 1 : 0); // Ya es booleano, no necesitas `== true`
    $("#cboEstadoA").prop("disabled", false);

    $("#myLargeModalLabel").text("Editar Activo");

    $("#modalActivo").modal("show");
})

$("#tbActivos tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const modelo = table.row(filaSeleccionada).data();
    var url = 'DocActivo.aspx?id=' + modelo.IdActivo;

    $("#overlayc").LoadingOverlay("show");
    var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

    var timer = setInterval(function () {
        if (popup.closed) {
            clearInterval(timer);
            $("#overlayc").LoadingOverlay("hide");
        }
    }, 500);
})

function cargarGestiones() {
    $("#cboGestion").html("");

    $.ajax({
        type: "POST",
        url: "FrmActivo.aspx/ObtenerGestion",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                $.each(data.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdGestion }).text(row.Descripcion).appendTo("#cboGestion");
                    }

                })
            }

        }
    });
}

function cargarItems() {
    $("#cboItem").html("");

    $.ajax({
        type: "POST",
        url: "FrmActivo.aspx/ObtenerItems",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                $.each(data.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdItem }).text(row.Descripcion).appendTo("#cboItem");
                    }

                })
            }

        }
    });
}

function cargarEstadosFisi() {
    $("#cboestadofi").html("");

    $.ajax({
        type: "POST",
        url: "FrmActivo.aspx/ObtenerEstadosFisi",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                $.each(data.d.Data, function (i, row) {
                    if (row.Activo === true) {
                        $("<option>").attr({ "value": row.IdEstado }).text(row.Descripcion).appendTo("#cboestadofi");
                    }

                })
            }

        }
    });
}

function cargarCarreras() {

    $("#cboBuscarCarrera").select2({
        ajax: {
            url: "FrmActivo.aspx/BuscarCarrera",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ buscar: params.term });
            },
            processResults: function (data) {

                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdCarrera,
                        text: item.Descripcion,
                        FechaRegistro: item.FechaRegistro,
                        carrera: item
                    }))
                };
            },
        },
        language: "es",
        placeholder: 'Buscar Carrera',
        minimumInputLength: 1,
        templateResult: formatoRes
    });
}

function formatoRes(data) {

    var imagenes = "Imagenes/itsass.jpg";
    // Esto es por defecto, ya que muestra el "buscando..."
    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${imagenes}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.text}</p>
                    <p style="margin:2px">${data.FechaRegistro}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}

$(document).on("select2:open", function () {
    document.querySelector(".select2-search__field").focus();

});

// Evento para manejar la selección del cliente
$("#cboBuscarCarrera").on("select2:select", function (e) {

    var data = e.params.data.carrera;
    $("#txtIdCarrera").val(data.IdCarrera);
    $("#txtNombreCarrera").val(data.Descripcion);

    //dtListaActivosId();
    $("#cboBuscarCarrera").val("").trigger("change")
    //console.log(data);
});


$('#btnVerInfo').on('click', function () {
    

    if (parseInt($("#txtIdCarrera").val()) === 0) {
        swal("Mensaje", "Error debe seleccionar una Carrera", "warning")
            .then(() => {
                // Hacer focus en el select2
                $('#cboBuscarCarrera').select2('open'); // Abre el dropdown de Select2
            });
        return;
    }

    var cbge = $("#cboGestion").val();
    var cbItem = $("#cboItem").val();
    var idcare = $("#txtIdCarrera").val();

    $("#btnNuevoReg").show();
    dtListaActivosId();
    //swal("Mensaje", "IdGes: " + cbge + " IdItem: " + cbItem + " IdCarrera: " + idcare, "success");
    //$("#modalTransa").modal("show");
})
$('#btnNuevoReg').on('click', function () {
    
    if (parseInt($("#txtIdCarrera").val()) === 0) {
        swal("Mensaje", "Error debe seleccionar una Carrera", "warning")
            .then(() => {
                // Hacer focus en el select2
                $('#cboBuscarCarrera').select2('open'); // Abre el dropdown de Select2
            });
        return;
    }
    var cbge = $('#cboGestion option:selected').text();
    var cbItem = $('#cboItem option:selected').text();
    var idcare = $("#txtNombreCarrera").val();
    //swal("Mensaje", "Ges: " + cbge + " Item: " + cbItem + " Carrera: " + idcare, "success");

    $("#txtIdActivo").val("0");
    //$("#txtIdCarrera").val("0");
    //$("#txtIdGestion").val("0");
    //$("#txtNombreCarrera").val("");
    $("#txtcantidad").val("0");
    $("#txtvalorAct").val("0");
    $("#txtTotal").val("0");
    $("#txtResponsable").val("");
    $("#txtUbicacion").val("");
    $("#txtDescripcion").val("");
    $("#txtObservacion").val("");
    $("#txtCaracteristicas").val("");
    //$("select#cboGestion").prop('selectedIndex', 0);
    //$("select#cboItem").prop('selectedIndex', 0);
    $("select#cboestadofi").prop('selectedIndex', 0);

    $("#cboEstadoA").val('1');
    $("#cboEstadoA").prop("disabled", true);

    $("#myLargeModalLabel").text("Registrar Activo");

    $("#modalActivo").modal("show");
})

function dataRegistrar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdActivo"] = parseInt($("#txtIdActivo").val());
    modelo["IdGestion"] = $("#cboGestion").val();
    modelo["IdCarrera"] = $("#txtIdCarrera").val();
    modelo["IdEstado"] = $("#cboestadofi").val();
    modelo["IdItem"] = $("#cboItem").val();

    modelo["Cantidad"] = $("#txtcantidad").val();
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Caracteristicas"] = $("#txtCaracteristicas").val();
    modelo["ValorActivo"] = parseFloat($("#txtvalorAct").val());
    modelo["Responsable"] = $("#txtResponsable").val();
    modelo["Ubicacion"] = $("#txtUbicacion").val();
    modelo["Observacion"] = $("#txtObservacion").val();
    modelo["Total"] = parseFloat($("#txtTotal").val());

    var request = {
        oActivo: modelo
    };

    $.ajax({
        type: "POST",
        url: "FrmActivo.aspx/GuardarNuevo",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                dtListaActivosId();
                $('#modalActivo').modal('hide');

                var url = 'DocActivo.aspx?id=' + response.d.Valor;

                $("#overlayc").LoadingOverlay("show");
                var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

                var timer = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(timer);
                        $("#overlayc").LoadingOverlay("hide");
                    }
                }, 500);

                //swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarCambiosA').prop('disabled', false);
            //$("#btnNuevoReg").hide();
        }
    });
}

function dataActualizarA() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdActivo"] = parseInt($("#txtIdActivo").val());
    modelo["IdGestion"] = $("#cboGestion").val();
    modelo["IdCarrera"] = $("#txtIdCarrera").val();
    modelo["IdEstado"] = $("#cboestadofi").val();
    modelo["IdItem"] = $("#cboItem").val();

    modelo["Cantidad"] = $("#txtcantidad").val();
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Caracteristicas"] = $("#txtCaracteristicas").val();
    modelo["ValorActivo"] = parseFloat($("#txtvalorAct").val());
    modelo["Responsable"] = $("#txtResponsable").val();
    modelo["Ubicacion"] = $("#txtUbicacion").val();
    modelo["Observacion"] = $("#txtObservacion").val();
    modelo["Total"] = parseFloat($("#txtTotal").val());
    modelo["Activo"] = ($("#cboEstadoA").val() == "1" ? true : false);

    var request = {
        oActivo: modelo
    };

    $.ajax({
        type: "POST",
        url: "FrmActivo.aspx/ActualizarActivo",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-content").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-content").LoadingOverlay("hide");
            if (response.d.Estado) {
                dtListaActivosId();
                $('#modalActivo').modal('hide');

                var url = 'DocActivo.aspx?id=' + response.d.Valor;

                $("#overlayc").LoadingOverlay("show");
                var popup = window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');

                var timer = setInterval(function () {
                    if (popup.closed) {
                        clearInterval(timer);
                        $("#overlayc").LoadingOverlay("hide");
                    }
                }, 500);

                //swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnGuardarCambiosA').prop('disabled', false);
            //$("#btnNuevoReg").hide();
        }
    });
}

$('#btnGuardarCambiosA').on('click', function () {

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnGuardarCambiosA').prop('disabled', true);

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()

        // Rehabilitar el botón si hay campos vacíos
        $('#btnGuardarCambiosA').prop('disabled', false);
        return;
    }
    

    if ($("#txtCaracteristicas").val().trim() === "") {
        toastr.warning("", "Debe completar el campo Caracteristica");
        $("#txtCaracteristicas").focus();
        $('#btnGuardarCambiosA').prop('disabled', false);
        return;
    }

    //var cantidadA = parseFloat($("#txtcantidad").val().trim());
    var cantidadA = parseInt($("#txtcantidad").val().trim());
    if (isNaN(cantidadA) || cantidadA === 0) {
        toastr.warning("", "Debe ingresar una cantidad válida");
        $("#txtcantidad").focus();
        $('#btnGuardarCambiosA').prop('disabled', false);
        return;
    }

    if (parseInt($("#txtIdActivo").val()) === 0) {
        dataRegistrar();
    } else {
        dataActualizarA();
        //swal("Mensaje", "Falta Implementar", "warning");
        // Rehabilitar el botón si hay campos vacíos
        //$('#btnGuardarCambiosA').prop('disabled', false);
    }
})