using SalesTransaction.Application.Model;

namespace SalesTransaction.Application.Service
{
    public interface IAccountService
    {
        dynamic GetLogin(MvLogin login);
        dynamic GetUserDetail(string json);
    }
}
