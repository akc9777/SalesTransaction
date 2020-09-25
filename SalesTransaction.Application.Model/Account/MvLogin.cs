using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Model
{
    public class MvLogin
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string InsertPersonId { get; set; }
    }
}
