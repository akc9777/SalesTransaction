using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Invoice;
using SalesTransaction.Application.Service.Invoice;
using SalesTransaction.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.Application.WebApi.Areas.Invoice
{
    public class InvoiceController : BaseController
    {
        private IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpPost]
        public IActionResult AddInvoice([FromBody] MvInvoice invoice)
        {
            try
            {
                dynamic jsonString = _invoiceService.CreateInvoice(invoice);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        [HttpGet]
        public IActionResult GetAllInvoice()
        {
            try
            {
                dynamic jsonString = _invoiceService.GetAllInvoice();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetInvoice(string json)
        {
            try
            {
                dynamic jsonString = _invoiceService.GetInvoice(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
