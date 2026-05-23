const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f",
};
const unserconnectId = localStorage.getItem("unserconnect");
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
var userArrayASal = [];
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userId = user.uid;
    const userRef = database.ref(`/utilisateurs/${userId}`);
    userRef.once("value").then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("sameToBody").style.display = "none";
        var userData = snapshot.val();
        var securityRespond = document.getElementById("securityRespond").value
        $("#secureMyAccountIdSendEmail").modal({
          show: true,
          backdrop: "static",
          keyboard: false,
        });
        document.getElementById("validerTheResponsEmail").addEventListener("click", function () {
          var securityRespondEmail = document.getElementById("securityRespondEmail").value
          if (securityRespondEmail == "") {
            Swal.fire("Vous devez fournir une réponse", "", "info");
          } else {
            // Envoi de l'e-mail de réinitialisation du mot de passe 
            firebase.auth().sendPasswordResetEmail(securityRespondEmail)
              .then(function () {
                //document.getElementById('sameToBodyx').style.display = "none"
                Swal.fire({
                  icon: 'success',
                  allowOutsideClick: false,
                  text: "L'e-mail de réinitialisation du mot de passe a été envoyé avec succès !",
                  //footer: '<a href="login.html">Connectez-vous</a>',
                  confirmButtonText: "D'accord",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "login.html"
                  }
                })
                // L'e-mail de réinitialisation du mot de passe a été envoyé avec succès
              })
              .catch(function (error) {
                // Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation du mot de passe
                //document.getElementById('sameToBodyx').style.display = "none"
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                Swal.fire({
                  icon: 'error',
                  allowOutsideClick: false,
                  text: "Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation du mot de passe",
                  //footer: '<a href="login.html">Connectez-vous</a>',
                  confirmButtonText: "D'accord",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.href = "forgetpassword.html"
                  }
                });
              });
          }

        })

      }
    });
  } else {
    window.location.href = "../login.html";
  }
})