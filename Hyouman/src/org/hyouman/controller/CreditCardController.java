package org.hyouman.controller;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.hyouman.model.CreditCardModel;
import org.hyouman.model.UserModel;
import org.hyouman.services.CreditCardService;
import org.hyouman.services.UserAccountService;
import org.hyouman.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;

@Controller
@Path("/creditCard")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class CreditCardController 
{	
	@Autowired
	CreditCardService creditCardService;
	
	@GET
	public String func()
	{
		return "Working!!";
	}
	
	@GET
	@Path("/getCreditCards")
	public String getCreditCards(@QueryParam("email") String email)
	{
		ArrayList<CreditCardModel> cards = creditCardService.getCreditCards(email);
		return new Gson().toJson(cards).toString();
	}
	
	@POST
	@Path("/addCreditCard")
	public String addCreditCard(CreditCardModel card)
	{
		try
		{	
			creditCardService.addCreditCard(card);
			return new Gson().toJson(true).toString();
		}
		catch(Exception e)
		{
			System.out.println("exception in addCreditCard");
			return new Gson().toJson(false).toString();
		}
	}
	
	@POST
	@Path("/deleteCreditCard")
	public String deleteCreditCard(CreditCardModel card)
	{	
		System.out.println("deleteCreditCard = "+new Gson().toJson(card));
		try
		{	
			creditCardService.deleteCreditCard(card);
			return new Gson().toJson(true).toString();
		}
		catch(Exception e)
		{
			System.out.println("exception in deleteCreditCard");
			return new Gson().toJson(false).toString();
		}
	}

}
