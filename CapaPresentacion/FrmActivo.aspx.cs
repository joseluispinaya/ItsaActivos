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
    public partial class FrmActivo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EGestion>> ObtenerGestion()
        {
            try
            {
                Respuesta<List<EGestion>> Lista = NCarrera.GetInstance().ObtenerGestiones();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EGestion>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener las Gestiones: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EItem>> ObtenerItems()
        {
            try
            {
                Respuesta<List<EItem>> Lista = NCarrera.GetInstance().ObtenerItems();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EItem>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Items: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EEstadoFisico>> ObtenerEstadosFisi()
        {
            try
            {
                Respuesta<List<EEstadoFisico>> Lista = NCarrera.GetInstance().ObtenerEstadosFisi();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EEstadoFisico>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Items: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<ECarrera>> BuscarCarrera(string buscar)
        {
            Respuesta<List<ECarrera>> Lista = NCarrera.GetInstance().ObtenerCarreras();
            var listafi = Lista.Data;
            if (listafi != null)
            {
                var listaFiltrada = listafi.Where(u => u.Descripcion.IndexOf(buscar, StringComparison.OrdinalIgnoreCase) >= 0).ToList();

                return new Respuesta<List<ECarrera>>() { Estado = true, Data = listaFiltrada };
            }
            else
            {
                return new Respuesta<List<ECarrera>>() { Estado = false, Data = null };
            }
        }

        //sin usar
        [WebMethod]
        public static Respuesta<List<EActivo>> ObtenerActivosId(int IdGestion, int IdCarrera)
        {
            try
            {
                Respuesta<List<EActivo>> Lista = NActivo.GetInstance().ObtenerActivosIds(IdGestion, IdCarrera);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Activos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<EActivo>> ObtenerActivosTresId(int IdGestion, int IdCarrera, int IdItem)
        {
            try
            {
                Respuesta<List<EActivo>> Lista = NActivo.GetInstance().ObtenerActivosTresIds(IdGestion, IdCarrera, IdItem);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Activos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EActivo oActivo)
        {
            try
            {
                //var es = obj;
                //if (oActivo != null)
                //{
                //    return new Respuesta<bool> { Estado = true, Mensaje = "Se registro correctamente" };
                //}
                //else
                //{
                //    return new Respuesta<bool> { Estado = false, Mensaje = "Error es nulo" };
                //}

                Respuesta<bool> respuesta = NActivo.GetInstance().RegistrarActivo(oActivo);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}