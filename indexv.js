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
var tableOfPrice = [];
var tableEmail = [];
// document.getElementById('sameToBody').style.display = "none"
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userId = user.uid;
    firebase
      .database()
      .ref("userdelete/")
      .once("value")
      .then((snapshot) => {
        let found = false;

        snapshot.forEach((child) => {
          const data = child.val();
          if (data.userId === userId) {
            found = true;
            return true; // arrête le forEach
          }
        });

        if (found) {
          console.log("✅ userId trouvé dans userdelete.");
          document.getElementById("sameToBody").style.display = "none";
          Swal.fire({
            icon: 'error',
            title: "error",
            allowOutsideClick: false,
            text: `Vous n'avez plus accès à votre compte. Créez un nouveau compte.`,
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "signup.html";
            }
          })
        } else {
          console.log("❌ userId non trouvé dans userdelete.");
          localStorage.setItem("unserconnectuserId", userId);
          var useremail = user.email;
          tableEmail.push(useremail);
          const userRef = database.ref(`/utilisateurs/${userId}`);
          userRef.once("value").then((snapshot) => {
            if (!snapshot.exists()) {
              document.getElementById("sameToBody").style.display = "none";

              Swal.fire({
                title: "Your username",
                text: "Put your username",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: false,
                confirmButtonText: "Send",
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                preConfirm: (username) => {
                  if (username) {
                    let timerInterval;
                    Swal.fire({
                      title: "Finalising your account",
                      html: "Your account will be finalized in <b></b> milliseconds at the most.",
                      timer: 2000,
                      timerProgressBar: true,
                      didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                          timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 1000);
                      },
                      willClose: () => {
                        clearInterval(timerInterval);
                      },
                    }).then((result) => {
                      /* Read more about handling dismissals below */
                      if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                      }
                    });
                    firebase
                      .database()
                      .ref("utilisateurs/" + userId)
                      .set({
                        userId: userId,
                        email: tableEmail[0],
                        username: username,
                        ACCOUNTPRINCIPAL: 0,
                        ACCOUNTPRINCIPALX: 0,
                        ABONNEMENT: false,
                        USERSTATUS: true,
                        MESSAGES: false,
                        MESSAGESAMWALLET: "",
                        ACCOUNTINVEST: 0,
                        ACCOUNTINVESTSATUS: false,
                        ACCOUNTINVESTGETCIDR: 0,
                        ACCOUNTINVESTGETCIDRDATE: "",
                      })
                      .then(() => {
                        Swal.fire({
                          title: "Congratulations",
                          text: "Your account has been finalized!",
                          icon: "success",
                          allowOutsideClick: false,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            location.reload();
                          }
                        });
                      })
                      .catch((error) => {
                        Swal.fire({
                          title: "Erreur ",
                          text: "there is an error",
                          icon: "error",
                          allowOutsideClick: false,
                        });
                      });
                  } else {
                    Swal.showValidationMessage("Please enter something.");
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  // window.location.href = "./login/end.html"
                }
              });
            } else {
              // function to secure my account
              if (snapshot.val().securemyaccountR) {

              } else {
                $("#secureMyAccountId").modal({
                  show: true,
                  backdrop: "static",
                  keyboard: false,
                });
                document.getElementById("securityQuestion").addEventListener("change", function () {
                  var selectedOption = this.value; // Récupérer la valeur de l'option sélectionnée
                  var laReponse = document.getElementById('securityRespond').value
                  if (selectedOption) {
                    //alert("Vous avez sélectionné : " + selectedOption); // Afficher l'alerte avec la valeur sélectionnée
                    document.getElementById("showIdForresponse").style.display = "block";
                    document.getElementById("validerTheRespons").addEventListener('click', function () {
                      var laReponse = document.getElementById('securityRespond').value
                      if (laReponse == "") {
                        Swal.fire("Vous devez fournir une réponse", "", "info");
                      } else {
                        const newData = {
                          securemyaccountQ: selectedOption,
                          securemyaccountR: laReponse,
                        };
                        const userRefx = database.ref(
                          `/utilisateurs/${unserconnectId}`
                        );
                        userRefx.update(newData, (error) => {
                          if (error) {
                            Swal.fire({
                              title: "Ooops",
                              text: "error",
                              confirmButtonText: "OK",
                              allowOutsideClick: false,
                              icon: "error",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.reload();
                              }
                            });
                          } else {
                            Swal.fire({
                              title: "Félicitations",
                              text: "Votre compte est bien sécurisé !",
                              confirmButtonText: "OK",
                              allowOutsideClick: false,
                              icon: "success",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.reload();
                              }
                            });
                          }
                        });
                      }
                    })


                  }
                });
              }
              if (snapshot.val().USERSTATUS) {
                getJobs();
                // function to validate code of transfert
                if (!snapshot.val().transfert_code_id) {
                  const unserconnectuserId = localStorage.getItem("unserconnectuserId");
                  // function to get 8 digit number from code
                  async function get8DigitNumberFromCode(code) {
                    const encoder = new TextEncoder();
                    const data = encoder.encode(code);
                    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const digits = hashArray
                      .map(b => b.toString().padStart(3, '0'))
                      .join('')
                      .replace(/\D/g, ''); // Ne garde que les chiffres

                    return digits.slice(0, 8).padEnd(8, '0');
                  }

                  // Utilisation
                  get8DigitNumberFromCode(`${unserconnectuserId}`).then(code => {
                    console.log("Code à 8 chiffres :", code); // ex: "03972642" 
                    localStorage.setItem("transfert_code_id", code);
                  });
                  const transfert_code_id = localStorage.getItem("transfert_code_id");
                  const newData = {
                    transfert_code_id: transfert_code_id,
                  };
                  const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
                  userRefx.update(newData, (error) => {
                    if (error) {
                      Swal.fire({
                        title: "Ooops",
                        text: "error",
                        confirmButtonText: "OK",
                        allowOutsideClick: false,
                        icon: "error",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          window.location.reload();
                        }
                      });
                    } else {
                      Swal.fire({
                        title: "Supper",
                        text: "Code is validate",
                        confirmButtonText: "OK",
                        allowOutsideClick: false,
                        icon: "success",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          window.location.reload();
                        }
                      });
                    }
                  });

                }
                // end function to validate code of transfert

                document.getElementById("sameToBody").style.display = "none";
                var useremail = snapshot.val().email;
                var username = snapshot.val().username;
                var balanceIDAW = snapshot.val().ACCOUNTPRINCIPAL;
                var MESSAGESAMWALLET = snapshot.val().MESSAGESAMWALLET;
                var points = snapshot.val().points;
                localStorage.setItem("usernameT", username);
                localStorage.setItem("points", points);
                localStorage.setItem("balanceIDAWWW", balanceIDAW);
                var balanceIDBWXW = snapshot.val().ACCOUNTPRINCIPALX;
                var ACCOUNTLOTO = snapshot.val().ACCOUNTLOTO;
                var TABLESLOTO = snapshot.val().TABLESLOTO;
                localStorage.setItem("TABLESLOTO", TABLESLOTO);
                var ABIDX = document.getElementById("userABID");
                var balanceID = document.getElementById("balanceID");
                var usernameID = document.getElementById("usernameID");
                var marqueeId = document.getElementById("marqueeId");
                var balanceIDA = document.getElementById("balanceIDA");
                var balanceIDB = document.getElementById("balanceIDB");

                //start function to show loto result
                var RESPLOTO = snapshot.val().RESPLOTO;
                console.log("voici le loto number", RESPLOTO)
                if (RESPLOTO) {
                  var resultId = document.getElementById("resultId");
                  resultId.innerHTML = ` LTA : <button class="btn btn-primary"> ${RESPLOTO}</button>`;

                } else {
                  usernameID.innerHTML = ` `;
                  var resultId = document.getElementById("resultId");
                  resultId.innerHTML = `LTA : ****** `;
                }
                //end function to show loto result

                if (snapshot.val().points) {
                  var PointsId = document.getElementById("PointsId");
                  PointsId.textContent = `${snapshot.val().points} pts`;
                } else {
                  var PointsId = document.getElementById("PointsId");
                  PointsId.textContent = `0 pts`;
                }

                var iconitem = document.querySelectorAll(".icon-item");
                iconitem.forEach((T) => {
                  T.addEventListener("click", function () {
                    if (balanceIDAW == 0) {
                      swal.fire({
                        title: "Info ",
                        text: "Your balance is insufficient",
                        icon: "error",
                        allowOutsideClick: false,
                      });
                    } else {
                      var typeway = T.id;
                      localStorage.setItem("typewayval", typeway);
                      if (T.id === "pix") {
                        window.location.href = "pix.html";
                      } else if (T.id === "orangemoney") {
                        window.location.href = "orange.html";
                      } else if (T.id === "paypal") {
                        window.location.href = "paypal.html";
                      } else if (T.id === "tigomoney") {
                        window.location.href = "tigomoney.html";
                      } else if (T.id === "uwallet") {
                        window.location.href = "uwallet.html";
                      } else if (T.id === "bitcoin") {
                        window.location.href = "bitcoin.html";
                      } else if (T.id === "perfectmoney") {
                        window.location.href = "perfectmoney.html";
                      } else if (T.id === "bankmoney") {
                        window.location.href = "bank.html";
                      }
                    }
                  });
                });
                balanceID.innerHTML = ` <p style="font-size: 26px !important;">
                &dollar; ${parseFloat(balanceIDAW).toFixed(2)}
                </p> `;
                if (ACCOUNTLOTO) {
                  usernameID.innerHTML = `${username}   `;
                } else {
                  usernameID.innerHTML = `${username}  `;
                }
                {/*const usermxid = localStorage.getItem("unserconnect");
                //var usermxid = "7M2AsvFsj2OeB50D8CDtQQFGP9K2";
                const userRef = database.ref(`/utilisateurs/${usermxid}`);
                userRef.once(
                  "value",
                  (snapshot) => {
                    if (snapshot.exists()) {
                      balanceID.innerHTML = `&dollar; ${balanceIDAW} `;
                      //document.getElementById('userData').textContent = JSON.stringify(snapshot.val(), null, 2);
                      //console.log(JSON.stringify(snapshot.val(), null, 2))
                      var RESPLOTO = snapshot.val().RESPLOTO;
                      if (RESPLOTO) {
                        var resultId = document.getElementById("resultId");
                        resultId.innerHTML = ` LTA : <button class="btn btn-primary"> ${RESPLOTO}</button>`;
                      } else {
                        usernameID.innerHTML = ` `;
                        var resultId = document.getElementById("resultId");
                        resultId.innerHTML = `LTA : ****** `;
                      }
                    } else {
                      //document.getElementById('userData').textContent = "User not found";
                    }
                  },
                  (error) => {
                    document.getElementById("userData").textContent =
                      "Error: " + error;
                  }
                );*/}

                var MESSAGESAMWALLET = snapshot.val().MESSAGESAMWALLET;
                if (!MESSAGESAMWALLET) {
                  marqueeId.innerHTML = `Welcome to amwallet !`;
                } else {
                  marqueeId.innerHTML = `${MESSAGESAMWALLET} `;
                }
                // star function to get invest
                var ACCOUNTINVESTSATUS = snapshot.val().ACCOUNTINVESTSATUS;
                var ACCOUNTINVEST = snapshot.val().ACCOUNTINVEST;
                var ACCOUNTINVESTGETCIDR = snapshot.val().ACCOUNTINVESTGETCIDR;
                var balanceIDBWXW = snapshot.val().ACCOUNTPRINCIPALX;
                var ACCOUNTLOTO = snapshot.val().ACCOUNTLOTO;
                document.getElementById(
                  "investId"
                ).innerHTML = `  <svg style="height: 2vh; width: 2vh; border-radius: 100%; background-color:yellow"></svg>
                 <span style="font-size: 16px; color: white;"> Affiliés : ${balanceIDBWXW} Loto : ${ACCOUNTLOTO || '**'} </span>&nbsp; `;

                // end function to get invest
                //balanceIDA.innerHTML = ` &nbsp; &nbsp; &nbsp; &nbsp;${balanceIDAW} <span class="dollar">&dollar;<span class="dollar"> `
                //balanceIDB.innerHTML = `${balanceIDBW} &dollar;  `

                // Function to get messages
                var userArray = [];
                var userArrayA = [];
                const userListP = document.getElementById("phistoryId");
                const userListUl = document.createElement("span");
                var MESSAGES = snapshot.val().MESSAGES;
                var deletenotfifId = document.getElementById("deletenotfifId");

                deletenotfifId.addEventListener("click", function () {
                  const newData = {
                    MESSAGES: "",
                  };
                  const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
                  userRefx.update(newData, (error) => {
                    if (error) {
                      Swal.fire({
                        title: "Ooops",
                        text: "error",
                        confirmButtonText: "OK",
                        allowOutsideClick: false,
                        icon: "error",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          window.location.reload();
                        }
                      });
                    } else {
                      window.location.reload();
                    }
                  });
                });
                //console.log(MESSAGES)
                userArray.push(MESSAGES);
                // console.log(userArray[0])
                userArray.forEach((T) => {
                  userArrayA.push(T);
                });


                for (const userId in userArrayA) {
                  const usergal = userArrayA[userId];
                  var userArrayAXXXX = [];
                  for (const userI in usergal) {
                    const userga = usergal[userI];
                    userArrayAXXXX.push(userga.notificationid);
                    console.log(userga.message)
                    if (userga.notificationid) {
                      const userLi = document.createElement("p");
                      userLi.innerHTML = `<p class="txn-list" style="cursor: pointer !important; border-radius: 5px !important;">
                    <strong id="IDTRANSLATEWALLETU">${userga.notificationid}</strong><br><br><span class="debit-amount" style="color: green !important; position:relative; right:0 !important;">${userga.time}</span></p><hr style="color:white;">`;
                      userListUl.appendChild(userLi);
                    } else if (userga.message) {
                      const userLi = document.createElement("p");
                      userLi.innerHTML = `
                  <div class="txn-card" style="
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 12px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    transition: transform 0.2s ease;
                    cursor: pointer;
                  " title="Message de transfert">
                    <h4 style="
                      margin: 0 0 10px 0;
                      font-size: 16px;
                      font-weight: 600;
                      color: #005cb5;
                    ">
                      💸 Message de Transfert
                    </h4>
                    <p style="
                      margin: 0;
                      font-size: 15px;
                      color: #333;
                      line-height: 1.4;
                    ">
                      ${userga.message}
                    </p>
                    <div style="
                      margin-top: 10px;
                      text-align: right;
                    ">
                      <span style="
                        font-size: 13px;
                        color: #28a745;
                      ">
                        ${userga.time}
                      </span>
                    </div>
                  </div>
                `;

                      userListUl.appendChild(userLi);
                    }

                  }
                  const indicatClass = document.getElementById("indicatClass");
                  indicatClass.innerHTML = `&nbsp;${userArrayAXXXX.length}`;
                  // Ajoutez la liste à la balise p
                  userListP.appendChild(userListUl);
                }

                var balanceIDAW = snapshot.val().ACCOUNTPRINCIPAL;
                //function to generate affilition link
                const linkInput = document.getElementById("linkInput");
                const copyButton = document.getElementById("affiliateID");
                const linkInputx = document.getElementById("linkInputx");
                const copyButtonx = document.getElementById("affiliateIDx");
                //linkInput.value = `Copier ici votre lien d'affiliation.`
                // function to hide border when you click
                copyButtonx.addEventListener("click", () => {
                  linkInputx.value = `https://amwallet.netlify.app/?user-id=${unserconnectId}`;
                  linkInputx.select(); // Sélectionne le texte dans l'input
                  document.execCommand("copy"); // Copie le texte sélectionné dans le presse-papiers
                  Swal.fire({
                    title: "Super !",
                    text: "Your link has been copied to the clipboard ",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
                });
                copyButton.addEventListener("click", () => {
                  linkInput.value = `${snapshot.val().transfert_code_id}`;
                  linkInput.select(); // Sélectionne le texte dans l'input
                  document.execCommand("copy"); // Copie le texte sélectionné dans le presse-papiers
                  Swal.fire({
                    title: "Super !",
                    text: "Your transfert code has been copied to the clipboard",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
                  {
                    /*Swal.fire({
      title: "Super !",
      text: "Your link has been copied to the clipboard",
      icon: "success",
      input: 'text',
      confirmButtonText: "Send",
      cancelButtonText: "Back",
      showCancelButton: true,
      inputAttributes: {
        placeholder: 'Enter a amount',
        style: 'text-align: center;' // Center the input text
      },
      inputValidator: (value) => {
        if (!value || value <= 0 || isNaN(value)) {
          return 'Please enter a number';
        }else{
          if(balanceIDAW >= value){
            const newData = {
              ACCOUNTPRINCIPALACCESS: value
              };
              const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
              userRefx.update(newData, (error) => {
                if (error){
                  Swal.fire({
                      title: "Ooops",
                      confirmButtonText: "D'accord",
                      allowOutsideClick: false,
                      text: "les données ne sont pas mise à jour ",
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
                      confirmButtonText: "D'accord",
                      allowOutsideClick: false,
                      text : `les données ont été mise à jour avec succès !`,
                      }).then((result)=>{
                      if(result.isConfirmed){
                      window.location.reload();
                      }
                  })
                }
              })
          }else{
            Swal.fire({
              title: "Info ",
              text: "Your balance is insufficient",
              icon: "error",
              allowOutsideClick: false,
            }) 
          }
        }
      },
      closeOnClickOutside: false
      });*/
                  }
                });
                const Cffiliate_id = localStorage.getItem("Cffiliate_id");
                if (Cffiliate_id) {
                  const userRef = database.ref(`/utilisateurs/${Cffiliate_id}`);
                  userRef.once("value").then((snapshot) => {
                    if (snapshot.exists()) {
                      var ACCOUNTPRINCIPALXWX = snapshot.val().ACCOUNTPRINCIPALX;
                      var valeurx = "1";
                      var aCCOUNTPRINCIPALX = parseFloat(ACCOUNTPRINCIPALXWX);
                      var addCommissionConvertis = parseFloat(valeurx);
                      var myCommissionAdd =
                        aCCOUNTPRINCIPALX + addCommissionConvertis;
                      const newData = {
                        ACCOUNTPRINCIPALX: myCommissionAdd,
                        //ACCOUNTPRINCIPALACCESS:0
                      };
                      const userRefx = database.ref(`/utilisateurs/${Cffiliate_id}`);
                      userRefx.update(newData, (error) => {
                        if (error) {
                          localStorage.removeItem("Cffiliate_id");
                        } else {
                          localStorage.removeItem("Cffiliate_id");
                        }
                      });
                    }
                  });
                }
              } else {
                document.getElementById("sameToBody").style.display = "none";
                Swal.fire({
                  title: "Ooops",
                  text: "Votre compte est suspendu.",
                  showCancelButton: false,
                  showConfirmButton: false,
                  allowOutsideClick: false,
                  icon: "error",
                  footer: `<a href="mailto:amobilewallet.inter@gmail.com">Contact technical support.</a>`,
                });
              }

              function getJobs() {
                var userArrayJob = [];
                var userArrayAJob = [];
                var userArrayASal = [];
                const userRef = database.ref(`/lesjobsx/`);
                userRef.once("value").then((snapshot) => {
                  snapshot.forEach((productSnapshot) => {
                    const productData = productSnapshot.val();
                    userArrayAJob.push(productData);
                  });

                  const indicatClassJob = document.getElementById("indicatClassJob");
                  const userListUlx = document.createElement("span");

                  // Fonction de conversion de la date et de l'heure en objet Date
                  function convertToDate(dateStr, timeStr) {
                    let [day, month, year] = dateStr.split("/");
                    let [hours, minutes] = timeStr.split(":");
                    return new Date(year, month - 1, day, hours, minutes);
                  }

                  // Convertir les dates en objets Date et trier le tableau
                  userArrayAJob.sort((a, b) => {
                    let [dateA, timeA] = a.time.split(" ");
                    timeA = timeA.replace("h:", ":").replace("min", "");
                    let [dateB, timeB] = b.time.split(" ");
                    timeB = timeB.replace("h:", ":").replace("min", "");

                    let dateObjA = convertToDate(dateA, timeA);
                    let dateObjB = convertToDate(dateB, timeB);

                    // Débogage : Afficher les objets Date
                    // console.log("dateObjA:", dateObjA, "dateObjB:", dateObjB);

                    return dateObjB - dateObjA; // Pour trier en ordre décroissant (du plus récent au plus ancien)
                  });

                  for (let i = 0; i < userArrayAJob.length; i++) {
                    const userLix = document.createElement("p");
                    userLix.id = userArrayAJob[i].uniqueId;
                    //console.log(userArrayAJob[i].XitledeCategorie)
                    var content;
                    content =
                      userArrayAJob[i].XitledeCategorie === "Formation"
                        ? ` <a class="btn btn-secondary" href="indexex.html?id=${userArrayAJob[i].Salairedejob} ">Acheter</a>`
                        : ` <a class="btn btn-primary" href="indexe.html">Postuler </a> `;

                    var contentxc;
                    contentxc =
                      userArrayAJob[i].XitledeCategorie === "Formation"
                        ? ` <p class="card__owner"><strong>Prix  :</strong> ${userArrayAJob[i].Salairedejob} $</p>`
                        : ` <p class="card__owner"><strong>Salaire :</strong> ${userArrayAJob[i].Salairedejob} $</p> `;

                    userLix.innerHTML = `
            <img src="img/logo_of_wallet.jpg" alt="" style="height: 25%; width: 25%; border-radius: 100%;">
            <p class="card__number">${userArrayAJob[i].Titledejob} </p>
            ${contentxc}
            <div class="card__info">
              <p class="card__integral"><strong>Description :</strong>${userArrayAJob[i].Descriptiondejob}</p><br>
             ${content}
            </div>
            <p class="card__owner">Publié le ${userArrayAJob[i].time}</p><hr>
          `;

                    // Attach the mouseover event listener
                    userLix.addEventListener(
                      "mouseover",
                      (function (usergax) {
                        return function () {
                          // console.log(usergax.Descriptiondejob);
                          var titltjobx = userArrayAJob[i].Titledejob;
                          var Salairedejob = userArrayAJob[i].Salairedejob;
                          var destjobx = userArrayAJob[i].Descriptiondejob;
                          localStorage.setItem("titltjobx", titltjobx);
                          localStorage.setItem("destjobx", destjobx);
                        };
                      })(userArrayAJob[i])
                    );

                    userListUlx.appendChild(userLix);
                  }

                  // Append the list to the parent container
                  indicatClassJob.appendChild(userListUlx);
                });
              }
            }
            const shwonotification = document.getElementById("shwonotificationid");
            // Ajoutez un gestionnaire d'événements clic pour le bouton du pied de page

            // start function to send notification
            shwonotification.addEventListener("click", function () {
              $("#Modalnotificationid").modal({
                show: true,
                backdrop: "static",
                keyboard: false,
              });
            });
          });
        }
      })
      .catch((error) => {
        console.error("Erreur Firebase :", error);
      });


  } else {
    window.location.href = "login.html";
  }
});

var transfer_systems = document.getElementById("transfer_systems");
var transfer_for_user = document.getElementById("transfer_for_user");
var containerID = document.getElementById("containerID");
var containerIDx = document.getElementById("containerIDx");

var containerId = document.getElementById("containerId");
var assistanceId = document.getElementById("assistanceId");
var menubtnId = document.getElementById("menu-btnId");
menubtnId.addEventListener("click", function () {
  //containerId.style.display = "none";
  Swal.fire({
    title: "Your amount",
    html: `
    <style>
      .swal2-input {
        width: 100% !important;
      }
    </style>
    <p>Recharge your account for <strong style="color: blue;">am wallet address</strong>.</p>
    <input type="number" id="amount-input" class="swal2-input" min="1" step="1" placeholder="Put amount($)" />
  `,
    preConfirm: () => {
      const input = document.getElementById("amount-input").value;
      if (input <= 0) {
        Swal.showValidationMessage("Please enter a positive number!");
        return false;
      }
      return input;
    },
    showCancelButton: true,
    confirmButtonText: "Recharge",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("sameToBody").style.display = "block";
      var inputValue = result.value;
      const amount = inputValue * 655;
      // Initialisation de FEEPay
      FeexPayButton.init("render", {
        id: "65c89373ac34723190f5087e", // Remplacez par votre ID de boutique
        amount: `${amount}`, // Calcul du montant total (prix * quantité)
        token:
          "fp_RyjzKSop3kh7DF1vy3LG0KRDTYYgF3ebSZSDsTR6MIrYauAU83IrSS7qUE3HksLe", // Remplacez par votre token API de FEEPay
        callback: () => {
          console.log("Paiement réussi !");
          addSuccessListener(); // Appelez une fonction après le paiement (personnalisée ici)
        },
        callback_url: "your_callback_url", // Facultatif : URL de callback si vous en avez une
        mode: "LIVE", // Utilisez 'LIVE' pour un environnement de production
        custom_button: false, // Si vous souhaitez un bouton personnalisé
        id_custom_button: "my-custom-button-id", // Si vous avez un bouton personnalisé, utilisez cet ID
        custom_id: "random_string_for_reference", // Facultatif : pour faire référence à cette transaction
        case: "", // MOBILE,,  Facultatif : Si vous souhaitez cibler un mode de paiement spécifique
      });
      setTimeout(() => {
        // Sélectionner le bouton avec la classe 'feexpay_button' dans le div #render
        const button = document.querySelector("#render .feexpay_button");

        // Vérifier si le bouton existe et simuler un clic
        setTimeout(function () {
          const button = document.querySelector("#render .feexpay_button");
          if (button) {
            document.getElementById("sameToBody").style.display = "none";
            button.click();
          } else {
            document.getElementById("sameToBody").style.display = "none";
            var iphoneID = document.getElementById("iphoneIDm");
            iphoneID.style.display = "none";
            console.log("Le bouton n'a pas été trouvé !");
          }
        }, 1000); // Délai de 1 seconde, ajuste selon le besoin
      }, 500);

      function addSuccessListener() {
        const unserconnectuserIdE = localStorage.getItem("unserconnectuserId");
        const balanceIDAWWW = localStorage.getItem("balanceIDAWWW");
        var myComptaConvertis = parseFloat(balanceIDAWWW);
        var addCommissionConvertis = parseFloat(inputValue);
        var myCommissionAdd = myComptaConvertis + addCommissionConvertis;
        console.log("myComptaConvertis entered:", myComptaConvertis);
        console.log("addCommissionConvertis entered:", addCommissionConvertis);
        console.log("myCommissionAdd entered:", myCommissionAdd);
        const newData = {
          ACCOUNTPRINCIPAL: myCommissionAdd,
        };
        const userRefx = database.ref(`/utilisateurs/${unserconnectuserIdE}`);
        userRefx.update(newData, (error) => {
          if (error) {
            Swal.fire({
              title: "Ooops",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              text: "Your recharge  has failed.",
              icon: "error",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Succès",
              confirmButtonText: "OK",
              allowOutsideClick: true,
              text: `Your recharge has been completed successfully.`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }
        });
      }
    }
  });
});

// to get money
var tableSolde = []
var tablePhone = []
var tablePays = []
var tableNomPays = []

var Get_for_userxxc = document.getElementById("get_for_userxxc");
Get_for_userxxc.addEventListener("click", function () {
  //containerId.style.display = "none"
  Swal.fire({
    title: "Your amount",
    html: `
      

      <label id="swal-label" for="country-select">🌍 Choisissez votre pays</label>
      <select id="country-select" class="swal2-select" style="margin-bottom:10px; width:60%; max-width:300px;">${countryOptions}</select>

      <label id="swal-label" for="phone-input">📱 Numéro de téléphone</label>
      <input type="text" id="phone-input" class="swal2-input" placeholder="Ex: +22990123456" style="margin-bottom:10px; width:60%; max-width:300px;"/>

      <label id="swal-label" for="amount-input">💵 Montant à retirer</label>
      <input type="number" id="amount-input" class="swal2-input" min="1" placeholder="Montant en $" style="margin-bottom:10px; width:60%; max-width:300px;"/>
    `,
    didOpen: () => {
      const select = document.getElementById("country-select");
      // 🔸 Obtenir le pays sélectionné par défaut
      const defaultCode = select.value;
      const defaultCountry = countries.find(c => c.code === defaultCode);
      if (defaultCountry) {
        tableNomPays.push(defaultCountry.name);
      }

      select.addEventListener("change", () => {
        const selectedCode = select.value; // ex: "+229"
        const country = countries.find(c => c.code === selectedCode);


        if (country) {
          alert(country.name); // affiche par exemple "Bénin"
          tableNomPays.push(country.name);
          console.log(tableNomPays);
        }
      });
    },
    preConfirm: () => {
      const selectedCode = document.getElementById("country-select").value;
      const phone = document.getElementById("phone-input").value.trim();
      const amount = document.getElementById("amount-input").value;
      tableSolde.push(amount)
      tablePhone.push(phone)
      tablePays.push(selectedCode)



      // Vérification montant
      if (amount <= 0) {
        Swal.showValidationMessage("Veuillez entrer un montant positif !");
        return false;
      }
      if (amount < 10) {
        Swal.showValidationMessage(
          "Please enter a number greater than or equal to 10!"
        );
        return false;
      }

    },
    showCancelButton: true,
    confirmButtonText: "Get",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const inputValue = tableSolde[tableSolde.length - 1];
      const inputValuePhone = tablePhone[tablePhone.length - 1];
      const inputValuePays = tablePays[tablePays.length - 1];
      const tableNomPays = tableNomPays[tableNomPays.length - 1];
      const selectedCode = result.value.country;
      const phone = result.value.phone;
      const unserconnectuserIdE = localStorage.getItem("unserconnectuserId");
      const balanceIDAWWW = localStorage.getItem("balanceIDAWWW");
      const points = localStorage.getItem("points");
      // Stocker le montant saisi (net retiré) 
      // Conversion en nombres
      var balanceIDAWWWx = parseFloat(balanceIDAWWW);
      var inputValueParsed = parseFloat(inputValue);
      var pointsx = parseFloat(points);

      // Calcul de la commission (5% du montant saisi)
      var commission = inputValueParsed * 0.05;

      var montantTotalADeduire = inputValueParsed + commission;
      var commission = parseFloat(commission);
      var montantTotalADeduire = parseFloat(montantTotalADeduire);
      { /**      if (inputValue < 36) {
        Swal.fire("Ooops", "Les transferts sont a partir de 36$");
        localStorage.removeItem('MyCommissionAdd')
        localStorage.removeItem('phone')
        localStorage.removeItem('selectedCode')
        return;
      }**/ }
      localStorage.setItem("MyCommissionAdd", inputValueParsed.toString());
      localStorage.setItem("phone", inputValuePhone);
      localStorage.setItem("selectedCode", inputValuePays);
      localStorage.setItem("lenumero", inputValuePays + inputValuePhone)
      localStorage.setItem("tableNomPaysL", tableNomPays);
      if (balanceIDAWWWx >= montantTotalADeduire) {
        // Déduction du montant total (montant + commission)
        var nouveauSolde = balanceIDAWWWx - montantTotalADeduire;

        // Préparation des données à envoyer ou à enregistrer
        const newData = {
          ACCOUNTPRINCIPAL: nouveauSolde,
        };

        const userRefx = database.ref(`/utilisateurs/${unserconnectuserIdE}`);
        userRefx.update(newData, (error) => {
          if (error) {
            Swal.fire({
              title: "Ooops",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              text: "Your operation has failed.",
              icon: "error",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
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
            localStorage.setItem("DateNow", dateFormatee);
            Swal.fire({
              icon: "success",
              title: "Succès",
              confirmButtonText: "Get your paiement cerficate.",
              allowOutsideClick: false,
              text: `Your operation has been completed successfully.`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "paiementcerti.html";
              }
            });
          }
        });
      } else {
        localStorage.removeItem('MyCommissionAdd')
        localStorage.removeItem('phone')
        localStorage.removeItem('selectedCode')
        Swal.fire({
          title: "Info ",
          text: "Your balance is insufficient",
          icon: "error",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "index.html";
          }
        });
      }
    }
  });
});

// to get money
var Get_for_userxxc_points = document.getElementById("Get_for_userxxc_points");
Get_for_userxxc_points.addEventListener("click", function () {
  //containerId.style.display = "none"
  Swal.fire({
    title: "The points",
    html: `
    <style>
      .swal2-input {
        width: 100% !important;
      }
    </style>
    <strong>Buy points from 36 points.
    36 points ==== 0,10 $</strong>
    <p>Get your points for <strong style="color: blue;">am wallet address</strong>.</p>
    <input type="number" id="amount-inputxc" class="swal2-input" min="10" step="1" placeholder="Put points" />
  `,
    preConfirm: () => {

      const input = document.getElementById("amount-inputxc").value;
      console.log(input);
      if (input < 10) {
        Swal.showValidationMessage(
          "Please enter a number greater than or equal to 10!"
        );
        return false;
      }

      return input;
    },
    showCancelButton: true,
    confirmButtonText: "Get",
    cancelButtonText: "Cancel",
  }).then((result) => {

    if (result.isConfirmed) {
      const inputValue = parseFloat(result.value); // Nombre de points à convertir
      const userId = localStorage.getItem("unserconnectuserId");

      const balanceStr = localStorage.getItem("balanceIDAWWW"); // Solde en $
      const pointsStr = localStorage.getItem("points"); // Points disponibles

      const balance = parseFloat(balanceStr);
      const points = parseFloat(pointsStr);

      // Taux de conversion : 36 points = 0.10 $
      const dollarPerPoint = 0.10 / 36;
      const dollarsFromPoints = inputValue * dollarPerPoint;

      if (inputValue >= 36 && points >= inputValue && balance >= dollarsFromPoints) {
        const newBalance = balance - dollarsFromPoints;
        //const remainingPoints = points - inputValue;

        // alert(`✔️ Vous avez converti ${inputValue} points en ${dollarsFromPoints.toFixed(2)} $.\n💰 Nouveau solde : ${newBalance.toFixed(2)} $\n🎯 Points restants : jk`);

        localStorage.setItem("MyCommissionAdd", dollarsFromPoints.toFixed(2));
        localStorage.setItem("balanceIDAWWW", newBalance.toFixed(2));
        //localStorage.setItem("points", remainingPoints.toString());

        // 🔁 1ère mise à jour : mise à jour du solde
        const userRef = database.ref(`/utilisateurs/${userId}`);
        const firstUpdate = {
          ACCOUNTPRINCIPAL: newBalance
        };

        userRef.update(firstUpdate, (error) => {
          if (error) {
            Swal.fire({
              title: "Ooops",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              text: "The balance update failed.",
              icon: "error"
            }).then((res) => {
              if (res.isConfirmed) window.location.reload();
            });
          } else {
            // 🔁 2e mise à jour : mise à jour des points "gagnés"
            const currentPointsStr = localStorage.getItem("points");
            const currentCommissionPoints = parseFloat(currentPointsStr);
            const newCommissionPoints = currentCommissionPoints + inputValue;

            localStorage.setItem("pointsCommission", newCommissionPoints.toString());
            //const points = localStorage.getItem("points");
            const secondUpdate = {
              points: newCommissionPoints
            };

            userRef.update(secondUpdate, (err) => {
              if (err) {
                Swal.fire({
                  title: "Ooops",
                  confirmButtonText: "OK",
                  allowOutsideClick: false,
                  text: "The points update failed.",
                  icon: "error"
                }).then((res) => {
                  if (res.isConfirmed) window.location.reload();
                });
              } else {
                // ✅ Tout s'est bien passé
                const now = new Date();
                const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}h:${now.getMinutes()}min`;
                localStorage.setItem("DateNow", formattedDate);

                Swal.fire({
                  icon: "success",
                  title: "Succès",
                  confirmButtonText: "OK",
                  allowOutsideClick: false,
                  text: "Your operation has been completed successfully.",
                }).then((res) => {
                  if (res.isConfirmed) {
                    window.location.href = "index.html";
                  }
                });
              }
            });
          }
        });
      } else {
        Swal.fire({
          title: "Info",
          text: "Your points are insufficient or you must enter at least 36 points.",
          icon: "error",
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.href = "index.html";
          }
        });
      }
    }

  });
});

assistanceId.addEventListener("click", function () {
  containerId.style.display = "none";
  Swal.fire({
    imageUrl: "img/logo_of_wallet.jpg", // Remplacez "url_de_votre_image.jpg" par l'URL de votre image
    imageWidth: 200, // Largeur de l'image en pixels
    imageHeight: 200, // Hauteur de l'image en pixels
    html: `
  <div style="text-align: left !important;">
  <a href="https://wa.me/+447418315534" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-whatsapp"></i> +44 7418315534
  </a><hr>
  <a href="mailto:amobilewallet.inter@gmail.com" target="_blank" rel="noopener noreferrer">
    <i class="far fa-envelope"></i>  amobilewallet.inter@gmail.com
  </a>
  </div>`,
    icon: "Info",
    confirmButtonText: "Yes",
    cancelButtonText: "Back",
    showCancelButton: true,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    } else {
      window.location.reload();
    }
  });
});

{
  /*document.getElementById('env').addEventListener('click', function(){
  // Assurez-vous que database est correctement initialisé
const database = firebase.database();

// Récupérez une référence à la base de données des utilisateurs
const usersRef = database.ref('utilisateurs');

// Récupérez les données des utilisateurs
usersRef.once('value', (snapshot) => {
  // Parcourez chaque utilisateur
  snapshot.forEach((userSnapshot) => {
    // Obtenez la clé de l'utilisateur
    const userKey = userSnapshot.key;

    // Obtenez les données de l'utilisateur
    const userData = userSnapshot.val();

    // Définissez les nouvelles données à mettre à jour pour cet utilisateur
    const newData = {
      ACCOUNTINVESTGETCIDR: 0,
      ACCOUNTINVESTGETCIDRDATE: ""
    };

    // Mettez à jour les données de l'utilisateur individuel
    database.ref(`utilisateurs/${userKey}`).update(newData)
      .then(() => {
        // Succès de la mise à jour pour cet utilisateur
        console.log(`Données mises à jour pour l'utilisateur avec la clé ${userKey}`);
      })
      .catch((error) => {
        // Erreur lors de la mise à jour pour cet utilisateur
        console.error(`Erreur lors de la mise à jour des données pour l'utilisateur avec la clé ${userKey} :`, error);
      });
  });
});

})*/
}
