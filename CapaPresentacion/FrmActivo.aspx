<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="FrmActivo.aspx.cs" Inherits="CapaPresentacion.FrmActivo" %>
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

    <div class="row" id="overlayc">
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
                            <label for="cboItem">Seleccione Item</label>
                            <select class="form-control form-control-sm" id="cboItem">
                            </select>
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="cboBuscarCarrera">Buscar Carrera</label>
                            <select class="form-control form-control-sm" id="cboBuscarCarrera">
                                <option value=""></option>
                            </select>
                        </div>

                        <div class="form-group col-sm-3">
                            <label for="txtNombreCarrera">Carrera Selec</label>
                            <input type="text" class="form-control input-sm" id="txtNombreCarrera" disabled />
                        </div>
                    </div>

                    <div class="">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 m-b-30 text-right">
                                <%--<p class="text-muted">Ver Detalle Antes</p>--%>
                                <button type="button" id="btnVerInfo" class="btn btn-primary waves-effect"><i class="fas fa-eye"></i> Ver Detalle</button>
                            </div>
                            <div class="col-lg-6 col-md-6 m-b-30">
                                <%--<p class="text-muted">Nuevo Registro?</p>--%>
                                <button type="button" id="btnNuevoReg" class="btn btn-success waves-effect waves-light"><i class="fas fa-hand-holding-usd"></i> Nuevo Registro</button>
                            </div>
                        </div>
                    </div>
                    <%--<hr />--%>

                    <div class="row">
                        <div class="col-sm-12">

                            <table id="tbActivos" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Gestion</th>
                                        <th>Estado</th>
                                        <th>Codigo</th>
                                        <th>Cant</th>
                                        <th>Descripcion</th>
                                        <th>Valor</th>
                                        <th>E. Fisico</th>
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

    <div class="modal fade bs-example-modal-lg" id="modalActivo" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myLargeModalLabel">Detalle Activo</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <input id="txtIdActivo" class="model" name="IdActivo" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-sm-7">
                            <div class="form-row">
                                <div class="form-group col-sm-4">
                                    <label for="cboestadofi">Estado Fisico</label>
                                    <select class="form-control form-control-sm" id="cboestadofi">
                                    </select>
                                </div>

                                <div class="form-group col-sm-2">
                                    <label for="txtcantidad">Cantidad</label>
                                    <input type="text" class="form-control input-sm model" id="txtcantidad" name="Cantidad" />
                                </div>
                                <div class="form-group col-sm-3">
                                    <label for="txtvalorAct">Valor Activo</label>
                                    <input type="text" class="form-control input-sm model" id="txtvalorAct" name="Valor Activo" />
                                </div>
                                <div class="form-group col-sm-3">
                                    <label for="txtTotal">Valor Total</label>
                                    <input type="text" class="form-control input-sm model" id="txtTotal" name="Valor Total" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-6">
                                    <label for="txtResponsable">Responsable del Activo</label>
                                    <input type="text" class="form-control input-sm model" id="txtResponsable" name="Responsable" />
                                </div>
                                <div class="form-group col-sm-6">
                                    <label for="txtUbicacion">Ubicacion del Activo</label>
                                    <input type="text" class="form-control input-sm model" id="txtUbicacion" name="Ubicacion" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-8">
                                    <label for="txtDescripcion">Descripcion</label>
                                    <input type="text" class="form-control input-sm model" id="txtDescripcion" name="Descripcion" />
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="cboEstadoA">Estado</label>
                                    <select class="form-control form-control-sm" id="cboEstadoA">
                                        <option value="1">Activo</option>
                                        <option value="0">No Activo</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-5">
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <label for="txtObservacion">Observacion</label>
                                    <input type="text" class="form-control input-sm model" id="txtObservacion" name="Observacion" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-sm-12">
                                    <label for="txtCaracteristicas">Caracteristicas Espesificas</label>
                                    <textarea class="form-control" rows="4" id="txtCaracteristicas"></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button id="btnGuardarCambiosA" type="button" class="btn btn-sm btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/select2/select2.min.js"></script>
    <script src="assets/select2/es.min.js"></script>
    <script src="js/FrmActivo.js" type="text/javascript"></script>
</asp:Content>
