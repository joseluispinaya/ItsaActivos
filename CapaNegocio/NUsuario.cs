using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUsuario
    {
        #region "PATRON SINGLETON"
        private static NUsuario daoEmpleado = null;
        private NUsuario() { }
        public static NUsuario GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUsuario();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> Registrar(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().Registrar(oUsuario);
        }

        public Respuesta<bool> ActualizarUsuario(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().ActualizarUsuario(oUsuario);
        }

        public Respuesta<List<EUsuario>> ObtenerUsuariosZ()
        {
            return DUsuario.GetInstance().ObtenerUsuariosZ();
        }

        public bool ActualizarToken(int IdUsu, string token)
        {
            return DUsuario.GetInstance().ActualizarToken(IdUsu, token);
        }

        public string ObtenerToken(int IdUsu)
        {
            return DUsuario.GetInstance().ObtenerToken(IdUsu);
        }

        public Respuesta<EUsuario> LoginUsuario(string usuario, string clave)
        {
            return DUsuario.GetInstance().LoginUsuario(usuario, clave);
        }
    }
}
