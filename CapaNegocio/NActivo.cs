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
    }
}
