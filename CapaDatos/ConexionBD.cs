using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBD
    {
        #region "PATRON SINGLETON"
        public static ConexionBD conexion = null;

        public ConexionBD() { }

        public static ConexionBD GetInstance()
        {
            if (conexion == null)
            {
                conexion = new ConexionBD();
            }
            return conexion;
        }
        #endregion

        public SqlConnection ConexionDB()
        {
            SqlConnection conexion = new SqlConnection
            {
                //ConnectionString = "Data Source=AQUI PON TU CONEXION DE TU SQL;Initial Catalog=ActivosItsa;Integrated Security=True"
                ConnectionString = "Data Source=.;Initial Catalog=ActivosItsa;Integrated Security=True"
            };

            return conexion;
        }
    }
}
