using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class FrmConfiguracion : System.Web.UI.Page
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
        public static Respuesta<bool> RegistrarGestion(EGestion eGestion)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().RegistrarGestion(eGestion);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarGestion(EGestion eGestion)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().ActualizarGestion(eGestion);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EliminarGestion(int idGes)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().EliminarGestion(idGes);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        //metodos de item
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
        public static Respuesta<bool> Guardar(EItem eItem)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().Registrar(eItem);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(EItem eItem)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().Actualizar(eItem);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int idItem)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().Eliminar(idItem);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<List<ECarrera>> ObtenerCarreras()
        {
            try
            {
                Respuesta<List<ECarrera>> Lista = NCarrera.GetInstance().ObtenerCarreras();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECarrera>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los Items: " + ex.Message,
                    Data = null
                };
            }
        }


        [WebMethod]
        public static Respuesta<bool> RegistrarCarrera(ECarrera eCarrera)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().RegistrarCarrera(eCarrera);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarCarrera(ECarrera eCarrera)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().ActualizarCarrera(eCarrera);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EliminarCarrera(int idCare)
        {
            try
            {
                Respuesta<bool> respuesta = NItem.GetInstance().EliminarCarrera(idCare);

                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}