using System;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace SalesTransaction.Application.DataAccess 
{
    public class DataAccessHelper
    {
        private SqlConnection _dbConnection;
        private string _dbConnectionString = "Data Source=10.6.0.246; Initial Catalog=Abhishek;User id=intern;Password=intern001";
        
        public SqlConnection GetConnection() 
        {
            try
            {
                SetConnection();
                return _dbConnection;
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public void SetConnection()
        {
            _dbConnection = new SqlConnection(_dbConnectionString);
            if(_dbConnection.State == ConnectionState.Closed)
            {
                _dbConnection.Open();
            }
            else
            {
                _dbConnection.Close();
                _dbConnection.Open();
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