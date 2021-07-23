
let slideIndex = 1;

// resize Nav Bar based on size (mobile)
function resizeNavBar() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  // show Home tab
function showHome() {
    changeTab("home-tab");
    changeContent("home-content");
}

  // show Mimi tab
function showMimi() {
    changeTab("mimi-tab");
    changeContent("mimi-content");
}

  // show Invitation tab
function showInvitation() {
    changeTab("invitation-tab");
    changeContent("invitation-content");
}

  // show RSVP tab
  function showRSVP() {
    changeTab("rsvp-tab");
    changeContent("rsvp-content");
}
  // show RSVP tab
  function showDetails() {
    changeTab("details-tab");
    changeContent("details-content");
}

  // show RSVP tab
  function showPhotos() {
    changeTab("photos-tab");
    changeContent("photos-content");
    showDivs(slideIndex);
}

// tab of tabID becomes active and the rest become inactive
function changeTab(tabID) {
    let tabs = document.getElementsByClassName("tab");

    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].id === tabID) {
            tabs[i].classList.add("active");
        } else {
            tabs[i].classList.remove("active");
        }
    }
}


// content of contentID becomes visible and the rest are invisible
function changeContent(contentID) {
    let contents = document.getElementsByClassName("content");
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].id === contentID) {
            contents[i].classList.remove("hide");
        } else {
            contents[i].classList.add("hide");
        }
    }
}
// submit text message to Kenneth's phone number based on input
async function submitText() {
    let accept = document.getElementById("input-accept");
    let decline = document.getElementById("input-decline");
    let name = document.getElementById("input-name");
    let count = document.getElementById("input-count");
    console.log(accept.checked, decline.checked, name.value, count.value);
    let uri = "";
    if (accept.checked) {
        uri = "I, " + name.value + ", am attending your wedding with " + count.value + " guests.";
    } else {
        uri = "I, " + name.value + ", am not attending your wedding.";
    }
    console.log(uri);
    let encoded = encodeURIComponent(uri);
    let phone = "19167935731";
    let href = "sms:+" + phone + "&body=" + encoded;
    location.href= href;
    
}
 // prevent RSVP checking both accept and decline
function checkChoice() {
    console.log("clicked");
    let accept = document.getElementById("input-accept");
    let decline = document.getElementById("input-decline");
    if (accept.checked) {
        decline.checked = false;
    }
    if (decline.checked) {
        accept.checked = false;
    }
}




function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}