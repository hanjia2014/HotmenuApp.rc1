using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace HotmenuApp.Models
{
    public class Administrator
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Username is Mandatory")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Password is Mandatory")]
        public string Password { get; set; }
    }
}