package org.hyouman.services;

import org.hyouman.dao.Dao;
import org.hyouman.entities.User;
import org.hyouman.entities.UserAccount;
import org.hyouman.model.UserAccountModel;
import org.hyouman.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class UserService {
	
	@Autowired
	Dao dao;
	
	//get User by email
	public UserModel getUser(String email)
	{
		UserModel userModel = new UserModel();
		User user = dao.getUser(email);
		if(user != null)
		{
			userModel.setEmail(user.getEmail());
			userModel.setFirstName(user.getFirstName());
			userModel.setLastName(user.getLastName());
			userModel.setPhone(user.getPhone());
			userModel.setDob(user.getDob());
			userModel.setGender(user.getGender());
			userModel.setStreet(user.getStreet());
			userModel.setCity(user.getCity());
			userModel.setState(user.getState());
			userModel.setCountry(user.getCountry());
			userModel.setZip(user.getZip());
			userModel.setPicture(user.getPicture());
			userModel.setAdmin(user.getAdmin() == 1 ? true : false);
			
			return userModel;
		}
		return null;
	}
	
	//set User
	public boolean setUser(UserModel userModel)
	{
		if(getUser(userModel.getEmail()) == null)
		{
			//set UserAccount
			UserAccount userAccount = new UserAccount();
			userAccount.setEmail(userModel.getEmail());
			userAccount.setPassword(userModel.getPassword());
			System.out.println("setting userAccount = "+new Gson().toJson(userAccount));
			dao.setUserAccount(userAccount);
			
			//set User
			User user = new User();
			user.setEmail(userModel.getEmail());
			user.setFirstName(userModel.getFirstName());
			user.setLastName(userModel.getLastName());
			user.setPhone(userModel.getPhone());
			user.setDob(userModel.getDob());
			user.setAdmin((byte)(userModel.getAdmin() == true ? 1 : 0));
			System.out.println("setting user = "+new Gson().toJson(user));
			dao.setUser(user);

			return true;
		}
		return false;
	}
	
	//update User
	public void updateUser(UserModel userModel)
	{
		User user = new User();
		user.setEmail(userModel.getEmail());
		user.setFirstName(userModel.getFirstName());
		user.setLastName(userModel.getLastName());
		user.setPhone(userModel.getPhone());
		user.setDob(userModel.getDob());
		user.setGender(userModel.getGender());
		user.setStreet(userModel.getStreet());
		user.setCity(userModel.getCity());
		user.setState(userModel.getState());
		user.setCountry(userModel.getCountry());
		user.setZip(userModel.getZip());
		user.setPicture(userModel.getPicture());
		user.setAdmin((byte)(userModel.getAdmin() == true ? 1 : 0));
		dao.setUser(user);
			
	}

}
