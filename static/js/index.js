window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var videoOptions = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        // Override default breakpoints to enforce 1-up even on desktop
        breakpoints: [
            { changePoint: 768, slidesToShow: 1, slidesToScroll: 1 },
            { changePoint: 640, slidesToShow: 1, slidesToScroll: 1 }
        ]
    };
    
    // Target the specific video carousel class
    bulmaCarousel.attach('.video-carousel', videoOptions);


    // -------------------------------------------------------------------
    // 2. IMAGE SLIDER (.results-carousel): Set to slidesToShow: 2
    // -------------------------------------------------------------------
    var imageOptions = {
        slidesToScroll: 1, // Scroll two at a time
        slidesToShow: 2,   // Show two at a time
        loop: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        // Override default breakpoints to enforce 2-up on large screens,
        // but switch to 1-up on mobile (below 768px).
        breakpoints: [
            { changePoint: 768, slidesToShow: 2, slidesToScroll: 1 }, // Desktop
            { changePoint: 640, slidesToShow: 1, slidesToScroll: 1 }  // Mobile/Tablet
        ]
    };

    // Target the specific image carousel class
    bulmaCarousel.attach('.results-carousel', imageOptions);


    
		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})
