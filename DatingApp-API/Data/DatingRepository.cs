using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp_API.Models;
using DatingAppAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace DatingApp_API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(_ => _.Photos).FirstOrDefaultAsync(_ => _.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(_ => _.Photos).ToListAsync();
            return users;       
       }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetPhoto(int id) 
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<Photo> GetMainPhotoForUser(int userId) 
        {
            return await _context.Photos
                .Where(u => u.UserId == userId).FirstOrDefaultAsync(_ => _.IsMain);
        }
    }
}