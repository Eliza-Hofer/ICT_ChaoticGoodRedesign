function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Function to fetch Facebook events
function fetchFacebookEvents() {
    var pageId = "300846029770601";
    var accessToken = "EAA41PCIY4msBO8uqEMKHrzISXYQiN3BdViNLjd2Ann6COH4SSIZCZCZACzIGOTCgKeEr929gsm0fZBFAWELKhJ1WyALwaGSFTQZAmoL614p4Ty8mfyIOqAd41bMbTi6YaYDZABZB2pGtu5S7PJhHawtqG2Qt80w8yx0SG9hY0p3gZBCFy3xlUdQN7IhW4sQZCWfmhhkD9W6rYBpizypozZCFoZD";
    var apiUrl = "https://graph.facebook.com/v12.0/" + pageId + "/events?access_token=" + accessToken;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayEvents(data.data);
    })
    .catch(error => {
        console.error('Error fetching events:', error);
    });
}

// Function to display events on the webpage
function displayEvents(events) {
    var eventsList = document.getElementById("events-list");
    eventsList.innerHTML = "";

    events.forEach(event => {
        var eventName = event.name;
        var eventDate = new Date(event.start_time).toLocaleString();
        var eventLink = event.link;

        var eventElement = document.createElement("div");
        eventElement.innerHTML = "<h3>" + eventName + "</h3><p>Date: " + eventDate + "</p><p><a href='" + eventLink + "' target='_blank'>Event Link</a></p>";

        eventsList.appendChild(eventElement);
    });
}

// Call the fetchFacebookEvents function when the page loads
window.onload = fetchFacebookEvents;
