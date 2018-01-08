package org.hyouman.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.hyouman.services.UserAccountService;
import org.hyouman.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
@Path("/userAccount")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class UserAccountController 
{
	@Autowired
	UserAccountService service;
	
	@GET
	public String func()
	{
		return "Working!!";
	}
	
	@GET
	@Path("/authenticateUser")
	public String authenticateUser(@QueryParam("email") String email, @QueryParam("password") String password)
	{
		return service.getUserAccount(email, password);
	}

}
