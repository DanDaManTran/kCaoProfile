//checking if this is an email or not
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
};

//checking if this is a phone number or not. 
function inValidNumber(phoneNumber){
	var pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

	return pattern.test(phoneNumber);
};

//checking if this is a zip code or now
function isValidUSZip(sZip) {
	return /^\d{5}(-\d{4})?$/.test(sZip);
};

//it will take the subject and context and send it to the local host so i can be send an email to the owner
function post (subject, context){
	var email = {
		context: context,
		subject: subject
	}

	$.ajax({
		type: 'POST', 
		url: 'http://localhost:5000/api/contact',
		data: email
	});
};

//seller page function first check if the fields needed to be filled out is actually filled or it won't do anything and just add the warning class. if everything is good it will concatnate the strings and send it to the email
function sellerInput(){
	$(".warning").removeClass("warning");
	var fName = "";
	var lName = "";
	var email = "";
	var pNumber = "";
	var addy = "";
	var city = "";
	var zip = "";
	var comment = "Nevermind.";

	if(!$("#sellFirstName").val()) {
		$("#sellFirstName").parent().addClass("warning");
	} else {
		fName = $("#sellFirstName").val();
	}

	if(!$("#sellLastName").val()){
		$("#sellLastName").parent().addClass("warning");
	} else {
		lName = $("#sellLastName").val()
	}

	if(!isValidEmailAddress($("#sellEmail").val())) {
		$("#sellEmail").parent().addClass("warning");
	} else {
		email = $("#sellEmail").val();
	}

	if(!inValidNumber($("#sellPhone").val())){
		$("#sellPhone").parent().addClass("warning");
	}	else {
		pNumber = $("#sellPhone").val();
	}

	if(!$("#sellAddress").val()){
		$("#sellAddress").parent().addClass("warning");
	} else {
		addy = $("#sellAddress").val();
	}

	if(!$("#sellCity").val()){
		$("#sellCity").parent().addClass("warning");
	} else {
		city = $("#sellCity").val();
	}

	if(!isValidUSZip($("#sellZip").val())){
		$("#sellZip").parent().addClass("warning");
	} else {
		zip = $("#sellZip").val();
	}

	if($("#sellComment").val()!==""){
		comment = $("#sellComment").val();
	}

	if(fName!=="" & lName!=="" & email!=="" & pNumber!=="" & addy!=="" & city!=="" & zip!==""){
		var summary = fName + " " + lName + " would like to sell a house. " + fName + "'s e-mail is " + email + " and phone number is " + pNumber + ". The address is " + addy + ", " + city + " " + zip + ". Addtionaly " + fName + " would like you to know the following. " + comment;

		post("Seller", summary);

		$(".form-control").val("");
	}
};

//buyers page function first check if the fields needed to be filled out is actually filled or it won't do anything and just add the warning class. if everything is good it will concatnate the strings and send it to the email
function buyInput() {
	$(".warning").removeClass("warning");
	var fName = "";
	var lName = "";
	var email = "";
	var cNumber = "";
	var communitcate = "";
	var range = "";
	var questions = "";

	for(var i=1; i<17; i++){
		var answer = "";

		answer = $('.form-control[data-value="a' + i +'"]').val();

		if(answer!==""){
			questions =  questions + $('.control-label[data-value="q' + i + '"]').text() + " " + answer + ". ";
		}

		answer = "";
	}

	if(!$("#buyFirstName").val()) {
		$("#buyFirstName").addClass("warning");
	} else {
		fName = $("#buyFirstName").val();
	}
	
	if(!$("#buyLastName").val()) {
		$("buyLastName".addClass("warning"));
	} else {
		lName = $("#buyLastName").val();
	}

	if(!isValidEmailAddress($("#buyEmail").val())) {
		$("#buyEmail").addClass("warning");
	} else {
		email = $("#buyEmail").val();
	}

	if(!inValidNumber($("#buyCellPhone").val())) {
		$("#buyCellPhone").addClass("warning");
	} else {
		cNumber = $("#buyCellPhone").val();
	}
	
	if(!$("#communicate").val()) {
		$("#communicate").addClass("warning");
	} else {
		communicate = $("#communicate").val();
	}

	if(!$("#range").val()) {
		$("#range").addClass("warning");
	} else {
		range = $("#range").val();
	}
	
	if(fName!=="" && lName!=="" && email!=="" && cNumber!=="" && communicate!=="" && range!==""){
		var summary = fName + " " + lName + " would like to buy a house. " + fName + "'s e-mail is " + email + " and phone number is " + cNumber + ". " + fName + " would like to communicate by " + communicate + ". " + fName + "'s price range are " + range + ". Also " + fName + " answered the following questions. " + questions;

		post("Buyer", summary);

		$(".form-control").val("");
	}
};

//contact page function first check if the fields needed to be filled out is actually filled or it won't do anything and just add the warning class. if everything is good it will concatnate the strings and send it to the email
function contactInput() {
	$(".warning").removeClass("warning");
	var name = "";
	var email = "";
	var text = "";

	if(!$("#nameContact").val()) {
		$("#nameContact").addClass("warning");
	} else {
		name = $("#nameContact").val();
	}

	if(!isValidEmailAddress($("#contactEmail").val())) {
		$("#contactEmail").addClass("warning");
	} else {
		email = $("#contactEmail").val();
	}

	if(!$("#contactText").val()) {
		$("#contactText").addClass("warning");
	} else {
		text = $("#contactText").val();
	}

	if(name!=="" && email!=="" && text!==""){

		var summary = name + " wanted to say. " + text + " " + name + " email is " + email +".";

		post("Contacter", summary);
		
		$(".form-control").val("");
	}
};


//waiting for the document ready to run the functions that was created before
$("document").ready(function(){
	$("#sellBtn").on("click", sellerInput);
	$("#buyBtn").on("click", buyInput);
	$("#contactBtn").on("click", contactInput);
});