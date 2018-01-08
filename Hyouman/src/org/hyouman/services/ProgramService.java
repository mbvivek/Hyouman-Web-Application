package org.hyouman.services;

import java.util.ArrayList;

import org.hyouman.dao.Dao;
import org.hyouman.entities.Program;
import org.hyouman.entities.Story;
import org.hyouman.model.ProgramModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgramService {
	
	@Autowired
	Dao dao;
	
	//get all Programs
	public ArrayList<ProgramModel> getPrograms()
	{
		ArrayList<ProgramModel> programsModel = new ArrayList<>();
		for(Program program : dao.getPrograms())
		{
			ProgramModel programModel = new ProgramModel();
			programModel.setId(program.getId());
			programModel.setTitle(program.getTitle());
			programModel.setSubTitle(program.getSubTitle());
			programModel.setDescription(program.getDescription());
			if(program.getPicture() != null)
				programModel.setPicture(new String(program.getPicture()));
			programModel.setStatus(program.getStatus());
			programsModel.add(programModel);
		}
		return programsModel;
	}
	
	//get Program by Id
	public ProgramModel getProgram(Integer programId)
	{
		Program program = dao.getProgram(programId);
		ProgramModel programModel = new ProgramModel();
		
		programModel.setId(program.getId());
		programModel.setTitle(program.getTitle());
		programModel.setSubTitle(program.getSubTitle());
		programModel.setDescription(program.getDescription());
		if(program.getPicture() != null)
			programModel.setPicture(new String(program.getPicture()));
		programModel.setStatus(program.getStatus());
		return programModel;
	}
	
	//add a program
	public void addProgram(ProgramModel programModel)
	{
		Program program = new Program();
		program.setId(programModel.getId());
		program.setTitle(programModel.getTitle());
		program.setSubTitle(programModel.getSubTitle());
		program.setDescription(programModel.getDescription());
		program.setPicture(programModel.getPicture().getBytes());
		program.setStatus("active");
		dao.addProgram(program);
	}
	
	//delete a program
	public void deleteProgram(int programId)
	{
		ArrayList<Story> stories = dao.getProgramStories(programId);
		if(stories.size() > 0)
		{
			for(Story story : stories)
			{
				dao.updateStory(story.getId(), "invalid");
			}
			dao.updateProgram(programId, "invalid");
		}
		else
		{
			dao.deleteProgram(programId);
		}
	}
	
}
