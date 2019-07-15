import $ from "jquery";
import "./styles.css";

const gapi = window.gapi;
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

const apiKey = "AIzaSyDBPzjEDZK_ZGOZcYQT7lm0VTdzjp5w95w";
const clientId= "352712332521-7h20d5fud7hjpns4p95g2jhar5bik030.apps.googleusercontent.com";
var scopes = 'profile';

function initClient() {
  gapi.client.init({
      clientId: clientId,
      scope: scopes
  }).then(function () {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }).catch(err => console.log(JSON.stringify(err)));
}
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    makeApiCall();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  fetch(`https://www.googleapis.com/youtube/v3/search?part=id&q=sad&key=${apiKey}`)
  .then(res => res.json())
  .then(function(resp) {
    console.log(resp)
    // var p = document.createElement('p');
    // var name = resp.result.names[0].givenName;
    // p.appendChild(document.createTextNode('Hello, '+name+'!'));
    // document.getElementById('content').appendChild(p);
  }).catch(err => console.log(err));
}

gapi.load('client:auth2:youtube', initClient);
