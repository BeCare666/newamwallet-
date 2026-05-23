$("#exampleModalCenter").modal({ // 7M2AsvFsj2OeB50D8CDtQQFGP9K2
    show: true,
    backdrop: "static",
    keyboard: false,
});
const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",  
  projectId: "am-wallet", 
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f"
};
const unserconnectId = localStorage.getItem("unserconnect")
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById('numberIdSubmit').addEventListener('click', function(){
  var numberId = document.getElementById('numberId');
  if (numberId.value) {
      const newData = {
          TABLESLOTO: numberId.value ,
          ACCOUNTLOTO: "",
          AMONTTLOTO: "",
          dateActuelle:"",
          RESPLOTO: ""
      };

      // Get all users
      database.ref('/utilisateurs').once('value', snapshot => {
          snapshot.forEach(userSnapshot => {
              const userRef = database.ref(`/utilisateurs/${userSnapshot.key}`);
              userRef.update(newData, (error) => {
                  if (error) {
                      //console.error(`Failed to update user ${userSnapshot.key}:`, error);
                      Swal.fire({
                        icon: 'error',
                        text: "Failed to update tables",
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
                        text: "tables updated successfully",
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                  }
              });
          });
      });
  }
});

     //function to generate affilition link
     const linkInput = document.getElementById('linkInput');
     const copyButton = document.getElementById('affiliateID');
     linkInput.value = `Cliquer et Copier ici votre le tableau.`
     linkInput.style.color ="green"
     linkInput.style.textAlign ="center"  
     linkInput.style.fontSize ="12px"
     // function to hide border when you click
     copyButton.addEventListener('click', () => {
     let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     // Mélanger le tableau
     array = shuffleArray(array);
     // Afficher le tableau mélangé
     linkInput.value = `[${array.join(', ')}]`
     linkInput.select(); // Sélectionne le texte dans l'input
     document.execCommand('copy'); // Copie le texte sélectionné dans le presse-papiers
     });
     // Fonction pour mélanger le tableau (algorithme de Fisher-Yates)
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments
      }
      return array;
    }