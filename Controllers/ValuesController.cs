using System.Linq;
using DatingAppAPI.Data;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetValues() {
            var values = _context.Values.ToList();
            return Ok(values);
        } 

        //GET api/values/2
        [HttpGet("{id}")]
        public IActionResult GetValue(int id) {
            var value = _context.Values.FirstOrDefault(x => x.Id == id);
            return Ok(value);
        }
    }
}