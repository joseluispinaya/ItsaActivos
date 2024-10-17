<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DocActivo.aspx.cs" Inherits="CapaPresentacion.DocActivo" %>

<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>ImprimirActivo</title>
    <style>
        .contenedor {
           width: 900px !important;
           height:842px !important;
           margin:auto;
        }
        body{
           font-family:Arial, Helvetica, sans-serif
        }
        p.title{
           font-weight:bold;
        }
         p.title2{
           font-weight:bold;
           color: #03A99F;
           font-size:20px;
        }
        p.text{
           font-size:15px;
           font-weight:100;
           color:#858585;
        }
        p{
           margin:0px
        }
        .tbth{
           text-align:left;
        }

        table.tbproductos{
            border-collapse: separate;
            border-spacing: 4px;
        }

        table.tbproductos thead tr th {
           background-color: #03A99F;
           padding:10px;
           font-size:15px;
           color:white;
        }
        table.tbproductos tbody tr td{
           padding:10px;
        }
        .item{
           font-size:15px;
           font-weight:100;
           color:#757575;
        }
        .item-2{
        font-size:15px;
           font-weight:bold;
           color:#757575;
        }

        .item-3{
           font-size:15px;
           font-weight:bold;
           background-color:#03A99F;
           color:white;
        }

         .td-item {
           border-bottom:2px solid #E8E8E8 !important;
         }
    </style>
</head>
<body >
    <div style="font-size: 11px; text-align: right;">
        <div style="text-align: center;">
            <button type="button" id="Imprimir" onclick="javascript:imprSelec('seleccion')" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                IMPRIMIR
            </button>
        </div>
        <br />
    </div>

    <div class="contenedor" id="seleccion">

        <table style="width: 100%">
            <tr>
                <td>
                    <%--<img src="Imagenes/sinimagen.png" style="width: 130px" style="width: 120px; height: 120px" />--%>
                    <img src="Imagenes/membrete.png" style="width: 100%;" />
                </td>
                <td style="text-align: right; width: 190px">
                    <table style="margin-right: 0; margin-left: auto">
                        <tr>
                            <td>
                                <p class="title2">CODIGO ACTIVO</p>
                            </td>
                        </tr>
                        <tr>
                            <td><span id="codi">000001232</span></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <br />
        <table style="width: 100%">
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>
                                <p class="title">Descripcion:</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="title">Activo:</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="title">Carrera:</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="title">Gestion:</p>
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <td>
                                <p id="txtitem" class="text"></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="txtact" class="text"></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="txtcarre" class="text"></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="txtgest" class="text"></p>
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <td>
                                <p class="title">Responsable:</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="title">Ubicacion:</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="title">Observacion:</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="title">Estado:</p>
                            </td>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <td>
                                <p id="txtrespo" class="text"></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="txtubic" class="text"></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="txtobse" class="text"></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="txtestafi" class="text"></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <br />
        <table style="width: 100%">
            <tr>
                <td>
                    <img src="Imagenes/sinimagen.png" id="imgqr" style="width: 100px; height: 100px" />
                </td>
                <td>
                    <table>
                        <tr>
                            <td style="text-align: center">
                                <p class="title">CARACTERISTICAS ACTIVO</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p id="txtcaracte" class="text"></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <br />
        <br />

        <table class="tbproductos" style="width: 100%">
            <thead>
                <tr>
                    <th class="tbth">Estado</th>
                    <th class="tbth" style="width: 130px">Cantidad</th>
                    <th class="tbth" style="width: 130px">Precio</th>
                    <th class="tbth" style="width: 130px">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="td-item">
                        <p id="txtacti" class="item"></p>
                    </td>
                    <td class="td-item">
                        <p id="txtcantii" class="item"></p>
                    </td>
                    <td class="td-item">
                        <p id="txtpre" class="item"></p>
                    </td>
                    <td style="background-color: #EDF6F9">
                        <p id="txttotl" class="item"></p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" rowspan="2"></td>
                    <td class="td-item">
                        <p class="item-2">Fecha actual</p>
                    </td>
                    <td class="item-3">
                        <p id="txtfech">poner fecha actual</p>
                    </td>
                </tr>
                <tr>
                    <td class="item-3">
                        <p>Total</p>
                    </td>
                    <td class="item-3">
                        <p id="txttofo"></p>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="js/DocActivo.js" type="text/javascript"></script>
</body>
</html>
