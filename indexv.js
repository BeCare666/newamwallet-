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
    console.log("first date user", userId)
    // start functin to online or offline //
    const userRef = firebase.database().ref(`/utilisateurs/${userId}`);
    const connectedRef = firebase.database().ref(".info/connected");



    // Détection d'inactivité (5 minutes)
    let inactivityTimer;
    function resetInactivityTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setOfflineStatus();
      }, 5 * 60 * 1000);
    }


    // Déconnexion en fermant la page
    window.addEventListener("beforeunload", () => {
      setOfflineStatus();
    });
    // end functin to online or offline //

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
              document.getElementById("sameToBody").style.display = "none";
              var container = document.getElementById("listeMessagesId");
              container.innerHTML = ""; // reset

              var messages = snapshot.val().MESSAGES;

              // Si MESSAGES est un objet contenant plusieurs messages
              Object.values(messages).forEach(msg => {
                // On garde seulement ceux dont le type est "Rétraits"
                if (msg.type !== "Rétrait") return;

                let iconType = "";
                if (msg.type === "Rétrait") {
                  iconType = `
      <svg width="26" height="26" fill="#6EE7B7" viewBox="0 0 24 24">
        <path d="M2 12l7-7v4h8v6H9v4l-7-7z"/>
      </svg>`;
                } else {
                  iconType = `
      <svg width="26" height="26" fill="#60A5FA" viewBox="0 0 24 24">
        <path d="M12 2L1 21h22L12 2z"/>
      </svg>`;
                }

                let statusHtml = msg.status
                  ? `<span class="msg-status success">
        <svg width="18" height="18" fill="#10B981" viewBox="0 0 24 24">
          <path d="M20 6L9 17l-5-5"/>
        </svg> Validé
      </span>`
                  : `<span class="msg-status pending">
        <svg width="18" height="18" fill="#FBBF24" viewBox="0 0 24 24">
          <path d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
        </svg> En attente
      </span>`;

                container.innerHTML += `
    <div class="msg-card">
      <div class="msg-left">
        <div class="msg-icon">${iconType}</div>
        <div class="msg-content">
          <div class="msg-title">${msg.message}</div>
          <div class="msg-sub">${msg.raison || msg.Raison || ""}</div>
          <div class="msg-time">${msg.time}</div>
        </div>
      </div>
      <div class="msg-right">
        <div class="msg-amount">${msg.montant} $</div>
        ${statusHtml}
      </div>
    </div>
  `;
              });






              console.log("User data:", snapshot.val())
              if (snapshot.val().USERSTATUS) {
                getJobs();
                // Événements d'activité
                ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach(evt => {
                  window.addEventListener(evt, () => {
                    setOnlineStatus();
                    resetInactivityTimer();
                  });
                });

                // Suivi de connexion Firebase
                connectedRef.on("value", (snap) => {
                  if (snap.val() === true) {
                    setOnlineStatus();
                    resetInactivityTimer();
                  } else {
                    setOfflineStatus();
                  }
                });
                // Mettre online
                function setOnlineStatus() {
                  userRef.update({
                    online: true,
                    last_seen: firebase.database.ServerValue.TIMESTAMP
                  });
                }

                // Mettre offline
                function setOfflineStatus() {
                  userRef.update({
                    online: false,
                    last_seen: firebase.database.ServerValue.TIMESTAMP
                  });
                }
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
                  //console.log("voir code validate", snapshot.val().transfert_code_id);
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

                } else {
                  console.log("voir1 code validate", snapshot.val().transfert_code_id);
                }
                // end function to validate code of transfert

                document.getElementById("sameToBody").style.display = "none";
                var useremail = snapshot.val().email;
                var username = snapshot.val().username;
                var balanceIDAW = snapshot.val().ACCOUNTPRINCIPAL;
                var EPARGNE = snapshot.val().EPARGNE;
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
                // function to show star 
                function renderStarNote(starNote) {
                  const starContainer = document.getElementById("starContainer"); // div où on affiche les étoiles
                  if (!starContainer) return;

                  starContainer.innerHTML = ""; // reset

                  const totalStars = 5;
                  const filledStars = Math.round(starNote); // nombre d'étoiles pleines

                  for (let i = 1; i <= totalStars; i++) {
                    const star = document.createElement("span");
                    star.textContent = "★"; // ✅ même caractère

                    if (i <= filledStars) {
                      star.style.color = "#facc15"; // jaune (remplie)
                    } else {
                      star.style.color = "#e5e7eb"; // gris (vide)
                    }

                    star.style.fontSize = "20px";
                    star.style.marginRight = "2px";
                    star.style.display = "inline-block";
                    star.style.lineHeight = "1";

                    starContainer.appendChild(star);
                  }
                }

                var STARNOTEA = snapshot.val().STARNOTE;
                console.log("STARNOTEA:", STARNOTEA);
                if (STARNOTEA && STARNOTEA != null) {
                  renderStarNote(STARNOTEA);
                } else if (STARNOTEA === undefined || STARNOTEA === null) {
                  renderStarNote(0); // pas de note
                }
                // function to get invest
                var THEPACKS = snapshot.val().THEPACKS;

                if (THEPACKS) {
                  const packEntries = Object.entries(THEPACKS);
                  console.log("Pack entries:", packEntries);
                  // ================================
                  // 🔹 DERNIER INVESTISSEMENT
                  // ================================
                  const lastInvestEntry = packEntries
                    .filter(([_, p]) => p.type === "Investissement")
                    .sort(
                      (a, b) =>
                        new Date(a[1].purchased_at) -
                        new Date(b[1].purchased_at)
                    )
                    .pop();

                  const lastInvestPackId = lastInvestEntry?.[0];
                  const lastInvestPack = lastInvestEntry?.[1];
                  if (lastInvestPack) {
                    console.log("📦 Last Invest Pack:", lastInvestPack.pack_firebase_id);
                    localStorage.setItem("pack_firebase_invest_id", lastInvestPack.pack_firebase_id);
                  }
                  // ================================
                  // 🔹 DERNIER TASK
                  // ================================
                  const lastTaskEntry = packEntries
                    .filter(([_, p]) => p.type === "task")
                    .sort(
                      (a, b) =>
                        new Date(a[1].purchased_at) -
                        new Date(b[1].purchased_at)
                    )
                    .pop();

                  const lastTaskPackId = lastTaskEntry?.[0];
                  const lastTaskPack = lastTaskEntry?.[1];
                  if (lastTaskPack) {
                    console.log("📦 Last task Pack:", lastTaskPack.pack_firebase_id);
                    localStorage.setItem("pack_firebase_task_id", lastTaskPack.pack_firebase_id);
                  }
                  // ================================
                  // 🔥 TRANSFERT AUTO TASK (NOUVEAU)
                  // ================================
                  if (
                    lastTaskPack &&
                    !lastTaskPack.invest_istransfert && // ⚠️ nouveau champ
                    lastTaskPack.user_pack_id
                  ) {
                    console.log("🚀 Tentative transfert TASK...");

                    const url = `https://amwalletapi.onrender.com/api/quiz/pack-info?user_id=${userId}&pack_id=${lastTaskPack.pack_firebase_id}`;

                    fetch(url)
                      .then(async (res) => {
                        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                        const text = await res.text();
                        if (!text) throw new Error("Empty response");
                        return JSON.parse(text);
                      })
                      .then((data) => {
                        if (!data) return;

                        // ⚠️ condition backend simulée
                        const totalQuestions = data.questions_per_day * data.duration_days;
                        const answered = data.answered || 0;

                        const responseRate =
                          totalQuestions > 0 ? (answered / totalQuestions) * 100 : 0;

                        if (responseRate < data.bonus_percent) {
                          console.log("❌ Conditions TASK non remplies");
                          return;
                        }

                        const packBalance = Number(data.balance ?? 0);
                        if (isNaN(packBalance) || packBalance <= 0) return;

                        const currentPrincipal = Number(snapshot.val().ACCOUNTPRINCIPAL ?? 0);

                        const updates = {};
                        updates[
                          `/utilisateurs/${userId}/ACCOUNTPRINCIPAL`
                        ] = currentPrincipal + packBalance;

                        updates[
                          `/utilisateurs/${userId}/THEPACKS/${lastTaskPackId}/invest_istransfert`
                        ] = true;

                        return database.ref().update(updates);
                      })
                      .then(() => console.log("✅ Pack TASK transféré"))
                      .catch((err) =>
                        console.error("❌ Erreur TASK transfer", err)
                      );
                  }
                  document
                    .getElementById("investinprojetsId")
                    .addEventListener("click", function () {

                      const investPacks = packEntries.filter(([_, p]) => {
                        const type = (p.type || "").toLowerCase();
                        return type === "investissement" || type === "investment";
                      });

                      console.log("Invest packs:", investPacks);

                      const packList = document.getElementById("packList");
                      packList.innerHTML = "";

                      investPacks.forEach(([id, pack]) => {

                        const div = document.createElement("div");
                        div.className = "pack-item";
                        div.innerHTML = `
                        <strong>${pack.title}</strong><br>
                        Prix: ${pack.price}
                      `;

                        div.addEventListener("click", () => {

                          localStorage.setItem("pack_firebase_invest_id", pack.pack_firebase_id);
                          localStorage.setItem("user_pack_id", pack.user_pack_id);

                          window.location.href = `quiz/quiz.html?user_pack=${pack.user_pack_id}`;

                        });

                        packList.appendChild(div);

                      });

                      document.getElementById("packModal").style.display = "flex";

                    });




                  // ================================
                  // 🔹 BOUTON TASKS
                  // ================================
                  document
                    .getElementById("mytasks")
                    .addEventListener("click", function () {
                      if (lastTaskPack?.user_pack_id) {
                        window.location.href =
                          `quiz/task.html?user_pack=${lastTaskPack.user_pack_id}`;
                      } else {
                        window.location.href = "mytask.html";
                      }
                    });

                  // ================================
                  // 🔥 TRANSFERT AUTO (SEULEMENT INVESTISSEMENT)
                  // ================================
                  if (
                    lastInvestPack &&
                    !lastInvestPack.invest_istransfert &&
                    lastInvestPack.user_pack_id
                  ) {
                    console.log("🚀 Tentative transfert INVEST...");

                    const url = `https://amwalletapi.onrender.com/api/quiz/pack-info?user_id=${userId}&pack_id=${lastInvestPack.pack_firebase_id}`;

                    fetch(url)
                      .then(async (res) => {
                        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
                        const text = await res.text();
                        if (!text) throw new Error("Empty response from server");
                        return JSON.parse(text);
                      })
                      .then((data) => {
                        if (!data) return;

                        const packBalance = Number(data.balance ?? 0);
                        if (isNaN(packBalance) || packBalance <= 0) return;

                        const tenPercent = packBalance * 0.1;
                        const ninetyPercent = packBalance - tenPercent;

                        const currentPrincipal = Number(
                          snapshot.val().ACCOUNTPRINCIPAL ?? 0
                        );
                        const currentEpargne = Number(snapshot.val().EPARGNE ?? 0);

                        const updates = {};
                        updates[
                          `/utilisateurs/${userId}/ACCOUNTPRINCIPAL`
                        ] = currentPrincipal + ninetyPercent;
                        updates[
                          `/utilisateurs/${userId}/EPARGNE`
                        ] = currentEpargne + tenPercent;
                        updates[
                          `/utilisateurs/${userId}/THEPACKS/${lastInvestPackId}/invest_istransfert`
                        ] = true;

                        return database.ref().update(updates);
                      })
                      .then(() => console.log("✅ Pack INVEST transféré"))
                      .catch((err) =>
                        console.error("❌ Erreur fetch pack-info", err)
                      );
                  }
                } else {
                  document
                    .getElementById("mytasks")
                    .addEventListener("click", () => (window.location.href = "mytask.html"));

                  document
                    .getElementById("investinprojetsId")
                    .addEventListener("click", () => (window.location.href = "myinvest.html"));
                }
                //start function to show loto result
                var RESPLOTO = snapshot.val().RESPLOTO;
                console.log("voici le loto number", RESPLOTO)
                if (RESPLOTO) {
                  // var resultId = document.getElementById("resultId");
                  // resultId.innerHTML = ` LTA : <button class="btn btn-primary"> ${RESPLOTO}</button>`;

                } else {
                  // usernameID.innerHTML = ` `;
                  // var resultId = document.getElementById("resultId");
                  // resultId.innerHTML = `LTA : ****** `;
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
                balanceID.innerHTML = ` <p style="font-size: 17px !important;">
                <strong>Solde P :</strong> ${parseFloat(balanceIDAW).toFixed(2)} &dollar; <br>
                <strong>Solde E :</strong> ${parseFloat(EPARGNE || 0).toFixed(2)} &dollar;
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
                var ACCOUNTGAMES = snapshot.val().ACCOUNTGAMES;
                // document.getElementById(
                //   "investId"
                // ).innerHTML = `  <svg style="height: 2vh; width: 2vh; border-radius: 100%; background-color:blue"></svg>
                //  <span style="font-size: 16px; color: white;"> Affiliés : ${balanceIDBWXW} Loto : ${ACCOUNTLOTO || '**'} </span>&nbsp; `;





                // 🔹 Affichage du solde ACCOUNTGAMES
                userRef.once("value").then(snap => {
                  const u = snap.val() || {};
                  //renderAccountGames(u.ACCOUNTGAMES ?? 0);
                  renderAccountPending(u.ACCOUNTPENDING ?? 0);
                  console.log("ACCOUNTGAMES loaded:", u.ACCOUNTGAMES);
                  console.log("ACCOUNTPENDING loaded:", u.ACCOUNTPENDING);
                  const formatMoney = v =>
                    !v || isNaN(v) ? "0.00" : parseFloat(v).toFixed(2);
                  console.log("ACCOUNTBONUSSTATUS:", u.ACCOUNTBONUSSTATUS);
                  document.getElementById("balanceID2X").innerHTML = `
                 ${u.ACCOUNTBONUSSTATUS === false
                      ? '<svg style="height:2vh;width:2vh;border-radius:100%;background-color:red"></svg>'
                      : '<svg style="height:2vh;width:2vh;border-radius:100%;background-color:green"></svg>'
                    }
                  <span style="font-size:16px;color:white;">
                    ${formatMoney(u.ACCOUNTGAMES)} $
                    <i class="fal fa-wallet wallet-icon" id="transferWallet" style="color: green;"></i>
                  </span>&nbsp;

                  <svg style="height:2vh;width:2vh;border-radius:100%;background-color:yellow"></svg>
                  <span style="font-size:16px;color:white;">
                    ${formatMoney(u.ACCOUNTPENDING)} $
                  </span>&nbsp;
                  
                `;


                  // 🔹 Ajout du clic pour le transfert vers COMPTE EN ATTENTE
                  document.getElementById("transferWallet").addEventListener("click", () => {
                    // 🔒 Vérification du statut bonus
                    if (u.ACCOUNTBONUSSTATUS === false) {
                      Swal.fire({
                        icon: "error",
                        title: "Compte bloqué",
                        text: "Vous ne pouvez pas transférer vos gains pour l'instant. Votre compte est bloqué."
                      });
                      return; // ⛔ STOP total
                    }
                    if (!ACCOUNTGAMES || ACCOUNTGAMES <= 0) {
                      Swal.fire("Votre compte épargne est vide !", "", "info");
                      return;
                    }
                    if (!ACCOUNTGAMES || ACCOUNTGAMES < 10) {
                      Swal.fire("Votre solde doit être supérieur à 10 $ !", "", "info");
                      return;
                    }
                    Swal.fire({
                      title: 'Envoie des fonds dans votre compte principal ?',
                      text: `Voulez-vous transférer $${ACCOUNTGAMES.toFixed(2)} vers votre compte principal ?`,
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Oui, envoyer',
                      cancelButtonText: 'Annuler'
                    }).then((result) => {
                      if (result.isConfirmed) {

                        // 🔹 Récupération des soldes actuels.
                        userRef.once("value").then(snap => {
                          const u = snap.val() || {};

                          const currentPending = u.ACCOUNTPENDING || 0;
                          const newPending = currentPending + ACCOUNTGAMES;

                          // 🔹 Mise à jour Firebase
                          userRef.update({
                            ACCOUNTPENDING: newPending,
                            ACCOUNTGAMES: 0
                          }).then(() => {

                            Swal.fire(
                              "Envoyé en validation !",
                              `Votre demande de $${ACCOUNTGAMES.toFixed(2)} est en attente de validation par l’administrateur.`,
                              "success"
                            );

                            // 🔹 Mise à jour visuelle
                            setTimeout(() => {
                              window.location.reload();
                            }, 200);
                            //renderAccountGames(0);
                            renderAccountPending(newPending);
                          });
                        });
                      }
                    });
                  });

                });
                function renderAccountPending(amount) {
                  const el = document.getElementById("accountPending");
                  if (el) {
                    el.textContent = `$${amount.toFixed(2)}`;
                  }
                }
                // end function to get invest
                //balanceIDA.innerHTML = ` &nbsp; &nbsp; &nbsp; &nbsp;${balanceIDAW} <span class="dollar">&dollar;<span class="dollar"> `
                //balanceIDB.innerHTML = `${balanceIDBW} &dollar;  `

                // Function to get messages
                var userArray = [];
                var userArrayA = [];
                const userListP = document.getElementById("phistoryId");
                const userListUl = document.createElement("span");
                var MESSAGES = snapshot.val().MESSAGES;
                console.log("MESSAGES", MESSAGES)
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
                    <strong id="IDTRANSLATEWALLETU">${userga.notificationid}</strong><br><br><span class="debit-amount" style="color: green !important; position:relative; right:0 !important;">${userga.time}</span>
                    </p><hr style="color:white;">`;
                      userListUl.prepend(userLi);
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
                     <div style="display: flex; color: #333; font-size: 15px; line-height: 1.4;">
                  <strong>Raison : </strong> <p>&nbsp; ${userga.Raison}</p>
                </div>
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

                      userListUl.prepend(userLi);
                    } else if (userga.body) {
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
                      💸 Message de amwallet
                    </h4>
                     <div style="display: none; color: #333; font-size: 15px; line-height: 1.4;">
                  <strong>Raison : </strong> <p>&nbsp; ${userga.Raison}</p>
                </div>
                    <p style="
                      margin: 0;
                      font-size: 15px;
                      color: #333;
                      line-height: 1.4;
                    ">
                      ${userga.body}
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

                      userListUl.prepend(userLi);
                    }

                  }
                  const indicatClass = document.getElementById("indicatClass");
                  indicatClass.innerHTML = `&nbsp;${userArrayAXXXX.length}`;
                  // Ajoutez la liste à la balise p
                  userListP.prepend(userListUl);
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
                  linkInputx.value = `https://amowa.online/signup.html?affiliate-id=${unserconnectId}`;
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

                    const job = userArrayAJob[i];
                    console.log("job urlformation:", job);
                    console.log("job urlformation:", job.urlformation);
                    console.log("job urlformation pdf:", job.formationimgNotPdf);
                    const urlFormation = job.urlformation ? encodeURIComponent(job.urlformation) : "null";
                    //formationimgNotPdf
                    content =
                      job.XitledeCategorie === "Formation"
                        ? `<a class="btn btn-secondary" href="indexex.html?id=${job.Salairedejob}&required=${job.formationimg}">Acheter</a>`
                        : `<a class="btn btn-primary" href="indexe.html">Postuler</a>`;

                    var contentxc;
                    contentxc =
                      userArrayAJob[i].XitledeCategorie === "Formation"
                        ? ` <p class="card__owner"><strong>Prix  :</strong> ${userArrayAJob[i].Salairedejob} $</p>`
                        : ` <p class="card__owner"><strong>Salaire :</strong> ${userArrayAJob[i].Salairedejob} $</p> `;

                    const imageform = job.formationimgNotPdf
                      ? job.formationimgNotPdf
                      : 'img/logo_of_wallet.jpg';

                    userLix.innerHTML = ` 
                      <img src="${imageform}" alt="" style="height: 35%; width: 35%; border-radius: 100%;">
                      <p class="card__number">${userArrayAJob[i].Titledejob}</p>
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

                        function stockerPDFBase64(base64PDF) {
                          const request = indexedDB.open("PDFDatabase", 1);

                          request.onupgradeneeded = function (event) {
                            const db = event.target.result;
                            db.createObjectStore("pdfs", { keyPath: "id" });
                          };

                          request.onsuccess = function (event) {
                            const db = event.target.result;
                            const tx = db.transaction("pdfs", "readwrite");
                            const store = tx.objectStore("pdfs");

                            store.put({ id: "monPDF", content: base64PDF });

                            tx.oncomplete = () => console.log("PDF stocké !");
                            tx.onerror = () => console.error("Erreur de stockage.");
                          };
                        }

                        stockerPDFBase64(`${userArrayAJob[i].formationimgNotPdf}`);

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

                    userListUlx.prepend(userLix);
                  }

                  // Append the list to the parent container
                  indicatClassJob.prepend(userListUlx);
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
var menubtnId = document.getElementById("menu-btnId");
menubtnId.addEventListener("click", function () {
  Swal.fire({
    title: "Recharge ton compte",
    html: `
  <style>
    .swal2-container .swal2-html-container {
      padding-top: 10px;
    }

    .recharge-container {
      font-family: 'Segoe UI', sans-serif;
      text-align: left;
    }

    .recharge-container p {
      margin: 10px 0 6px;
      font-weight: 500;
      color: #333;
    }

    .recharge-container .swal2-select,
    .recharge-container .swal2-input {
      width: 100% !important;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 12px;
      font-size: 14px;
    }

    .recharge-container #crypto-section {
      background: #f9f9f9;
      border-left: 4px solid #ff5555;
      padding: 10px 12px;
      border-radius: 6px;
      margin-top: 10px;
    }

    .recharge-container #crypto-section p {
      color: #cc0000;
      margin-bottom: 8px;
    }

    .recharge-container #crypto-section input {
      margin-bottom: 8px;
    }
         .recharge-container #crypto-section input {
      margin-bottom: 8px;
    }

    .recharge-container #crypto-section button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 8px 12px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
    }
    #recharge-mode {
      width: 60% !important; /* ou 50%, selon ton besoin */
      margin-bottom: 12px;
    }
   
  </style>

  <div class="recharge-container">
    <p>Mode de recharge :</p>
    <select id="recharge-mode" class="swal2-select">
      <option value="mobile">Recharge par Mobile </option>
      <option value="crypto">Cryptomonnaie (TRON)</option>
    </select>

<div id="crypto-section" style="display: none;">
  <p><strong>⚠️ Cette adresse accepte uniquement du TRON</strong></p>
  <p><strong>Adresse TRON :</strong></p>
  <input type="text" id="tron-address" class="swal2-input" readonly value="TLtD67k5gpndKibbdb4osbiV5fyZ6tbPm6" />
  <button onclick="copyTronAddress()" class="swal2-confirm swal2-styled" style="margin-top:10px;">📋 Copier l'adresse</button>
  <p id="copy-feedback" style="color: green; font-weight: bold; display: none; margin-top: 5px;">✅ Adresse copiée !</p>
</div>


    <div id="amount-section">
      <p>Entrez le montant :</p>
      <input type="number" id="amount-input" class="swal2-input" min="1" step="1" placeholder="Montant en $ (USD)" />
    </div>
  </div>
`,


    didOpen: () => {
      const select = document.getElementById("recharge-mode");
      const cryptoSection = document.getElementById("crypto-section");
      const amountSection = document.getElementById("amount-section");

      select.addEventListener("change", function () {
        if (this.value === "crypto") {
          cryptoSection.style.display = "block";
          amountSection.style.display = "none";
        } else {
          cryptoSection.style.display = "none";
          amountSection.style.display = "block";
        }
      });
    },
    preConfirm: () => {
      const mode = document.getElementById("recharge-mode").value;
      const amount = document.getElementById("amount-input").value;
      if (mode === "mobile" && (amount <= 0 || !amount)) {
        Swal.showValidationMessage("Veuillez entrer un montant valide.");
        return false;
      }
      return { mode, amount };
    },
    showCancelButton: true,
    confirmButtonText: "Continuer",
    cancelButtonText: "Annuler",
  }).then((result) => {
    if (result.isConfirmed) {
      const { mode, amount } = result.value;

      if (mode === "crypto") {
        Swal.fire({
          icon: "info",
          title: "En attente de votre paiement TRON",
          html: `Après avoir envoyé le montant en TRON, contactez le support avec la preuve pour validation.
            <div style="text-align: left !important;"><hr>
            <strong>Support :</strong><hr>
            <a href="https://wa.me/+2290164669774" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-whatsapp"></i> +44 7418315534
            </a><hr>
            <a href="mailto:info@amowa.online" target="_blank" rel="noopener noreferrer">
              <i class="far fa-envelope"></i>info@amowa.online
            </a>
            </div>`,
          confirmButtonText: "OK",
        });
        return;
      }

      document.getElementById("sameToBody").style.display = "block";
      const fcfaAmount = amount * 655;

      FeexPayButton.init("render", {
        id: "65c89373ac34723190f5087e",
        amount: Number(fcfaAmount),
        token: "fp_RyjzKSop3kh7DF1vy3LG0KRDTYYgF3ebSZSDsTR6MIrYauAU83IrSS7qUE3HksLe",

        callback: (response) => {
          console.log("FeexPay Response:", response);

          if (response?.status === "SUCCESSFUL") {
            //alert("✅ Paiement effectué avec succès !");
            addSuccessListener(amount);
          }

          if (response?.status === "failed") {
            alert("❌ Paiement échoué !");
          }
        },

        //callback_url: "https://amowa.online/",
        mode: "LIVE", // ⚠️ Passe à LIVE seulement après test
        custom_button: false,
      });

      setTimeout(() => {
        const button = document.querySelector("#render .feexpay_button");
        setTimeout(() => {
          const button = document.querySelector("#render .feexpay_button");
          if (button) {
            document.getElementById("sameToBody").style.display = "none";
            button.click();
          } else {
            document.getElementById("sameToBody").style.display = "none";
            document.getElementById("iphoneIDm").style.display = "none";
            console.log("Le bouton n'a pas été trouvé !");
          }
        }, 1000);
      }, 500);

      // ===== Helpers montants sûrs =====
      function toCents(value) {
        if (value === null || value === undefined) return 0;
        return Math.round(parseFloat(value.toString().replace(',', '.')) * 100);
      }

      function fromCents(cents) {
        return (cents / 100).toFixed(2);
      }


      // ===== Fonction principale =====
      function addSuccessListener(amount) {
        const unserconnectuserIdE = localStorage.getItem("unserconnectuserId");
        const balanceIDAWWW = localStorage.getItem("balanceIDAWWW");
        //alert(amount)
        // Sécurité valeurs
        if (!unserconnectuserIdE) {
          Swal.fire("Erreur", "Utilisateur introuvable.", "error");
          return;
        }

        // Conversion sûre en centimes
        const balanceCents = toCents(balanceIDAWWW);
        const amountCents = toCents(amount);

        // Addition exacte
        const totalCents = balanceCents + amountCents;
        const totalFinal = fromCents(totalCents);

        const newData = {
          ACCOUNTPRINCIPAL: totalFinal,
        };

        // ⚠️ chemin sans espaces
        const userRefx = database.ref(`/utilisateurs/${unserconnectuserIdE}`);

        userRefx.update(newData, (error) => {
          if (error) {
            Swal.fire("Ooops", "Votre recharge a échoué.", "error");
          } else {
            window.location.reload();
            Swal.fire(
              "Succès",
              "Votre recharge a été effectuée avec succès.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          }
        });
      }

    }
  });

});

function copyTronAddress() {
  const address = document.getElementById('tron-address').value;
  const feedback = document.getElementById('copy-feedback');

  navigator.clipboard.writeText(address).then(() => {
    feedback.style.display = 'block';
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 2000);
  }).catch((err) => {
    feedback.innerText = '❌ Échec de la copie';
    feedback.style.color = 'red';
    feedback.style.display = 'block';
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 3000);
  });
}

var tableSolde = [];
var tablePhone = [];
var tablePays = [];
var tableNomPays = [];

document.getElementById("get_for_userxxc").addEventListener("click", async () => {
  const { isConfirmed, value } = await Swal.fire({
    title: "Your amount",
    html: `
        <label id = "swal-label" for= "country-select" >🌍 Choisissez votre pays</label >
      <select id="country-select" class="swal2-select" style="margin-bottom:10px; width:60%; max-width:300px;">
        ${countryOptions}
      </select>

      <label id="swal-label" for="phone-input">📱 Numéro de téléphone</label>
      <input type="text" id="phone-input" class="swal2-input" placeholder="Ex: +22990123456" style="margin-bottom:10px; width:60%; max-width:300px;"/>
  <label id="swal-label" for="reason-input">La raison du rétrait</label>
      <input type="text" id="reason-input" class="swal2-input" placeholder="Ex: Retrait pour achat" style="margin-bottom:10px; width:60%; max-width:300px;"/>
      <label id="swal-label" for="amount-input">💵 Montant à retirer</label>
      <input
        type="text"
        id="amount-input"
        class="swal2-input"
        placeholder="Montant en $"
        style="margin-bottom:10px; width:60%; max-width:300px;"
        oninput="
          let val = this.value;
          val = val.replace(/[^0-9.,]/g, '');
          if(val.startsWith('.') || val.startsWith(',')) val = val.substring(1);
          const partsComma = val.split(',');
          if(partsComma.length > 2) val = partsComma[0] + ',' + partsComma.slice(1).join('');
          const partsDot = val.split('.');
          if(partsDot.length > 2) val = partsDot[0] + '.' + partsDot.slice(1).join('');
          this.value = val;
        "
      />
        `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Get",
    cancelButtonText: "Cancel",
    preConfirm: () => {
      const rawAmount = document.getElementById("amount-input").value.trim();
      const amount = parseFloat(rawAmount.replace(',', '.'));
      if (isNaN(amount) || amount <= 0) {
        Swal.showValidationMessage("Veuillez entrer un montant strictement positif !");
        return false;
      }
      if (amount < 10) {
        Swal.showValidationMessage("Please enter a number greater than or equal to 10!");
        return false;
      }
      return {
        reason: document.getElementById("reason-input").value.trim(),
        selectedCode: document.getElementById("country-select").value,
        phone: document.getElementById("phone-input").value.trim(),
        amount,
      };
    }
  });

  if (!isConfirmed || !value) return;

  const userId = localStorage.getItem("unserconnectuserId");
  const countryName = countries.find(c => c.code === value.selectedCode)?.name || "Unknown";

  // ✅ Calcul en centimes
  const amountCents = Math.round(value.amount * 100);
  const commissionCents = Math.round(amountCents * 0.05);
  const totalToDeductCents = amountCents + commissionCents;

  console.log("Montant saisi ($):", value.amount);
  console.log("Montant en cents:", amountCents);
  console.log("Commission en cents:", commissionCents);
  console.log("Total à déduire en cents:", totalToDeductCents);

  localStorage.setItem("MyCommissionAdd", value.amount.toString());
  localStorage.setItem("phone", value.phone);
  localStorage.setItem("selectedCode", value.selectedCode);
  localStorage.setItem("lenumero", value.selectedCode + value.phone);
  localStorage.setItem("reason", value.reason);
  localStorage.setItem("tableNomPaysL", countryName);
  var leNumero = value.selectedCode + value.phone;
  try {
    const userRef = database.ref(`/utilisateurs/${userId}`);

    const snapshot = await userRef.once('value');
    const userData = snapshot.val();
    if (!userData || typeof userData.ACCOUNTPRINCIPAL === "undefined") {

      Swal.fire("Erreur", "Impossible de récupérer votre solde actuel.", "error");
      return;
    }

    let currentBalance = parseFloat(userData.ACCOUNTPRINCIPAL);
    if (isNaN(currentBalance)) currentBalance = 0;

    const currentBalanceCents = Math.round(currentBalance * 100);
    const newBalanceCents = currentBalanceCents - totalToDeductCents;

    console.log("currentBalanceCents:", currentBalanceCents);
    console.log("newBalanceCents:", newBalanceCents);

    if (newBalanceCents >= 0) {
      const newBalance = (newBalanceCents / 100).toFixed(2);

      await userRef.update({ ACCOUNTPRINCIPAL: newBalance });

      const now = new Date();
      const formattedDate = `${now.getDate()} /${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()} h:${now.getMinutes()} min`;
      localStorage.setItem("DateNow", formattedDate);

      const receiverMsg = {
        type: "Rétrait",
        message: `Vous avez fait un retrait de ${value.amount} $ `,
        montant: value.amount,
        Raison: "Rétrait",
        lenumero: leNumero,
        status: false,
        time: formattedDate,
        diffuser: true,
      };
      userRef.child("MESSAGES").push(receiverMsg);
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Your operation has been completed successfully.",
        confirmButtonText: "Get your payment certificate.",
        allowOutsideClick: false,
      }).then(() => window.location.href = "paiementcerti.html");

    } else {
      localStorage.removeItem("MyCommissionAdd");
      localStorage.removeItem("phone");
      localStorage.removeItem("selectedCode");
      Swal.fire({
        title: "Info",
        text: "Your balance is insufficient",
        icon: "error",
        allowOutsideClick: false,
      }).then(() => window.location.href = "index.html");
    }

  } catch (err) {
    console.error("Erreur inattendue:", err);
    Swal.fire("Erreur", "Une erreur inattendue est survenue.", "error");
  }
});

// function for invest
document.getElementById("transfer_systemsx").addEventListener("click", function () {
  // Logic for investment transfer
  Swal.fire({
    title: "Info",
    text: "Veuillez contacter l’assistance support pour voir les offres disponibles en ce qui concerne les investissements. Merci.",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Contacter",
    cancelButtonText: "Annuler",
    allowOutsideClick: false,
  }).then((res) => {
    if (res.isConfirmed) {
      // Redirection vers WhatsApp avec message par défaut
      const numeroWhatsApp = "447418315534";
      const message = encodeURIComponent("Bonjour, je souhaite connaître les offres disponibles.");
      window.open(`https://wa.me/${numeroWhatsApp}?text=${message}`, "_blank");
    } else {
      // Par exemple, redirection vers index.html ou ne rien faire
      window.location.href = "index.html";
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
    <p>Get your points for <strong style="color: blue;">amowa address</strong>.</p>
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