package org.hyouman.services;

import java.util.ArrayList;

import org.hyouman.dao.Dao;
import org.hyouman.entities.CreditCard;
import org.hyouman.model.CreditCardModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditCardService {
	
	@Autowired
	Dao dao;
	
	//get Credit Cards by email
	public ArrayList<CreditCardModel> getCreditCards(String email)
	{
		ArrayList<CreditCardModel> cardsModel = new ArrayList<>();
		for(CreditCard card : dao.getCreditCards(email))
		{
			CreditCardModel cardModel = new CreditCardModel();
			cardModel.setId(card.getId());
			cardModel.setUserEmail(card.getUser().getEmail());
			cardModel.setNameOnCard(card.getNameOnCard());
			cardModel.setCardNumber(card.getCardNumber());
			cardModel.setExpiryMonth(card.getExpiryMonth());
			cardModel.setExpiryYear(card.getExpiryYear());
			cardModel.setCvv(card.getCvv());
			
			cardsModel.add(cardModel);
		}
		return cardsModel;
	}
	
	//get a Credit Card
	public void addCreditCard(CreditCardModel cardModel)
	{
		CreditCard card = new CreditCard();
		card.setUser(dao.getUser(cardModel.getUserEmail()));
		card.setNameOnCard(cardModel.getNameOnCard());
		card.setCardNumber(cardModel.getCardNumber());
		card.setExpiryMonth(cardModel.getExpiryMonth());
		card.setExpiryYear(cardModel.getExpiryYear());
		card.setCvv(cardModel.getCvv());
		
		dao.addCreditCard(card);
	}
	
	//delete a Credit Card
	public void deleteCreditCard(CreditCardModel cardModel)
	{		
		dao.deleteCreditCard(cardModel.getId());
	}
	
}
