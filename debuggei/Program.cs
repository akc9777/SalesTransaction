using System;
using System.Data;
using SalesTransaction.Application.DataAccess;

namespace debuggei
{
    class Program
    {
        static void Main(string[] args)
        {
            TestDbConnection();
        }
         private static void TestDbConnection()
        {
            DataAccessHelper dah = new DataAccessHelper();
            dah.GetConnection();
        }
    }
}
