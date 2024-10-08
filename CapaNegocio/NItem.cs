using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NItem
    {
        #region "PATRON SINGLETON"
        public static NItem _instancia = null;

        private NItem()
        {

        }

        public static NItem GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new NItem();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarCarrera(ECarrera oUsuario)
        {
            return DItem.GetInstance().RegistrarCarrera(oUsuario);
        }

        public Respuesta<bool> ActualizarCarrera(ECarrera oUsuario)
        {
            return DItem.GetInstance().ActualizarCarrera(oUsuario);
        }

        public Respuesta<bool> EliminarCarrera(int idCare)
        {
            return DItem.GetInstance().EliminarCarrera(idCare);
        }
        //metos item
        public Respuesta<bool> Registrar(EItem oUsuario)
        {
            return DItem.GetInstance().Registrar(oUsuario);
        }

        public Respuesta<bool> Actualizar(EItem oUsuario)
        {
            return DItem.GetInstance().Actualizar(oUsuario);
        }

        public Respuesta<bool> Eliminar(int idItem)
        {
            return DItem.GetInstance().Eliminar(idItem);
        }

        //metodos para gestion

        public Respuesta<bool> RegistrarGestion(EGestion oUsuario)
        {
            return DItem.GetInstance().RegistrarGestion(oUsuario);
        }

        public Respuesta<bool> ActualizarGestion(EGestion oUsuario)
        {
            return DItem.GetInstance().ActualizarGestion(oUsuario);
        }

        public Respuesta<bool> EliminarGestion(int idGes)
        {
            return DItem.GetInstance().EliminarGestion(idGes);
        }
    }
}
