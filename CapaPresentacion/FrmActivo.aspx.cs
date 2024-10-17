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
                //bool qrCod = GeneraQrParaTodos();
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

        private static bool GeneraQrParaTodos()
        {
            bool respue = false;
            try
            {
                // Obtener la lista de todos los activos
                Respuesta<List<EActivo>> listaRespuesta = NActivo.GetInstance().ObtenerActivos();
                var listaActivos = listaRespuesta.Data;

                // Verificar que la lista no sea nula ni esté vacía
                if (listaActivos != null && listaActivos.Count > 0)
                {
                    foreach (var item in listaActivos)
                    {
                        // Si el activo no tiene un imageUrl asignado, generamos el QR y actualizamos
                        if (string.IsNullOrEmpty(item.CodBarra))
                        {
                            // Generar el contenido del QR
                            string contenido = $"Codigo: {item.Codigo}\n" +
                                               $"Gestion: {item.Gestion.Descripcion}\n" +
                                               $"Estado: {item.EstadoFisico.Descripcion}\n" +
                                               $"Item: {item.Item.Descripcion}\n" +
                                               $"Carrera: {item.Carrera.Descripcion}\n" +
                                               $"Descripcion: {item.Descripcion}";

                            // Generar el QR y obtener la URL de la imagen generada
                            string imageUrl = Utilidadesj.GetInstance().GenerarQrActivoIa(contenido);

                            // Si el QR fue generado con éxito, actualizar el registro en la base de datos
                            if (!string.IsNullOrEmpty(imageUrl))
                            {
                                respue = NActivo.GetInstance().ActualizarCod(item.IdActivo, imageUrl);

                                // Si la actualización falla, puedes manejar el error aquí
                                if (!respue)
                                {
                                    // Manejar el error o loggear que la actualización falló para este activo
                                    //Console.WriteLine($"Error al actualizar el QR para el activo con ID: {item.IdActivo}");
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                respue = false;
                // Loggear el error para análisis
                //Console.WriteLine("Ocurrió un error: " + ex.Message);
            }
            return respue;
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
        public static Respuesta<int> GuardarNuevo(EActivo oActivo)
        {
            try
            {
                var utilidades = Utilidadesj.GetInstance();
                oActivo.CodBarra = string.Empty;

                // Registrar el nuevo activo
                Respuesta<int> respuesta = NActivo.GetInstance().RegistrarActivoNuev(oActivo);

                if (!respuesta.Estado)
                {
                    return new Respuesta<int> { Estado = false, Mensaje = "Error al registrar. Intente más tarde." };
                }

                int idActivo = Convert.ToInt32(respuesta.Valor);

                // Obtener la lista de activos y buscar el recién registrado
                Respuesta<List<EActivo>> listaRespuesta = NActivo.GetInstance().ObtenerActivos();
                var item = listaRespuesta.Data?.FirstOrDefault(x => x.IdActivo == idActivo);

                if (item == null)
                {
                    return new Respuesta<int> { Estado = false, Mensaje = "No se encontró el activo recién registrado." };
                }

                // Generar el contenido del QR
                string contenido = $"Codigo: {item.Codigo}\n" +
                                   $"Gestion: {item.Gestion.Descripcion}\n" +
                                   $"Estado: {item.EstadoFisico.Descripcion}\n" +
                                   $"Item: {item.Item.Descripcion}\n" +
                                   $"Carrera: {item.Carrera.Descripcion}\n" +
                                   $"Descripcion: {item.Descripcion}";

                string imageUrl = utilidades.GenerarQrActivoIa(contenido);

                // Si se generó el QR correctamente, actualizar el código del activo
                if (!string.IsNullOrEmpty(imageUrl))
                {
                    bool actualizado = NActivo.GetInstance().ActualizarCod(item.IdActivo, imageUrl);
                    if (!actualizado)
                    {
                        return new Respuesta<int>
                        {
                            Estado = true,
                            Mensaje = "Registro exitoso, pero hubo un problema al actualizar el código QR.",
                            Valor = item.IdActivo.ToString()
                        };
                    }
                }

                return new Respuesta<int> 
                { 
                    Estado = true, 
                    Mensaje = "Registro realizado correctamente.",
                    Valor = item.IdActivo.ToString()
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        // sin usar por el momento
        [WebMethod]
        public static Respuesta<int> GuardarNuevoOri(EActivo oActivo)
        {
            try
            {
                var utilidades = Utilidadesj.GetInstance();
                var codVacio = string.Empty;
                string imageUrl = string.Empty;
                oActivo.CodBarra = codVacio;

                Respuesta<int> respuesta = NActivo.GetInstance().RegistrarActivoNuev(oActivo);
                var est = respuesta.Estado;
                if (est)
                {
                    var cod = respuesta.Valor;
                    int idActi = Convert.ToInt32(cod);


                    Respuesta<List<EActivo>> Lista = NActivo.GetInstance().ObtenerActivos();
                    var listaActivos = Lista.Data;
                    var item = listaActivos.FirstOrDefault(x => x.IdActivo == idActi);

                    // Armar el contenido del QR
                    string contenido = $"Codigo: {item.Codigo}\n" +
                                       $"Item: {item.Item.Descripcion}\n" +
                                       $"Carrera: {item.Carrera.Descripcion}\n" +
                                       $"Descripcion: {item.Descripcion}";

                    // Generar el QR usando el contenido GenerarQrActivoIa
                    imageUrl = utilidades.GenerarQrActivoIa(contenido);

                    if (!string.IsNullOrEmpty(imageUrl))
                    {
                        bool RespuTo = NActivo.GetInstance().ActualizarCod(item.IdActivo, imageUrl);
                        if (!RespuTo)
                        {
                            return new Respuesta<int> 
                            { 
                                Estado = true, 
                                Mensaje = "Se Realizo el Registro, pero hubo un problema al generar el QR" 
                            };
                        }
                    }

                    //return new Respuesta<int> { Estado = true, Mensaje = "Registro correcto" };
                }
                //else
                //{
                //    return new Respuesta<int> { Estado = false, Mensaje = "Ocurrió un error: " };
                //}

                return new Respuesta<int>
                {
                    Estado = est,
                    Mensaje = est ? "Se Realizo el Registro Correctamente" : "Error al registrar. Intente tarde."
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        // sin usar por el momento
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

        [WebMethod]
        public static Respuesta<EActivo> DetalleActivo(int IdActivo)
        {
            try
            {
                Respuesta<EActivo> oActivo = NActivo.GetInstance().ConsultarActivo(IdActivo);
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