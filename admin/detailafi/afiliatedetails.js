window.onload = function(){
    if (/Mobi|Android/i.test(navigator.userAgent)) { 
var wallet =  document.getElementById('wallet-containerId'); 
 var HistoryId =  document.getElementById('historyId');
 var ComeBackId =  document.getElementById('comeBackId');
 var PhistoryId =  document.getElementById('phistoryId');
 wallet.style.height = "100%"
 wallet.style.width = "100%"
 wallet.style.setProperty("font-size", "75px", "important");
 //HistoryId.style.marginTop = "46%"
 ComeBackId.style.fontSize = "2vh"
 PhistoryId.style.height = "55vh"
  //document.getElementById('contentSignup').style.marginTop = "5vh"
  } else {
// Code pour ordinateur de bureau
var ComeBackId =  document.getElementById('comeBackId');
ComeBackId.style.fontSize = "2vh"
  }

  //star function to comBack
  document.getElementById('comeBackId').addEventListener('click', function(){
    window.location.href = "../admin.html"
  })
  // end function tocomeBack
  // Configuration Firebase
// Créez une nouvelle instance de l'objet Date
const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
  };
  const UserConnectuser = localStorage.getItem("takeidAfil");
  // Initialisation de Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Récupérer un utilisateur par son ID
  function getUserById(userId) {
    const database = firebase.database();
    const userRef = database.ref(`/utilisateurs/${userId}`);
  
    userRef.once("value")
      .then((snapshot) => {
        const user = snapshot.val();
        if (user) {
          //console.log("Utilisateur récupéré :", user);
          document.getElementById('preloader').style.display = "none"
          var UserCOMMISSON = user.ACCOUNTPRINCIPALX
          localStorage.setItem("xxserCOMMISSON", UserCOMMISSON)
          var Amount = document.getElementById('amount');
          var ImgNodata = document.getElementById('imgNodata');
          var PhistoryId = document.getElementById('phistoryId');
          var IdTogetwallet = document.getElementById('idTogetwallet');
           var amount = UserCOMMISSON * 555
          Amount.innerHTML = `${amount} $`
          
          if(UserCOMMISSON == 0){
            IdTogetwallet.disabled = true
          }else{
            IdTogetwallet.disabled = false
          }

          // to update Gains
        var updateGains = document.getElementById('updateGains');
        updateGains.addEventListener('click', function(){
        //containerId.style.display = "none"
        Swal.fire({
          title: "Vider le compte",
          html: `
            <style>
              .swal2-input {
                width: 100% !important;
              }
            </style>
            <p>Vider le compte de gains de <strong style="color: blue;">am wallet address</strong>.</p>
            
          `,
 
          showCancelButton: true,
          confirmButtonText: 'Vider le compte',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {           
            const unserconnectuserIdE = localStorage.getItem("takeidAfil")
            
            const newData = {
              ACCOUNTPRINCIPALX: 0, 
            };
            const userRefx = database.ref(`/utilisateurs/${unserconnectuserIdE}`);
            userRefx.update(newData, (error) => {
              if (error){
                Swal.fire({
                    title: "Ooops",
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                    text: "Your operation has failed.",
                    icon: 'error'
                    }).then((result)=>{
                    if(result.isConfirmed){
                        window.location.reload(); 
                    }
                })
              }else{
                  Swal.fire({
                      icon: 'success',
                      title:"Succès",
                      confirmButtonText: "OK",
                      allowOutsideClick: false,
                      text : `Your operation has been completed successfully.`,
                      }).then((result)=>{
                      if(result.isConfirmed){
                        window.location.reload(); 
                      }
                  })

                }
            }) 
          
          }
        });



        })


          //function to creat the liste p
          // Sélectionnez la balise p
          const userListP = document.getElementById("phistoryId");
          const userListUl = document.createElement("span");
          //console.log("Utilisateur récupéré :", user);
          var UserGETALLWALLET = user.GETALLWALLET
          //console.log("Utilisateur récupéré :", UserGETALLWALLET);
        // Convertir l'objet d'utilisateurs en un tableau d'objets
        const userArray = Object.entries(UserGETALLWALLET).map(([key, value]) => ({ id: key, ...value }));
        //function to controle the 
        //console.log(userArray.length)
        if(userArray.length == 0){
          //alert('ça marche bien')
           ImgNodata.style.display = "block !important";
            PhistoryId.style.display = "none"
          }else{
            ImgNodata.style.display = "none"
            PhistoryId.style.display = "block"
          }
        // Trier le tableau en fonction de la valeur du champ "comptValidé"
        userArray.sort((a, b) => {
        // Mettre les comptes validés en bas
        if (a.status && !b.status) {
            return -1;
        }
        // Mettre les comptes non validés en haut
        if (!a.status && b.status) {
            return 1;
        }
        // Garder l'ordre actuel si les deux utilisateurs ont la même valeur pour "comptValidé"
        return 0;
        });
        //var tableId = []
        // Parcourez les données des utilisateurs et ajoutez-les à la liste
        for (const userId in userArray) {
            const usergal = userArray[userId];
            const userLi = document.createElement("p");
            userLi.innerHTML = `${usergal.status ? `<p class="txn-list" id="${usergal.id}" style="cursor: pointer !important; border-radius: 5px !important; "><strong>En cours</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>${usergal.time} </strong><strong><span class="debit-amount" style="color: green !important;">${usergal.gain} FCFA</span></strong></p>`: `<p class="txn-list" style="border-radius: 5px !important;"><strong >Payé</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>${usergal.time} </strong><span class="debit-amount" style="color:#FFB6C1 !important;"><strong>${usergal.gain} FCFA</span></strong></p>`} `;
            userListUl.appendChild(userLi);
            //console.log(usergal.id)
            if(usergal.status){
                userLi.addEventListener('click', function(){
                    document.getElementById('preloader').style.display = "block" 
                    const dateActuelle = new Date();
                    // Obtenez les composantes de la date et de l'heure
                    const jour = dateActuelle.getDate();
                    const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
                    const annee = dateActuelle.getFullYear();
                    const heures = dateActuelle.getHours();
                    const minutes = dateActuelle.getMinutes();
                    // Formatez la date et l'heure
                    const dateFormatee = `${jour}/${mois}/${annee} ${heures}h:${minutes}min`;
                    //alert(usergal.gain)
                    // Fonction pour mettre à jour un enregistrement d'un utilisateur
                    // Fonction pour mettre à jour l'enregistrement d'un utilisateur avec de nouvelles valeurs pour `time` et `status`
                    function updateGainForUser(userId, gainKey, newStatus, newTime) {
                        // Le chemin complet vers l'enregistrement à mettre à jour
                        const gainPath = `GETALLWALLET/${gainKey}`;
                        
                        // Créez un objet pour les données mises à jour
                        const updatedData = {
                        status: newStatus,
                        time: newTime
                        };
                    
                        // Mettez à jour l'enregistrement sous le chemin spécifié
                        return   userRef.child(gainPath).update(updatedData);
                    }
                    
                    // Usage : Mettez à jour l'enregistrement pour un utilisateur spécifique
                    var userAfiId = usergal.id
                    const UserConnectuser = localStorage.getItem("takeidAfil");// Remplacez par l'ID de l'utilisateur
                    const nouveauStatus = false; // Remplacez par le nouveau statut
                    updateGainForUser(UserConnectuser, userAfiId, nouveauStatus, dateFormatee)
                    .then(() => {
                        document.getElementById('preloader').style.display = "none"
                        Swal.fire({
                            icon: 'success',
                            title: 'Félicitations !',
                            text: 'La validation de votre transfert a été effectuée avec succès.',
                            allowOutsideClick: false,
                          }).then((result) => {
                            if (result.isConfirmed){
                                location.reload();
                            }
                         })
                        //alert("Mise à jour réussie !");
                      })
                      .catch(error => {
                        document.getElementById('preloader').style.display = "none"
                        Swal.fire({
                            icon: 'error',
                            title: 'Désolé !',
                            text: 'La validation de votre transfert a échoué. Veuillez réessayer plus tard !',
                            allowOutsideClick: false,
                          }).then((result) => {
                            if (result.isConfirmed){
                                location.reload();
                            }
                         })
                        //alert("Erreur lors de la mise à jour : ");
                      });
                })
            }
        }
    
        // Ajoutez la liste à la balise p
        userListP.appendChild(userListUl);
        } else {
         // console.log("Utilisateur introuvable.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      });
  }
  
  // Exemple d'utilisation : Remplacez "ID_DE_L_UTILISATEUR" par l'ID de l'utilisateur que vous souhaitez récupérer.
  getUserById(UserConnectuser);

 }