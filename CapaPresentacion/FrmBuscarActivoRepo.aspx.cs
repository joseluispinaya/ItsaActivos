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
    }
}