using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace Senken.ViewModels
{
    public class SessionDateGroup
    {
        [DataType(DataType.Date)]
        public DateTime? SessionDate { get; set; }

        public int MusicianCount { get; set; }
    }
}