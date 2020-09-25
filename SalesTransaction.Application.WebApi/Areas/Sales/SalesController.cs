using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Sales;
using SalesTransaction.Application.Service.Sales;
using SalesTransaction.Application.WebApi.Areas.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesTransaction.Application.WebApi.Areas.Sales
{
    public class SalesController : BaseController
    {
        private ISalesService _salesService;

        public SalesController(ISalesService salesService)
        {
            _salesService = salesService;
        }

        [HttpPost]
        public IActionResult AddSales([FromBody] MvSales sales)
        {
            try
            {
                dynamic jsonString = _salesService.AddSales(sales);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public IActionResult EditSales([FromBody] MvSales sales)
        {
            try
            {
                dynamic jsonString = _salesService.EditSales(sales);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult SalesDetail(string json)
        {
            try
            {
                dynamic jsonString = _salesService.GetSales(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetAllSales()
        {
            try
            {
                dynamic jsonString = _salesService.GetAllSales();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
