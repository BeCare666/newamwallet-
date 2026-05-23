const username = localStorage.getItem("usernameT")
const typewayval = localStorage.getItem("typewayval")
const balanceIDAWW = localStorage.getItem("balanceIDAWWW")
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
    document.getElementById('containerId').style.display = "none"
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
        if(typewayval === "paypal"){
          swal.fire({
            title: "success",
            text: `Dear ${username}, your transfer has been successfully completed. Your money will be available within 24 hours. Thank you very much!`,
            icon: "success",
             allowOutsideClick: false,
            }).then((result)=>{
              if(result.isConfirmed){
                window.location.href = "index.html"
              }
            })
        }else{
          swal.fire({
            title: "Ooops..",
            text: `Dear ${username}, your transfer is failed, contact AM_WALLET to find out more. Thank!`,
            icon: "error",
             allowOutsideClick: false,
            }).then((result)=>{
              if(result.isConfirmed){
                window.location.href = "index.html"
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
