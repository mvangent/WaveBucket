using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace Senken.Models
{
    public class InstrumentSetup
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int InstrumentSetupID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }

        public virtual ICollection<Session> Sessions { get; set; }
    }
}