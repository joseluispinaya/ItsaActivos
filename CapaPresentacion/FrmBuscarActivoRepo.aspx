<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="FrmBuscarActivoRepo.aspx.cs" Inherits="CapaPresentacion.FrmBuscarActivoRepo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .sin-margin-bottom {
            margin-bottom: 0;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel de Control Activo
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
<div class="row" id="overlayc">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header bg-primary">
                <h3 class="card-title m-0">Buscar Activo por codigo</h3>
            </div>
            <div class="card-body">
                <div class="form-inline">
                    <div class="form-group">
                        <label class="sr-only" for="lbltitul">Ingrese Codigo</label>
                        <label id="lbltitul">Ingrese Codigo</label>
                    </div>
                    <div class="form-group m-l-10">
                        <label class="sr-only" for="txtcodigoac">Codigo Activo</label>
                        <input type="text" class="form-control" id="txtcodigoac" placeholder="Codigo activo">
                    </div>
                    <button type="button" id="btnbuscar" class="btn btn-success waves-effect waves-light m-l-10">Buscar</button>
                    <button type="button" id="btnImpr" class="btn btn-info waves-effect waves-light m-l-10">Imprimir</button>
                    <button type="button" id="btnDesac" class="btn btn-secondary waves-effect waves-light m-l-10">Suspender Activo</button>
                </div>
                <hr />
                <input id="txtIdActivo" class="model" name="IdActivo" value="0" type="hidden" />
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="row m-b-0 m-t-5">
                                    <div class="col-3">
                                        <address>
                                            <strong>Descripcion:</strong><br>
                                            <strong>Activo:</strong><br>
                                            <strong>Carrera:</strong><br>
                                            <strong>Gestion:</strong><br>
                                            <strong>Responsable:</strong><br>
                                            <strong>Ubicacion:</strong>
                                        </address>
                                    </div>
                                    <div class="col-9">
                                        <address>
                                            <label id="txtitem" class="sin-margin-bottom"></label><br>
                                            <label id="txtact" class="sin-margin-bottom"></label><br>
                                            <label id="txtcarre" class="sin-margin-bottom"></label><br>
                                            <label id="txtgest" class="sin-margin-bottom"></label><br>
                                            <label id="txtrespo" class="sin-margin-bottom"></label><br>
                                            <label id="txtubic" class="sin-margin-bottom"></label>
                                        </address>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="row m-b-0 m-t-5">
                                    <div class="col-3">
                                        <address>
                                            <strong>Observacion:</strong><br>
                                            <strong>Estado Fisico:</strong><br>
                                            <strong>Estado:</strong><br>
                                            <strong>Cantidad:</strong><br>
                                            <strong>Precio:</strong><br>
                                            <strong>Total:</strong>
                                        </address>
                                    </div>
                                    <div class="col-9">
                                        <address>
                                            <label id="txtobse" class="sin-margin-bottom"></label><br>
                                            <label id="txtestafi" class="sin-margin-bottom"></label><br>
                                            <label id="txtacti" class="sin-margin-bottom"></label><br>
                                            <label id="txtcantii" class="sin-margin-bottom"></label><br>
                                            <label id="txtpre" class="sin-margin-bottom"></label><br>
                                            <label id="txttotl" class="sin-margin-bottom"></label>
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-row h-100 d-flex align-items-center justify-content-center">
                            <div class="form-group col-sm-12 text-center">
                                <label for="imgqr">Codigo QR</label><br />
                                <img id="imgqr" src="Imagenes/sinimagen.png" alt="Foto usuario" style="width: 100px; height: 100px">
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="form-row">
                            <div class="form-group col-sm-12">
                                <label for="txtcaracte">Caracteristicas</label>
                                <textarea class="form-control" rows="3" id="txtcaracte" disabled></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">
    <script src="js/FrmBuscarActivoRepo.js" type="text/javascript"></script>
</asp:Content>
