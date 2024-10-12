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
    public partial class FrmConsultaActivo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<List<EItem>> ObtenerActivosItem(int IdGestion, int IdCarrera)
        {
            try
            {
                Respuesta<List<EItem>> Lista = NActivo.GetInstance().ObtenerActivosIdsRptIa(IdGestion, IdCarrera);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EItem>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Activos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EGestion>> ObtenerActivosPorCarrera(int IdCarrera)
        {
            try
            {
                Respuesta<List<EGestion>> Lista = NActivo.GetInstance().ObtenerActivosIdsRptCarrera(IdCarrera);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EGestion>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Activos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<ECarrera>> ObtenerActivosGestionyItem(int IdGestion, int IdItem)
        {
            try
            {
                Respuesta<List<ECarrera>> Lista = NActivo.GetInstance().ObtenerActivosIdGesItem(IdGestion, IdItem);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Activos: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}