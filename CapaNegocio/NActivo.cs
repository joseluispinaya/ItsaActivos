using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NActivo
    {
        #region "PATRON SINGLETON"
        private static NActivo daoEmpleado = null;
        private NActivo() { }
        public static NActivo GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NActivo();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarActivo(EActivo activo)
        {
            return DActivo.GetInstance().RegistrarActivo(activo);
        }
        public Respuesta<List<EActivo>> ObtenerActivos()
        {
            return DActivo.GetInstance().ObtenerActivos();
        }

        public Respuesta<List<EActivo>> ObtenerActivosIds(int idGestion, int idCarrera)
        {
            return DActivo.GetInstance().ObtenerActivosIds(idGestion, idCarrera);
        }

        public Respuesta<List<EActivo>> ObtenerActivosTresIds(int idGestion, int idCarrera, int idItem)
        {
            return DActivo.GetInstance().ObtenerActivosTresIds(idGestion, idCarrera, idItem);
        }

        public Respuesta<List<EItem>> ObtenerActivosIdsRpt(int idGestion, int idCarrera)
        {
            try
            {
                List<EItem> rptListaCompleta = new List<EItem>();

                Respuesta<List<EItem>> ListaItems = DCarrera.GetInstance().ObtenerItems();
                var ListaItm = ListaItems.Data;

                Respuesta<List<EActivo>> Lista = DActivo.GetInstance().ObtenerActivosIds(idGestion, idCarrera);
                var listafi = Lista.Data;

                foreach (var item in ListaItm)
                {
                    var activosEnItem = listafi.Where(act => act.IdItem == item.IdItem).ToList();

                    rptListaCompleta.Add(new EItem()
                    {
                        IdItem = item.IdItem,
                        Descripcion = item.Descripcion,
                        FechaRegistro = item.FechaRegistro,
                        Activo = item.Activo,
                        ListaActivos = activosEnItem
                    });
                }
                return new Respuesta<List<EItem>>()
                {
                    Estado = true,
                    Data = rptListaCompleta,
                    Mensaje = "Items obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EItem>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EItem>> ObtenerActivosIdsRptIa(int idGestion, int idCarrera)
        {
            try
            {
                // Obtener los items siempre retorna datos
                Respuesta<List<EItem>> ListaItems = DCarrera.GetInstance().ObtenerItems();
                var ListaItm = ListaItems.Data;

                // Obtener los activos puede retornar null o una lista vacía
                Respuesta<List<EActivo>> Lista = DActivo.GetInstance().ObtenerActivosIds(idGestion, idCarrera);
                var listafi = Lista?.Data ?? new List<EActivo>(); // Si Lista.Data es null, inicializa como lista vacía

                // Crear la lista completa de EItem, con los activos filtrados
                List<EItem> rptListaCompleta = ListaItm.Select(item => new EItem
                {
                    IdItem = item.IdItem,
                    Descripcion = item.Descripcion,
                    FechaRegistro = item.FechaRegistro,
                    Activo = item.Activo,
                    ListaActivos = listafi.Where(act => act.IdItem == item.IdItem).ToList() // Filtrar activos por IdItem
                }).ToList();

                return new Respuesta<List<EItem>>()
                {
                    Estado = true,
                    Data = rptListaCompleta,
                    Mensaje = "Items obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Devolver un mensaje de error detallado
                return new Respuesta<List<EItem>>()
                {
                    Estado = false,
                    Mensaje = $"Ocurrió un error en ObtenerActivosIdsRpt: {ex.Message}",
                    Data = null
                };
            }
        }
    }
}
