using Senken.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Senken.RepositoryPattern
{
    public interface ISessionRepository
    {
        Task<ApplicationUser> GetCurrentUser();
        IEnumerable<Session> SelectAll();
        Task<Session> SelectByID(int id);
        Task<ApplicationUser> Insert(Session obj);
        Task<bool> Update(ApplicationUser obj);
        Task<ApplicationUser> Delete(Session id);
        Task<bool> Save();
    }
}
