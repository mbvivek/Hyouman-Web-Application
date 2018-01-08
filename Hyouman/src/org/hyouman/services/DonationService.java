package org.hyouman.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.hyouman.dao.Dao;
import org.hyouman.entities.Donation;
import org.hyouman.model.CreditCardModel;
import org.hyouman.model.DonationModel;
import org.hyouman.model.StoryModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonationService {
	
	@Autowired
	Dao dao;
	
	//get all donations
	public ArrayList<DonationModel> getAllDonations()
	{
		ArrayList<Donation> donations = dao.getAllDonations();
		ArrayList<DonationModel> donationModels = new ArrayList<>();
		for(Donation donation : donations)
		{
			DonationModel donationModel = new DonationModel();
			donationModel.setId(donation.getId());
			donationModel.setUserEmail(donation.getUser().getEmail());
			donationModel.setStoryId(donation.getStory().getId());
			if(donation.getCreditCard() != null)
				donationModel.setCreditCardId(donation.getCreditCard().getId());
			if(donation.getAmount() != null)
				donationModel.setAmount(donation.getAmount());
			donationModel.setStatus(donation.getStatus());
			donationModel.setInitiatedDate(donation.getInitiatedDate());
			donationModel.setCompletedDate(donation.getCompletedDate());
			donationModels.add(donationModel);
		}
		return donationModels;
	}
		
	//get a donation
	public DonationModel getDonation(int id)
	{
		Donation donation = dao.getDonation(id);
		DonationModel donationModel = new DonationModel();
		if(donation != null)
		{
			donationModel.setId(donation.getId());
			donationModel.setUserEmail(donation.getUser().getEmail());
			donationModel.setStoryId(donation.getStory().getId());
			if(donation.getCreditCard() != null)
				donationModel.setCreditCardId(donation.getCreditCard().getId());
			if(donation.getAmount() != null)
				donationModel.setAmount(donation.getAmount());
			donationModel.setStatus(donation.getStatus());
			donationModel.setInitiatedDate(donation.getInitiatedDate());
			donationModel.setCompletedDate(donation.getCompletedDate());
		}
		return donationModel;
	}
	
	//get all donations made by a user
	public ArrayList<DonationModel> getUserDonations(String userEmail)
	{
		ArrayList<Donation> donations = dao.getUserDonations(userEmail);
		ArrayList<DonationModel> donationModels = new ArrayList<>();
		for(Donation donation : donations)
		{
			DonationModel donationModel = new DonationModel();
			donationModel.setId(donation.getId());
			donationModel.setUserEmail(donation.getUser().getEmail());
			donationModel.setStoryId(donation.getStory().getId());
			StoryModel storyModel = new StoryModel();
			storyModel.setId(donation.getStory().getId());
			storyModel.setTitle(donation.getStory().getTitle());
			storyModel.setSubTitle(donation.getStory().getSubTitle());
			storyModel.setStatus(donation.getStory().getStatus());
			donationModel.setStory(storyModel);
			if(donation.getCreditCard() != null)
			{
				donationModel.setCreditCardId(donation.getCreditCard().getId());
				CreditCardModel cardModel = new CreditCardModel();
				cardModel.setNameOnCard(donation.getCreditCard().getNameOnCard());
				cardModel.setCardNumber(donation.getCreditCard().getCardNumber());
				donationModel.setCreditCard(cardModel);
			}
			if(donation.getAmount() != null)
				donationModel.setAmount(donation.getAmount());
			donationModel.setStatus(donation.getStatus());
			donationModel.setInitiatedDate(donation.getInitiatedDate());
			donationModel.setCompletedDate(donation.getCompletedDate());
			donationModels.add(donationModel);
		}
		return donationModels;
	}
	
	//get all donations made to a story
	public ArrayList<DonationModel> getStoryDonations(int storyId)
	{
		ArrayList<Donation> donations = dao.getStoryDonations(storyId);
		ArrayList<DonationModel> donationModels = new ArrayList<>();
		for(Donation donation : donations)
		{
			DonationModel donationModel = new DonationModel();
			donationModel.setId(donation.getId());
			donationModel.setUserEmail(donation.getUser().getEmail());
			donationModel.setStoryId(donation.getStory().getId());
			if(donation.getCreditCard() != null)
				donationModel.setCreditCardId(donation.getCreditCard().getId());
			if(donation.getAmount() != null)
				donationModel.setAmount(donation.getAmount());
			donationModel.setStatus(donation.getStatus());
			donationModel.setInitiatedDate(donation.getInitiatedDate());
			donationModel.setCompletedDate(donation.getCompletedDate());
			donationModels.add(donationModel);
		}
		return donationModels;
	}
	
	//add a donation
	public void addDonation(DonationModel donationModel)
	{
		Donation donation = new Donation();
		donation.setId(donationModel.getId());
		donation.setUser(dao.getUser(donationModel.getUserEmail()));
		donation.setStory(dao.getStory(donationModel.getStoryId()));
		if(donationModel.getCreditCardId() != null)
			donation.setCreditCard(dao.getCreditCard(donationModel.getCreditCardId()));
		if(donationModel.getAmount() != null)
			donation.setAmount(donationModel.getAmount());
		donation.setStatus(donationModel.getStatus());
		DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		donation.setInitiatedDate(""+dateFormat.format(new Date()));
		if(donationModel.getStatus().equals("pending"))
		{
			donation.setCompletedDate("");
		}
		else if(donationModel.getStatus().equals("completed"))
		{
			donation.setCompletedDate(""+dateFormat.format(new Date()));
		}
		dao.addDonation(donation);
	}
	
}








