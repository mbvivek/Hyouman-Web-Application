package org.hyouman.model;

public class DonationModel 
{
	private Integer id;
	private Integer creditCardId;
	private Integer storyId;
	private String userEmail;
	private Double amount;
	private String status;
	private String initiatedDate;
	private String completedDate;
	
	private StoryModel story;
	private CreditCardModel creditCard;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCreditCardId() {
		return creditCardId;
	}
	public void setCreditCardId(Integer creditCardId) {
		this.creditCardId = creditCardId;
	}
	public Integer getStoryId() {
		return storyId;
	}
	public void setStoryId(Integer storyId) {
		this.storyId = storyId;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getInitiatedDate() {
		return initiatedDate;
	}
	public void setInitiatedDate(String initiatedDate) {
		this.initiatedDate = initiatedDate;
	}
	public String getCompletedDate() {
		return completedDate;
	}
	public void setCompletedDate(String completedDate) {
		this.completedDate = completedDate;
	}
	public StoryModel getStory() {
		return story;
	}
	public void setStory(StoryModel story) {
		this.story = story;
	}
	public CreditCardModel getCreditCard() {
		return creditCard;
	}
	public void setCreditCard(CreditCardModel creditCardModel) {
		this.creditCard = creditCardModel;
	}
	
	
}
