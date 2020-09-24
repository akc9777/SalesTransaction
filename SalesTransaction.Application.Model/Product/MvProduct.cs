using System;
using System.Collections.Generic;
using System.Text;

namespace SalesTransaction.Application.Model.Product
{
    public class MvProduct
    {
        public string ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rate { get; set; }
        public int RemainingQuantity { get; set; }
        public int InsertPersonId { get; set; }
    }
}
