//function toggleClick
 (function($) {
     $.fn.clickToggle = function(func1, func2) {
         var funcs = [func1, func2];
         this.data('toggleclicked', 0);
         this.click(function() {
             var data = $(this).data();
             var tc = data.toggleclicked;
             $.proxy(funcs[tc], this)();
             data.toggleclicked = (tc + 1) % 2;
         });
         return this;
     };
 }(jQuery));

//google MAPS
$.extend({
   google_map_style: [
         {
           "stylers": [
            //   {"hue": "#000"},
              {"invert_lightness": false},
              {"saturation": 0},
              {"lightness": 0},
              {"gamma": 1}
          ]
       }
   ],

    google_map: function init_map() {
        var map,
            marker,
            points;

        function initialize(point) {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                scrollwheel: false,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.LARGE,
                    mapTypeIds: [
                        google.maps.MapTypeId.HORIZONTAL_BAR,
                        google.maps.MapTypeId.TOP_LEFT
                    ]
                },
                //Zoom-Control
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                 //Street-View-Control
                streetViewControl: false,
                streetViewControlOptions: {
                   position: google.maps.ControlPosition.LEFT_TOP
                },
                //Full-Screen-Control
                fullscreenControl: false,
                center: point,
                styles: $.google_map_style,
                // backgroundColor: '#f4f4f4'
            });
        }

        function active_point(point) {
            var ll = {
                lat: parseFloat(point.attr('data-lat')),
                lng: parseFloat(point.attr('data-lng'))
            };
            deletemarker();
            addMarker(new google.maps.LatLng(ll.lat, ll.lng));
            setAllMap(map);

            map.setCenter(new google.maps.LatLng(ll.lat, ll.lng));
            // map.setCenter(new google.maps.LatLng(ll.lat, ll.lng + 1.800));
            // if ($(window).width() <= 1024) {
            //     map.setCenter(new google.maps.LatLng(ll.lat, ll.lng + 0.0030));
            // }
            // if ($(window).width() <= 480) {
            //     map.setCenter(new google.maps.LatLng(ll.lat, ll.lng + 0.0010));
            // }

        }

        // Sets the map on all marker in the array.
        function setAllMap(map) {
            if (typeof marker !== 'undefined')
                marker.setMap(map);
        }

        // Removes the marker from the map, but keeps them in the array.
        function clearmarker() {
            setAllMap(null);
        }

        // Deletes all marker in the array by removing references to them.
        function deletemarker() {
            clearmarker();
            marker = [];
        }

        function addMarker(location) {
            marker = new google.maps.Marker({
                icon: '/img/marker.png',
                position: location,
                map: map
            });
        }

        initialize();

        // $('#map_points button').click(function() { active_point($(this)); });
        active_point(
            $('#map_points button').first()
        );

    }
});

$(document).ready(function() {

    // Home-Maim-slider
    $('.bxslider').bxSlider({
        mode: 'fade',         // Type of transition between slides ('horizontal', 'vertical', 'fade')
        slideWidth: 1200,     // The width of each slide. This setting is required for all horizontal carousels! (integer)
        adaptiveHeight: true, // Dynamically adjust slider height based on each slide's height (boolean)
        controls: false       // If true, "Next" / "Prev" controls will be added (boolean)
    });

    // page_landing_one (our_team)
    $('.owl-carousel.landing_one_our_team').owlCarousel({
      items: 4,
      loop: true,
      margin: 22,
      nav: true,
      dots: false,
      responsive: {
          1024: {
            items: 4
          },
          768: {
              items: 2
          },
          0: {
              items: 1
          }
      }
    });
    // page_landing_one (recruitment)
    $('.owl-carousel.view_staff').owlCarousel({
      items: 5,
      loop: true,
      margin: 5,
      nav: true,
      dots: false,
      responsive: {
          1024: {
            items: 5
          },
          768: {
              items: 3
          },
          0: {
              items: 1
          }
      }
    });

    // Team-slider
    $(".owl-carousel").owlCarousel({
        items: 4,
        loop: true,
        margin: 22,
        nav: true,
        responsive: {
            768: {
                items: 3
            },
            0: {
                items: 1
            }
        }
    });


    // Contacts - textarea focus
    $('textarea.message').on('mousedown click focus', function(e) {
        $(this).parent().addClass('focus');
    }).on('blur', function(e) {
        $(this).parent().removeClass('focus');
    });

    // google MAP
    if ($('#map').length) {
        $.google_map();
    }

  // accordion menu
  var itemElement = $('#accordion_menu .item');
  var titleEl = $('#accordion_menu .item .title');
  var extendEl = $('#accordion_menu .item .extend');

  extendEl.hide();
  titleEl.on('click', function(e) {
    $(this).parent(".item").children(".extend").slideToggle('fast').parent().toggleClass('open_block');
  });


    // jQuery.pop-up()
    $( function() {
       $('#call-you-back').dialog({
          autoOpen: false,
          width: 468,
          modal: true,
          open: function () {
             $(document.body).css({ overflow: "hidden"})
          },
          close: function () {
             $(document.body).css({ overflow: "scroll"})
          },
       });

       //Open-dialog
       $('.call_you_back').on('click', function() {
          $('#call-you-back').dialog('open');
       });

       //Close-dialog
       $('body').on('click','.ui-widget-overlay',function(){
          $('#call-you-back').dialog('close');
       });
    });

    // mobile menu
    var mobMenuIco = $('.mob_menu_ico'),
        nav = $('nav.main');
    mobMenuIco.clickToggle(function() {
        $(this).addClass('open');
        nav.addClass('show');
    }, function() {
        $(this).removeClass('open');
        nav.removeClass('show');
    });


});
