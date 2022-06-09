"use strict";

function getBooking(firstname) {
	if(sessionStorage.firstname != undefined){    //if sessionStorage for firstname is not empty
		//confirmation text
        var cost = "0";
		document.getElementById("confirmFirstName").textContent = sessionStorage.firstname;
		document.getElementById("confirmLastName").textContent = sessionStorage.lastname;
        document.getElementById("confirmEmailAddress").textContent = sessionStorage.emailaddress;
        document.getElementById("confirmStreetAddress").textContent = sessionStorage.streetaddress;
        document.getElementById("confirmSuburbTown").textContent = sessionStorage.suburb_town;
        document.getElementById("confirmState").textContent = sessionStorage.state;
        document.getElementById("confirmPostcode").textContent = sessionStorage.postcode;
        document.getElementById("confirmPhoneNumber").textContent = sessionStorage.phonenumber;
        document.getElementById("confirmPrefferedContact").textContent = sessionStorage.prefferedcontact;
        document.getElementById("confirmProductFeatures").textContent = sessionStorage.productfeatures ;
        document.getElementById("confirmComment").textContent = sessionStorage.commentfield;  
        // need to create price with product
        document.getElementById("confirmProduct").textContent = sessionStorage.product;
        document.getElementById("confirmQuantity").innerHTML = sessionStorage.quantity;

        // string of product, amount and total cost
        document.getElementById("totalPriceSection").innerHTML = `You selected to buy ${sessionStorage.quantity} amount of ${sessionStorage.product}(s).
        The total cost is: $${sessionStorage.totalprice}.`
    }
    // to remove session storage booking
    document.getElementById("removeAll").onclick = function() {removeAll()};
}
/* help with removing session storage from here: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_storage_removeitem_session
 https://www.w3schools.com/jsref/met_storage_clear.asp
 https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onclick_dom
*/
function removeAll(firstname){
    sessionStorage.clear()
    window.location.href = "./enquire.html"
    //alert("removed session storage");
}

function validateCardForm(e){
    const patterns = {
        "visa": /4\ d{ 15}/, // 16 digits and starts with a 4
        "mastercard": /5[1-5]\ d{ 14}/, // 16 digits and start with digits 51 through to 55
        "americanExpress": /3[47]\ d{ 13} /, // 15 digits and starts w 54 or 37
        // NOTE: ALL patterns here have been sourced from: https://www.informit.com/articles/article.aspx?p=1223879&seqNum=12
    }

    //values by card name, same as the postcode code only replacing patterns based on card type selected
    //cardno var
    var creditNumber = document.getElementById('creditNumber').value
    //returns patterns based on state selected 
    const selectedRegion = document.getElementById('creditCardType').value
    console.log(selectedRegion, patterns[selectedRegion] , patterns[selectedRegion].test(creditNumber))
    if(!patterns[selectedRegion].test(creditNumber)) {
        alert('Please enter a valid card number for your card type!');
        return false
    } 
    return true;
  

}

function init () {
    getBooking()
    var cardForm = document.getElementById("paymentForm");
    cardForm.addEventListener("submit", function(e) {
        let validatePay = validateCardForm(e)
        if(!validatePay) { e.preventDefault() ;}
        else {getBooking();}
            
    })
}
window.onload = init;