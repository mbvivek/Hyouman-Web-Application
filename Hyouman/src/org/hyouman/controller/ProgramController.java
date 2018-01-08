package org.hyouman.controller;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.hyouman.model.ProgramModel;
import org.hyouman.services.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.google.gson.Gson;

@Controller
@Path("/program")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class ProgramController 
{	
	@Autowired
	ProgramService programService;
	
	@GET
	public String func()
	{
		return "Working!!";
	}
	
	@GET
	@Path("/getPrograms")
	public String getPrograms()
	{
		ArrayList<ProgramModel> programs = programService.getPrograms();
		return new Gson().toJson(programs).toString();
	}
	
	@GET
	@Path("/getProgram")
	public String getProgram(@QueryParam("programId") Integer programId)
	{
		ProgramModel program = programService.getProgram(programId);
		return new Gson().toJson(program).toString();
	}

	@POST
	@Path("/addProgram")
	public String addProgram(ProgramModel program)
	{	
		try
		{
			System.out.println("adding a new program = "+new Gson().toJson(program));
			programService.addProgram(program);
			System.out.println("added!!");
			return new Gson().toJson(true).toString();
		}
		catch(Exception e)
		{
			System.out.println("exception in addProgram");
			return new Gson().toJson(false).toString();
		}
	}
	
	@POST
	@Path("/deleteProgram")
	public String deleteProgram(Integer programId)
	{	
		try
		{
			programService.deleteProgram(programId);
			return new Gson().toJson(true).toString();
		}
		catch(Exception e)
		{
			System.out.println("exception in deleteProgram");
			return new Gson().toJson(false).toString();
		}
	}

}
