
const supabaseUrl = "https://rakxwngpnfiwnjiiidge.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJha3h3bmdwbmZpd25qaWlpZGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyNTA5NDcsImV4cCI6MjA3ODgyNjk0N30.LXoSpUiCYuptQ02tqITcHEULJIuu2QfU6WsUS7GlOrE";
const supabase = createClient(supabaseUrl, supabaseKey);
const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];
var tableOfPrice = [];
var tableEmail = [];
var urlImage = [];
var tableTakeIdUserDelete = [];
var totalUsers = []
var totalUsersConnectAll = []
const imageUrls = [];
const imageNotPdfUrls = [];
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userId = user.uid;
    getData();

    filter.addEventListener("input", (e) => filterData(e.target.value));

    function getData() {
      const userRef = database.ref(`/utilisateurs/`);
      userRef.once("value").then((snapshot) => {
        // Clear results
        result.innerHTML = "";
        snapshot.forEach((productSnapshot) => {
          const productData = productSnapshot.val();

          totalUsers.push(productData)
          console.log("totalUsers", totalUsers.length)
          document.getElementById('statvalueUsersId').textContent = `${totalUsers.length}`
          var mxcompt = productData.ACCOUNTPRINCIPAL;
          const li = document.createElement("li");
          li.addEventListener("click", function () {
            li.id = `${productData.userId}`;
            tableTakeIdUserDelete.push(productData.userId)
            console.log(li.id);
            var usermxid = li.id;

            Swal.fire({
              title: "Modification",
              html: `Modier le compte de <strong style="color: blue;">${productData.username}</strong>`,
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
              <button id="footerButtonstatus" style="color: white; background-color: blue; border: none; padding: 12px; cursor: pointer; border-radius: 5px;">status</button>&nbsp;&nbsp;
              <button id="footerButtonDeleteUser" style="color: white; background-color: #FFB6C1; border: none; padding: 12px; cursor: pointer; border-radius: 5px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M5.5 0a.5.5 0 0 1 .5.5V1h5V.5a.5.5 0 0 1 1 0V1h2a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H14v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2H1a.5.5 0 0 1-.5-.5V1a.5.5 0 0 1 .5-.5h2V.5a.5.5 0 0 1 .5-.5h3zM4 2v11h8V2H4z"/>
              </svg>
            </button>&nbsp;&nbsp;
            <button id="footerButtonAddpoints"
            style="color: white; background-color: green; border: none; padding: 12px; cursor: pointer; border-radius: 5px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0V7H5a.5.5 0 0 0 0 1h2.5v2.5a.5.5 0 0 0 1 0V8H11a.5.5 0 0 0 0-1H8.5V4.5z" />
            </svg>
          </button>

              `,
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
                var sendunityforuserlup = document.getElementById(
                  "sendunityforuserlupdateO"
                );
                sendunityforuserlup.click();
              } else if (result.isDenied) {
                // Swal.fire("Changes are not saved", "", "info");
                $("#exampleModalupdate").modal({
                  show: true,
                  backdrop: "static",
                  keyboard: false,
                });
              }
            });




            var footerButtonwallet =
              document.getElementById("footerButtonwallet");
            footerButtonwallet.addEventListener("click", function () {
              localStorage.setItem("takeidAfil", usermxid);
              window.location.href = "../admin/detailafi/afiliatedetails.html";
            });

            // Start function to activate or desactivate account users
            var footerButtonstatus =
              document.getElementById("footerButtonstatus");
            footerButtonstatus.addEventListener("click", function () {
              Swal.fire({
                title: "Changer le satus",
                text: "info",
                confirmButtonText: "Activer",
                denyButtonText: `Suspendre`,
                cancelButtonText: "retour",
                allowOutsideClick: false,
                showDenyButton: true,
                showCancelButton: true,
                icon: "info",
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  const newData = {
                    USERSTATUS: true,
                  };
                  const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                  userRefx.update(newData, (error) => {
                    if (error) {
                      alert("les données ne sont pas mise à jour " + error);
                    } else {
                      alert("les données sont mise à jour ");
                    }
                  });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  //  Swal.fire("OK", "", "info");
                } else if (result.isDenied) {
                  const newData = {
                    USERSTATUS: false,
                  };
                  const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                  userRefx.update(newData, (error) => {
                    if (error) {
                      alert("les données ne sont pas mise à jour " + error);
                    } else {
                      alert("les données sont mise à jour ");
                    }
                  });
                }
              });
            });
            // End function to activate or desactivate account users 

            // function to delete user
            var footerButtonDeleteUser = document.getElementById(
              "footerButtonDeleteUser"
            );
            footerButtonDeleteUser.addEventListener("click", footerButtonDeleteUserFunction);
            function footerButtonDeleteUserFunction() {
              const lastElementUserId = tableTakeIdUserDelete.slice(-1)[0];
              //alert(lastElementUserId);
              const userRef = database.ref(`/utilisateurs/`);
              // Supposons que vous ayez une variable userId qui contient l'ID de l'utilisateur à supprimer
              //const userId = 'ID_DE_L_UTILISATEUR';  // Remplacez par l'ID réel

              // Référence à l'utilisateur spécifique
              var userToDeleteRef = userRef.child(lastElementUserId);

              // Supprimer l'utilisateur
              userToDeleteRef.remove()
                .then(() => {
                  Swal.fire({
                    title: "supprimé",
                    text: "Utilisateur supprimé avec succès",
                    allowOutsideClick: false,
                    icon: "info",
                  }).then((result) => {
                    firebase
                      .database()
                      .ref("userdelete/")
                      .push({
                        userId: lastElementUserId,
                      });

                    if (result.isConfirmed) {
                      location.reload();
                    }
                  })

                })
                .catch((error) => {

                  Swal.fire({
                    title: "Oooops",
                    text: "Erreur lors de la suppression de l'utilisateur",
                    allowOutsideClick: false,
                    icon: "error",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      location.reload();
                    }
                  })
                });
            }

            var footerButtonMessages = document.getElementById(
              "footerButtonMessages"
            );
            footerButtonMessages.addEventListener("click", updateAllUsers);
            function updateAllUsers() {
              Swal.fire({
                title: "The message",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Send",
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                preConfirm: (messages) => {
                  if (messages) {
                    // Récupérer toutes les données des utilisateurs
                    database.ref("utilisateurs").once("value", (snapshot) => {
                      const updates = {}; // Initialise un objet pour stocker les mises à jour pour chaque utilisateur
                      snapshot.forEach((childSnapshot) => {
                        const userId = childSnapshot.key;
                        updates[`utilisateurs/${userId}/MESSAGESAMWALLET`] =
                          messages; // Ajouter une mise à jour pour le champ 'name' de chaque utilisateur
                      });
                      // Appliquer toutes les mises à jour en une seule opération
                      database
                        .ref()
                        .update(updates)
                        .then(() => {
                          alert(
                            "Mises à jour des utilisateurs effectuées avec succès"
                          );
                        })
                        .catch((error) => {
                          console.error(
                            "Erreur lors de la mise à jour des utilisateurs:",
                            error
                          );
                          alert(
                            "Erreur lors de la mise à jour des utilisateurs:"
                          );
                        });
                    });
                  } else {
                    Swal.showValidationMessage("Please enter something.");
                  }
                },
              });
            }

            // Sélectionnez le bouton du pied de page
            const footerButton = document.getElementById("footerButton");
            // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page
            footerButton.addEventListener("click", function () {
              // Fermez la boîte de dialogue
              Swal.close();
            });
            // Sélectionnez le bouton du pied de page
            const notificationidx = document.getElementById("notificationidx");

            const sendnotificationidx =
              document.getElementById("sendnotificationid");
            // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page

            // start function to send notification
            notificationidx.addEventListener("click", function () {
              Swal.close();
              $("#Modalnotificationid").modal({
                show: true,
                backdrop: "static",
                keyboard: false,
              });
            });


            // function to send points 
            const footerButtonAddpoints =
              document.getElementById("footerButtonAddpoints");
            footerButtonAddpoints.addEventListener("click", function () {
              Swal.close();
              $("#ModalfooterButtonAddpoints").modal({
                show: true,
                backdrop: "static",
                keyboard: false,
              });

              const userRefxv = database.ref(`/utilisateurs/${usermxid}`);
              userRefxv
                .once("value")
                .then((snapshot) => {
                  const userData = snapshot.val();

                  if (!userData) {
                    alert("Utilisateur introuvable");
                    return;
                  }

                  const currentPoints = parseFloat(userData.points);
                  console.log("currentPoints", currentPoints)

                  document.getElementById("ModalfooterButtonAddpointsSend").addEventListener("click", function () {
                    const inputValue = document.getElementById("recivePointId").value.trim();

                    // Remplacer éventuelle virgule par un point pour supporter les décimales
                    const parsedValue = parseFloat(inputValue.replace(',', '.'));

                    if (isNaN(parsedValue)) {
                      alert("Veuillez entrer un nombre valide.");
                      return;
                    }

                    // Calcul du nouveau total (peut augmenter ou diminuer)
                    const newPoints = parseFloat((currentPoints + parsedValue).toFixed(2));

                    console.log("currentPoints:", currentPoints, "inputValue:", parsedValue, "newPoints:", newPoints);

                    // Mise à jour dans Firebase
                    const userRefx = database.ref(`/utilisateurs/${usermxid}`);
                    userRefx.update({ points: newPoints }, (error) => {
                      if (error) {
                        alert("Les données n'ont pas été mises à jour : " + error);
                      } else {
                        alert("Les données ont été mises à jour !");
                        window.location.reload();
                      }
                    });
                  });




                })
                .catch((err) => {
                  console.error(err);
                  alert("Une erreur est survenue lors de la récupération des données");
                });

            });


            // end function to send points
            sendnotificationidx.addEventListener("click", function () {
              const notificationid =
                document.getElementById("notificationid").value;
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
                const newNotification = {
                  notificationid: notificationid,
                  status: status,
                  time: time,
                };
                userRefx.child("MESSAGES").push(newNotification);
              }
              // Usage
              addGainToUser(notificationid, true, dateFormatee); // Add a gain of 100 with "won" status

              Swal.fire({
                icon: "success",
                title: "Félicitations !",
                text: "La notification  a été envoyé avec succès !",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            });
            // end function to send notification
            const userRefx = database.ref(`/utilisateurs/${usermxid}`);
            userRefx
              .once("value")
              .then((snapshot) => {
                snapshot.forEach((roductSnapshot) => {
                  const productData = roductSnapshot.val();
                  document
                    .getElementById("sendunityforuseradd")
                    .addEventListener("click", function () {
                      var variableunityx =
                        document.getElementById("recipientadd").value.trim();
                      // Remplacer éventuelle virgule par un point pour supporter les décimales
                      const variableunity = parseFloat(variableunityx.replace(',', '.'));

                      var myCompta = parseFloat(mxcompt);
                      var addunityForuser = parseFloat(variableunity);
                      //var sommesUnity = myCompta + addunityForuser;
                      var sommesUnity = parseFloat((myCompta + addunityForuser).toFixed(2));
                      const newData = {
                        ACCOUNTPRINCIPAL: sommesUnity,
                      };
                      const userRefx = database.ref(
                        `/utilisateurs/${usermxid}`
                      );
                      userRefx.update(newData, (error) => {
                        if (error) {
                          alert("les données ne sont pas mise à jour " + error);
                        } else {
                          window.location.reload();
                        }
                      });
                    });

                  document
                    .getElementById("sendunityforuserlupdate")
                    .addEventListener("click", function () {
                      var variableunityx =
                        document.getElementById("recipientupdate").value.trim();
                      // Remplacer éventuelle virgule par un point pour supporter les décimales
                      var variableunity = parseFloat(variableunityx.replace(',', '.'));

                      var myCompta = parseFloat(mxcompt);
                      var addunityForuser = parseFloat(variableunity);
                      //var sommesUnity = myCompta + addunityForuser;
                      var sommesUnity = parseFloat((myCompta - addunityForuser).toFixed(2));

                      const newData = {
                        ACCOUNTPRINCIPAL: sommesUnity,
                      };
                      const userRefx = database.ref(
                        `/utilisateurs/${usermxid}`
                      );
                      userRefx.update(newData, (error) => {
                        if (error) {
                          alert("les données ne sont pas mise à jour " + error);
                        } else {
                          window.location.reload();
                        }
                      });
                    });

                  document
                    .getElementById("sendunityforuserlupdateO")
                    .addEventListener("click", function () {
                      const newData = {
                        ACCOUNTPRINCIPAL: 0,
                      };
                      const userRefx = database.ref(
                        `/utilisateurs/${usermxid}`
                      );
                      userRefx.update(newData, (error) => {
                        if (error) {
                          alert("les données ne sont pas mise à jour " + error);
                        } else {
                          window.location.reload();
                        }
                      });
                    });
                });
              })
              .catch(() => {
                alert("il y une erreur");
              });
          });

          // Création du li

          listItems.push(li);
          li.style.cursor = "pointer";

          // HTML avec ID unique pour le statut
          const statusId = `user-status-${productData.id}`; // Assure que chaque utilisateur a un ID unique

          li.innerHTML = `
          <div style="position: relative; display: inline-block;">
            <img src="../img/user_logo.png" alt="" style="width: 40px; height: 40px; border-radius: 50%;">
            <div id="${statusId}" style="
                position: absolute;
                bottom: -5px;
                right: -5px;
                min-width: 20px;
                min-height: 20px;
                padding: 2px 4px;
                background-color: green;
                color: white;
                font-size: 10px;
                border: 2px solid white;
                border-radius: 50%;
                text-align: center;
                line-height: 15px;
            ">
            </div>
          </div>
          <div class="user-info" style="display: inline-block; vertical-align: middle; margin-left: 8px;">
              <h5 style=" width: 37vh !important;text-overflow: ellipsis; overflow: hidden;">
                ${productData.email}
              </h5>
              <p>${productData.username}, &nbsp; &nbsp;&nbsp; Solde : ${productData.ACCOUNTPRINCIPAL}$  
                Invest: ${productData.ACCOUNTINVEST}$</p>
              <p style="display: flex !important;"> 
                <strong style="color: blue;">CDDR : ${productData.ACCOUNTINVESTGETCIDR}$</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong style="color: blue;">POINTS: ${productData.points ? productData.points : "0"} </strong>
              </p>
          </div>
        `;

          // Sélection du statut après injection HTML  white-space: nowrap;
          const statusElement = li.querySelector(`#${statusId}`);

          let lastSeenValue = productData.last_seen || null;
          let isOnline = !!productData.online;

          // Fonction format "vu il y a"
          function formatLastSeen(timestamp) {
            const diff = Date.now() - timestamp;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (seconds < 60) return `${seconds} sec`;
            if (minutes < 60) return `${minutes} min`;
            if (hours < 24) return `${hours} h`;
            return `${days} j`;
          }

          // Mise à jour affichage du statut
          function updateStatus() {
            if (isOnline) {
              totalUsersConnectAll.push(isOnline)
              document.getElementById('statvalueUsersConnectId').textContent = totalUsersConnectAll?.length || 0;
              //statusElement.innerText = "🟢";
              statusElement.style.backgroundColor = "green";
            } else {
              // statusElement.innerText = "⚪";
              statusElement.style.backgroundColor = "gray";
              if (lastSeenValue) {
                statusElement.innerHTML = formatLastSeen(lastSeenValue); // info bulle
                statusElement.style.minHeight = "30px";
              }
            }
          }

          updateStatus();

          // Mise à jour toutes les minutes si offline
          setInterval(() => {
            if (!isOnline && lastSeenValue) {
              statusElement.title = formatLastSeen(lastSeenValue);
            }
          }, 60 * 1000);


          result.appendChild(li);
        });
      });

      // Sélectionnez le bouton du pied de page

      var sendnotificationidxw = document.getElementById("sendnotificationidw");
      sendnotificationidxw.addEventListener("click", function () {
        // Récupérer la valeur du champ de saisie
        const notificationidw = document.getElementById("notificationidw").value;
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
          const newNotification = {
            notificationid: notificationidw,
            status: status,
            time: time,
          };
          userRef.child("MESSAGES").push(newNotification);
        }

        // Ajoutez la notification à tous les utilisateurs
        usersRef.once("value", function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const userRef = childSnapshot.ref;
            addNotificationToUser(userRef, notificationidw, true, dateFormatee);
          });

          // Affichez la notification de succès une fois que toutes les notifications ont été envoyées
          Swal.fire({
            icon: "success",
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



      // Fonction pour uploader un fichier sur Cloudinary
      async function uploadToCloudinary(file) {
        try {
          // Crée un nom unique pour le fichier
          const fileName = `${Date.now()}_${file.name}`;
          const { data, error } = await supabase.storage
            .from('uploads')  // Nom du bucket que tu as créé dans Supabase
            .upload(fileName, file);

          if (error) {
            console.error("Erreur upload Supabase:", error.message);
            return null;
          }

          // Récupérer l'URL publique
          const { publicUrl, error: urlError } = supabase
            .storage
            .from('uploads')
            .getPublicUrl(fileName);

          if (urlError) {
            console.error("Erreur récupération URL Supabase:", urlError.message);
            return null;
          }

          return publicUrl;
        } catch (err) {
          console.error("Erreur upload Supabase:", err);
          return null;
        }
      }


      // Gestion du premier input
      document.getElementById('imageFile').addEventListener('change', async function () {
        const file = this.files[0];
        if (!file) return;

        const url = await uploadToCloudinary(file);
        if (url) {
          imageUrls.push(url);
          console.log("ImageFile URL ajoutée:", url);
        }
      });

      // Gestion du second input
      document.getElementById('imageFileNotPdf').addEventListener('change', async function () {
        const file = this.files[0];
        if (!file) return;

        const url = await uploadToCloudinary(file);
        if (url) {
          imageNotPdfUrls.push(url);
          console.log("ImageFileNotPdf URL ajoutée:", url);
        }
      });


      var postJobsIdSend = document.getElementById("postJobsIdSend");
      postJobsIdSend.addEventListener("click", function () {
        function generateUUID() {
          // Fonction pour générer un UUID v4
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
              var r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            }
          );
        }

        // Exemple d'utilisation
        var uniqueId = generateUUID();

        // Récupérer la valeur du champ de saisie 
        var Title_de_job = document.getElementById("Title_de_job").value;
        var Xitle_de_Categorie =
          document.getElementById("Title_de_Categorie").value;
        var Salaire_de_job = document.getElementById("Salaire_de_job").value;
        var xDescription_de_job =
          document.getElementById("Description_de_job").value;
        const lastImage = imageUrls[imageUrls.length - 1];
        const lastImageNotPdf = imageNotPdfUrls[imageNotPdfUrls.length - 1];
        // Vérifier si la valeur est vide



        if (
          Title_de_job === "" ||
          Salaire_de_job === "" ||
          xDescription_de_job === ""
        ) {
          // Afficher un message d'erreur ou empêcher l'exécution de la suite du code
          alert(`L'un des champs est vide`);
        } else {
          const dateActuelle = new Date();
          // Obtenez les composantes de la date et de l'heure
          const jour = dateActuelle.getDate();
          const mois = dateActuelle.getMonth() + 1; // Les mois commencent à 0, donc ajoutez 1
          const annee = dateActuelle.getFullYear();
          const heures = dateActuelle.getHours();
          const minutes = dateActuelle.getMinutes();
          // Formatez la date et l'heure
          const dateFormatee = `${jour}/${mois}/${annee} ${heures}h:${minutes}min`;

          firebase
            .database()
            .ref("lesjobsx/" + uniqueId)
            .set({
              XitledeCategorie: Xitle_de_Categorie,
              Titledejob: Title_de_job,
              Salairedejob: Salaire_de_job,
              Descriptiondejob: xDescription_de_job,
              time: dateFormatee,
              jobId: uniqueId,
              formationimg: lastImage,
              formationimgNotPdf: lastImageNotPdf
            })
            .then(() => {
              // Affichez la notification de succès une fois que toutes les notifications ont été envoyées
              Swal.fire({
                icon: "success",
                title: "Félicitations !",
                text: "Le post a été envoyé avec succès !",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  location.reload();
                }
              });
            })
            .catch((error) => {
              alert("il y a une erreur");
            });
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
  } else {
    alert("non non");
  }

  var inputElement = document.getElementById("imageProduct");
  // Ajoutez un gestionnaire d'événements pour écouter le changement de fichier
  inputElement.addEventListener("change", handleFiles, false);

  function handleFiles() {
    // Récupérez le fichier sélectionné par l'utilisateur
    var file = this.files[0];
    console.log("Fichier sélectionné : ", file);

    // Créez une nouvelle instance de FileReader
    var reader = new FileReader();

    // Ajoutez un gestionnaire d'événements pour écouter la fin de la lecture du fichier
    reader.onload = function (event) {
      // Créez une nouvelle instance d'image
      var img = new Image();

      // Définissez le gestionnaire d'événements pour lorsque l'image est chargée
      img.onload = function () {
        const minWidth = 300; // La largeur minimale souhaitée
        const minHeight = 300; // La longeur minimale souhaitée
        if (img.width >= minWidth && img.height >= minHeight) {
          // Créez un élément canvas
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");

          // Déterminez les dimensions de l'image redimensionnée
          var maxWidth = 800;
          var maxHeight = 600;
          var width = img.width;
          var height = img.height;

          // Vérifiez si l'image doit être redimensionnée
          if (width > maxWidth || height > maxHeight) {
            // Calculez le facteur de redimensionnement
            var ratio = Math.min(maxWidth / width, maxHeight / height);

            // Appliquez le redimensionnement
            width *= ratio;
            height *= ratio;
          }

          // Définissez les dimensions du canvas
          canvas.width = width;
          canvas.height = height;

          // Dessinez l'image sur le canvas avec les nouvelles dimensions
          context.drawImage(img, 0, 0, width, height);

          // Obtenez le contenu de l'image redimensionnée sous forme de base64
          var base64Content = canvas.toDataURL("image/jpeg");
          base64Content = base64Content.replace(
            /^data:image\/jpeg;base64,/,
            ""
          );
          console.log("Contenu en base64 : ", base64Content);
          urlImage.push(base64Content);
          // ...
        } else {
          Swal.showValidationMessage(i18next.t("IDTRANSLATEFORM105"));
          //alert(`Votre image est trop pétite. Veuillez sélectionner une image d'au moins 300x300 pixels.`)
          inputElement.value = "";
        }
      };

      // Définissez la source de l'image comme le contenu du fichier
      img.src = event.target.result;
    };

    // Commencez la lecture du fichier
    reader.readAsDataURL(file);
  }
});

function generateUUIDpub() {
  // Fonction pour générer un UUID v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Exemple d'utilisation
var uniqueIdpub = generateUUIDpub();
document
  .getElementById("sendpublicitieId")
  .addEventListener("click", function () {
    var urlInput = document.getElementById("Id_urls").value;
    var lastImage = urlImage.slice(-1)[0];
    if (lastImage) {
      firebase
        .database()
        .ref("lespubs/" + uniqueIdpub)
        .set({
          IMAGEPUB: lastImage,
          URLPUB: urlInput,
        })
        .then(() => {
          // Affichez la notification de succès une fois que toutes les notifications ont été envoyées
          Swal.fire({
            icon: "success",
            title: "Félicitations !",
            text: "Le post a été envoyé avec succès !",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        })
        .catch((error) => {
          alert("il y a une erreur");
        });
    }
  });
function validerSaisie(input) {
  let valeur = input.value;

  // Supprimer tous les caractères non autorisés sauf les chiffres et virgule
  valeur = valeur.replace(/[^0-9,]/g, '');

  // Ne garder qu'une seule virgule
  const parties = valeur.split(',');
  if (parties.length > 2) {
    valeur = parties[0] + ',' + parties[1];
  }

  // Limiter à deux chiffres après la virgule (optionnel)
  if (parties[1] && parties[1].length > 2) {
    valeur = parties[0] + ',' + parties[1].slice(0, 2);
  }

  input.value = valeur;
}


// Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page
var notificationidxw = document.getElementById("notificationidxw");
// start function to send notification
notificationidxw.addEventListener("click", function () {
  $("#Modalnotificationidw").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });
});

// Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page
var notificationidxw = document.getElementById("publicitiesId");
// start function to send notification
notificationidxw.addEventListener("click", function () {
  $("#publicitiesModal").modal({
    show: true,
    backdrop: "static",
    keyboard: false,
  });
});

// function to acces for pubdelete function
document
  .getElementById("delete_pub_pageId")
  .addEventListener("click", function () {
    window.location.href = "pubdelete.html";
  });
