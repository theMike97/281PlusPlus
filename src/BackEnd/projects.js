function loadProject(pName){
	var DataBaseRef = firebase.database().ref();
	var user = firebase.auth().currentUser;
	uid = user.uid;
	// var string="String to give to front end for project "+pName+": ";
	let string = "";
	DataBaseRef.child("User").child(uid).child("Saved").child(pName).once('value', function(snapshot) {
		string = snapshot.val();
	});
	var delayInMilliseconds = 500; //0.5 second
	setTimeout(function() {
		// alert(stringToLoad);
		if (typeof(Storage) != "undefined") {
			localStorage.setItem("string", string);
			// alert(string);
		} else {
			alert("Cannot load project. D:");
		}
		// alert(stringToLoad);
		window.location.href = "../Main.html";
	}, delayInMilliseconds);
}



//THis function will display the names of projects that can be loaded by the currently logged in user
function listProjects(){
	var DataBaseRef = firebase.database().ref();
	var user = "";
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		user = firebase.auth().currentUser;
		//var name = user.displayName; //this will display the current user name
		uid = user.uid
		var string="";
		var delayInMilliseconds = 750; //0.75 second
		setTimeout(function() {
			DataBaseRef.child("User").child(uid).child("Saved").once('value', function(snapshot) {
			  snapshot.forEach(function(childSnapshot) {
				var childKey = childSnapshot.key;
				var childData = childSnapshot.val();
				string=string+childKey+"<br />";
			  });
			});					//chagne "document.getElementById("demo").innerHTML=string; " to where/what you want the code to be displayed
			setTimeout(function() {document.getElementById("demo").innerHTML=string;}, delayInMilliseconds);
		}, delayInMilliseconds);
	  }
	});
}


function deleteProject(pName){
	var DataBaseRef = firebase.database().ref();
	var user = "";
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		user = firebase.auth().currentUser;
		//var name = user.displayName; //this will display the current user name
		uid = user.uid
			DataBaseRef.child("User").child(uid).child("Saved").child(pName).remove();
	  }
	});
	location.reload();		//Remove this if you dont want the page to reload.....
	listProjects();
}


function signOut(){
	firebase.auth().signOut();
	window.location="../Login/Login.html";		//Change to page you want it to redirect to!!!
}



//This function will save a given string to a given string projectName/title.
function saveProject(projectName, toSave){
	var DataBaseRef = firebase.database().ref();
	var user = firebase.auth().currentUser;
	uid = user.uid
	var message = toSave;
	DataBaseRef.child("User").child(uid).child("Saved").child(projectName).set(toSave);
	alert("Project Saved As: "+projectName);
}


//This function updated the current users user name and email address.
function updateUser(userName, userEmail){
var user = firebase.auth().currentUser;
	// Prompt the user to re-provide their sign-in credentials
	user.updateProfile({
	  displayName: userName,
	}).then(function() {
	   // Update successful.
	  alert(user.displayName);
	}).catch(function(error) {
	  // An error happened.
	  alert("did not set user name");
	});
	user = firebase.auth().currentUser;
	user.updateEmail(userEmail).then(function() {
	  // Update successful.
	  	   alert(user.email);
	}).catch(function(error) {
	  // An error happened.
	  alert("DID not set email");
	});

			setTimeout(function() { window.location.href = 'Main1.html';}, 1000);	
}


// THis functions will currently just set you user profile to a Hard Coded image.
function loadImage(fileName){
	alert("This is the page to load a saved Project but I only save an image to the users progfile right now. :(");
	var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
  name = user.displayName;
  email = user.email;
   photoUrl = user.photoURL;
  alert(email+"  "+name+" "+photoUrl);
  user.updateProfile({
  photoURL: "'../images/test.GIF'"
})
   photoUrl = user.photoURL;
  alert(photoUrl);
}


//This function will change the group of the currently logged in user.
//In future this could be used to let multiple users access the same data.
function changeGroup(number){
	var firebaseRef = firebase.database().ref();
	var user = firebase.auth().currentUser;
	uid = user.uid
	//alert(number);
  firebaseRef.child("User").child(uid).child("Group").set(number);
  alert("Group Changed");
}



//THis function should add a user to firebase
function addUser(userName, userEmail, userPW){
	var firebaseRef = firebase.database().ref();
	firebase.auth().createUserWithEmailAndPassword(userEmail,userPW).catch(function(error){
	// Handle Errors
	alert("User was not added!!!");
		alert(error.message);
	});
	setTimeout(function() {	
		firebase.auth().currentUser.updateProfile({
			displayName:userName,
		}).then(function() {
		   // Update successful.
		   alert("should have worked");
		}).catch(function(error) {
		  // An error happened.
		  alert("did not set user name");
		  		  alert(error.message);
		});
		setTimeout(function() {window.location="../Login/Login.html";}, 500);
	},750);
}


function updateUser(userName, userEmail){
var user = firebase.auth().currentUser;
	// Prompt the user to re-provide their sign-in credentials
	user.updateProfile({
	  displayName: userName,
	}).then(function() {
	   // Update successful.
	  alert(user.displayName);
	}).catch(function(error) {
	  // An error happened.
	  alert("did not set user name");
	});
	user = firebase.auth().currentUser;
	user.updateEmail(userEmail).then(function() {
	  // Update successful.
	  	   alert(user.email);
	}).catch(function(error) {
	  // An error happened.
	  alert("DID not set email");
	});
			setTimeout(function() { window.location.href = 'Main1.html';}, 1000);
}



//This function sends a password reset to a users email.
//This can also be done withing firebase for whoever has access to the console.
function resetPassword(){
		firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		user = firebase.auth().currentUser;
		email=user.email
			// alert("trying password reseet");
		firebase.auth().sendPasswordResetEmail(email).then(function() {
		  // Password reset email sent.
		  alert("email sent to: "+email);
		})
		.catch(function(error) {
		  // Error occurred. Inspect error.code.
		  alert("error could not send email");
		});
	  }
	});
}
