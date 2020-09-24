using SalesTransaction.Application.WebApi.Areas.Base;
using SalesTransaction.Application.Service.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model.Product;

namespace SalesTransaction.Application.WebApi.Areas.Product
{
    public class ProductController : BaseController
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAllProduct()
        {
            try 
            {
                dynamic jsonString = _productService.GetAllProduct();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] MvProduct product)
        {
            try
            {
                dynamic jsonString = _productService.AddProduct(product);
                return Ok(jsonString);
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    
        [HttpGet]
        public IActionResult GetProductDetail(string json)
        {
            try
            {
                dynamic jsonString = _productService.GetProductDetail(json);
                return Ok(jsonString);
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public IActionResult EditProduct([FromBody] MvProduct product)
        {
            try
            {
                dynamic jsonString = _productService.EditProduct(product);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
