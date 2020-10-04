using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WarwickWordCount.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordOccurenceController : ControllerBase
    {
        [HttpPost]
        [EnableCors]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Post([FromBody]OccurenceRequest request)
        {
            if (request == null)
                return BadRequest(new
                {
                    Error = "Invalid request: Request body empty"
                });
            
            if (string.IsNullOrWhiteSpace(request.Word) || string.IsNullOrWhiteSpace(request.Sentence))
                return Ok(new OccurenceResponse
                {
                    Count = 0
                });
            int count = 0;
            if (request.isCaseSensitive)
            {
                var word = request.Word.ToLower();
                count = request.Sentence.ToLower().Split(" ").Count(x => x == word);
            }
            else
            {
                count = request.Sentence.Split(" ").Count(x => x == request.Word);
            }

            return Ok(new OccurenceResponse
            {
                Count = count
            });
        }
    }

    public class OccurenceRequest
    {
        public string Word { get; set; }
        public string Sentence { get; set; }
        public bool isCaseSensitive { get; set; }
    }

    public class OccurenceResponse
    {
        public int Count { get; set; }
    }
}
