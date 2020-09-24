using Microsoft.Extensions.Configuration;
using SalesTransaction.Application.DataAccess;
using System;
using System.Data.SqlClient;
using System.Data;

namespace SalesTransaction.Application.Service.Product
{
    public class ProductService : IProductService
    {
        private string connectionString;
        private DataAccessHelper dah;

        public ProductService(IConfiguration config)
        {
            connectionString = config.GetConnectionString("DatabaseConnection");
            dah = new DataAccessHelper(connectionString);
        }
        public dynamic GetAllProduct()
        {
            using(var dbConnection = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = System.Data.CommandType.StoredProcedure;
                dbCommand.CommandText = "SpProductSelAll";

                using(SqlDataReader reader = dbCommand.ExecuteReader())
                {
                    try
                    {
                        if(reader.HasRows)
                        {
                            return dah.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch(Exception e)
                    {
                        throw e;
                    }
                }
            }
        }

    }
}
