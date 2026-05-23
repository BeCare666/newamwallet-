const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// Créer une référence à la base de données Firebase
const dbRef = firebase.database().ref();
// get cookies option for user
{/*  const UserConnectId = localStorage.getItem("ToacceptCookies");
  if(UserConnectId){
  var savedUsername = localStorage.getItem("Email");
  var savedPassword = localStorage.getItem("Password");
  document.getElementById('email').value = savedUsername
  document.getElementById('password').value = savedPassword
}*/}
// Obtenez une référence à l'emplacement contenant les données d'utilisateur
const usersRef = dbRef.child("utilisateurs");
// Écoute de l'événement "click" sur le bouton de recherche
// Écoute de l'événement "click" sur le bouton de recherche ToacceptCookies
function submitmy() {
  const email = document.getElementById('login__username').value;
  const password = document.getElementById('login__password').value;
  //document.getElementById('sameToBody').style.display = "block"
  // Obtenez l'e-mail et le mot de passe de l'utilisateur
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // La connexion a réussi, vous pouvez accéder à l'utilisateur
      var user = userCredential.user;
      var useruid = user.uid;
      if (user.emailVerified) {
        // L'utilisateur existe avec l'e-mail et le mot de passe donnés 
        //  document.getElementById('sameToBody').style.display = "none"
        //const userId = userSnapshot.key;
        document.getElementById('login__username').value = ""
        document.getElementById('login__password').value = ""

        firebase
          .database()
          .ref("userdelete/")
          .once("value")
          .then((snapshot) => {
            let found = false;

            snapshot.forEach((child) => {
              const data = child.val();
              if (data.userId === useruid) {
                found = true;
                return true; // arrête le forEach
              }
            });

            if (found) {
              console.log("✅ userId trouvé dans userdelete.");
              Swal.fire({
                icon: 'error',
                title: "error",
                allowOutsideClick: false,
                text: `Vous n'avez plus accès à votre compte !`,
              })
            } else {
              console.log("❌ userId non trouvé dans userdelete.");
              Swal.fire({
                icon: 'success',
                title: "Succès",
                allowOutsideClick: false,
                text: `Vous êtes connecté avec succès !`,
              })
              localStorage.setItem('unserconnect', useruid)
              localStorage.setItem('unserconnectmail', email)
              // funnction to get cookies options     
              localStorage.setItem("Email", email);
              localStorage.setItem("Password", password);
              const Bffiliate_id = localStorage.getItem('Affiliate_id');
              if (Bffiliate_id) {
                localStorage.setItem('Cffiliate_id', Bffiliate_id)
                localStorage.removeItem('Affiliate_id')
              }
              setTimeout(() => {
                window.location.href = "index.html"
              }, 5000)
            }
          })
          .catch((error) => {
            console.error("Erreur Firebase :", error);
          });

      } else {
        // document.getElementById('sameToBody').style.display = "none"
        document.getElementById('login__username').value = ""
        document.getElementById('login__password').value = ""
        Swal.fire({
          title: "Ooops",
          text: "Vous n'avez pas encore validé votre e-mail !",
          icon: 'info'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "login.html"
          }
        })
      }
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      //console.error('Error:', errorMessage);
      if (errorCode === 'INVALID_LOGIN_CREDENTIALS') {
        console.error('Error:', errorCode, errorMessage);
        // document.getElementById('sameToBody').style.display = "none"
        document.getElementById('login__username').value = ""
        document.getElementById('login__password').value = ""
        Swal.fire({
          icon: 'error',
          title: "Erreur ",
          allowOutsideClick: false,
          text: `L'utilisateur n'existe pas avec cet adresse mail !`,
        })

      } else if (errorCode === 'auth/wrong-password') {
        // document.getElementById('sameToBody').style.display = "none"
        document.getElementById('login__username').value = ""
        document.getElementById('login__password').value = ""

        Swal.fire({
          icon: 'error',
          title: "Erreur ",
          allowOutsideClick: false,
          text: `Mot de passe incorrect !`,
        })
      } else {
        //document.getElementById('sameToBody').style.display = "none"
        document.getElementById('login__username').value = ""
        document.getElementById('login__password').value = ""
        Swal.fire({
          icon: 'error',
          title: "Erreur ",
          allowOutsideClick: false,
          text: `L'utilisateur n'existe pas ou vos identifiants sont incorrect  `,
        })
      }
    });
}