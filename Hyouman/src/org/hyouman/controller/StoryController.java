package org.hyouman.controller;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.hyouman.model.StoryModel;
import org.hyouman.services.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;

@Controller
@Path("/story")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class StoryController 
{	
	@Autowired
	StoryService storyService;
	
	@GET
	public String func()
	{
		return "Working!!";
	}
	
	@GET
	@Path("/getAllStories")
	public String getAllStories()
	{
		ArrayList<StoryModel> stories = storyService.getAllStories();
		return new Gson().toJson(stories).toString();
	}
	
	@GET
	@Path("/getProgramStories")
	public String getProgramStories(@QueryParam("programId") int programId)
	{
		ArrayList<StoryModel> stories = storyService.getProgramStories(programId);
		return new Gson().toJson(stories).toString();
	}
	
	@GET
	@Path("/getUserStories")
	public String getUserStories(@QueryParam("userEmail") String userEmail)
	{
		ArrayList<StoryModel> stories = storyService.getUserStories(userEmail);
		return new Gson().toJson(stories).toString();
	}
	
	@GET
	@Path("/getStory")
	public String getStory(@QueryParam("storyId") int storyId)
	{
		StoryModel story = storyService.getStory(storyId);
		return new Gson().toJson(story).toString();
	}
	
	@POST
	@Path("/addStory")
	public String addStory(StoryModel story)
	{
		try
		{	
			System.out.println("addStory = "+new Gson().toJson(story).toString());
			storyService.addStory(story);
			return new Gson().toJson(true).toString();
		}
		catch(Exception e)
		{
			System.out.println("exception in addStory");
			e.printStackTrace();
			return new Gson().toJson(false).toString();
		}
	}
	
	@POST
	@Path("/approveStory")
	public String updateStory(Integer storyId)
	{	
		try
		{	
			storyService.updateStoryStatus(storyId, "active");
			return new Gson().toJson(true).toString();
		}
		catch(Exception e)
		{
			System.out.println("exception in approveStory");
			e.printStackTrace();
			return new Gson().toJson(false).toString();
		}
	}
	
	@POST
	@Path("/deleteStory")
	public String deleteStory(Integer storyId)
	{	
		try
		{	
			storyService.updateStoryStatus(storyId, "invalid");
			return new Gson().toJson(true).toString();
		}
		catch(Exception e)
		{
			System.out.println("exception in deleteStory");
			e.printStackTrace();
			return new Gson().toJson(false).toString();
		}
	}

}
