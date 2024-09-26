
var table;

$(document).ready(function () {
    cargarGestiones();
    cargarCarreras();

})
function cargarGestiones() {
    $("#cboGestionR").html("");

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
                        $("<option>").attr({ "value": row.IdGestion }).text(row.Descripcion).appendTo("#cboGestionR");
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

function cargarDatosReporte() {
    var request = {
        IdGestion: $("#cboGestionR").val(),
        IdCarrera: $("#txtIdCarrera").val()
    };

    $.ajax({
        type: "POST",
        url: "FrmConsultaActivo.aspx/ObtenerActivosItem",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                var asociaciones = data.d.Data;
                var container = $('#home-2 .col-sm-12'); // Selecciona el contenedor donde se añadirá el contenido

                // Crear el contenido HTML dinámicamente
                var sectionHtml = ''; // Inicializa la variable que contendrá el HTML

                asociaciones.forEach(function (asociacion) {
                    sectionHtml += `
                        <div class="header" style="padding-top: 10px;">
                            <table style="width: 100%; margin-bottom: 10px;" border="0">
                                <tr>
                                    <td style="border-top:1px solid #000; border-left:1px solid #000;" align="left"><strong>FECHA EMISION:</strong></td>
                                    <td style="border-top:1px solid #000; border-left:1px solid #000;" align="left"><strong>DETALLE ITEM:</strong></td>
                                    <td style="border-top:1px solid #000; border-left:1px solid #000; border-right:1px solid #000;" align="left"><strong>FECHA REGISTRO:</strong></td>
                                </tr>
                                <tr>
                                    <td style="border-bottom:1px solid #000; border-left:1px solid #000;" align="center"><span>${new Date().toLocaleDateString()}</span></td>
                                    <td style="border-bottom:1px solid #000; border-left:1px solid #000;" align="center"><span>${asociacion.Descripcion}</span></td>
                                    <td style="border-bottom:1px solid #000; border-left:1px solid #000; border-right:1px solid #000;" align="center"><span>${asociacion.FechaRegistro}</span></td>
                                </tr>
                            </table>
                        </div>
                    `;

                    if (asociacion.ListaActivos.length > 0) {
                        sectionHtml += `
                            <div class="sectionz">LISTA DE ACTIVOS POR ITEM</div>
                            <div class="table-responsive">
                                <table class="table" style="margin-bottom: 30px;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: left;">Codigo</th>
                                            <th style="text-align: left;">Cantidad</th>
                                            <th style="text-align: left;">Descripcion</th>
                                            <th style="text-align: left;">Valor</th>
                                            <th style="text-align: left;">Estado Fisico</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${asociacion.ListaActivos.map(pcd => `
                                            <tr>
                                                <td>${pcd.Codigo}</td>
                                                <td>${pcd.Cantidad}</td>
                                                <td>${pcd.Descripcion}</td>
                                                <td>${pcd.ValorActivo}</td>
                                                <td>${pcd.EstadoFisico.Descripcion}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `;
                    } else {
                        sectionHtml += `
                            <div class="sectionz">EL ITEM NO TIENE ACTIVOS</div>
                        `;
                    }
                });

                // Reemplazar el contenido del contenedor con el nuevo HTML generado
                container.html(sectionHtml);
            }
        }
    });
}

$('#btnBuscarR').on('click', function () {

    if (parseInt($("#txtIdCarrera").val()) === 0) {
        swal("Mensaje", "Error debe seleccionar una Carrera", "warning")
            .then(() => {
                // Hacer focus en el select2
                $('#cboBuscarCarrera').select2('open'); // Abre el dropdown de Select2
            });
        return;
    }

    var cbge = $("#cboGestionR").val();
    var idcare = $("#txtIdCarrera").val();
    cargarDatosReporte();
    //swal("Mensaje", "IdGes: " + cbge + " IdCarrera: " + idcare, "success");
})