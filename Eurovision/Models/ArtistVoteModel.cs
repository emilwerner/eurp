using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Eurovision.Models
{
    public class ArtistVoteModel
    {
        public Guid Id { get; set; }
        public string NameCountry { get; set; }
        public int Votes { get; set; }
    }
}