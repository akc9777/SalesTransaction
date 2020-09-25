using SalesTransaction.Application.Model.Sales;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Sales
{
    public interface ISalesService
    {
        dynamic AddSales(MvSales sales);
        dynamic EditSales(MvSales sales);
        dynamic GetSales(string json);
        dynamic GetAllSales();
    }
}
