using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EActivo
    {
        public int IdActivo { get; set; }
        public string Codigo { get; set; }
        public int ValorCodigo { get; set; }
        public int IdGestion { get; set; }
        public int IdCarrera { get; set; }
        public int IdEstado { get; set; }
        public int IdItem { get; set; }
        public int Cantidad { get; set; }
        public string Descripcion { get; set; }
        public string Caracteristicas { get; set; }
        public float ValorActivo { get; set; }
        public string Responsable { get; set; }
        public string Ubicacion { get; set; }
        public string Observacion { get; set; }
        public float Total { get; set; }
        public bool Activo { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public EGestion Gestion { get; set; }
        public ECarrera Carrera { get; set; }
        public EEstadoFisico EstadoFisico { get; set; }
        public EItem Item { get; set; }
        
    }
}
