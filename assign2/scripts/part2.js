"use strict";

//validate function for fields which need further validation or have not already been validated previously
function validate(event){
    event.preventDefault()
    //patterns regex object for different states
    const patterns = {
        "VIC": /^[38]{1}\d{3}$/, // 3 or 8
        "NSW": /^[12]{1}\d{3}$/, // 1 or 2
        "QLD": /^[49]{1}\d{3}$/, // 4 or 9
        "NT": /^[0]{1}\d{3}$/, // 0
        "WA": /^[6]{1}\d{3}$/, // 6
        "SA": /^[5]{1}\d{3}$/, // 5
        "TAS": /^[7]{1}\d{3}$/, // 7
        "ACT": /^[0]{1}\d{3}$/ // 0
    }
    //postcode by state
    //postcode var
    var postcode = document.getElementById('postcode').value
    //returns patterns based on state selected 
    const selectedRegion = document.getElementById('state').value
    console.log(selectedRegion, patterns[selectedRegion] , patterns[selectedRegion].test(postcode))
    if(!patterns[selectedRegion].test(postcode)) {
        alert('Please Enter a valid PostCode!');
        return false
    }
    return true
}

function storeBooking (event) {
    //vars for fields
    event.preventDefault()
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var emailaddress = document.getElementById("emailaddress").value;
    var streetaddress = document.getElementById("streetaddress").value;
    var suburb_town = document.getElementById("suburb_town").value;
    var state = document.getElementById("state").value;
    var postcode = document.getElementById("postcode").value;
    var phonenumber = document.getElementById("phonenumber").value;
    //preffered contact radio vars
    var post = document.getElementById("post").checked;
    var email = document.getElementById("email").checked;
    var phone = document.getElementById("phone").checked;
    var product = document.getElementById("product").value;
    var quantity = document.getElementById("quantity").value;
    //product features vars
    var price = document.getElementById("currentprice").innerHTML;
    var colours = document.getElementById("colours").checked;
    var audio = document.getElementById("audio").checked;
    var display = document.getElementById("display").checked;
    // concatenate preffered Contact field
    var prefferedcontact = "";
    if (email) prefferedcontact = "email";
    if (post) prefferedcontact = "post";
    if (phone) prefferedcontact = "phone";
    //concatenate product features field
    var productfeatures = "";
    if (price) productfeatures += "price";
    if (colours) productfeatures += "colours";
    if (audio) productfeatures += "audio";
    if (display) productfeatures += "display";
    var commentfield = document.getElementById("commentfield").value;
    //session storage
    sessionStorage.firstname = firstname;
    sessionStorage.lastname = lastname;
    sessionStorage.emailaddress = emailaddress;
    sessionStorage.streetaddress = streetaddress;
    sessionStorage.suburb_town = suburb_town;
    sessionStorage.state = state;
    sessionStorage.postcode = postcode;
    sessionStorage.phonenumber = phonenumber;
    sessionStorage.prefferedcontact = prefferedcontact;
    sessionStorage.product = product;
    sessionStorage.quantity = quantity;
    sessionStorage.productfeatures = productfeatures;
    sessionStorage.commentfield = commentfield;
    sessionStorage.totalprice = parseInt(price) * parseInt(quantity);
    /// relocate to payment.html
    window.location.href = "./payment.html"
}

function productChange(select) {
    let selectedOption = select.options[select.selectedIndex];
    document.getElementById('currentprice').innerHTML = selectedOption.id;
}


//init function for window load 
function init () {
	// window.alert("js works on this page");
    // using an event listener for the submit id, event (e) passes to storeBooking
    // got help from: https://stackoverflow.com/questions/25028853/addeventlistener-two-functions
    var enqForm = document.getElementById("enq_form");
    enqForm.addEventListener("submit", function(e) {
        let valid = validate(e)
        if(!valid) { e.preventDefault() ;}
        else {storeBooking(e); }
    })
 }

window.onload = init;
