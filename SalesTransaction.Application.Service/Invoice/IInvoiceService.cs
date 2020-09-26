using SalesTransaction.Application.Model.Invoice;
using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        dynamic CreateInvoice(MvInvoice invoice);
        dynamic GetInvoice(string json);
        dynamic GetAllInvoice();
    }
}
