const YOUR_RAPID_API_KEY_GOES_HERE = "a6s5dfi8as5df98a5sd8f5a964sf98asd5f08asd75f9a67s4d";

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

function showRSVP() {
    changeTab("rsvp-tab");
    changeContent("rsvp-content");
}

function showInvitation() {
    changeTab("invitation-tab");
    changeContent("invitation-content");
}

let text = require('textbelt');




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
    let phone = "19167935731"
    let href = "sms:+" + phone + "&body=" + encoded;
    location.href= href;

    // await TwilioSMS(9167935731, uri);
    // text.send('9167935731', 'A sample text message!', undefined, function(err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    
}

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


async function getAccountId() {
    const response = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Account", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
          "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE
        }
      });
      const body = await response.json();
      console.log('getAccountId', body);
      return body.sid;
}
async function getAvailableNumbers(accountId) {
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/AvailablePhoneNumbers/us/Local.json", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
          "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE
        }
      });
      const body = await result.json();
      console.log('getAvailableNumbers', body);
      return body
        .filter(item => item.capabilities.SMS)
        .map(item => ({
          number: item.phoneNumber.slice(1),
          display: item.friendlyName,
        }));
}
async function buyPhoneNumber(accountId, number) { 
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/IncomingPhoneNumbers.json?phoneNumber=" + number + "&phoneNumberType=local&countryCode=us", {
        "method": "POST",
        "headers": {
          "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
          "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE,
          "content-type": "application/x-www-form-urlencoded"
        },
      });
      const body = await result.json();
      console.log('buyPhoneNumber', body);
      return body.phoneNumber?.sid;
 }
async function sendSMS(accountId, phoneId, to, msg) { 
    to = encodeURIComponent(to);
    msg = encodeURIComponent(msg);
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/Messages.json?from=" + phoneId + "&body=" + msg + "&to=" + to, {
      "method": "POST",
      "headers": {
        "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
        "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE,
        "content-type": "application/x-www-form-urlencoded"
      },
    });
    const body = await result.json();
    console.log('sendSMS', body);
    return body.status;
}
async function deletePhoneNumber(accountId, phoneNumberId) { 
    const result = await fetch("https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/" + accountId + "/IncomingPhoneNumbers/" + phoneNumberId + ".json", {
        "method": "DELETE",
        "headers": {
          "x-rapidapi-host": "twilio-sms.p.rapidapi.com",
          "x-rapidapi-key": YOUR_RAPID_API_KEY_GOES_HERE
        }
      });
      const body = await result.json();
      console.log('deletePhoneNumber', body);
}
async function TwilioSMS(to, msg) {
//   event.preventDefault();
//   const form = event.target;
//   const to = form.querySelector('[name=to]').value;
//   const msg = form.querySelector('[name=msg]').value;
  const accountId = await getAccountId();
  const numbers = await getAvailableNumbers(accountId);
  let phone;
  for await (const { number } of numbers) {
    const phoneId = await buyPhoneNumber(accountId, number);
    if (phoneId) {
      phone = { id: phoneId, number };
      break;
    }
  }
  const status = await sendSMS(accountId, phone.number, to, msg);
  await deletePhoneNumber(accountId, phone.id);
  alert(`Delivery status: ${status}`);
  console.log("text sent!");
}
