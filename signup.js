const urlParams = new URLSearchParams(window.location.search);
const affiliate_id = urlParams.get("affiliate-id");

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

  // Référence Firebase contenant les adresses e-mails
  // Écoute de l'événement "click" sur le bouton de recherche
  function submitmy(){ 
  //const emailRef = firebase.database().ref('utilisateurs');
    // document.getElementById('sameToBody').style.display = "block"
    //var fullname = document.getElementById('name').value
    //var username = document.getElementById('username').value
    const email = document.getElementById('login__username').value;
    var password = document.getElementById('login__password').value
    //var phoneuserIDvalue = document.getElementById('phoneuserIDval').value
    if(email &&  password){
    //L'adresse e-mail n'a pas été trouvée
    // Inscription de l'utilisateur avec Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // L'utilisateur est inscrit avec succès
        const user = userCredential.user;
        const userwId = user.uid;
        localStorage.setItem("wmyuserId", userwId)
        // Envoi de l'e-mail de vérification
        user.sendEmailVerification()
          .then(() => {
            if(affiliate_id){
              localStorage.setItem('Affiliate_id', affiliate_id)
            }
          // E-mail de vérification envoyé avec succès
           window.location.href = "xw.html"
          //  window.location.href = "validemail.html"
            
          })
          .catch((error) => {
            // Gestion des erreurs lors de l'envoi de l'e-mail de vérification
            console.error('Erreur lors de l\'envoi de l\'e-mail de vérification :', error);
            alert("Erreur lors de l\'envoi de l\'e-mail de vérification")
          });
      })
      .catch((error) => {
        // Gestion des erreurs lors de l'inscription de l'utilisateur
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.error('Erreur lors de l\'inscription de l\'utilisateur :', errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
        // L'adresse e-mail est déjà utilisée par un autre compte
        // alert('Adresse e-mail déjà utilisée par un autre compte.');
        // L'adresse e-mail a été trouvée
       // document.getElementById('sameToBody').style.display = "none"
        document.getElementById('login__username').value = ""
        document.getElementById('login__password').value = ""

        Swal.fire({
        icon: 'error',
        allowOutsideClick: true,
        text : `L'adresse e-mail est déjà utilisée par un autre compte`,
        }) 
        }  
      });

  }else{
  //alert("les données ne sont pas")
 // document.getElementById('sameToBody').style.display = "none"
 }
}


  var checkbox = document.getElementById("terms");
  var ToSignupID = document.getElementById("toSignupID");
  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      ToSignupID.disabled = false;  // Activer le bouton  
    } else {
      ToSignupID.disabled = true;   // Désactiver le bouton
     
    }
  });


    {/*//function to control password
    const passwordInput = document.getElementById('password');
    const passwordStrengthIndicator = document.getElementById('password-strength-indicator');

    passwordInput.addEventListener('input', validatePassword);

    function validatePassword() {
      const password = passwordInput.value;
      const passwordStrength = calculatePasswordStrength(password);

      // Afficher la force du mot de passe à l'utilisateur
      passwordStrengthIndicator.textContent = `Force du mot de passe : ${passwordStrength}`;

      // Vérifier si le mot de passe contient des caractères spéciaux
      const containsSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

      // Si le mot de passe contient des caractères spéciaux, afficher un message d'erreur
      if (containsSpecialChars) {
        alert('Le mot de passe ne doit pas contenir de caractères spéciaux.');
      } else {
        passwordInput.setCustomValidity('');
      }
    }*/}

    function calculatePasswordStrength(password) {
      // Logique pour calculer la force du mot de passe
      // Vous pouvez utiliser des critères tels que la longueur, la présence de chiffres, de lettres majuscules, de lettres minuscules, etc.
      // Dans cet exemple, nous utilisons simplement la longueur du mot de passe comme indicateur de force
      const passwordLength = password.length;

      if (passwordLength < 8) {
        return 'Faible';
      } else if (passwordLength >= 8 && passwordLength < 12) {
        return 'Moyenne';
      } else {
        return 'Forte';
      }
    }

   {/* const togglePasswordButton = document.getElementById('toggle-password');

    togglePasswordButton.addEventListener('click', togglePasswordVisibility);

    function togglePasswordVisibility() {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordButton.innerText = 'O';
      } else {
        passwordInput.type = 'password';
        togglePasswordButton.innerText = 'X';
      }

        Swal.fire({
        icon: 'error',
        allowOutsideClick: true,
        text : `L'adresse e-mail est déjà utilisée par un autre compte`,
        }).then((result)=>{
        if(result.isConfirmed){
        window.location.href = "login.html"
        }
        })

    }*/}