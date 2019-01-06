



function newProject(){
alert("this is the page that would start a new Project");
}
function loadProject(fileName){
	alert("This is the page to load a saved Project");
	// var storage = firebase.storage();
// var pathReference = storage.ref('fileName');
}
function listSavedProjects(){
alert("list of projects to load from");
function data(){
	var DataBaseRef = firebase.database().ref();
	var user = firebase.auth().currentUser;
	uid = user.uid
	var string="";
DataBaseRef.child("User").child(uid).child("Saved").once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
	string=string+childData+"   ";
    alert(childData);

  });
  	alert(string);
});
	return string;
}
var delayInMilliseconds = 1000; //1 second
var stringData='hello: '+data();
setTimeout(function() {
  //your code to be executed after 1 second
}, delayInMilliseconds);
//var stringData='hello: '+data();
alert("Final"+data());
}


function saveProject(toSave,projectName){
	var DataBaseRef = firebase.database().ref();
	var user = firebase.auth().currentUser;
	uid = user.uid
	const StorageRef = firebase.storage().ref();;
	//uncomment this and a few other changes to change to files
	//var file = document.getElementById('fileItem').files[0];
	//var projectName= file.name;
	var message = toSave;
	alert(projectName);
	DataBaseRef.child("User").child(uid).child("Saved").push(projectName);
	alert("still works here, broken at storage");
	StorageRef.child(projectName).putString(toSave);
	alert("Project Saved");
}
function changeGroup(number){
	var firebaseRef = firebase.database().ref();
	var user = firebase.auth().currentUser;
	uid = user.uid
	//alert(number);
  firebaseRef.child("User").child(uid).child("Group").set(number);
  alert("Group Changed");
}

function addUser(){
	alert("begining");
	// firebase.auth().createUserWithEmailAndPassword(email, userPW).catch(function(error) {
  // // Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;
  // // ...
// });
	// var user = firebase.auth().currentUser;
	// user.updateProfile({
	  // displayName: firstName+" "+lastName
	// });
	alert("should have worked");
	
	
}