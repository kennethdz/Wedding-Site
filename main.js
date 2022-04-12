
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

  // show Pre-Wedding Photos tab
  function showPrePhotos() {
    changeTab("pre-wedding-photos-tab");
    changeContent("pre-wedding-photos-content");
    showDivs(slideIndex);
}

  // show Video tab
  function showVideo() {
    changeTab("video-tab");
    changeContent("video-content");
}

  // show Photobooth tab
  function showPhotobooth() {
    changeTab("photobooth-tab");
    changeContent("photobooth-content");
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
    resizeNavBar();
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
// submit text message to Mandy's phone number based on input
async function submitText() {
  let width = screen.width;
  let accept = document.getElementById("input-accept");
  let decline = document.getElementById("input-decline");
  let name = document.getElementById("input-name");
  let count = document.getElementById("input-count");
  if ((accept.checked === false && decline.checked === false) || name.value === "" || count.value === "") {
    console.log("form incomplete")
    alert("Please fill out form completely");
  }
  else {
    console.log("form complete")
    console.log(accept.checked, decline.checked, name.value, count.value);
    let uri = "";
    if (accept.checked) {
        uri = "Congratulations! This is " + name.value + " and I/we am/are attending your wedding with " + count.value + " guest(s)!";
    } else {
        uri = "Congratulations! This is " + name.value + " and I/we cannot attend your wedding. Best of Luck!";
    }
    console.log(uri);
    let encoded = encodeURIComponent(uri);
    let href = "";
    if (width < 760) {
      console.log(width, " => sending via mobile...");
      let phone = "19167537574";
      href = "sms:+" + phone + "&body=" + encoded;
    } else {
      console.log(width, " => sending via pc...");
      let email = "mdaophan@gmail.com";
      href = "mailto:" + email + "?subject=" + "Wedding RSVP!" + "&body=" + encoded;
    }
    location.href= href;
  }
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



// https://www.w3schools.com/w3css/w3css_slideshow.asp
function plusDivs(n) {
  showDivs(slideIndex += n);
}
// https://www.w3schools.com/w3css/w3css_slideshow.asp
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
