using System.Linq;
using System.Threading.Tasks;
using DatingAppAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {

        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }

        //GET api/values
        [HttpGet] 
        public async Task<IActionResult> GetValues() {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        } 

        //GET api/values/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id) {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);
        }
    }
}