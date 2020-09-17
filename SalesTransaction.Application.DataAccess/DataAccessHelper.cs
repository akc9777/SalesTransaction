using System;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace SalesTransaction.Application.DataAccess 
{
    public class DataAccessHelper
    {
        private SqlConnection dbConnection;
        private string dbConnectionString;
        
        
        public DataAccessHelper(string dbConnectionString)
        {
            this.dbConnectionString = dbConnectionString;
        }
        
        public SqlConnection GetConnection() 
        {
            try
            {
                SetConnection();
                return dbConnection;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public void SetConnection()
        {
            dbConnection = new SqlConnection(dbConnectionString);
            if(dbConnection.State == ConnectionState.Closed)
            {
                dbConnection.Open();
            }
            else
            {
                dbConnection.Close();
                dbConnection.Open();
            }
        }

        public dynamic GetJson(SqlDataReader reader)
        {
            var dataSet = new DataTable();
            dataSet.Load(reader);

            if(dataSet.Rows[0] != null && 
                dataSet.Rows[0]["Json"].ToString() != "")
            {
                return JsonConvert.DeserializeObject(dataSet.Rows[0]["Json"].ToString());
            }
            else
            {
                return null;
            }
        }
    }
}