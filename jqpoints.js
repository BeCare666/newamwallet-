$(document).ready(function () {
  // Ouvrir automatiquement le modal après 500ms
  setTimeout(function () {
    $("#customModal").addClass("active");
  }, 500);

  // Fermer le modal avec le bouton
  $("#closeModal").click(function () {
    $("#customModal").removeClass("active");
    setTimeout(function () {
      $("#customModal").css("display", "none"); // Cache complètement après l'animation
    }, 400);
  });

  // Empêcher la fermeture en cliquant à l'extérieur
  $("#customModal").click(function (event) {
    if (!$(event.target).closest(".modal-content").length) {
      event.stopPropagation();
    }
  });
});
