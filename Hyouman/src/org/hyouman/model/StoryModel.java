package org.hyouman.model;

public class StoryModel 
{
	private Integer id;
	private Integer programId;
	private String userEmail;
	private String title;
	private String subTitle;
	private String description;
	private Double targetAmount;
	private Double expensePerDay;
	private String status;
	private String startDate;
	private String endDate;
	private String picture;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getProgramId() {
		return programId;
	}
	public void setProgramId(Integer programId) {
		this.programId = programId;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSubTitle() {
		return subTitle;
	}
	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getTargetAmount() {
		return targetAmount;
	}
	public void setTargetAmount(Double targetAmount) {
		this.targetAmount = targetAmount;
	}
	public Double getExpensePerDay() {
		return expensePerDay;
	}
	public void setExpensePerDay(Double expensePerDay) {
		this.expensePerDay = expensePerDay;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	
}
