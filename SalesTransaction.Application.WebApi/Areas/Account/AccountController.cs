﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SalesTransaction.Application.Model;
using SalesTransaction.Application.Service.Account;
using SalesTransaction.Application.WebApi.Areas.Base;


namespace SalesTransaction.Application.WebApi.Areas.Account
{
    public class AccountController : BaseController
    {
        private IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] MvLogin login)
        {
            try
            {
                dynamic jsonString = accountService.GetLogin(login);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult UserDetail(string json)
        {
            try
            {
                dynamic jsonString = accountService.GetUserDetail(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
