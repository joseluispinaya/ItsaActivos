<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="FrmConfiguracion.aspx.cs" Inherits="CapaPresentacion.FrmConfiguracion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .nav.nav-tabs + .tab-content {
            margin-bottom: 10px !important;
            padding: 10px !important; /* Ajusta el valor de padding según lo necesites */
        }
        .buttons-excel{
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="titulo" runat="server">
    Panel Ajustes
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-header bg-primary">
                <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Ajustes</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <ul class="nav nav-tabs nav-justified" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
                                    <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                                    <span class="d-none d-sm-block">Registro Items</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">
                                    <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                                    <span class="d-none d-sm-block">Registro Carreras</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="message-tab" data-toggle="tab" href="#message" role="tab" aria-controls="message" aria-selected="false">
                                    <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                    <span class="d-none d-sm-block">Registro Gestiones</span>
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content bg-light">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="card" id="loadRe">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <input id="txtIdItem" class="model" name="IdItem" value="0" type="hidden" />
                                                        <div class="form-row">
                                                            <div class="form-group col-sm-12">
                                                                <label for="txtDescripcion">Descripcion</label>
                                                                <input type="text" class="form-control input-sm model" id="txtDescripcion" name="Descripcion">
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                        <div class="form-row">
                                                            <div class="form-group col-sm-5">
                                                                <label for="cboEstado">Estado</label>
                                                                <select class="form-control form-control-sm" id="cboEstado">
                                                                    <option value="1">Activo</option>
                                                                    <option value="0">No Activo</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group col-sm-7 text-center">
                                                                <br />
                                                                <button type="button" id="btnGuardarItem" class="btn btn-sm btn-success">
                                                                    <i class="fas fa-eye"></i> Guardar Cambios
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                
                                                    <div class="col-sm-8">
                            
                                                        <table id="tbItem" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                                            <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Descripcion</th>
                                                                    <th>Fecha</th>
                                                                    <th>Estado</th>
                                                                    <th>Accion</th>
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
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="card" id="loadReC">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <input id="txtIdCarrera" class="model" name="IdCarrera" value="0" type="hidden" />
                                                        <div class="form-row">
                                                            <div class="form-group col-sm-12">
                                                                <label for="txtDescripcionC">Descripcion</label>
                                                                <input type="text" class="form-control input-sm model" id="txtDescripcionC" name="DescripcionC">
                                                            </div>


                                                        </div>
                                                        <div class="form-row">
                                                            <div class="form-group col-sm-5">
                                                                <label for="cboEstadoC">Estado</label>
                                                                <select class="form-control form-control-sm" id="cboEstadoC">
                                                                    <option value="1">Activo</option>
                                                                    <option value="0">No Activo</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group col-sm-7 text-center">
                                                                <br />
                                                                <button type="button" id="btnGuardarCarrera" class="btn btn-sm btn-success">
                                                                    <i class="fas fa-eye"></i> Guardar Cambios
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-8">

                                                        <table id="tbCarrer" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                                            <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Descripcion</th>
                                                                    <th>Fecha</th>
                                                                    <th>Estado</th>
                                                                    <th>Accion</th>
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
                            <div class="tab-pane fade" id="message" role="tabpanel" aria-labelledby="message-tab">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="card" id="loadReG">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                        <input id="txtIdGestion" class="model" name="IdGestion" value="0" type="hidden" />
                                                        <div class="form-row">
                                                            <div class="form-group col-sm-6">
                                                                <label for="txtDescripcionG">Descripcion</label>
                                                                <input type="text" class="form-control input-sm model" id="txtDescripcionG" name="DescripcionG">
                                                            </div>
                                                            <div class="form-group col-sm-6">
                                                                <label for="cboEstadoG">Estado</label>
                                                                <select class="form-control form-control-sm" id="cboEstadoG">
                                                                    <option value="1">Activo</option>
                                                                    <option value="0">No Activo</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div class="form-row">
                                                            <%--<div class="form-group col-sm-5">
                                                                
                                                            </div>--%>
                                                            <div class="form-group col-sm-12 text-center">
                                                                <%--<br />--%>
                                                                <button type="button" id="btnGuardarGestion" class="btn btn-sm btn-success">
                                                                    <i class="fas fa-eye"></i> Guardar Cambios
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-8">

                                                        <table id="tbGesti" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                                            <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                    <th>Descripcion</th>
                                                                    <th>Estado</th>
                                                                    <th>Accion</th>
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
    <%--<div class="row">
        <div class="col-lg-7">
            <div class="card">
                <div class="card-header bg-primary">
                    <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Ajuste de Items</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <ul class="nav nav-tabs nav-justified" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">
                                        <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                                        <span class="d-none d-sm-block">Lista</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                                        <span class="d-none d-sm-block">Registro</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="message-tab" data-toggle="tab" href="#message" role="tab" aria-controls="message" aria-selected="false">
                                        <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                        <span class="d-none d-sm-block">Deatalle</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content bg-light">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-sm-12">

                                            <table id="tbItem" class="table table-striped table-bordered nowrap" cellspacing="0" width="100%">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Descripcion</th>
                                                        <th>Estado</th>
                                                        <th>Accion</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                </div>
                                <div class="tab-pane fade" id="message" role="tabpanel" aria-labelledby="message-tab">
                                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-5">
            <div class="card">
                <div class="card-header bg-primary">
                    <h3 class="card-title m-0"><i class="fas fa-user-friends"></i> Ajuste de Gestion</h3>
                </div>
                <div class="card-body">
                    <div class="row">
    
                        <div class="col-sm-12">
                            <ul class="nav nav-tabs nav-justified" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab-2" data-toggle="tab" href="#home-2" role="tab" aria-controls="home-2" aria-selected="false">
                                        <span class="d-block d-sm-none"><i class="fa fa-home"></i></span>
                                        <span class="d-none d-sm-block">Lista</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab-2" data-toggle="tab" href="#profile-2" role="tab" aria-controls="profile-2" aria-selected="true">
                                        <span class="d-block d-sm-none"><i class="fa fa-user"></i></span>
                                        <span class="d-none d-sm-block">Registro</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="message-tab-2" data-toggle="tab" href="#message-2" role="tab" aria-controls="message-2" aria-selected="false">
                                        <span class="d-block d-sm-none"><i class="far fa-envelope"></i></span>
                                        <span class="d-none d-sm-block">Detalle</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content bg-light">
                                <div class="tab-pane fade show active" id="home-2" role="tabpanel" aria-labelledby="home-tab-2">
                                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                </div>
                                <div class="tab-pane fade" id="profile-2" role="tabpanel" aria-labelledby="profile-tab-2">
                                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                </div>
                                <div class="tab-pane fade" id="message-2" role="tabpanel" aria-labelledby="message-tab-2">
                                    <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>--%>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="footer" runat="server">

    <script src="js/FrmConfiguracion.js" type="text/javascript"></script>
</asp:Content>
