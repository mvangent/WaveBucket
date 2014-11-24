using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Senken.Models
{
    public class Musician
    {
        public int ID { get; set; }
        public String LastName { get; set; }
        public String FirstMidName { get; set; }
        public DateTime SessionDate { get; set; }

        public virtual ICollection<Session> Sessions { get; set; }
    }
}