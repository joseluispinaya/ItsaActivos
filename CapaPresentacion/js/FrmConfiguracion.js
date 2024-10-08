

var table;
var tablec;
var tableg;
$(document).ready(function () {
    cargarItems();
    cargarCarreras();
    $("#cboEstado").prop("disabled", true);
    $("#cboEstadoC").prop("disabled", true);
})

function cargarItems() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbItem")) {
        // Destruir el DataTable existente
        $("#tbItem").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbItem tbody').empty();
    }

    table = $("#tbItem").DataTable({
        responsive: true,
        "ajax": {
            "url": 'FrmConfiguracion.aspx/ObtenerItems',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdItem", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            { "data": "FechaRegistro" },
            {
                "data": "Activo", render: function (data) {
                    if (data == true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                                  '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
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
                filename: 'Informe Items',
                exportOptions: {
                    columns: [1, 2, 3] // Ajusta según las columnas que desees exportar
                }
            }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbItem tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    console.log(model);
    $("#txtIdItem").val(model.IdItem);
    $("#txtDescripcion").val(model.Descripcion);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
})

function registerDataItem() {

    var request = {
        eItem: {
            IdItem: parseInt($("#txtIdItem").val()),
            Descripcion: $("#txtDescripcion").val()
        }
    }

    $.ajax({
        type: "POST",
        url: "FrmConfiguracion.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadRe").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadRe").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarItems();

                $("#txtIdItem").val("0");
                $("#txtDescripcion").val("");

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadRe").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function editarDataItem() {

    var request = {
        eItem: {
            IdItem: parseInt($("#txtIdItem").val()),
            Descripcion: $("#txtDescripcion").val(),
            Activo: ($("#cboEstado").val() == "1" ? true : false)
        }
    }

    $.ajax({
        type: "POST",
        url: "FrmConfiguracion.aspx/Actualizar",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadRe").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadRe").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarItems();

                $("#txtIdItem").val("0");
                $("#txtDescripcion").val("");
                $("#cboEstado").val('1');
                $("#cboEstado").prop("disabled", true);

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadRe").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


$('#btnGuardarItem').on('click', function () {

    if ($("#txtDescripcion").val().trim() == "") {
        toastr.warning("", "Debe completar el campo Descripcion");
        $("#txtDescripcion").focus();
        return;
    }

    if (parseInt($("#txtIdItem").val()) === 0) {
        registerDataItem();
    } else {
        editarDataItem();
    }
})

//funciones para carrera
function cargarCarreras() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbCarrer")) {
        // Destruir el DataTable existente
        $("#tbCarrer").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbCarrer tbody').empty();
    }

    tablec = $("#tbCarrer").DataTable({
        responsive: true,
        "ajax": {
            "url": 'FrmConfiguracion.aspx/ObtenerCarreras',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdCarrera", "visible": false, "searchable": false },
            { "data": "Descripcion" },
            { "data": "FechaRegistro" },
            {
                "data": "Activo", render: function (data) {
                    if (data == true)
                        return '<span class="badge badge-primary">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
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
                filename: 'Informe Carreras',
                exportOptions: {
                    columns: [1, 2, 3] // Ajusta según las columnas que desees exportar
                }
            }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$("#tbCarrer tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = tablec.row(filaSeleccionada).data();
    //console.log(model);
    $("#txtIdCarrera").val(model.IdCarrera);
    $("#txtDescripcionC").val(model.Descripcion);
    $("#cboEstadoC").val(model.Activo == true ? 1 : 0);
    $("#cboEstadoC").prop("disabled", false);
})

function registerDataCarrera() {

    var request = {
        eCarrera: {
            IdCarrera: parseInt($("#txtIdCarrera").val()),
            Descripcion: $("#txtDescripcionC").val()
        }
    }

    $.ajax({
        type: "POST",
        url: "FrmConfiguracion.aspx/RegistrarCarrera",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadReC").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadReC").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarCarreras();

                $("#txtIdCarrera").val("0");
                $("#txtDescripcionC").val("");

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadReC").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function editarDataCarrera() {

    var request = {
        eCarrera: {
            IdCarrera: parseInt($("#txtIdCarrera").val()),
            Descripcion: $("#txtDescripcionC").val(),
            Activo: ($("#cboEstadoC").val() == "1" ? true : false)
        }
    }

    $.ajax({
        type: "POST",
        url: "FrmConfiguracion.aspx/ActualizarCarrera",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $("#loadReC").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadReC").LoadingOverlay("hide");
            if (response.d.Estado) {
                cargarCarreras();

                $("#txtIdCarrera").val("0");
                $("#txtDescripcionC").val("");
                $("#cboEstadoC").val('1');
                $("#cboEstadoC").prop("disabled", true);

                swal("Mensaje", response.d.Mensaje, "success");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadReC").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

$('#btnGuardarCarrera').on('click', function () {

    if ($("#txtDescripcionC").val().trim() == "") {
        toastr.warning("", "Debe completar el campo Descripcion");
        $("#txtDescripcion").focus();
        return;
    }

    if (parseInt($("#txtIdCarrera").val()) === 0) {
        registerDataCarrera();
    } else {
        editarDataCarrera();
    }
})
