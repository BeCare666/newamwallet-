//Your web app's Firebase configuration
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
const balanceIDAWW = localStorage.getItem("balanceIDAWWW")
const unserconnectId = localStorage.getItem("unserconnect")
//const bilanuserId = "JyPM9obdRafgNHOZZ8e4piR1SVA3"
//alert(unserconnectId)
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var useremail = user.email
    var submitid = document.getElementById("submitid");
    submitid.addEventListener("click", submitmy)
    function submitmy() {
      const transfertCodeId = document.getElementById("amwalette_Adress")?.value?.trim();
      const amwalette_reason = document.getElementById("amwalette_reason").value;
      const soldeInput = document.getElementById("soldeId")?.value?.trim();
      const userSenderId = localStorage.getItem("unserconnect");
      const usernameSender = localStorage.getItem("usernameT");
      const amwalletAddress = localStorage.getItem("amwalette_adress");
      const reasonTransfer = localStorage.getItem("reason");
      const senderBalanceStr = localStorage.getItem("balanceIDAWWW");
      console.log(userSenderId);
      console.log(usernameSender);
      console.log(amwalletAddress);
      console.log(senderBalanceStr);


      if (!transfertCodeId || !soldeInput || !userSenderId || !senderBalanceStr || !amwalette_reason) {
        Swal.fire("Erreur", "Données manquantes ou invalides", "error");
        return;
      }

      const soldeToSend = parseFloat(soldeInput);
      const senderBalance = parseFloat(senderBalanceStr);

      if (isNaN(soldeToSend) || soldeToSend <= 0) {
        Swal.fire("Erreur", "Montant invalide", "error");
        return;
      }

      if (isNaN(senderBalance)) {
        Swal.fire("Erreur", "Solde actuel invalide", "error");
        return;
      }

      if (senderBalance < soldeToSend) {
        Swal.fire("Erreur", "Solde insuffisant", "error");
        return;
      }

      // 🔎 Recherche du destinataire
      database.ref("/utilisateurs")
        .orderByChild("transfert_code_id")
        .equalTo(transfertCodeId)
        .once("value")
        .then((snapshot) => {
          if (!snapshot.exists()) {
            Swal.fire("Erreur", "Code de transfert inexistant", "error");
            return;
          }

          const receiverKey = Object.keys(snapshot.val())[0];
          const receiverData = snapshot.val()[receiverKey];

          if (receiverKey === userSenderId) {
            Swal.fire("Erreur", "Vous ne pouvez pas vous envoyer de l'argent", "error");
            return;
          }

          const receiverEmail = receiverData.email;
          const receiverName = receiverData.username;
          const receiverBalance = parseFloat(receiverData.ACCOUNTPRINCIPAL || "0");

          if (isNaN(receiverBalance)) {
            Swal.fire("Erreur", "Solde du destinataire invalide", "error");
            return;
          }

          const commission = soldeToSend * 0.01; // 1% de commission
          const totalDeducted = soldeToSend + commission; // Montant total à déduire
          const newSenderBalance = senderBalance - totalDeducted;
          const newReceiverBalance = receiverBalance + soldeToSend;

          const now = new Date();
          const dateFormatted = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}h${now.getMinutes()}m`;

          const senderRef = database.ref(`/utilisateurs/${userSenderId}`);
          const receiverRef = database.ref(`/utilisateurs/${receiverKey}`);

          // 💸 Mise à jour du solde de l’émetteur
          senderRef.update({ ACCOUNTPRINCIPAL: newSenderBalance }, (err1) => {
            if (err1) {
              Swal.fire("Erreur", "Échec de mise à jour de l'expéditeur", "error");
              return;
            }

            // 💰 Mise à jour du solde du destinataire
            receiverRef.update({ ACCOUNTPRINCIPAL: newReceiverBalance }, (err2) => {
              if (err2) {
                Swal.fire("Erreur", "Échec de mise à jour du destinataire", "error");
                return;
              }

              // ✅ Ajout des messages
              const senderMsg = {
                type: "transfert",
                message: `Vous avez transféré ${soldeToSend} $ à ${receiverName} `,
                montant: soldeToSend,
                Raison: amwalette_reason,
                status: false,
                time: dateFormatted,
                diffuser: true,
              };

              const receiverMsg = {
                type: "réception",
                message: `Vous avez reçu ${soldeToSend} $ de ${usernameSender}`,
                montant: soldeToSend,
                Raison: amwalette_reason,
                status: false,
                time: dateFormatted,
                diffuser: true,
              };

              senderRef.child("MESSAGES").push(senderMsg);
              receiverRef.child("MESSAGES").push(receiverMsg);
              Swal.fire("Succès", "Transfert effectué avec succès", "success");
              window.location.href = "amwalette.html";
            });
          });
        })
        .catch((error) => {
          console.error("Firebase error:", error);
          Swal.fire("Erreur", "Une erreur est survenue", "error");
        });


    }
  } else {
    window.location.href = "login.html"
  }
})

function validerSaisie(input) {
  const valeurSaisie = input.value;
  const regexLettresAvecEspaces = /^\d+$/;

  if (!regexLettresAvecEspaces.test(valeurSaisie)) {
    //alert("ne fait pas ça")
    // Effacez la saisie incorrecte
    input.value = input.value.replace(/\D/g, '');

  } else {
  }
}