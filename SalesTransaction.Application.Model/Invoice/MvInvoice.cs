using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Model.Invoice
{
    public class MvInvoice
    {
        public int InvoiceId { get; set; }
        public string Sales { get; set; }
        public int CustomerId { get; set; }
    }
}
