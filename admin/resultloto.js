const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f",
};
var urlParams = new URLSearchParams(window.location.search);

// Récupère la valeur de "id_resultlot"
var idResultLot = urlParams.get('id_resultlot');

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
firebase.auth().onAuthStateChanged(function (user) { 
    if (user) {
 
      const newData = {
          RESPLOTO: idResultLot , 
      };

      // Get all users
      database.ref('/utilisateurs').once('value', snapshot => {
          snapshot.forEach(userSnapshot => {
              const userRef = database.ref(`/utilisateurs/${userSnapshot.key}`);
              userRef.update(newData, (error) => {
                  if (error) {
                    document.getElementById("traitementID").style.display = "none";
                      //console.error(`Failed to update user ${userSnapshot.key}:`, error);
                      Swal.fire({
                        icon: 'error',
                        text: "Result to update tables",
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  } else {
                      //console.log(`User ${userSnapshot.key} updated successfully.`);
                      document.getElementById("traitementID").style.display = "none";
                      Swal.fire({
                        icon: 'success',
                        text: "Result updated successfully",
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "admin.html";
                        }
                    });
                  }
              });
          });
      });
  
    } else {
        console.error('User is not authenticated');
    }
})