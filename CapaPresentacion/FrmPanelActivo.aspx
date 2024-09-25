<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="FrmPanelActivo.aspx.cs" Inherits="CapaPresentacion.FrmPanelActivo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/select2/select2.min.css" rel="stylesheet"/>
    <style>
        .select2 {
            width: 100% !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Activos
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header bg-primary">
                    <h3 class="card-title m-0"><i class="fas fa-user"></i> Detalle Activo</h3>
                </div>
                <div class="card-body">
                    <input id="txtIdCarrera" class="model" name="IdCarrera" value="0" type="hidden" />
                    <input id="txtIdGestion" class="model" name="IdGestion" value="0" type="hidden" />
                    
                    <div class="form-row">
                        <div class="form-group col-sm-2">
                            <label for="cboGestion">Gestion</label>
                            <select class="form-control form-control-sm" id="cboGestion">
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
                            <button type="button" id="btnNuevoReg" class="btn btn-sm btn-success">
                                <i class="fas fa-hand-holding-usd"></i> Nuevo Registro
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-row">
                                <div class="form-group col-sm-3">
                                    <label for="cboestadofi">Estado Fisico</label>
                                    <select class="form-control form-control-sm" id="cboestadofi">
                                    </select>
                                </div>
                                <div class="form-group col-sm-3">
                                    <label for="cboItem">Item</label>
                                    <select class="form-control form-control-sm" id="cboItem">
                                    </select>
                                </div>
                                <div class="form-group col-sm-3">
                                    <label for="txtcantidad">Cantidad</label>
                                    <input type="text" class="form-control input-sm model" id="txtcantidad" name="Cantidad" />
                                </div>
                                <div class="form-group col-sm-3">
                                    <label for="txtvalorAct">Valor Activo</label>
                                    <input type="text" class="form-control input-sm model" id="txtvalorAct" name="Valor Activo" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtResponsable">Responsable del Activo</label>
                                    <input type="text" class="form-control input-sm model" id="txtResponsable" name="Responsable">
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtUbicacion">Ubicacion del Activo</label>
                                    <input type="text" class="form-control input-sm model" id="txtUbicacion" name="Ubicacion">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-8">
                                    <label for="txtDescripcion">Descripcion</label>
                                    <input type="text" class="form-control model" id="txtDescripcion" name="Descripcion">
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="txtvalorddAct">Guardar Activo</label>
                                    <button type="button" id="btnTermiGuaeda" class="btn btn-success btn-sm btn-block"><i class="fas fa-hand-holding-usd"></i> Registrar</button>
                                </div>
                            </div>
                            
                        </div>
                        <div class="col-sm-5">
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <label for="txtObservacion">Observacion</label>
                                    <input type="text" class="form-control input-sm model" id="txtObservacion" name="Observacion">
                                </div>
                            </div>                            
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <label for="txtCaracteristicas">Caracteristicas Espesificas</label>
                                    <textarea class="form-control" rows="4" id="txtCaracteristicas"></textarea>
                                    <%--<input type="text" class="form-control input-sm model" id="txtCaracteristicas" name="Caracteristicas">--%>
                                </div>
                            </div>

                        </div>
                    </div>
                    <hr />

                    <div class="row mt-3">
                        <div class="col-sm-12">

                            <table id="tbActivos" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Gestion</th>
                                        <th>Codigo</th>
                                        <th>Cantidad</th>
                                        <th>Descripcion</th>
                                        <th>Valor</th>
                                        <th>Estado Fisico</th>
                                        <th>Acciones</th>
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/select2/select2.min.js"></script>
    <script src="assets/select2/es.min.js"></script>
    <script src="js/FrmPanelActivo.js" type="text/javascript"></script>
</asp:Content>
