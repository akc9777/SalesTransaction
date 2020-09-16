using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Data;
using SalesTransaction.Application.DataAccess;
using SalesTransaction.Application.Model;
using SalesTransaction.Application.Service.Account;

namespace SalesTransaction.Application.Service
{

    public class AccountService : IAccountService
    {
        private DataAccessHelper dah;

        public AccountService() 
        {
            //make db connection
            dah = new DataAccessHelper();
        }
        
        public dynamic GetLogin(MvLogin login)
        {
            using(var dbConnection = dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpCustomerAuth";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"customerId\":\"" + login.CustomerId + "\", \"password\":\"" + login.Password + "\"}";

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
                dbCommand.CommandText = "SpPersonSel";
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
    }
}
