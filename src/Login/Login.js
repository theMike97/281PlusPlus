

(function(){

	var ui = new firebaseui.auth.AuthUI(firebase.auth());


var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',

  // Chang this to whatever URL/file that you want to load once logged in.
  signInSuccessUrl: '../Projects/Projects.html',

  signInOptions: [
    // Select what ways you want to let users sign in with.

    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '../Home.html',
  // Privacy policy url.
  privacyPolicyUrl: '../Home.html'
};


// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

})()
