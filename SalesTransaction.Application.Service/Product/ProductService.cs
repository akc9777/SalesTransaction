using Microsoft.Extensions.Configuration;
using SalesTransaction.Application.DataAccess;
using System;
using System.Data.SqlClient;
using System.Data;
using SalesTransaction.Application.Model.Product;

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
        public dynamic AddProduct(MvProduct product)
        {
            using(var dbConnection = dah.GetConnection()) 
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpProductIns";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"name\":\"" + product.Name + "\"," +
                                                       "\"rate\":\"" + product.Rate + "\"," +
                                                       "\"description\":\"" + product.Description + "\"," +
                                                       "\"insertPersonId\":\"" + product.InsertPersonId + "\"," +
                                                       "\"remainingQuantity\":\"" + product.RemainingQuantity + "\"}";

                using( SqlDataReader reader = dbCommand.ExecuteReader())
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
        public dynamic EditProduct(MvProduct product)
        {
            using (var dbConnection = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpProductUpd";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"productId\":\"" + product.ProductId + "\"," +
                                                       "\"name\":\"" + product.Name + "\"," +
                                                       "\"rate\":\"" + product.Rate + "\"," +
                                                       "\"description\":\"" + product.Description + "\"," +
                                                       "\"insertPersonId\":\"" + product.InsertPersonId + "\"," +
                                                       "\"remainingQuantity\":\"" + product.RemainingQuantity + "\"}";

                using (SqlDataReader reader = dbCommand.ExecuteReader())
                {
                    try
                    {
                        if (reader.HasRows)
                        {
                            return dah.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }
        public dynamic GetProductDetail(string json)
        {
            using(var dbConnection= dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = json;

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
