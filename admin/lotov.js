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
    const result = document.getElementById("result");
    const filter = document.getElementById("filter");
    const listItems = [];
    var tableOfPrice = []
    var tableEmail = []
  firebase.auth().onAuthStateChanged(function(user) { 
  if(user){
    var userId = user.uid;
    //alert("Bienvenue dans la section admin, " + userId);
    getData();

filter.addEventListener("input", (e) => filterData(e.target.value));

 function getData() {
  const userRef = database.ref(`/utilisateurs/`);
  userRef.once("value")
  .then((snapshot)=> {
    // Clear results
  result.innerHTML = "";
    snapshot.forEach((productSnapshot) => {  
        const productData = productSnapshot.val();
        var mxcompt = productData.ACCOUNTPRINCIPAL
        var AMONTTLOTO = productData.AMONTTLOTO 
        //8d9YAUcERKXPOZC0ib2XxEcFFpJ3 
        console.log(mxcompt)  
        if(AMONTTLOTO){
          
        const li = document.createElement("li");
        li.addEventListener('click', function () {
        li.id = `${productData.userId}`
        console.log( li.id)
        var usermxid =  li.id 
        Swal.fire({
            title: "Modification",
            html:`Modier le compte de <strong style="color: blue;">${productData.username}</strong>`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Augmenter",
            denyButtonText: `Diminuer`,
            cancelButtonText: "Vider",
            allowOutsideClick: false,
            footer: `
            <button id="notificationidx" style="color: white; background-color: #FFB6C1; border: none; padding: 12px; cursor: pointer; border-radius: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
          </svg></button>&nbsp;&nbsp;
            <button id="footerButton" style="color: white; background-color: #FFB6C1; border: none; padding: 12px; cursor: pointer; border-radius: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
          </svg></button> &nbsp;&nbsp;
            <button id="footerButtonMessages" style="color: white; background-color: #FFB6C1; border: none; padding: 12px; cursor: pointer; border-radius: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
          </svg></button> &nbsp;&nbsp;
            <button id="footerButtonwallet" style="color: white; background-color: blue; border: none; padding: 12px; cursor: pointer; border-radius: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet2" viewBox="0 0 16 16">
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
          </svg></button>&nbsp;&nbsp;
            <button id="footerButtonstatus" style="color: white; background-color: blue; border: none; padding: 12px; cursor: pointer; border-radius: 5px;">status</button>
            `
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             // Swal.fire("Saved!", "", "success");                    
            $("#exampleModaladd").modal({
                show: true,
                backdrop: "static",
                keyboard: false,
            });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            //  Swal.fire("OK", "", "info");
            var sendunityforuserlup = document.getElementById('sendunityforuserlupdateO');
            sendunityforuserlup.click();
       
            }else if (result.isDenied) {
                // Swal.fire("Changes are not saved", "", "info");
                $("#exampleModalupdate").modal({
                    show: true,
                    backdrop: "static",
                    keyboard: false,
                });
              }
          });  
var footerButtonwallet = document.getElementById("footerButtonwallet")
footerButtonwallet.addEventListener('click', function(){
  localStorage.setItem('takeidAfil', usermxid)
  window.location.href = "../admin/detailafi/afiliatedetails.html"
}) 






// Start function to activate or desactivate account users 
var footerButtonstatus = document.getElementById("footerButtonstatus")
footerButtonstatus.addEventListener('click', function(){
  Swal.fire({
    title: "Changer le satus",
    text:"info",
    confirmButtonText: "Activer",
    denyButtonText: `Suspendre`,
    cancelButtonText: "retour",
    allowOutsideClick: false,
    showDenyButton: true,
    showCancelButton: true,
    icon: 'info'
    }).then((result)=>{
               /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              const newData = {
                USERSTATUS : true
            };
            const userRefx = database.ref(`/utilisateurs/${usermxid}`);
            userRefx.update(newData, (error) => {
              if (error) {
                //console.error(`Failed to update user ${userSnapshot.key}:`, error);
                Swal.fire({
                  icon: 'error',
                  text: "les données ne sont pas mise à jour",
                  allowOutsideClick: false,
              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            } else {
                //console.log(`User ${userSnapshot.key} updated successfully.`);
                Swal.fire({
                  icon: 'success',
                  text: "les données sont mise à jour",
                  allowOutsideClick: false,
              }).then((result) => {
                  if (result.isConfirmed) {
                      location.reload();
                  }
              });
            }
             })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            //  Swal.fire("OK", "", "info");
 
            }else if (result.isDenied) {
              const newData = {
                USERSTATUS : false
            };
            const userRefx = database.ref(`/utilisateurs/${usermxid}`);
            userRefx.update(newData, (error) => {
              if (error){
                alert("les données ne sont pas mise à jour " + error);
              }else{
                alert("les données sont mise à jour ");
                
              }
             })
              }
 })
})  
// End function to activate or desactivate account users 

var footerButtonMessages = document.getElementById("footerButtonMessages")
footerButtonMessages.addEventListener('click', updateAllUsers)
function updateAllUsers() {
  Swal.fire({
    title: "The message",
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: "Send",
    showLoaderOnConfirm: true,
    allowOutsideClick: false,
    confirmButtonColor: '#3085d6',
    preConfirm: (messages) =>{
    if (messages){
  // Récupérer toutes les données des utilisateurs
  database.ref('utilisateurs').once('value', (snapshot) => {
    const updates = {}; // Initialise un objet pour stocker les mises à jour pour chaque utilisateur
    snapshot.forEach((childSnapshot) => {
      const userId = childSnapshot.key;
      updates[`utilisateurs/${userId}/MESSAGESAMWALLET`] = messages; // Ajouter une mise à jour pour le champ 'name' de chaque utilisateur
    });
    // Appliquer toutes les mises à jour en une seule opération
    database.ref().update(updates)
      .then(() => {
        alert('Mises à jour des utilisateurs effectuées avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour des utilisateurs:', error);
        alert('Erreur lors de la mise à jour des utilisateurs:');
      });
  });
      }else{
        Swal.showValidationMessage("Please enter something."); 
      }
    }
  });

}

          // Sélectionnez le bouton du pied de page
          const footerButton = document.getElementById('footerButton');        
          // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page  
          footerButton.addEventListener('click', function() {
            // Fermez la boîte de dialogue
            Swal.close();
          });
          // Sélectionnez le bouton du pied de page
          const notificationidx = document.getElementById('notificationidx');
          const sendnotificationidx = document.getElementById('sendnotificationid');
          // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page 

          // start function to send notification 
          notificationidx.addEventListener('click', function() {
            Swal.close();
            $("#Modalnotificationid").modal({
              show: true,
              backdrop: "static",
              keyboard: false,
          });
          });
          sendnotificationidx.addEventListener('click', function() {
            const notificationid = document.getElementById('notificationid').value;
            const userRefx = database.ref(`/utilisateurs/${usermxid}`);
            const dateActuelle = new Date();
            // Obtenez les composantes de la date et de l'heure  
            const jour = dateActuelle.getDate();
            const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
            const annee = dateActuelle.getFullYear();
            const heures = dateActuelle.getHours();
            const minutes = dateActuelle.getMinutes();
            // Formatez la date et l'heure
            const dateFormatee = `${jour}/${mois}/${annee} ${heures}h:${minutes}min`;
            //console.log(dateFormatee);
        // Function to add a gain with status to the user's gains array
        function addGainToUser(notificationid, status, time) {
            const newNotification = { notificationid: notificationid, status: status, time:time};
            userRefx.child("MESSAGES").push(newNotification);
        }              
        // Usage
        addGainToUser(notificationid, true, dateFormatee); // Add a gain of 100 with "won" status

        Swal.fire({
          icon: 'success',
          title: "Félicitations !",
          text: "La notification  a été envoyé avec succès !",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed){
              location.reload();
          }
       })
        });
        // end function to send notification 
        const userRefx = database.ref(`/utilisateurs/${usermxid}`);
        userRefx.once("value")
        .then((snapshot)=> {  
            snapshot.forEach((roductSnapshot) => {
                const productData = roductSnapshot.val();
                document.getElementById('sendunityforuseradd').addEventListener('click', function(){
                    var variableunity = document.getElementById('recipientadd').value;
                    var myCompta = parseFloat(mxcompt);
                    var addunityForuser = parseFloat(variableunity)
                    var sommesUnity = myCompta + addunityForuser
                    const newData = {
                        ACCOUNTPRINCIPAL : sommesUnity
                    };
                    const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                    userRefx.update(newData, (error) => {
                      if (error){
                        alert("les données ne sont pas mise à jour " + error);
                      }else{
                        window.location.reload();
                        
                      }
                     })
                })

                document.getElementById('sendunityforuserlupdate').addEventListener('click', function(){
                    var variableunity = document.getElementById('recipientupdate').value;
                    var myCompta = parseFloat(mxcompt);
                    var addunityForuser = parseFloat(variableunity)
                    var sommesUnity = myCompta - addunityForuser
                    const newData = {
                        ACCOUNTPRINCIPAL : sommesUnity
                    };
                    const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                    userRefx.update(newData, (error) => {
                      if (error){
                        alert("les données ne sont pas mise à jour " + error);
                      }else{
                        window.location.reload();
                        
                      }
                     })
                })

                document.getElementById('sendunityforuserlupdateO').addEventListener('click', function(){
                    const newData = {
                        ACCOUNTPRINCIPAL : 0
                    };
                    const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                    userRefx.update(newData, (error) => {
                      if (error){
                        alert("les données ne sont pas mise à jour " + error);
                      }else{
                        window.location.reload();
                        
                      }
                     })
                })

            })
        }).catch(()=>{
            alert("il y une erreur")
        })
        })
        
        listItems.push(li);
        li.style.cursor = "pointer"
        li.innerHTML = `
            <img src="../img/user_logo.png" alt="">
            <div class="user-info">
                <h5 style="width: 34vh !important; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${productData.email}</h5>
                <p>${productData.username}, &nbsp; &nbsp;&nbsp; Montant de loto : ${productData.AMONTTLOTO} $ </p>
                <p> <strong style="color: blue;">LOTO NUMBER : ${productData.ACCOUNTLOTO}</strong></p>
            </div>
            `;
        result.appendChild(li);
        
 
    }

           document.getElementById('numberIdSubmit').addEventListener('click', function(){
          //alert("vous avez cliqué sur le bouton")
            var numberId = document.getElementById('numberId')
            if(numberId.value){
              window.location.href = `resultloto.html?id_resultlot=${numberId.value}`;  
              {/*
                
                                const newData = {
                    RESPLOTO : numberId.value
                };
                var usermxid ="7M2AsvFsj2OeB50D8CDtQQFGP9K2"
                const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                userRefx.update(newData, (error) => {
                  if (error){
                    Swal.fire({
                      icon: 'error',
                      title: "error !",
                      text: "les données ne sont pas mise à jour",
                      allowOutsideClick: false,
                  }).then((result) => {
                    console.log("voici le loto number" + numberId.value)
                      if (result.isConfirmed) {
                          location.reload();
                      }
                  });
                  }else{
                    Swal.fire({
                      icon: 'success',
                      title: "Félicitations !",
                      text: "les données sont mise à jour ",
                      allowOutsideClick: false,
                  }).then((result) => {
                      if (result.isConfirmed) {
                          location.reload();
                      }
                  });
                    
                  }
                 })
                */}
            }
        })
    })  

    })  

                // Sélectionnez le bouton du pied de page
                 
                var sendnotificationidxw = document.getElementById('sendnotificationidw');
                  sendnotificationidxw.addEventListener('click', function() { 
                    // Récupérer la valeur du champ de saisie
                    const notificationidw = document.getElementById('notificationidw').value;
                    // Vérifier si la valeur est vide
                    if (!notificationidw) {
                        // Afficher un message d'erreur ou empêcher l'exécution de la suite du code
                        console.error("L'identifiant de notification est vide !");
                        return; // Arrêter l'exécution de la fonction
                    }
                    
                    const dateActuelle = new Date();
                    // Obtenez les composantes de la date et de l'heure  
                    const jour = dateActuelle.getDate();
                    const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
                    const annee = dateActuelle.getFullYear();
                    const heures = dateActuelle.getHours();
                    const minutes = dateActuelle.getMinutes();
                    // Formatez la date et l'heure
                    const dateFormatee = `${jour}/${mois}/${annee} ${heures}h:${minutes}min`;
                  
                    // Récupérez une référence à la liste des utilisateurs
                    const usersRef = database.ref(`/utilisateurs`);
                    
                    // Function to add a notification to the user's messages array
                    function addNotificationToUser(userRef, notificationidw, status, time) {
                        const newNotification = { notificationid: notificationidw, status: status, time: time };
                        userRef.child("MESSAGES").push(newNotification);
                    }              
                    
                    // Ajoutez la notification à tous les utilisateurs
                    usersRef.once('value', function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            const userRef = childSnapshot.ref;
                            addNotificationToUser(userRef, notificationidw, true, dateFormatee);
                        });
                        
                        // Affichez la notification de succès une fois que toutes les notifications ont été envoyées
                        Swal.fire({
                            icon: 'success',
                            title: "Félicitations !",
                            text: "La notification a été envoyée avec succès à tous les utilisateurs !",
                            allowOutsideClick: false,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        });
                    });
                });
                
                
                // end function to send notification  
                
                 // Start function to send job 
                var postJobsIdSend = document.getElementById('postJobsIdSend');
                postJobsIdSend.addEventListener('click', function() { 
                  function generateUUID() {
                    // Fonction pour générer un UUID v4
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                      return v.toString(16);
                    });
                  }
                  
                  // Exemple d'utilisation
                  var uniqueId = generateUUID();

                  
                  // Récupérer la valeur du champ de saisie
                  var Title_de_job = document.getElementById('Title_de_job').value;
                  var Xitle_de_Categorie = document.getElementById('Title_de_Categorie').value;
                  var Salaire_de_job = document.getElementById('Salaire_de_job').value;
                  var xDescription_de_job = document.getElementById('Description_de_job').value;
                  // Vérifier si la valeur est vide
                  if (Title_de_job === "" || Salaire_de_job === "" || xDescription_de_job === "") {
                      // Afficher un message d'erreur ou empêcher l'exécution de la suite du code
                     alert(`L'un des champs est vide`)
                  }else{
                    const dateActuelle = new Date();
                    // Obtenez les composantes de la date et de l'heure  
                    const jour = dateActuelle.getDate();
                    const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
                    const annee = dateActuelle.getFullYear();
                    const heures = dateActuelle.getHours();
                    const minutes = dateActuelle.getMinutes();
                    // Formatez la date et l'heure
                    const dateFormatee = `${jour}/${mois}/${annee} ${heures}h:${minutes}min`;

                    firebase.database().ref('lesjobsx/' + uniqueId).set({   
                      XitledeCategorie : Xitle_de_Categorie,                 
                      Titledejob: Title_de_job, 
                      Salairedejob: Salaire_de_job, 
                      Descriptiondejob: xDescription_de_job, 
                      time: dateFormatee,
                      jobId: uniqueId
                                                                        
                      }).then(() => {  
                        // Affichez la notification de succès une fois que toutes les notifications ont été envoyées
                        Swal.fire({
                          icon: 'success',
                          title: "Félicitations !",
                          text: "Le post a été envoyé avec succès !",
                          allowOutsideClick: false,
                      }).then((result) => {
                          if (result.isConfirmed) {
                              location.reload();
                          }
                      });
                      }).catch((error)=>{
                        alert("il y a une erreur")
                      })
                  }
                  
              });
              
              
              // end function to send job 

}


function filterData(searchTerm) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
}else{
    alert('non non')
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
                  // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page 
                  var notificationidxw = document.getElementById('notificationidxw');
                  // start function to send notification 
                  notificationidxw.addEventListener('click', function() {
                  $("#Modalnotificationidw").modal({
                  show: true,
                  backdrop: "static",
                  keyboard: false,
                  });
                  });