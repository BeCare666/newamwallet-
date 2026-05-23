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

const username = localStorage.getItem("usernameT") 
const typewayval = localStorage.getItem("typewayval")
const balanceIDAWW = localStorage.getItem("balanceIDAWWW")
const unserconnectId = localStorage.getItem("unserconnectuserId")
// -----Country Code Selection
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

document.getElementById('submitid').value = `Transfer your Amount`  
function submitmy(){
  var valVal = document.getElementById('soldeId').value
  var balanceIDAWWx = parseFloat(balanceIDAWW);
  var valValx = parseFloat(valVal);
 
  if(balanceIDAWWx >= valValx){
   // document.getElementById('containerId').style.display = "none"
    Swal.fire({
      title: "Transfer...",
      html: `Dear ${username}, your transfer ${valVal}$ will be finalized in <b></b> milliseconds at the most.`,
      timer: 7000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
      },
      willClose: () => {
          clearInterval(timerInterval);
      }
      }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        if(typewayval === "bankmoney"){ 
            const unserconnectId = localStorage.getItem("unserconnectuserId")
            var myComptaConvertis = parseFloat(balanceIDAWW);
            var valValx = parseFloat(valVal);
            var myCommissionAdd = myComptaConvertis - valValx
            const newData = {
            ACCOUNTPRINCIPAL: myCommissionAdd,
            //ACCOUNTPRINCIPALACCESS:0
            };
            const userRefx = database.ref(`/utilisateurs/${unserconnectId}`);
            userRefx.update(newData, (error) => {
              if (error){
                swal.fire({
                  title: "Ooops..",
                  text: `Dear ${username}, your transfer is failed, contact AM_WALLET to find out more. Thank!`,
                  icon: "error",
                   allowOutsideClick: false,
                  }).then((result)=>{
                    if(result.isConfirmed){
                      window.location.href = "paypal.html"
                    }
                  })
              }else {
                swal.fire({
                    title: "success",
                    text: `Dear ${username}, your transfer has been successfully completed. Your money will be available within 24 or 72 hours. Thank you very much!`,
                    icon: "success",
                     allowOutsideClick: false,
                    }).then((result)=>{
                      if(result.isConfirmed){
                        window.location.href = "index.html"
                      }
                    })
              }
            })
 
        }
      }
      });
    }else{
      Swal.fire({
        title: "Info ",
        text: "Your balance is insufficient",
        icon: "error",
        allowOutsideClick: false,
      })
}
}

