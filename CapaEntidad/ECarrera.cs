using System;
using System.Collections.Generic;

namespace CapaEntidad
{
    public class ECarrera
    {
        public int IdCarrera { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }

        public List<EActivo> ListaActivos { get; set; }
    }
}
