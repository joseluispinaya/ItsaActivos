using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using CapaEntidad;
using CapaNegocio;

namespace CapaPresentacion
{
    public partial class FrmBuscarActivoRepo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<EActivo> DetalleActivoCodigo(string Codigoa)
        {
            try
            {
                Respuesta<EActivo> oActivo = NActivo.GetInstance().ConsultarActivoCodigo(Codigoa);
                return oActivo;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<EActivo>() { Estado = false, Data = null, Mensaje = ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> CambiarEstadoActivo(int IdActivo, bool Estado)
        {
            try
            {
                if (IdActivo <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos del activo inválidos" };
                }
                Respuesta<EActivo> oActivo = NActivo.GetInstance().ConsultarActivo(IdActivo);
                var item = oActivo.Data;
                if (item == null)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "No se encontró el activo." };
                }
                item.Activo = Estado;
                Respuesta<bool> respuesta = NActivo.GetInstance().ModificarActivo(item);
                if (!respuesta.Estado)
                {
                    return new Respuesta<bool> { Estado = false, Mensaje = "Error al dar de baja el activo. Intente más tarde." };
                }
                return new Respuesta<bool>
                {
                    Estado = true,
                    Mensaje = "Accion realizada correctamente."
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<bool>() { Estado = false, Mensaje = ex.Message };
            }
        }
    }
}