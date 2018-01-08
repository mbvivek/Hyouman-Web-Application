package org.hyouman.services;

import org.hyouman.dao.Dao;
import org.hyouman.entities.UserAccount;
import org.hyouman.model.UserAccountModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class UserAccountService {
	
	@Autowired
	Dao dao;
	
	//get UserAccount by email
	public String getUserAccount(String email)
	{
		UserAccountModel userAccountModel = new UserAccountModel();
		userAccountModel.setEmail(email);
		
		UserAccount userAccount = dao.getUserAccount(email);
		if(userAccount != null)
		{
			userAccountModel.setStatus(userAccount.getStatus());
			userAccountModel.setValid(true);
		}
		else
			userAccountModel.setValid(false);
		
		return new Gson().toJson(userAccountModel).toString();
	}
	
	//get UserAccount by email and password
	public String getUserAccount(String email, String password)
	{
		UserAccountModel userAccountModel = new UserAccountModel();
		userAccountModel.setEmail(email);
		
		UserAccount userAccount = dao.getUserAccount(email, password);
		if(userAccount != null)
		{
			userAccountModel.setStatus(userAccount.getStatus());
			userAccountModel.setValid(true);
		}
		else
			userAccountModel.setValid(false);
		
		System.out.println("userAccountModel = "+new Gson().toJson(userAccountModel).toString());
		
		return new Gson().toJson(userAccountModel).toString();
	}
	
	
	//set UserAccount
	public void setUserAccount(String email, String password)
	{
		UserAccount userAccount = new UserAccount();
		userAccount.setEmail(email);
		userAccount.setPassword(password);
		dao.setUserAccount(userAccount);
	}

}
