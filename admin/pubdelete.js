// Configuration Firebase (Remplace avec tes propres paramètres)
const firebaseConfig = {
  apiKey: "AIzaSyDbQjciXp0J_UGQBBcqmjlCAemYK-tsR6c",
  authDomain: "am-wallet.firebaseapp.com",
  databaseURL: "https://am-wallet-default-rtdb.firebaseio.com",
  projectId: "am-wallet",
  storageBucket: "am-wallet.appspot.com",
  messagingSenderId: "877693231070",
  appId: "1:877693231070:web:47c59ac6220ed09af9c74f",
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fonction pour récupérer et afficher les pubs
function publish() {
  const pubList = document.getElementById("pubList");
  pubList.innerHTML = ""; // Nettoyer avant d'afficher

  database
    .ref("/lespubs/")
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((productSnapshot) => {
        const productData = productSnapshot.val();
        const pubId = productSnapshot.key; // ID unique dans Firebase

        // Création de la carte pub
        const pubCard = document.createElement("div");
        pubCard.classList.add("pub-card");
        pubCard.innerHTML = `
                <img src="data:image/png;base64,${productData.IMAGEPUB}" alt="Publicité">
                <a href="${productData.URLPUB}" target="_blank">🔗 Voir l'offre</a>
                <button class="delete-btn" onclick="deletePub('${pubId}')">🗑 Supprimer</button>
            `;
        pubList.appendChild(pubCard);
      });
    })
    .catch((error) => {
      Swal.fire("Erreur", "Impossible de charger les publicités", "error");
    });
}

// Fonction pour supprimer une publicité
function deletePub(pubId) {
  Swal.fire({
    title: "Êtes-vous sûr ?",
    text: "Cette action est irréversible !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Oui, supprimer !",
  }).then((result) => {
    if (result.isConfirmed) {
      database
        .ref(`/lespubs/${pubId}`)
        .remove()
        .then(() => {
          Swal.fire("Supprimé !", "La publicité a été supprimée.", "success");
          publish(); // Recharger la liste
        })
        .catch((error) => {
          Swal.fire("Erreur", "Échec de la suppression", "error");
        });
    }
  });
}

// Charger les publicités au démarrage
publish();
