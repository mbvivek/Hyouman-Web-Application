package org.hyouman.services;

import java.util.ArrayList;

import org.hyouman.dao.Dao;
import org.hyouman.entities.Story;
import org.hyouman.model.StoryModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoryService {
	
	@Autowired
	Dao dao;
	
	//get all Stories
	public ArrayList<StoryModel> getAllStories()
	{
		ArrayList<StoryModel> storiesModel = new ArrayList<>();
		for(Story story : dao.getAllStories())
		{
			StoryModel storyModel = new StoryModel();
			storyModel.setId(story.getId());
			storyModel.setProgramId(story.getProgram().getId());
			storyModel.setUserEmail(story.getUser().getEmail());
			storyModel.setTitle(story.getTitle());
			storyModel.setSubTitle(story.getTitle());
			storyModel.setDescription(story.getDescription());
			storyModel.setTargetAmount(story.getTargetAmount());
			storyModel.setExpensePerDay(story.getExpensePerDay());
			storyModel.setStartDate(story.getStartDate());
			storyModel.setEndDate(story.getEndDate());
			storyModel.setPicture(new String(story.getPicture()));
			storyModel.setStatus(story.getStatus());
			storiesModel.add(storyModel);
		}
		return storiesModel;
	}
	
	//get User Stories
	public ArrayList<StoryModel> getUserStories(String userEmail)
	{
		ArrayList<StoryModel> storiesModel = new ArrayList<>();
		for(Story story : dao.getUserStories(userEmail))
		{
			StoryModel storyModel = new StoryModel();
			storyModel.setId(story.getId());
			storyModel.setProgramId(story.getProgram().getId());
			storyModel.setUserEmail(story.getUser().getEmail());
			storyModel.setTitle(story.getTitle());
			storyModel.setSubTitle(story.getTitle());
			storyModel.setDescription(story.getDescription());
			storyModel.setTargetAmount(story.getTargetAmount());
			storyModel.setExpensePerDay(story.getExpensePerDay());
			storyModel.setStartDate(story.getStartDate());
			storyModel.setEndDate(story.getEndDate());
			storyModel.setPicture(new String(story.getPicture()));
			storyModel.setStatus(story.getStatus());
			storiesModel.add(storyModel);
		}
		return storiesModel;
	}
	
	//get Program Stories
	public ArrayList<StoryModel> getProgramStories(int programId)
	{
		ArrayList<StoryModel> storiesModel = new ArrayList<>();
		for(Story story : dao.getProgramStories(programId))
		{
			StoryModel storyModel = new StoryModel();
			storyModel.setId(story.getId());
			storyModel.setProgramId(story.getProgram().getId());
			storyModel.setUserEmail(story.getUser().getEmail());
			storyModel.setTitle(story.getTitle());
			storyModel.setSubTitle(story.getTitle());
			storyModel.setDescription(story.getDescription());
			storyModel.setTargetAmount(story.getTargetAmount());
			storyModel.setExpensePerDay(story.getExpensePerDay());
			storyModel.setStartDate(story.getStartDate());
			storyModel.setEndDate(story.getEndDate());
			storyModel.setPicture(new String(story.getPicture()));
			storyModel.setStatus(story.getStatus());
			storiesModel.add(storyModel);
		}
		return storiesModel;
	}
	
	//get Story
	public StoryModel getStory(int storyId)
	{
		Story story = dao.getStory(storyId);
		if(story!=null)
		{
			StoryModel storyModel = new StoryModel();
			storyModel.setId(story.getId());
			storyModel.setProgramId(story.getProgram().getId());
			storyModel.setUserEmail(story.getUser().getEmail());
			storyModel.setTitle(story.getTitle());
			storyModel.setSubTitle(story.getTitle());
			storyModel.setDescription(story.getDescription());
			storyModel.setTargetAmount(story.getTargetAmount());
			storyModel.setExpensePerDay(story.getExpensePerDay());
			storyModel.setStartDate(story.getStartDate());
			storyModel.setEndDate(story.getEndDate());
			storyModel.setPicture(new String(story.getPicture()));
			storyModel.setStatus(story.getStatus());
			return storyModel;
		}
		return null;
	}
	
	//add story
	public void addStory(StoryModel storyModel)
	{
		Story story = new Story();
		story.setId(storyModel.getId());
		story.setProgram(dao.getProgram(storyModel.getProgramId()));
		story.setUser(dao.getUser(storyModel.getUserEmail()));
		story.setTitle(storyModel.getTitle());
		story.setSubTitle(storyModel.getTitle());
		story.setDescription(storyModel.getDescription());
		story.setTargetAmount(storyModel.getTargetAmount());
		story.setExpensePerDay(storyModel.getExpensePerDay());
		story.setStartDate(storyModel.getStartDate());
		story.setEndDate(storyModel.getEndDate());
		story.setPicture(storyModel.getPicture().getBytes());
		story.setStatus("pending");
		dao.addStory(story);
	}
	
	//update status of a story
	public void updateStoryStatus(int storyId, String status)
	{
		dao.updateStory(storyId, status);
	}
	
}
