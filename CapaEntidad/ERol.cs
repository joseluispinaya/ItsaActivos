﻿using System;

namespace CapaEntidad
{
    public class ERol
    {
        public int IdRol { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
    }
}
