//for firebase online database
var config = {
	apiKey: "AIzaSyCc0p6LMAFl2k6q3xAdZH5v8gqVnMJESmU",
	authDomain: "kimmyblog-7a8f9.firebaseapp.com",
	databaseURL: "https://kimmyblog-7a8f9.firebaseio.com",
	storageBucket: "kimmyblog-7a8f9.appspot.com",
	messagingSenderId: "12187648149"
};

firebase.initializeApp(config);
var database = firebase.database();

//rating starts
var clicked = true;
var ratingNum = 0;

function fillStar(){
	for( var i = $(this).data("value"); i>0; i--){
		$('.star[data-value="' + i + '"]').addClass('fa-star');
		$('.star[data-value="' + i + '"]').removeClass('fa-star-o');
	}
	for( var i = $(this).data("value") + 1; i<6; i++){
		$('.star[data-value="' + i + '"]').addClass('fa-star-o');
		$('.star[data-value="' + i + '"]').removeClass('fa-star');
	}
};

function emptyStar() {
	if(clicked){
		$('.star').addClass('fa-star-o');
		$('.star').removeClass('fa-star');
	} else {
		for( var i = ratingNum; i>0; i--){
			$('.star[data-value="' + i + '"]').addClass('fa-star');
			$('.star[data-value="' + i + '"]').removeClass('fa-star-o');
		}
		for( var i = ratingNum + 1; i<6; i++){
			$('.star[data-value="' + i + '"]').addClass('fa-star-o');
			$('.star[data-value="' + i + '"]').removeClass('fa-star');
		}
	}
};

function rateClick(){
	for( var i = $(this).data("value"); i>0; i--){
		$('.star[data-value="' + i + '"]').addClass('fa-star');
		$('.star[data-value="' + i + '"]').removeClass('fa-star-o');
	}
	for( var i = $(this).data("value") + 1; i<6; i++){
		$('.star[data-value="' + i + '"]').addClass('fa-star-o');
		$('.star[data-value="' + i + '"]').removeClass('fa-star');
	}
	clicked = false;

	ratingNum = $(this).data("value");
};

function countChar(val) {
	var len = val.value.length;

	if (len > 200) {
		val.value = val.value.substring(0, 200);
	} else {
		$('#charNum').text("Character Left: " + (200 - len));
	}
};

function object2Base(){
	//creating values input so it can be sent to the database
	let name = $("#inputName").val().trim();
	let score = ratingNum;
	let comment = $("#inputComment").val().trim();
	let date = moment().format('MMM Do YYYY');
	//objecting the values
	let newRating = {
		name: name,
		score: score,
		comment: comment,
		moment: date
	};
	//removing * if there is any
	$(".warningSign").remove();
	$(".warning").removeClass("warning");
	//warning each input if there isn't a value
	if(!$("#inputName").val()){
		$("#inputName").addClass("warning");
	}

	if(!$("#inputComment").val()){
		$("#inputComment").addClass("warning");
	}

	if(ratingNum===0){
		$(".formRateTitle").addClass("warning");
	}
	//if the values are set push the object data to firebase
	if(newRating.name!=="" && newRating.score!==0 && newRating.comment!==""){
		database.ref().push(newRating);
		//clearing everything and setting codes back to the start
		$("#inputComment").val("");
		$("#inputName").val("");
		ratingNum = 0;
		click = true;
		emptyStar();
	}
};

function isValidEmailAddress(emailAddress) {
	let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
};

function inValidNumber(phoneNumber){
	let pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

	return pattern.test(phoneNumber);
};


function isValidUSZip(sZip) {
	return /^\d{5}(-\d{4})?$/.test(sZip);
};

function sellerInput(){
	$(".warning").removeClass("warning");
	let fName = "";
	let lName = "";
	let email = "";
	let pNumber = "";
	let addy = "";
	let city = "";
	let zip = "";
	let comment = "Nevermind.";

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
		let summary = fName + " " + lName + " would like to sell a house. " + fName + "'s e-mail is " + email + " and phone number is " + pNumber + ". The address is " + addy + ", " + city + " " + zip + ". Addtionaly " + fName + " would like you to know the following. " + comment + ". ";

		console.log(summary);

		$(".form-control").val("");
	}
};

$("document").ready(function(){
	//running the funtions for the the rating stars
	$(".star").on("mouseover", fillStar);
	$(".star").on("mouseout", emptyStar);
	$(".star").on("click", rateClick);
	$("#ratingSub").on("click", object2Base);

	database.ref().on("child_added", function(childsnapshot) {
	    const dataMessage = childsnapshot.val();
	    let stars = dataMessage.score;
	    let starIcon = "";
	    let name = dataMessage.name;
	    let date = dataMessage.moment;
	    let comment = dataMessage.comment;


		for( var i = stars; i>0; i--){
			starIcon = starIcon + '<i class="fa fa-star"></i>';
		}

		for( var i = stars+1; i<6; i++){
			starIcon = starIcon + '<i class="fa fa-star-o"></i>'
		}

		$("#history").prepend('<div class="historyLog"><h5><strong class="logSpace">' + name + '</strong><span  class="logSpace">' + starIcon + '</span>' + date + '</h5><p class="historyComment">' + comment + '</p></div>');
	});

	$("#sellBtn").on("click", sellerInput);
});