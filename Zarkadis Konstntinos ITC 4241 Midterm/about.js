// Initialize the carousel when the document is ready
$(document).ready(function () {
  // Activate the carousel
  $("#myCarousel").carousel();

  // Enable carousel navigation controls
  $("#carousel-next").click(function () {
    $("#myCarousel").carousel("next");
  });

  $("#carousel-prev").click(function () {
    $("#myCarousel").carousel("prev");
  });
});
