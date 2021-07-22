function resizeNavBar() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

function showHome() {
    changeTab("home-tab");
    changeContent("home-content");
}

function showMimi() {
    changeTab("mimi-tab");
    changeContent("mimi-content");
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