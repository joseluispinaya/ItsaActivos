<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="FrmConsultaActivo.aspx.cs" Inherits="CapaPresentacion.FrmConsultaActivo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/select2/select2.min.css" rel="stylesheet"/>
    <style>
        .nav.nav-tabs + .tab-content {
            margin-bottom: 10px !important;
            padding: 10px !important; /* Ajusta el valor de padding según lo necesites */
        }
        .sectionz {
            margin-top: 10px;
            margin-bottom: 10px;
            padding: 5px;
            text-align: center;
            background-color: #00b050;
            color: white; /* Texto blanco */
            font-weight: bold;
        }
        .select2 {
            width: 100% !important;
        }
        @media print {
            #omitirhisb {
                display: none !important;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Reportes
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
<div class="row">
        <div class="col-sm-12">
            <div class="card card-primary">
                <div class="card-body">
                    <%--<div class="row">
                        <div class="col-sm-12">
                            <h4 class="page-header m-t-0">Consultas Activos</h4>
                        </div>
                    </div>--%>
                    <div class="row">
                        <div class="col-sm-12">
                            <ul class="nav nav-tabs nav-justified" role="tablist" id="menuR">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab-2" data-toggle="tab" href="#home-2" role="tab" aria-controls="home-2" aria-selected="false">
                                        <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                                        <span class="d-none d-sm-block">Activos por Item</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab-2" data-toggle="tab" href="#profile-2" role="tab" aria-controls="profile-2" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                                        <span class="d-none d-sm-block">Por Carrera</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="message-tab-2" data-toggle="tab" href="#message-2" role="tab" aria-controls="message-2" aria-selected="false">
                                        <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                        <span class="d-none d-sm-block">Por Implementar</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content bg-light">
                                <div class="tab-pane fade show active" id="home-2" role="tabpanel" aria-labelledby="home-tab-2">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <input id="txtIdCarrera" class="model" name="IdCarrera" value="0" type="hidden" />
                                                    <div class="form-row">
                                                        <div class="form-group col-sm-2">
                                                            <label for="cboGestionR">Gestion</label>
                                                            <select class="form-control form-control-sm" id="cboGestionR">
                                                            </select>
                                                        </div>
                                                        <div class="form-group col-sm-4">
                                                            <label for="cboBuscarCarrera">Buscar Carrera</label>
                                                            <select class="form-control form-control-sm" id="cboBuscarCarrera">
                                                                <option value=""></option>
                                                            </select>
                                                        </div>

                                                        <div class="form-group col-sm-3">
                                                            <label for="txtNombreCarrera">Carrera Selec</label>
                                                            <input type="text" class="form-control input-sm" id="txtNombreCarrera" disabled />
                                                        </div>
                                                        <div class="form-group col-sm-3">
                                                            <br />
                                                            <button type="button" id="btnBuscarR" class="btn btn-success">
                                                                <i class="fas fa-eye"></i> Ver Detalle
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <h4 id="iddetalletotre" class="m-b-10 m-t-10">Detalle Consulta</h4>
                                                    <hr />
                                                    <div class="row">
                                                        <div class="col-sm-12">

                                                        </div>
                                                    </div>
                                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile-2" role="tabpanel" aria-labelledby="profile-tab-2">
                                    
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header bg-primary" id="omitirhisb">
                                                    <div class="form-horizontal">
                                                        <div class="form-group row m-b-0">
                                                            <div class="col-sm-3 text-right">
                                                                <h3 class="card-title m-0">Buscar Carrera</h3>
                                                            </div>
                                                            <div class="col-sm-3">
                                                                <select class="form-control form-control-sm" id="cboBuscarCarreraNu">
                                                                    <option value=""></option>
                                                                </select>
                                                            </div>
                                                            <div class="col-sm-3">
                                                                <input type="text" class="form-control input-sm" id="txtNombreCarreraNu" disabled />
                                                            </div>
                                                            <div class="col-sm-3">
                                                                <button type="button" id="btnConsultarM" class="btn btn-sm btn-success">
                                                                    <i class="fas fa-search"></i> Ver
                                                                </button>
                                                                <button type="button" id="btnImprimiM" class="btn btn-sm btn-success">
                                                                    <i class="fas fa-print"></i> Imprimir
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <input id="txtIdCarreraNu" class="model" name="IdCarrera" value="0" type="hidden" />
                                                    <div class="row" id="logomenbre" style="display: none;">
                                                        <div class="col-sm-12 text-center">
                                                            <img src="assets/images/imagen2.png" alt="Header Image" style="width: 100%;" />
                                                            <h4 class="m-b-0 m-t-10">INFORME DE ACTIVOS POR CARRERA</h4>
                                                        </div>
                                                        <%--<div class="col-12">
                                                            <div class="invoice-title">
                                                                <h4 class="float-right">Order # 12345</h4>
                                                                <h3 class="m-t-0">WEBADMIN</h3>
                                                            </div>
                                                            <hr>
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <address>
                                                                        <img src="assets/images/users/avatar-1.jpg" width="100" height="100" alt="User Image" style="border-radius: 50%;">
                                                                    </address>
                                                                </div>
                                                                <div class="col-4">
                                                                    <address>
                                                                        <strong>Shipped To:</strong><br>
                                                                        Kenny Rigdon<br>
                                                                        1234 Main<br>
                                                                        Springfield, ST 54321
                                                                    </address>
                                                                </div>
                                                                <div class="col-4 text-right">
                                                                    <address>
                                                                        <strong>Shipped To:</strong><br>
                                                                        Kenny Rigdon<br>
                                                                        Apt. 4B<br>
                                                                        Springfield, ST 54321
                                                                    </address>
                                                                </div>
                                                            </div>
                                                        </div>--%>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-lg-12" id="datoss">
                                                            <!-- aqui muestro mis datos de mi funcion  -->
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="tab-pane fade" id="message-2" role="tabpanel" aria-labelledby="message-tab-2">
                                    
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="card">
                                                <div class="card-header bg-primary">
                                                    <div class="form-horizontal" id="omitirhabil">
                                                        <div class="form-group row m-b-0">
                                                            <div class="col-sm-2">
                                                            </div>
                                                            <div class="col-sm-4 text-right">
                                                                <h3 class="card-title m-0"><i class="fas fa-user"></i> Seleccione Consulta</h3>
                                                            </div>
                                                            <div class="col-sm-3">
                                                                <select class="form-control form-control-sm" id="cboEstadoBon">
                                                                    <option value="0">Mostrar Todos PCD</option>
                                                                    <option value="1">PCD Habilitados</option>
                                                                    <option value="2">PCD Inhabilitados</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-sm-3">
                                                                <button type="button" id="btnEjemploa" class="btn btn-sm btn-success">
                                                                    <i class="fas fa-tags"></i> Imprimir
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body">
                                                    <h5 id="txtdetallein" class="m-b-15 m-t-0"></h5>
                                                    <div class="row">
                                                        <div class="col-sm-12">

                                                            <table id="tbpcdbosi" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Asociacion</th>
                                                                        <th>Discapacidad</th>
                                                                        <th>Nro CI</th>
                                                                        <th>Nombres</th>
                                                                        <th>Apellidos</th>
                                                                        <th>Tutor</th>
                                                                        <th>Estado</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/select2/select2.min.js"></script>
    <script src="assets/select2/es.min.js"></script>
    <script src="js/FrmConsultaActivo.js" type="text/javascript"></script>
</asp:Content>
