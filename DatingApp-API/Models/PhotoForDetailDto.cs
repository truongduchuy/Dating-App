using System;

namespace DatingApp_API.Models
{
    public class PhotoForDetailDto
    {
        public int Id { get;set;}
        public string Url {get;set;}
        public string Description {get;set;}
        public DateTime DateAdded {get;set;}
        public bool IsMain {get;set;}
    }
}