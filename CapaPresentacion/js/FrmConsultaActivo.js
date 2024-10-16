﻿
var table;

let jsPDFInstance; // Variable global para jsPDF

$(document).ready(function () {
    const { jsPDF } = window.jspdf;

    if (typeof jsPDF !== 'undefined') {
        jsPDFInstance = jsPDF; // Guarda la referencia de jsPDF
        //var doc = new jsPDF({
        //    orientation: 'landscape',
        //    unit: 'mm',
        //    format: 'a4'
        //});
        cargarGestiones();
        cargarGestionesDoss();
        cargarCarreras();
        cargarCarrerasDos();
        cargarItemsa();
    } else {
        console.error("jsPDF no está cargado.");
    }
});

//$(document).ready(function () {
//    var doc = new jsPDF({
//        orientation: 'landscape',
//        unit: 'mm',
//        format: 'a4'
//    });
//    cargarGestiones();
//    cargarCarreras();
//    cargarCarrerasDos();

//})

function cargarGestionesDoss() {
    $("#cboGestionGene").html("");

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
                        $("<option>").attr({ "value": row.IdGestion }).text(row.Descripcion).appendTo("#cboGestionGene");
                    }

                })
            }

        }
    });
}

function cargarItemsa() {
    $("#cboItemGen").html("");

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
                        $("<option>").attr({ "value": row.IdItem }).text(row.Descripcion).appendTo("#cboItemGen");
                    }

                })
            }

        }
    });
}
function cargarGestionesN(selectId) {
    $("#" + selectId).html("");

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
                    $("<option>").attr({ "value": row.IdGestion }).text(row.Descripcion).appendTo("#" + selectId);
                });
            }
        }
    });
}

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


// para pestaña dos

function cargarCarrerasDos() {

    $("#cboBuscarCarreraNu").select2({
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
        templateResult: formatoResDos
    });
}

function formatoResDos(data) {

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

// Evento para manejar la selección del cliente
$("#cboBuscarCarreraNu").on("select2:select", function (e) {

    var data = e.params.data.carrera;
    $("#txtIdCarreraNu").val(data.IdCarrera);
    $("#txtNombreCarreraNu").val(data.Descripcion);

    //dtListaActivosId();
    $("#cboBuscarCarreraNu").val("").trigger("change")
    //console.log(data);
});

function cargarDatosReporteCarrera() {
    var request = {
        IdCarrera: $("#txtIdCarreraNu").val()
    };

    $.ajax({
        type: "POST",
        url: "FrmConsultaActivo.aspx/ObtenerActivosPorCarrera",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                var asociaciones = data.d.Data;
                // Selecciona el contenedor correcto
                //var container = $('#profile-2 .col-lg-12');
                var container = $('#datoss');

                // Crear el contenido HTML dinámicamente
                var sectionHtml = ''; // Inicializa la variable que contendrá el HTML

                asociaciones.forEach(function (asociacion) {
                    sectionHtml += `
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="card-title text-dark m-0">
                                            <strong>${asociacion.ListaActivos.length > 0 ? 'ACTIVOS DE ' + asociacion.Descripcion : 'SIN ACTIVOS DE ' + asociacion.Descripcion}</strong>
                                        </h5>
                                    </div>
                                    ${asociacion.ListaActivos.length > 0 ? `
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th><strong>Codigo</strong></th>
                                                        <th class="text-center"><strong>Cantidad</strong></th>
                                                        <th><strong>Descripcion</strong></th>
                                                        <th class="text-center"><strong>Valor</strong></th>
                                                        <th><strong>Estado Fisico</strong></th>
                                                        <th><strong>Responsable</strong></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    ${asociacion.ListaActivos.map(pcd => `
                                                        <tr>
                                                            <td>${pcd.Codigo}</td>
                                                            <td class="text-center">${pcd.Cantidad}</td>
                                                            <td>${pcd.Descripcion}</td>
                                                            <td class="text-center">${pcd.ValorActivo}</td>
                                                            <td>${pcd.EstadoFisico.Descripcion}</td>
                                                            <td>${pcd.Responsable}</td>
                                                        </tr>
                                                    `).join('')}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                });

                // Reemplazar el contenido del contenedor con el nuevo HTML generado
                container.html(sectionHtml);
            }
        }
    });
}

$('#btnConsultarM').on('click', function () {

    if (parseInt($("#txtIdCarreraNu").val()) === 0) {
        swal("Mensaje", "Error debe seleccionar una Carrera", "warning")
            .then(() => {
                // Hacer focus en el select2
                $('#cboBuscarCarreraNu').select2('open'); // Abre el dropdown de Select2
            });
        return;
    }
    
    var idcare = $("#txtIdCarreraNu").val();
    cargarDatosReporteCarrera();
    //swal("Mensaje", "IdGes: " + cbge + " IdCarrera: " + idcare, "success");
})

//$('#btnImprimiM').on('click', function () {


//    $('#ocultar').hide();
//    $('#menuR').hide();
//    $('#logomenbre').show();
//    window.print();
//    $('#ocultar').show();
//    $('#menuR').show();
//    $('#logomenbre').hide();
//});


function cargarDatosReporteGesItem() {
    var request = {
        IdGestion: $("#cboGestionGene").val(),
        IdItem: $("#cboItemGen").val()
    };

    $.ajax({
        type: "POST",
        url: "FrmConsultaActivo.aspx/ObtenerActivosGestionyItem",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                var asociaciones = data.d.Data;
                var container = $('#message-2 .col-sm-12'); // Selecciona el contenedor donde se añadirá el contenido

                // Crear el contenido HTML dinámicamente
                var sectionHtml = ''; // Inicializa la variable que contendrá el HTML

                asociaciones.forEach(function (asociacion) {
                    sectionHtml += `
                        <div class="header" style="padding-top: 10px;">
                            <table style="width: 100%; margin-bottom: 10px;" border="0">
                                <tr>
                                    <td style="border-top:1px solid #000; border-left:1px solid #000;" align="left"><strong>FECHA EMISION:</strong></td>
                                    <td style="border-top:1px solid #000; border-left:1px solid #000;" align="left"><strong>CARRERA:</strong></td>
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
                            <div class="sectionz">LISTA DE ACTIVOS POR CARRERA</div>
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
                            <div class="sectionz">LA CARRERA NO TIENE ACTIVOS</div>
                        `;
                    }
                });

                // Reemplazar el contenido del contenedor con el nuevo HTML generado
                container.html(sectionHtml);
            }
        }
    });
}

$('#btnBuscarGe').on('click', function () {
    cargarDatosReporteGesItem();
    //swal("Mensaje", "IdGes: " + cbge + " IdCarrera: " + idcare, "success");
})

//generar pdf de la primera pestaña

// Función para convertir la imagen a base64
function getBase64Image(imgUrl, callback) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';  // Permite cargar imágenes de otras fuentes si es necesario
    img.src = imgUrl;

    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');  // Convierte a base64
        callback(dataURL);
    };
}

// Función para generar el PDF en orientación horizontal

function generarPDFHorizontal() {
    if (jsPDFInstance) {
        var imgUrl = "../Imagenes/membrete.png"; // Ruta de tu imagen
        var nomCarrera = $("#txtNombreCarrera").val();
        var gestionText = $('#cboGestionR option:selected').text();
        var tituloR = "REPORTE DE: " + nomCarrera + " GESTIÓN: " + gestionText;
        getBase64Image(imgUrl, function (base64Img) {
            // Llama a cargarDatosReporteIA para obtener los datos
            cargarDatosReporteIA(function (asociaciones) {
                const doc = new jsPDFInstance({
                    orientation: 'landscape',
                    unit: 'pt',
                    format: 'legal'
                });

                // Agrega la imagen de membrete
                doc.addImage(base64Img, 'PNG', 220, 28, 567, 57);

                // Agrega el título dinámico
                doc.setFontSize(14);  // Ajusta el tamaño del título
                doc.setFont("helvetica", "bold");  // Cambia la fuente y estilo si deseas
                doc.text(tituloR, doc.internal.pageSize.getWidth() / 2, 110, { align: "center" });

                //doc.text("Este es un PDF generado en orientación horizontal", 28, 113);
                // Posición Y inicial para las asociaciones, ajustada después del título
                //let currentY = 130;
                let currentY = 150; // Posición Y inicial

                // Itera sobre las asociaciones y agrégalas al PDF
                asociaciones.forEach(function (asociacion, index) {
                    const marginTop = 10;

                    // Agrega el texto de la asociación
                    doc.setFontSize(12);
                    doc.text(`Descripcion: ${asociacion.Descripcion}`, 40, currentY + marginTop);
                    doc.text(`Registrado: ${asociacion.FechaRegistro}`, 600, currentY + marginTop);

                    // Verifica si hay activos en la asociación
                    if (asociacion.ListaActivos.length > 0) {
                        doc.text('LISTA DE ACTIVOS POR ITEM:', 40, currentY + 30);

                        // Agrega la tabla con autoTable
                        doc.autoTable({
                            startY: currentY + 50,
                            head: [['Codigo', 'Cantidad', 'Descripcion', 'Valor', 'Responsable', 'Ubicacion', 'Estado Fisico', 'Total']],
                            body: asociacion.ListaActivos.map(pcd => [
                                pcd.Codigo,
                                pcd.Cantidad,
                                pcd.Descripcion,
                                pcd.ValorActivo,
                                pcd.Responsable,
                                pcd.Ubicacion,
                                pcd.EstadoFisico.Descripcion,
                                pcd.Total
                            ]),
                        });

                        // Actualiza la posición Y para la siguiente asociación
                        currentY = doc.autoTable.previous.finalY + 30; // Deja un margen después de la tabla
                    } else {
                        doc.text('EL ITEM NO TIENE ACTIVOS.', 40, currentY + 30);
                        currentY += 50; // Ajusta el espaciado si no hay tabla
                    }
                });

                // Guarda el PDF con los datos y la imagen
                doc.save("documento_horizontal_con_imagen_y_datos.pdf");
            });
        });
    } else {
        console.error("jsPDF no está disponible en generarPDFHorizontal.");
    }
}

function generarPDFHorizontalOri() {
    if (jsPDFInstance) {
        var imgUrl = "../Imagenes/membrete.png"; // Ruta de tu imagen
        getBase64Image(imgUrl, function (base64Img) {
            // Llama a cargarDatosReporteIA para obtener los datos
            cargarDatosReporteIA(function (asociaciones) {
                const doc = new jsPDFInstance({
                    orientation: 'landscape',
                    unit: 'pt',
                    format: 'legal'
                });

                // Agrega la imagen de membrete
                doc.addImage(base64Img, 'PNG', 220, 28, 567, 57);
                //doc.text("Este es un PDF generado en orientación horizontal", 28, 113);

                // Itera sobre las asociaciones y agrégalas al PDF
                asociaciones.forEach(function (asociacion, index) {
                    const offsetY = 130 + index * 100; // Espaciado entre bloques de asociaciones
                    //const offsetY = 50 + index * 30;  10 100
                    const marginTop = 10;

                    doc.setFontSize(12);  // Cambia el valor a lo que desees
                    doc.text(`Asociación: ${asociacion.Descripcion}`, 40, offsetY + marginTop);  // Aplica margen
                    //doc.text(`Asociación: ${asociacion.Descripcion}`, 40, offsetY);

                    doc.setFontSize(12);  // Cambia el tamaño de la fuente para este texto específico
                    doc.text(`Registrado: ${asociacion.FechaRegistro}`, 600, offsetY + marginTop);  // Aplica margen
                    //doc.text(`Registrado: ${asociacion.FechaRegistro}`, 600, offsetY);

                    if (asociacion.ListaActivos.length > 0) {
                        doc.text('LISTA DE ACTIVOS POR ITEM:', 40, offsetY + 30);

                        // Agrega una tabla de PCD
                        const startY = offsetY + 50;
                        doc.autoTable({
                            startY: startY,
                            head: [['Codigo', 'Cantidad', 'Descripcion', 'Valor', 'Responsable', 'Ubicacion', 'Estado Fisico', 'Total']],
                            body: asociacion.ListaActivos.map(pcd => [
                                pcd.Codigo,
                                pcd.Cantidad,
                                pcd.Descripcion,
                                pcd.ValorActivo,
                                pcd.Responsable,
                                pcd.Ubicacion,
                                pcd.EstadoFisico.Descripcion,
                                pcd.Total
                            ]),
                        });
                    } else {
                        doc.text('EL ITEM NO TIENE ACTIVOS.', 40, offsetY + 30);
                    }
                });

                // Guarda el PDF con los datos y la imagen
                doc.save("documento_horizontal_con_imagen_y_datos.pdf");
            });
        });
    } else {
        console.error("jsPDF no está disponible en generarPDFHorizontal.");
    }
}
function cargarDatosReporteIA(callback) {
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
                callback(asociaciones);  // Llama al callback pasando las asociaciones
            }
        }
    });
}

$('#btnImprimiUn').on('click', function () {

    generarPDFHorizontal();  // Llama a la función cuando se haga clic en el botón
});

//generar pdf de la segunda pestaña

function generarPDFCarrer() {
    if (jsPDFInstance) {
        var imgUrl = "../Imagenes/membrete.png"; // Ruta de tu imagen
        var nomCarrera = $("#txtNombreCarreraNu").val();
        var tituloR = "REPORTE ACTIVOS DE: " + nomCarrera;
        getBase64Image(imgUrl, function (base64Img) {
            // Llama a cargarDatosReporteIA para obtener los datos
            datosPdfCarrera(function (asociaciones) {
                const doc = new jsPDFInstance({
                    orientation: 'landscape',
                    unit: 'pt',
                    format: 'legal'
                });

                // Agrega la imagen de membrete
                doc.addImage(base64Img, 'PNG', 220, 28, 567, 57);

                // Agrega el título dinámico
                doc.setFontSize(14);  // Ajusta el tamaño del título
                doc.setFont("helvetica", "bold");  // Cambia la fuente y estilo si deseas
                doc.text(tituloR, doc.internal.pageSize.getWidth() / 2, 110, { align: "center" });

                //doc.text("Este es un PDF generado en orientación horizontal", 28, 113);
                // Posición Y inicial para las asociaciones, ajustada después del título
                //let currentY = 130;
                let currentY = 150; // Posición Y inicial

                // Itera sobre las asociaciones y agrégalas al PDF
                asociaciones.forEach(function (asociacion, index) {
                    var canti = asociacion.ListaActivos.length;
                    const marginTop = 10;

                    // Agrega el texto de la asociación
                    doc.setFontSize(12);
                    doc.text(`Activos de la Gestion: ${asociacion.Descripcion}`, 40, currentY + marginTop);
                    doc.text(`Total: ${canti} Registros`, 600, currentY + marginTop);

                    // Verifica si hay activos en la asociación
                    if (asociacion.ListaActivos.length > 0) {
                        doc.text('LISTA DE ACTIVOS POR GESTION:', 40, currentY + 30);

                        // Agrega la tabla con autoTable
                        doc.autoTable({
                            startY: currentY + 50,
                            head: [['Codigo', 'Item', 'Cantidad', 'Descripcion', 'Valor', 'Responsable', 'Ubicacion', 'Estado Fisico', 'Total']],
                            body: asociacion.ListaActivos.map(pcd => [
                                pcd.Codigo,
                                pcd.Item.Descripcion,
                                pcd.Cantidad,
                                pcd.Descripcion,
                                pcd.ValorActivo,
                                pcd.Responsable,
                                pcd.Ubicacion,
                                pcd.EstadoFisico.Descripcion,
                                pcd.Total
                            ]),
                        });

                        // Actualiza la posición Y para la siguiente asociación
                        currentY = doc.autoTable.previous.finalY + 30; // Deja un margen después de la tabla
                    } else {
                        doc.text('LA GESTION NO TIENE ACTIVOS.', 40, currentY + 30);
                        currentY += 50; // Ajusta el espaciado si no hay tabla
                    }
                });

                // Guarda el PDF con los datos y la imagen
                doc.save("documento_por_carrera.pdf");
            });
        });
    } else {
        console.error("jsPDF no está disponible en generarPDFHorizontal.");
    }
}

function datosPdfCarrera(callback) {
    var request = {
        IdCarrera: $("#txtIdCarreraNu").val()
    };
    $.ajax({
        type: "POST",
        url: "FrmConsultaActivo.aspx/ObtenerActivosPorCarrera",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                var asociaciones = data.d.Data;
                callback(asociaciones);  // Llama al callback pasando las asociaciones
            }
        }
    });
}

$('#btnImprimiM').on('click', function () {

    if (parseInt($("#txtIdCarreraNu").val()) === 0) {
        swal("Mensaje", "Error debe seleccionar una Carrera", "warning");
        return;
    }

    generarPDFCarrer();  // Llama a la función cuando se haga clic en el botón
});

//report pestaña tres
function generarPDFgesItem() {
    if (jsPDFInstance) {
        var imgUrl = "../Imagenes/membrete.png"; // Ruta de tu imagen
        var nomCarrera = $('#cboItemGen option:selected').text();
        var gestionText = $('#cboGestionGene option:selected').text();
        var tituloR = "REPORTE DE: " + nomCarrera + " GESTIÓN: " + gestionText;
        getBase64Image(imgUrl, function (base64Img) {
            // Llama a cargarDatosReporteIA para obtener los datos
            cargarDatosRepGestionItem(function (asociaciones) {
                const doc = new jsPDFInstance({
                    orientation: 'landscape',
                    unit: 'pt',
                    format: 'legal'
                });

                // Agrega la imagen de membrete
                doc.addImage(base64Img, 'PNG', 220, 28, 567, 57);

                // Agrega el título dinámico
                doc.setFontSize(14);  // Ajusta el tamaño del título
                doc.setFont("helvetica", "bold");  // Cambia la fuente y estilo si deseas
                doc.text(tituloR, doc.internal.pageSize.getWidth() / 2, 110, { align: "center" });

                //doc.text("Este es un PDF generado en orientación horizontal", 28, 113);
                // Posición Y inicial para las asociaciones, ajustada después del título
                //let currentY = 130;
                let currentY = 150; // Posición Y inicial

                // Itera sobre las asociaciones y agrégalas al PDF
                asociaciones.forEach(function (asociacion, index) {
                    const marginTop = 10;

                    // Agrega el texto de la asociación
                    doc.setFontSize(12);
                    doc.text(`Descripcion: ${asociacion.Descripcion}`, 40, currentY + marginTop);
                    doc.text(`Registrado: ${asociacion.FechaRegistro}`, 600, currentY + marginTop);

                    // Verifica si hay activos en la asociación
                    if (asociacion.ListaActivos.length > 0) {
                        doc.text('LISTA DE ACTIVOS POR CARRERA:', 40, currentY + 30);

                        // Agrega la tabla con autoTable
                        doc.autoTable({
                            startY: currentY + 50,
                            head: [['Codigo', 'Cantidad', 'Descripcion', 'Valor', 'Responsable', 'Ubicacion', 'Estado Fisico', 'Total']],
                            body: asociacion.ListaActivos.map(pcd => [
                                pcd.Codigo,
                                pcd.Cantidad,
                                pcd.Descripcion,
                                pcd.ValorActivo,
                                pcd.Responsable,
                                pcd.Ubicacion,
                                pcd.EstadoFisico.Descripcion,
                                pcd.Total
                            ]),
                        });

                        // Actualiza la posición Y para la siguiente asociación
                        currentY = doc.autoTable.previous.finalY + 30; // Deja un margen después de la tabla
                    } else {
                        doc.text('LA CARRERA NO TIENE ACTIVOS.', 40, currentY + 30);
                        currentY += 50; // Ajusta el espaciado si no hay tabla
                    }
                });

                // Guarda el PDF con los datos y la imagen
                doc.save("datos_item_gestion.pdf");
            });
        });
    } else {
        console.error("jsPDF no está disponible en generarPDFHorizontal.");
    }
}

function cargarDatosRepGestionItem(callback) {
    var request = {
        IdGestion: $("#cboGestionGene").val(),
        IdItem: $("#cboItemGen").val()
    };
    $.ajax({
        type: "POST",
        url: "FrmConsultaActivo.aspx/ObtenerActivosGestionyItem",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                var asociaciones = data.d.Data;
                callback(asociaciones);  // Llama al callback pasando las asociaciones
            }
        }
    });
}
$('#btnImprimiGe').on('click', function () {
    generarPDFgesItem();
    //swal("Mensaje", "IdGes: " + cbge + " IdCarrera: " + idcare, "success");
})