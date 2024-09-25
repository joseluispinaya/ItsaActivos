using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DActivo
    {
        #region "PATRON SINGLETON"
        private static DActivo daoEmpleado = null;
        private DActivo() { }
        public static DActivo GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new DActivo();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarActivo(EActivo activo)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarActivo", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdGestion", activo.IdGestion);
                        cmd.Parameters.AddWithValue("@IdCarrera", activo.IdCarrera);
                        cmd.Parameters.AddWithValue("@IdEstado", activo.IdEstado);
                        cmd.Parameters.AddWithValue("@IdItem", activo.IdItem);
                        cmd.Parameters.AddWithValue("@Cantidad", activo.Cantidad);

                        cmd.Parameters.AddWithValue("@Descripcion", activo.Descripcion);
                        cmd.Parameters.AddWithValue("@Caracteristicas", activo.Caracteristicas);
                        cmd.Parameters.AddWithValue("@ValorActivo", activo.ValorActivo);
                        cmd.Parameters.AddWithValue("@Responsable", activo.Responsable);
                        cmd.Parameters.AddWithValue("@Ubicacion", activo.Ubicacion);
                        cmd.Parameters.AddWithValue("@Observacion", activo.Observacion);
                        cmd.Parameters.AddWithValue("@Total", activo.Total);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se Realizo el Registro Correctamente" : "Error al registrar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error BD: " + ex.Message };
            }
        }

        public Respuesta<List<EActivo>> ObtenerActivos()
        {
            try
            {
                List<EActivo> rptLista = new List<EActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerActivos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EActivo()
                                {
                                    IdActivo = Convert.ToInt32(dr["IdActivo"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    ValorCodigo = Convert.ToInt32(dr["ValorCodigo"]),
                                    IdGestion = Convert.ToInt32(dr["IdGestion"]),
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    IdEstado = Convert.ToInt32(dr["IdEstado"]),
                                    IdItem = Convert.ToInt32(dr["IdItem"]),
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    Descripcion = dr["DescripcionActivo"].ToString(),

                                    Caracteristicas = dr["Caracteristicas"].ToString(),
                                    ValorActivo = float.Parse(dr["ValorActivo"].ToString()),
                                    Responsable = dr["Responsable"].ToString(),
                                    Ubicacion = dr["Ubicacion"].ToString(),
                                    Observacion = dr["Observacion"].ToString(),
                                    Total = float.Parse(dr["Total"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    Gestion = new EGestion()
                                    {
                                        Descripcion = dr["DescripcionGestion"].ToString()
                                    },
                                    Carrera = new ECarrera()
                                    {
                                        Descripcion = dr["DescripcionCarrera"].ToString()
                                    },
                                    EstadoFisico = new EEstadoFisico()
                                    {
                                        Descripcion = dr["DescripcionEstado"].ToString()
                                    },
                                    Item = new EItem()
                                    {
                                        Descripcion = dr["DescripcionItem"].ToString()
                                    },
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Activos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EActivo>> ObtenerActivosIds(int idGestion, int idCarrera)
        {
            try
            {
                List<EActivo> rptLista = new List<EActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerActivosPorIds", con))
                    {
                        comando.Parameters.AddWithValue("@IdGestion", idGestion);
                        comando.Parameters.AddWithValue("@IdCarrera", idCarrera);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EActivo()
                                {
                                    IdActivo = Convert.ToInt32(dr["IdActivo"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    ValorCodigo = Convert.ToInt32(dr["ValorCodigo"]),
                                    IdGestion = Convert.ToInt32(dr["IdGestion"]),
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    IdEstado = Convert.ToInt32(dr["IdEstado"]),
                                    IdItem = Convert.ToInt32(dr["IdItem"]),
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    Descripcion = dr["DescripcionActivo"].ToString(),

                                    Caracteristicas = dr["Caracteristicas"].ToString(),
                                    ValorActivo = float.Parse(dr["ValorActivo"].ToString()),
                                    Responsable = dr["Responsable"].ToString(),
                                    Ubicacion = dr["Ubicacion"].ToString(),
                                    Observacion = dr["Observacion"].ToString(),
                                    Total = float.Parse(dr["Total"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    Gestion = new EGestion()
                                    {
                                        Descripcion = dr["DescripcionGestion"].ToString()
                                    },
                                    Carrera = new ECarrera()
                                    {
                                        Descripcion = dr["DescripcionCarrera"].ToString()
                                    },
                                    EstadoFisico = new EEstadoFisico()
                                    {
                                        Descripcion = dr["DescripcionEstado"].ToString()
                                    },
                                    Item = new EItem()
                                    {
                                        Descripcion = dr["DescripcionItem"].ToString()
                                    },
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Activos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<EActivo>> ObtenerActivosTresIds(int idGestion, int idCarrera, int idItem)
        {
            try
            {
                List<EActivo> rptLista = new List<EActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerActivosPorTresIds", con))
                    {
                        comando.Parameters.AddWithValue("@IdGestion", idGestion);
                        comando.Parameters.AddWithValue("@IdCarrera", idCarrera);
                        comando.Parameters.AddWithValue("@IdItem", idItem);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EActivo()
                                {
                                    IdActivo = Convert.ToInt32(dr["IdActivo"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    ValorCodigo = Convert.ToInt32(dr["ValorCodigo"]),
                                    IdGestion = Convert.ToInt32(dr["IdGestion"]),
                                    IdCarrera = Convert.ToInt32(dr["IdCarrera"]),
                                    IdEstado = Convert.ToInt32(dr["IdEstado"]),
                                    IdItem = Convert.ToInt32(dr["IdItem"]),
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    Descripcion = dr["DescripcionActivo"].ToString(),

                                    Caracteristicas = dr["Caracteristicas"].ToString(),
                                    ValorActivo = float.Parse(dr["ValorActivo"].ToString()),
                                    Responsable = dr["Responsable"].ToString(),
                                    Ubicacion = dr["Ubicacion"].ToString(),
                                    Observacion = dr["Observacion"].ToString(),
                                    Total = float.Parse(dr["Total"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    Gestion = new EGestion()
                                    {
                                        Descripcion = dr["DescripcionGestion"].ToString()
                                    },
                                    Carrera = new ECarrera()
                                    {
                                        Descripcion = dr["DescripcionCarrera"].ToString()
                                    },
                                    EstadoFisico = new EEstadoFisico()
                                    {
                                        Descripcion = dr["DescripcionEstado"].ToString()
                                    },
                                    Item = new EItem()
                                    {
                                        Descripcion = dr["DescripcionItem"].ToString()
                                    },
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EActivo>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Activos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EActivo>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
