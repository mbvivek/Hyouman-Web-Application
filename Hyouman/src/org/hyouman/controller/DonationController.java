package org.hyouman.controller;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.hyouman.model.DonationModel;
import org.hyouman.model.UserModel;
import org.hyouman.services.DonationService;
import org.hyouman.services.UserAccountService;
import org.hyouman.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;

@Controller
@Path("/donation")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class DonationController 
{	
	@Autowired
	DonationService service;
	
	@GET
	public String func()
	{
		return "Working!!";
	}
	
	@GET
	@Path("/getAllDonations")
	public String getDonation()
	{
		ArrayList<DonationModel> donationModels = service.getAllDonations();
		return new Gson().toJson(donationModels).toString();
	}
	
	@GET
	@Path("/getDonation")
	public String getDonation(@QueryParam("donationId") Integer id)
	{
		DonationModel donationModel = service.getDonation(id);
		return new Gson().toJson(donationModel).toString();
	}
	
	@GET
	@Path("/getUserDonations")
	public String getUserDonations(@QueryParam("userEmail") String userEmail)
	{
		ArrayList<DonationModel> donationModels = service.getUserDonations(userEmail);
		return new Gson().toJson(donationModels).toString();
	}
	
	@GET
	@Path("/getStoryDonations")
	public String getStoryDonations(@QueryParam("storyId") Integer storyId)
	{
		ArrayList<DonationModel> donationModels = service.getStoryDonations(storyId);
		return new Gson().toJson(donationModels).toString();
	}
	
	@POST
	@Path("/addDonation")
	public String addDonation(DonationModel donationModel)
	{
		System.out.println("addDonation = "+new Gson().toJson(donationModel));
		try
		{
			service.addDonation(donationModel);
			return(new Gson().toJson(true));
		}
		catch (Exception e)
		{
			System.out.println("exception in addDonation");
			e.printStackTrace();
			return(new Gson().toJson(false));
		}
	}

}
