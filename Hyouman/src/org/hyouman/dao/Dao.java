package org.hyouman.dao;

import java.util.ArrayList;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hyouman.entities.CreditCard;
import org.hyouman.entities.Donation;
import org.hyouman.entities.Program;
import org.hyouman.entities.Story;
import org.hyouman.entities.User;
import org.hyouman.entities.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class Dao 
{
	@Autowired
	private SessionFactory sessionFactory;
	
	private Session session;
	
	//=== USER ACCOUNT =========================================================================================
	
	//get useraccount by email
	public UserAccount getUserAccount(String email)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from UserAccount where email=:email");
		query.setString("email", email);
		UserAccount userAccount = (UserAccount) query.uniqueResult();
		return userAccount;
	}
	
	//get userccount by email and password
	public UserAccount getUserAccount(String email, String password)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from UserAccount where email=:email and password=:password");
		query.setString("email", email);
		query.setString("password", password);
		UserAccount userAccount = (UserAccount) query.uniqueResult();
		return userAccount;
	}
	
	//set userAccount
	public void setUserAccount(UserAccount userAccount)
	{
		session = sessionFactory.openSession();
		session.saveOrUpdate(userAccount);
		session.flush();
	}
	
	
	//=== USER ===================================================================================================
	
	//get user by email
	public User getUser(String email)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from User where email=:email");
		query.setString("email", email);
		User user = (User) query.uniqueResult();
		return user;
	}
	
	//set user
	public void setUser(User user)
	{
		session = sessionFactory.openSession();
		session.saveOrUpdate(user);
		session.flush();
	}
	
	//=== CREDIT CARD ================================================================================================
	
	//get credit cards by email
	public ArrayList<CreditCard> getCreditCards(String email)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from CreditCard where userEmail=:email");
		query.setString("email", email);
		ArrayList<CreditCard> cards = (ArrayList<CreditCard>) query.list();
		return cards;
	}
	
	//get a credit card
	public CreditCard getCreditCard(int id)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from CreditCard where id=:id");
		query.setInteger("id", id);
		CreditCard card = (CreditCard) query.uniqueResult();
		return card;
	}
	
	//add credit card
	public void addCreditCard(CreditCard card)
	{
		session = sessionFactory.openSession();
		session.saveOrUpdate(card);
		session.flush();
	}
	
	//delete credit card
	public void deleteCreditCard(int id)
	{
		session = sessionFactory.openSession();
		session.delete(session.get(CreditCard.class, id));
		session.flush();
	}
	
	//=== PROGRAM ================================================================================================
	
	//get programs
	public ArrayList<Program> getPrograms()
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Program");
		ArrayList<Program> programs = (ArrayList<Program>) query.list();
		return programs;
	}
	
	//get a program
	public Program getProgram(int programId)
	{
		session = sessionFactory.openSession();
		return session.get(Program.class, programId);
	}
	
	//add program
	public void addProgram(Program program)
	{
		session = sessionFactory.openSession();
		session.saveOrUpdate(program);
		session.flush();
	}
	
	//update Story
	public void updateProgram(int programId, String status)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("update Program set status=:status where id=:programId");
		query.setInteger("programId", programId);
		query.setString("status", status);
		query.executeUpdate();
		session.flush();
	}
	
	//update Story
	public void deleteProgram(int programId)
	{
		session = sessionFactory.openSession();
		session.delete(session.get(Program.class, programId));
		session.flush();
	}
	
	//=== STORY ================================================================================================
	
	//get all stories
	public ArrayList<Story> getAllStories()
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Story");
		ArrayList<Story> stories = (ArrayList<Story>) query.list();
		return stories;
	}
	
	//get all stories of a user
	public ArrayList<Story> getUserStories(String userEmail)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Story where userEmail=:userEmail");
		query.setString("userEmail", userEmail);
		ArrayList<Story> stories = (ArrayList<Story>) query.list();
		return stories;
	}
	
	//get all stories of a program
	public ArrayList<Story> getProgramStories(int programId)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Story where programId=:programId");
		query.setInteger("programId", programId);
		ArrayList<Story> stories = (ArrayList<Story>) query.list();
		return stories;
	}
	
	//get a Story
	public Story getStory(int storyId)
	{
		session = sessionFactory.openSession();
		return session.get(Story.class, storyId);
	}
	
	//add a Story
	public void addStory(Story story)
	{
		session = sessionFactory.openSession();
		session.saveOrUpdate(story);
		session.flush();
	}
	
	//update Story
	public void updateStory(int storyId, String status)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("update Story set status=:status where id=:storyId");
		query.setInteger("storyId", storyId);
		query.setString("status", status);
		query.executeUpdate();
		session.flush();
	}
	
	//=== DONATIONS ================================================================================================
	
	//get all donations
	public ArrayList<Donation> getAllDonations()
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Donation");
		ArrayList<Donation> donations = (ArrayList<Donation>) query.list();
		return donations;
	}
	
	//get all donations of a story
	public ArrayList<Donation> getStoryDonations(int storyId)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Donation where storyId=:storyId");
		query.setInteger("storyId", storyId);
		ArrayList<Donation> donations = (ArrayList<Donation>) query.list();
		return donations;
	}
	
	//get all donations of a user
	public ArrayList<Donation> getUserDonations(String userEmail)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Donation where userEmail=:userEmail");
		query.setString("userEmail", userEmail);
		ArrayList<Donation> donations = (ArrayList<Donation>) query.list();
		return donations;
	}
	
	//get a donation
	public Donation getDonation(int id)
	{
		session = sessionFactory.openSession();
		Query query = session.createQuery("from Donation where id=:id");
		query.setInteger("id", id);
		Donation donation = (Donation) query.uniqueResult();
		return donation;
	}
	
	//add a Story
	public void addDonation(Donation donation)
	{
		session = sessionFactory.openSession();
		session.saveOrUpdate(donation);
		session.flush();
	}
	
}
