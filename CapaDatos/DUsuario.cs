using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class DUsuario
    {
        #region "PATRON SINGLETON"
        public static DUsuario _instancia = null;

        private DUsuario()
        {

        }

        public static DUsuario GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DUsuario();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> Registrar(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
                        cmd.Parameters.AddWithValue("@IdRol", oUsuario.IdRol);
                        cmd.Parameters.AddWithValue("@TokenSesion", oUsuario.TokenSesion);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarUsuario(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUsuario", oUsuario.IdUsuario);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
                        cmd.Parameters.AddWithValue("@IdRol", oUsuario.IdRol);
                        cmd.Parameters.AddWithValue("@Activo", oUsuario.Estado);

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
                    Mensaje = respuesta ? "Se Actualizo correctamente" : "Error al Actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EUsuario>> ObtenerUsuariosZ()
        {
            try
            {
                List<EUsuario> rptLista = new List<EUsuario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerUsuario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EUsuario()
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Foto = dr["Foto"].ToString(),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Orol = new ERol() { Descripcion = dr["DescripcionRol"].ToString() },
                                    Estado = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Usuarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public bool ActualizarToken(int IdUsu, string token)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ActualizaToken", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUsuario", IdUsu);
                        cmd.Parameters.AddWithValue("@TokenSesion", token);

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

        public string ObtenerToken(int IdUsu)
        {
            var tokenSesion = string.Empty;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ConsultaToken", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUsuario", IdUsu);
                        SqlParameter outputParam = new SqlParameter("@TokenSesion", SqlDbType.NVarChar, 60)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        tokenSesion = outputParam.Value.ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al traer token.", ex);
            }

            return tokenSesion;
        }

        public Respuesta<EUsuario> LoginUsuario(string usuario, string clave)
        {
            try
            {
                EUsuario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("sp_LogeoUsua", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@Correo", usuario);
                        comando.Parameters.AddWithValue("@Clave", clave);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EUsuario
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Foto = dr["Foto"].ToString(),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Estado = Convert.ToBoolean(dr["Activo"]),
                                    Orol = new ERol { Descripcion = dr["Descripcion"].ToString() }
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EUsuario>
                {
                    Estado = obj != null,  // El operador ternario ya no es necesario aquí, `obj != null` es suficiente
                    Data = obj,
                    Mensaje = obj != null ? "Login exitoso" : "Credenciales incorrectas"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
