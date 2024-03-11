// Adam's CIS166 Final
// This is the Javascript

// HOME PAGE
// ACCOUNT SIGN IN - https://codepen.io/r3hab/pen/BaEaqrV
var signInIcon = document.getElementById("signinIcon");
var signinFormContainer = document.getElementById("signinFormContainer");
var signInForm = document.getElementById("signInForm");
var usernameField = document.getElementById("username");
var signinText = document.getElementById("signinText");
var personalMessage = document.getElementById("personalMessage");
var signOutButton = document.getElementById("signOutButton");

signInIcon.addEventListener("click", function() {
    if (signinFormContainer.style.display === "none") {
        signinFormContainer.style.display = "block";
    } else {
        signinFormContainer.style.display = "none";
    } // This is what hides the container initally until you click the usericon image.
});

var savedUsername = localStorage.getItem("username");
if (savedUsername) {
    signinText.textContent = "Welcome back, " + savedUsername + "!";
    if (personalMessage) {
        personalMessage.textContent = "Hello, " + savedUsername + "! Trying to decide delivery or carryout?";
    } // This is an element checker to make sure this function ONLY runs if you're on the corresponding page to prevent null errors. This is the actual local storage part.
}

signInForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var username = usernameField.value;
    alert("Thank you for signing in, " + username + ".");
    signinText.textContent = "Welcome to Nil's Pizzeria, " + username + "!";
    if (personalMessage) {
        personalMessage.textContent = "Hello, " + username + "! Trying to decide delivery or carryout?";
    }

    localStorage.setItem("username", username);

    usernameField.value = "";
});

signOutButton.addEventListener("click", function() {
    localStorage.removeItem("username");
    signinText.textContent = "Sign in Here!";
    if (personalMessage) {
        personalMessage.textContent = "Trying to decide delivery or carryout?";
    } // Again checks to see if the elements exist before running and trying to change the textContent. This is the sign out function and resets everything.
});

// Friday Deal Checker
function fridayDeal() {
    var fridayDealElement = document.querySelector("#fridayDeal");
    if (fridayDealElement) {
        var currentDate = new Date();
        var currentDay = currentDate.getDay();
        if (currentDay == 5) {
            fridayDealElement.textContent = "It's Friday! Everything is 20% off!";
            var fridayImage = document.querySelector("#fridayImage");
            if (fridayImage) {
                fridayImage.src = "images/fridaypizza.jpg";
            }
        } else {
            fridayDealElement.textContent = "Order on Friday and everything is 20% off!";
        }
    }
} // This is just a date checker. This checks for the day Friday which is "5" and if it is Friday then it changes the message on the home page and shows an img. It also checks if it's present to avoid a null error.
fridayDeal();

// Clickable Image Redirect for Order, About Us, and Locations on the Home Page - I could've just done <img src="images/accounticon.png" class="icon-image"> in the HTML, but decided to make it a click event instead.
const dealLink = document.getElementById("dealLink");
if (dealLink) {
    dealLink.addEventListener("click", function(event) {
        event.preventDefault();
        location.href = "order.html";
    });
}

const aboutLink = document.getElementById("aboutLink");
if (aboutLink) {
    aboutLink.addEventListener("click", function(event) {
        event.preventDefault();
        location.href = "aboutus.html";
    });
}

const locationLink = document.getElementById("locationLink");
if (locationLink) {
    locationLink.addEventListener("click", function(event) {
        event.preventDefault();
        location.href = "locations.html";
    });
}

// Locations Slideshow for Home Page - Heavily used lesson 11 project for this. March 7th - This broke for some reason when I reduced image size? NOW IT'S FIXED. Nice. All it took was adding slideshowImages = $(".slideshow-images > img"); again in the interval function.
$(document).ready(function() {
    var slideshowImages = $(".slideshow-images > img");
    if (slideshowImages.length > 1) {
        slideshowImages.slice(1).hide();
        setInterval(function() {
            var $imgFirst = slideshowImages.first();
            $imgFirst.fadeOut(1000, function() {
                $imgFirst.next().fadeIn(1000).end().appendTo(".slideshow-images");
                slideshowImages = $(".slideshow-images > img");
            });
        }, 2500);
    }
});

// Footer Copyright Year
var thisYear = document.getElementById("thisYear");
if (thisYear) {
    var currentYear = new Date().getFullYear();
    thisYear.textContent = currentYear;
} // This is just the same function as Pet's Unleashed. Checks the current year and updates it to the footer id. Again another if function to check if it's present on the page.

// ABOUT US PAGE - I moved everything to a different file, but also left this here incase I need to change anything. Nevermind I moved it back and adjusted it accordingly with the DOMContentLoaded event and if statement.
    var founderImage = document.getElementById("founderImage");
    var founderName = document.getElementById("founderName");
    var founderDescription = document.getElementById("founderDescription"); // Variables that are checked for the page you're on to run.

    if (founderImage && founderName && founderDescription) {
        var founderImages = [
            { src: "images/founderadam.png", name: "Adam Kuzara", description: "Designer of Mace Merchandise and the Nil's Pizzeria Website"},
            { src: "images/foundernil.png", name: "Nil Gooberson", description: "The Creator of the Nil Gooberson's Pizzeria franchise"},
            { src: "images/foundervalenberg.png", name: "Pedro Valenberg", description: "Head of Human Resources at Nil Gooberson's Pizzeria"},
            { src: "images/founderdesi.png", name: "Randall Castrorum", description: "Head Marketing Manager and Franchise Coordinator at Nil Gooberson's Pizzeria"},
            { src: "images/founderjoe.png", name: "Joe Joestar", description: "Head of Public Relations and Ethics Department at Nil Gooberson's Pizzeria"},
            { src: "images/foundermorde.png", name: "Morde Kaiser", description: "Head of Manual Labor and Employee Training at Nil Gooberson's Pizzeria"},
            { src: "images/founderheinz.png", name: "Heinz Ludwig", description: "Head of Security and Accounting at Nil Gooberson's Pizzeria"},
            { src: "images/founderfrost.png", name: "Derek Frost", description: "Head of Delivery and Transportation at Nil Gooberson's Pizzeria"},
            { src: "images/founderjohn.png", name: "John Kimball", description: "Head of Quality Assurance and Safety Regulation at Nil Gooberson's Pizzeria"},
            { src: "images/founderbroveron.png", name: "Broveron Dickinson", description: "Head of Logistics and Supply Chain Management at Nil's Gooberson's Pizzeria"},
        ]; // Managed to create a multidimensional array. I struggled at first cause I thought you had to do src = "image" and name = "Adam" not src : "image" and so on. This was really handy to make work here. It especially shows when you compare it to the size of my locations code.

        let i = 0; // Index counter.

        function updateFounder() {
            const founderImage = document.getElementById("founderImage");
            const founderName = document.getElementById("founderName");
            const founderDescription = document.getElementById("founderDescription");
        
            founderImage.src = founderImages[i].src;
            founderName.textContent = founderImages[i].name;
            founderDescription.textContent = founderImages[i].description;
        }
        updateFounder();
        
        document.getElementById("founderImage").addEventListener("click", function() {
            i = (i + 1) % founderImages.length;
            updateFounder();
        }); // The actual click event that cycles through the array when clicked. It properly changes the image, name, and text all at once.
    };

// LOCATIONS PAGE - Geolocation definitely | https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 3958.8; // This is the distance of the Earth in miles and what determines how I measure the distance.
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;
    return distance;
} // I just copied a lot of this math from the source

function geolocateFail() {
    alert("Unable to receive your current location.");
}
function getLocation() {
    if (navigator.geolocation) {
        // I wanted to use an array for this part, but struggled for a while so I opted to do each one manually for now. Thankfully it works at the cost of taking up a bit of space.
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLatitude = position.coords.latitude;
            var userLongitude = position.coords.longitude;

            var losAngelesLatitude = 34.052235; // Latitude of Los Angeles, California
            var losAngelesLongitude = -118.243683; // Longitude of Los Angeles, California

            var newYorkLatitude = 40.712776; // Latitude of New York City
            var newYorkLongitude = -74.005974; // Longitude of New York City

            var ottawaLatitude = 45.421530; // Latitude of Ottawa, Canada
            var ottawaLongitude = -75.697193; // Longitude of Ottawa, Canada
        
            var limerickLatitude = 52.664688; // Latitude of Limerick, Ireland
            var limerickLongitude = -8.623965; // Longitude of Limerick, Ireland
        
            var cairoLatitude = 30.044420; // Latitude of Cairo, Egypt
            var cairoLongitude = 31.235712; // Longitude of Cairo, Egypt
        
            var ghentLatitude = 51.054342; // Latitude of Ghent, Belgium
            var ghentLongitude = 3.717424; // Longitude of Ghent, Belgium
        
            var distanceToLosAngeles = calculateDistance(userLatitude, userLongitude, losAngelesLatitude, losAngelesLongitude);
            var distanceToNewYork = calculateDistance(userLatitude, userLongitude, newYorkLatitude, newYorkLongitude);
            var distanceToOttawa = calculateDistance(userLatitude, userLongitude, ottawaLatitude, ottawaLongitude);
            var distanceToLimerick = calculateDistance(userLatitude, userLongitude, limerickLatitude, limerickLongitude);
            var distanceToCairo = calculateDistance(userLatitude, userLongitude, cairoLatitude, cairoLongitude);
            var distanceToGhent = calculateDistance(userLatitude, userLongitude, ghentLatitude, ghentLongitude);
        
            document.getElementById("locationCali").textContent = "This Pizzeria is approximately " + distanceToLosAngeles.toFixed(2) + " miles away.";
            document.getElementById("locationNY").textContent = "This Pizzeria is approximately " + distanceToNewYork.toFixed(2) + " miles away.";
            document.getElementById("locationCan").textContent = "This Pizzeria is approximately " + distanceToOttawa.toFixed(2) + " miles away.";
            document.getElementById("locationIre").textContent = "This Pizzeria is approximately " + distanceToLimerick.toFixed(2) + " miles away.";
            document.getElementById("locationEG").textContent = "This Pizzeria is approximately " + distanceToCairo.toFixed(2) + " miles away.";
            document.getElementById("locationBelg").textContent = "This Pizzeria is approximately " + distanceToGhent.toFixed(2) + " miles away.";
        }, geolocateFail);
    } else {
        alert("Geolocation is not supported on your browser");
    }
}
// ORDER NOW PAGE - Calculator and adding/arrays?
var menuForm = document.getElementById("menuForm"); // Variables to check the page again
var orderTotal = document.getElementById("OrderTotal");
if (menuForm && orderTotal) {
    function evaluateTotal() {
        var total = 0;
        var checkboxes = document.querySelectorAll(".orderBox input[type='checkbox']");
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                total += parseFloat(checkbox.getAttribute("value"));
            }
        }); // Parsefloat gets the number from "value" of each checkbox and adds it to the total

        var today = new Date(); // I was tempted to copy from the first function to get the Friday date, but didn't want to risk breaking anything.
        var dayOfWeek = today.getDay();
        if (dayOfWeek === 5) { // Checks if the day is Friday
            total *= 0.8; // This is the 20% discount being applied
            orderTotal.textContent = "Total: $" + total.toFixed(2) + " Friday Discount Applied!"; // If it's Friday
        } else {
            orderTotal.textContent = "Total: $" + total.toFixed(2); // If it's any day but Friday
        }
    }

    function resetCart() {
        var checkboxes = document.querySelectorAll(".box input[type='checkbox']");
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
        orderTotal.textContent = "Total: $0.00";
    } // Function to reset the cart to $0 when the button is clicked.

    menuForm.addEventListener("submit", function(event) {
        event.preventDefault();
        evaluateTotal();
    });
};

// CONTACT US PAGE - Form/Submit Events
    var myForm = document.getElementById("myForm");

    if (myForm) {
        myForm.addEventListener("submit", function(event) {
            event.preventDefault();
    
            var formCheck = myForm.querySelectorAll('input[type="text"], select, textarea');
            var canSubmit = true;
    
            for (var i = 0; i < formCheck.length; i++) {
                if (formCheck[i].value.trim() === '' || (formCheck[i].tagName === 'SELECT HERE' && formCheck[i].value === 'Please Select...')) {
                    canSubmit = false;
                    break;
                }
            } // Shifts through each box to check either if it's empty or the select boxes are left untouched. If they're empty then it won't submit.
    
            if (!canSubmit) {
                alert("Please fill out all required fields");
                return;
            }
    
            var reviewfirstName = document.getElementById("firstName").value;
            var reviewlastName = document.getElementById("lastName").value;
            var feedbackComment = document.getElementById("comments").value;
            var selectedService = document.getElementById("service").value;
            var userRating = document.getElementById("userRating").value;
    
            var fullReview = reviewfirstName + " " + reviewlastName + "<br>" + "Service: " + selectedService + "<br>" + feedbackComment; // Concactenation of all input fields from the user
    
            var userReview = document.getElementById("userReview");
    
            if (userReview) {
                userReview.innerHTML = fullReview;
                if (userRating === "Good") {
                    userReview.classList.add("positiveReview");
                } else if (userRating === "Bad") {
                    userReview.classList.add("negativeReview");
                } // This part of the function was added 3/9/2024 when I got the idea to make it so that there was a new select option for "Good" or "Bad" on the review. This just makes it apply the CSS coloring.
                alert("Thank you for your feedback, " + reviewfirstName);
                myForm.reset();
            } // userReview.innerHTML displays the "fullReview" and pops up as a new box once the form is submitted. The alert is also present just to give feedback to the user that it was successful.
        });
    }
// JS PAGE - Mostly HTML and explaining everything we used, maybe images?
// Yeah I didn't actually use any JS here which is pretty ironic for the JS Page. I was going to use click events instead of <a> links but I didn't want to reuse the oones I already created since I would have to make the "If" element checker also check for this page.
// Instead here is the music I listened to while doing the final touch ups and comments for my final - https://youtu.be/gAsNvXDsrGA?si=MCDCsmLui1ZP7cum 
