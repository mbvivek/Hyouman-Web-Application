package org.hyouman.entities;
// Generated Apr 24, 2017 1:11:45 AM by Hibernate Tools 5.2.1.Final

import java.util.HashSet;
import java.util.Set;

/**
 * User generated by hbm2java
 */
public class User implements java.io.Serializable {

	private String email;
	private String firstName;
	private String lastName;
	private String phone;
	private String dob;
	private String gender;
	private String street;
	private String city;
	private String state;
	private String country;
	private String zip;
	private byte[] picture;
	private Byte admin;
	private Set<CreditCard> creditCards = new HashSet<CreditCard>(0);
	private Set<Donation> donations = new HashSet<Donation>(0);
	private Set<Story> stories = new HashSet<Story>(0);

	public User() {
	}

	public User(String email) {
		this.email = email;
	}

	public User(String email, String firstName, String lastName, String phone, String dob, String gender, String street,
			String city, String state, String country, String zip, byte[] picture, Byte admin,
			Set<CreditCard> creditCards, Set<Donation> donations, Set<Story> stories) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.dob = dob;
		this.gender = gender;
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zip = zip;
		this.picture = picture;
		this.admin = admin;
		this.creditCards = creditCards;
		this.donations = donations;
		this.stories = stories;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDob() {
		return this.dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getGender() {
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getStreet() {
		return this.street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZip() {
		return this.zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public byte[] getPicture() {
		return this.picture;
	}

	public void setPicture(byte[] picture) {
		this.picture = picture;
	}

	public Byte getAdmin() {
		return this.admin;
	}

	public void setAdmin(Byte admin) {
		this.admin = admin;
	}

	public Set<CreditCard> getCreditCards() {
		return this.creditCards;
	}

	public void setCreditCards(Set<CreditCard> creditCards) {
		this.creditCards = creditCards;
	}

	public Set<Donation> getDonations() {
		return this.donations;
	}

	public void setDonations(Set<Donation> donations) {
		this.donations = donations;
	}

	public Set<Story> getStories() {
		return this.stories;
	}

	public void setStories(Set<Story> stories) {
		this.stories = stories;
	}

}