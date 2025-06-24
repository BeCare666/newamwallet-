const firebaseConfig = {
    apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
    authDomain: "am-wallet.firebaseapp.com",
    databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
    projectId: "am-wallet",
    storageBucket: "am-wallet.appspot.com",
    messagingSenderId: "877693231070",
    appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
  };
  const unserconnectId = localStorage.getItem("unserconnect");
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  firebase.auth().onAuthStateChanged(function(user) { 
    if(user){ 
    var userId = user.uid;
    const userRef = database.ref(`/utilisateurs/${userId}`);
    userRef.once("value")
    .then((snapshot) => {
    if(snapshot.exists()){
    var ACCOUNTINVESTSATUS = snapshot.val().ACCOUNTINVESTSATUS;
    var ACCOUNTINVEST = snapshot.val().ACCOUNTINVEST;
       // star function set active  investment
       var InvestClass =  document.querySelectorAll('.investClass');
       InvestClass.forEach((T)=>{
      T.addEventListener('click', function(){
        var Amont = T.id
        //var valeurx = "5"
        var Amonti = parseFloat(Amont);
        //var valeurxi = parseFloat(valeurx)
        //var sommes = Amonti + valeurxi
        //console.log(sommes)
        if(!ACCOUNTINVESTSATUS && ACCOUNTINVEST ==0){
          const newData = {
            ACCOUNTINVEST: Amonti,
            };
          userRef.update(newData, (error) => {
            if (error){
              Swal.fire({
                  title: "Ooops",
                  text:"error",
                  confirmButtonText: "OK",
                  allowOutsideClick: false,
                  icon: 'error'
                  }).then((result)=>{
                  if(result.isConfirmed){
                      window.location.reload(); 
                }
               })
            }else{
        {/*          localStorage.setItem('SommesPrice', Amont)
                       // Récupérer la valeur du champ de saisie
                       const notificationidw = `Félicitations
                       Votre pack d'investissement est  activé et nous vous informons 
                       que vous venez de gagner 5$ que vous pouvez retirer sur votre 
                       compte. Cette mesures es mise place pour s'assurer si votre compte 
                       d'investissement a été bien configuré. Veillez retirer ces 5$ sous 
                       peu. Merci de nous faire confiance.`
        
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
                       const usersRef = database.ref(`/utilisateurs/${userId}`);
                       
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
                 }); */}           
                   Swal.fire({
                       title: "Congratulation",
                       text:"Your investment pack has been activated.",
                       confirmButtonText: "OK",
                       allowOutsideClick: false,
                       icon: 'succes'
                       }).then((result)=>{
                       if(result.isConfirmed){
                           window.location.href = "../index.html"; 
                   }
                   })
                   }
               })
        
        }else if(!ACCOUNTINVESTSATUS && ACCOUNTINVEST !=0) {
           Swal.fire({
               title: "Information",
               text:"You already have a pending investment package.",
               confirmButtonText: "OK",
               allowOutsideClick: false,
               icon: 'info'
               }).then((result)=>{
               if(result.isConfirmed){
                   window.location.reload(); 
             }
            })
        }else if(ACCOUNTINVESTSATUS && ACCOUNTINVEST !=0){
           Swal.fire({
               title: "Information",
               text:"You already have investment in progress.",
               confirmButtonText: "OK",
               allowOutsideClick: false,
               icon: 'info'
               }).then((result)=>{
               if(result.isConfirmed){
                   window.location.reload(); 
             }
            })
        
        }

    })
 
   })

    }
   })
 
}else{
    window.location.href = "../login.html"
  }
// end function set active  investment
})

const cards = document.querySelectorAll(".card");
cards.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cards.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  });
});


