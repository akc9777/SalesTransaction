using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Data;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model;
using SalesTransaction.Application.Service.Account;
using Microsoft.Extensions.Configuration;

namespace SalesTransaction.Application.Service
{

    public class AccountService : IAccountService
    {
        private string connectionString;
        private DataAccessHelper dah;

        public AccountService(IConfiguration config) 
        {
            connectionString = config.GetConnectionString("DatabaseConnection");
            //make db connection
            dah = new DataAccessHelper(connectionString);
        }
        
        public dynamic GetLogin(MvLogin login)
        {
            using(var dbConnection = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpCustomerAuth";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"username\":\"" + login.Username + "\", \"password\":\"" + login.Password + "\"}";

                using SqlDataReader reader = dbCommand.ExecuteReader();
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

        public dynamic GetUserDetail(string json)
        {
            using (var dbConnection = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand(); 
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpCustomerSel4ui";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = json;

                using (SqlDataReader reader = dbCommand.ExecuteReader())
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
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }  
        }

        public dynamic GetAllUserDetail()
        {
            using(var dbConnection  = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpCustomerSelAll";

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
        public dynamic AddUser(MvLogin login)
        {
            using( var dbConnection = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpCustomerIns";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"firstName\":\"" + login.FirstName + "\"," +
                                                       "\"middleName\":\"" + login.MiddleName + "\"," +
                                                       "\"lastName\":\"" + login.LastName + "\"," +
                                                       "\"username\":\"" + login.Username + "\"," +
                                                       "\"password\":\"" + login.Password + "\"," +
                                                       "\"email\":\"" + login.Email + "\"," +
                                                       "\"mobile\":\"" + login.Mobile + "\"," +
                                                       "\"insertPersonId\": " + login.InsertPersonId + "}";

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
        public dynamic EditUser(MvLogin login)
        {
            using (var dbConnection = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpCustomerUpd";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"firstName\":\"" + login.FirstName + "\"," +
                                                       "\"customerId\":" + login.CustomerId + "," +
                                                       "\"middleName\":\"" + login.MiddleName + "\"," +
                                                       "\"lastName\":\"" + login.LastName + "\"," +
                                                       "\"username\":\"" + login.Username + "\"," +
                                                       "\"password\":\"" + login.Password + "\"," +
                                                       "\"email\":\"" + login.Email + "\"," +
                                                       "\"mobile\":\"" + login.Mobile + "\"," +
                                                       "\"insertPersonId\": " + login.InsertPersonId + "}";

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
    }
}
