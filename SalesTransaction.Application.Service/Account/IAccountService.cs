using SalesTransaction.Application.Model;

namespace SalesTransaction.Application.Service.Account
{
    public interface IAccountService
    {
        dynamic GetLogin(MvLogin login);
        dynamic GetUserDetail(string json);
        dynamic GetAllUserDetail();
        dynamic AddUser(MvLogin login);
        dynamic EditUser(MvLogin login);
    }
}
