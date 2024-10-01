using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaPresentacion
{
    public partial class Inicio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<string> ObtenerToken(int IdUsu)
        {
            try
            {
                var tokenSesion = NUsuario.GetInstance().ObtenerToken(IdUsu);
                return new Respuesta<string>() { Estado = true, Valor = tokenSesion };
            }
            catch (Exception)
            {
                return new Respuesta<string>() { Estado = false };
            }
        }

        [WebMethod]
        public static Respuesta<bool> CerrarSesion()
        {

            return new Respuesta<bool>() { Estado = true };

        }
    }
}