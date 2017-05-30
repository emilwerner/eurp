using Eurovision.Data;
using Eurovision.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Eurovision.Controllers
{   
    [RoutePrefix("api")]
    public class ServiceController : ApiController
    {
        [HttpGet, Route("artists")]
        public IEnumerable<Artist> Artists()
        {
            List<Artist> artists;

            using(var model = new EurovisionEntities())
            {
                artists = model.Artists.ToList();
            }

            return artists.OrderBy(r => r.Order);
        }

        [HttpPost, Route("vote")]
        public void Vote([FromBody] Vote vote)
        {
            using (var model = new EurovisionEntities())
            {
                vote.Id = Guid.NewGuid();
                model.Votes.Add(vote);
                model.SaveChanges();
            }
        }


        [HttpGet, Route("vote")]
        public IEnumerable<ArtistVoteModel> Vote()
        {
            var artists = Artists().Select(r => new ArtistVoteModel
            {
                Id = r.Id,
                NameCountry = r.Name + ", " + r.Country,
                Votes = 0
            });
            IEnumerable<Vote> votes;
            using (var model = new EurovisionEntities())
            {
                votes = model.Votes.ToList();
            }
      
            return ApplyVotesOnArtists(artists, votes).OrderByDescending(r => r.Votes).Take(5);
        }

        public IEnumerable<ArtistVoteModel> ApplyVotesOnArtists(IEnumerable<ArtistVoteModel> artists, IEnumerable<Vote> votes)
        {
            var artistList = artists.ToList();
            foreach (var vote in votes)
            {
                artistList.Single(r => r.Id.ToString() == vote.P12).Votes += 12;
                artistList.Single(r => r.Id.ToString() == vote.P10).Votes += 10;
                artistList.Single(r => r.Id.ToString() == vote.P8).Votes += 8;
                artistList.Single(r => r.Id.ToString() == vote.P7).Votes += 7;
                artistList.Single(r => r.Id.ToString() == vote.P6).Votes += 6;
                artistList.Single(r => r.Id.ToString() == vote.P5).Votes += 5;
                artistList.Single(r => r.Id.ToString() == vote.P4).Votes += 4;
                artistList.Single(r => r.Id.ToString() == vote.P3).Votes += 3;
                artistList.Single(r => r.Id.ToString() == vote.P2).Votes += 2;
                artistList.Single(r => r.Id.ToString() == vote.P1).Votes += 1;
            }
            return artistList;
        }
    }
}
