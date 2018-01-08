package org.hyouman.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.hyouman.model.UserModel;
import org.hyouman.services.UserAccountService;
import org.hyouman.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;

@Controller
@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class UserController 
{	
	@Autowired
	UserService service;
	
	@Autowired
	UserAccountService userAccountService;
	
	@GET
	public String func()
	{
		return "Working!!";
	}
	
	@GET
	@Path("/getUser")
	public String getUser(@QueryParam("email") String email)
	{
		UserModel userModel = service.getUser(email);
		return new Gson().toJson(userModel).toString();
	}
	
	@POST
	@Path("/setUser")
	public String setUser(UserModel user)
	{
		if(service.setUser(user) == true)
			return new Gson().toJson(true).toString();
		else
			return new Gson().toJson(false).toString();
	}
	
	@POST
	@Path("/updateUser")
	public String updateUser(UserModel user)
	{
		System.out.println("updateUser = "+new Gson().toJson(user));
		String email = user.getEmail();
		service.updateUser(user);
		return new Gson().toJson(service.getUser(email)).toString();
	}

}
