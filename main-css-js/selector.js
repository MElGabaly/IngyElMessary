$(document).ready(function() {
  var $container = $(".portfolioContainer");
  $container.isotope({
    percentPosition: true,
    filter: "*",
    animationOptions: {
      duration: 750,
      easing: "linear",
      queue: false
    },
    initLayout: true
  });

  $(".portfolioFilter a").click(function() {
    $(".portfolioFilter .current").removeClass("current");
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");
    $container.isotope({
      percentPosition: true,
      filter: selector,
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false
      },
      initLayout: true
    });
    return false;
  });
});
