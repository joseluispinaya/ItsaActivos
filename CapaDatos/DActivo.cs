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

        public Respuesta<int> RegistrarActivoNuev(EActivo activo)
        {
            try
            {
                int resultado = 0;  // Aquí almacenaremos el IdActivo devuelto
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarActivoCodb", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        // Agregar los parámetros de entrada
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
                        cmd.Parameters.AddWithValue("@CodBarra", activo.CodBarra);

                        // Parámetro de salida para obtener el IdActivo (resultado)
                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        // Abrir conexión y ejecutar el comando
                        con.Open();
                        cmd.ExecuteNonQuery();

                        // Obtener el valor del parámetro de salida (IdActivo)
                        resultado = Convert.ToInt32(outputParam.Value);
                    }
                }

                // Verificar si el resultado es válido
                return new Respuesta<int>
                {
                    Estado = resultado > 0,  // Si es mayor a 0, se registró correctamente
                    Valor = resultado.ToString(),       // Retornamos el IdActivo generado
                    Mensaje = resultado > 0 ? "Registro realizado correctamente." : "Error al registrar, intente más tarde."
                };
            }
            catch (Exception ex)
            {
                // En caso de error, devolver estado de fallo y el mensaje del error
                return new Respuesta<int>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error en BD: " + ex.Message
                };
            }
        }

        public bool ActualizarCod(int IdActi, string codbarr)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ActualizaCodBarra", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdActivo", IdActi);
                        cmd.Parameters.AddWithValue("@CodBarra", codbarr);

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
            }
            catch (Exception ex)
            {
                throw new Exception("Error al Actualizar Token. Intente más tarde.", ex);
            }

            return respuesta;
        }

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
                                    CodBarra = dr["CodBarra"].ToString(),
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

        public Respuesta<List<EActivo>> ObtenerActivosIdCarrera(int idCarrera)
        {
            try
            {
                List<EActivo> rptLista = new List<EActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerActivosIdCarrera", con))
                    {
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

        public Respuesta<List<EActivo>> ObtenerActivosIdGesItem(int idGestion, int idItem)
        {
            try
            {
                List<EActivo> rptLista = new List<EActivo>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerActivosPorIdGyIte", con))
                    {
                        comando.Parameters.AddWithValue("@IdGestion", idGestion);
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


        public Respuesta<EActivo> ConsultarActivo(int idActivo)
        {
            try
            {
                EActivo obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerActivosIdConsulta", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdActivo", idActivo);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EActivo
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
                                    CodBarra = dr["CodBarra"].ToString(),
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
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EActivo>
                {
                    Estado = obj != null,  // El operador ternario ya no es necesario aquí, `obj != null` es suficiente
                    Data = obj,
                    Mensaje = obj != null ? "Activo obtenido correctamente" : "Ocurrio un error al obtener el activo"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EActivo> ConsultarActivoCodigo(string codigo)
        {
            try
            {
                EActivo obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_BuscarActivoPorCodigo", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@Codigo", codigo);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EActivo
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
                                    CodBarra = dr["CodBarra"].ToString(),
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
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EActivo>
                {
                    Estado = obj != null,  // El operador ternario ya no es necesario aquí, `obj != null` es suficiente
                    Data = obj,
                    Mensaje = obj != null ? "Activo obtenido correctamente" : "Ocurrio un error al obtener el activo"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EActivo>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
