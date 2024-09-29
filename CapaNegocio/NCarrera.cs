using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCarrera
    {
        #region "PATRON SINGLETON"
        private static NCarrera daoEmpleado = null;
        private NCarrera() { }
        public static NCarrera GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NCarrera();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<List<ECarrera>> ObtenerCarreras()
        {
            return DCarrera.GetInstance().ObtenerCarreras();
        }

        public Respuesta<List<EItem>> ObtenerItems()
        {
            return DCarrera.GetInstance().ObtenerItems();
        }

        public Respuesta<List<EGestion>> ObtenerGestiones()
        {
            return DCarrera.GetInstance().ObtenerGestiones();
        }

        public Respuesta<List<EEstadoFisico>> ObtenerEstadosFisi()
        {
            return DCarrera.GetInstance().ObtenerEstadosFisi();
        }

        public Respuesta<List<ERol>> ObtenerRoles()
        {
            return DCarrera.GetInstance().ObtenerRoles();
        }
    }
}
