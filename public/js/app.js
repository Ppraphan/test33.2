//ตัวเลือกปฏิทิน
// $(function() {
//   $('[data-toggle="datepicker"]').datepicker({
//     language: 'th-TH',
//     date: null,
//   });
// });

$(document).ready(function() {
  // window.location = window.location.pathname
  reset();
});

function reset() {
  var sgup = "/signup";
  var currentLocation2 = window.location.pathname.split('?')[0];

  if (window.history.replaceState) {
    if (currentLocation2 == sgup) {
      window.onbeforeunload = function() {
        return "Data will be lost if you leave the page, are you sure?";
      };
    } else {
      window.history.replaceState(null, null, window.location.pathname);
    }

  }
}

$(document).ready(function() {
  $('#catSelection').change(function() {
    var catdata = $('#catSelection').val();
    //   Note the url below. It adds catid=(#categoryBox value from above).
    $.ajax({
      type: 'GET',
      url: './signup/getDpment/' + catdata,
      dataType: 'json',
      success: function(rows) {
        $('#games').empty();
        for (var i = 0; i < rows.length; i++) {
          $('#games').append('<option>' + rows[i].Sub_Dpment_name + '</option>')
        }
      }
    });
  });
});







$(document).ready(function() {
  $('#data').after('<ul id="nav" class="pagination text-center"></ul>');
  var rowsShown = 10;
  var rowsTotal = $('#data tbody tr').length;
  var numPages = rowsTotal / rowsShown;
  for (i = 0; i < numPages; i++) {
    var pageNum = i + 1;
    if (pageNum == 3) {
      $('#nav').append('<li><a' + i + '" class="ellipsis" aria-hidden="true"></a></li> ');
    } else {
      $('#nav').append('<li><a href="#" rel="' + i + '">' + pageNum + '</a></li> ');
    }
  }
  $('#data tbody tr ').hide();
  $('#data tbody tr ').slice(0, rowsShown).show();

  $('#nav a:first').addClass('active');
  $('#nav a').bind('click', function() {
    $('#nav a').removeClass('active');
    $(this).addClass('active');
    var currPage = $(this).attr('rel');
    var startItem = currPage * rowsShown;
    var endItem = startItem + rowsShown;
    $('#data tbody tr ').css('opacity', '0.0').hide().slice(startItem, endItem).
    css('display', 'table-row').animate({
      opacity: 1
    }, 300);
  });
});


// $(document).ready(function(){
//   $('#delb').on('click', function(e){
//     $target = $(e.target);
//     const id = $target.attr('data-id');
//     $.ajax({
//       type:'get',
//       url: '/forms/delete/'+id,
//       success: function(response){
//         alert('Deleting Article');
//         window.location.href='/';
//       },
//       error: function(err){
//         console.log(err);
//       }
//     });
//   });
// });


$(function() {
  var showClass = 'show';
  $('input').on('checkval', function() {
    var label = $(this).prev('label');
    if (this.value !== '') {
      label.addClass(showClass);
    } else {
      label.removeClass(showClass);
    }
  }).on('keyup', function() {
    $(this).trigger('checkval');
  });
});


// $(document).ready(function() {
//      $(':input[type="submit"]').prop('disabled', true);
//      $('input[type="text"]').keyup(function() {
//         if($(this).val() != '') {
//            $(':input[type="submit"]').prop('disabled', false);
//         }
//      });
//  });



$('#myform > input').on('input', function() {
  var empty = false;
  $('form > input, form > select').each(function() {
    if ($(this).val() == '') {
      empty = true;
    }
  });

  if (empty) {
    $('#register').attr('disabled', 'disabled');
  } else {
    $('#register').removeAttr('disabled');
  }
});


/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', '/particlesjs-config.json', function() {
  console.log('callback - particles.js config loaded');
});

// $(document).ready(function() {
//   $('.sendButton').attr('disabled', true);
//
//   $('#message').keyup(function() {
//     if ($(this).val().length != 0) {
//       $('.sendButton').attr('disabled', false);
//     } else {
//       $('.sendButton').attr('disabled', true);
//     }
//   })
// });

// $(document).ready(function() {
//   $('.sendButton2').attr('disabled', true);
//
//   $('#message2').keyup(function() {
//     if ($(this).val().length != 0) {
//       $('.sendButton2').attr('disabled', false);
//     } else {
//       $('.sendButton2').attr('disabled', true);
//     }
//   })
// });
// particlesJS('particles-js',
//
//   {
//     "particles": {
//       "number": {
//         "value": 109,
//         "density": {
//           "enable": true,
//           "value_area": 800
//         }
//       },
//       "color": {
//         "value": "#ffffff"
//       },
//       "shape": {
//         "type": "circle",
//         "stroke": {
//           "width": 0,
//           "color": "#000000"
//         },
//         "polygon": {
//           "nb_sides": 5
//         },
//         "image": {
//           "src": "img/github.svg",
//           "width": 100,
//           "height": 100
//         }
//       },
//       "opacity": {
//         "value": 0.5,
//         "random": false,
//         "anim": {
//           "enable": false,
//           "speed": 1,
//           "opacity_min": 0.1,
//           "sync": false
//         }
//       },
//       "size": {
//         "value": 3,
//         "random": true,
//         "anim": {
//           "enable": false,
//           "speed": 40,
//           "size_min": 0.1,
//           "sync": false
//         }
//       },
//       "line_linked": {
//         "enable": true,
//         "distance": 150,
//         "color": "#ffffff",
//         "opacity": 0.4,
//         "width": 1
//       },
//       "move": {
//         "enable": true,
//         "speed": 6,
//         "direction": "top-right",
//         "random": false,
//         "straight": false,
//         "out_mode": "out",
//         "bounce": false,
//         "attract": {
//           "enable": false,
//           "rotateX": 600,
//           "rotateY": 1200
//         }
//       }
//     },
//     "interactivity": {
//       "detect_on": "window",
//       "events": {
//         "onhover": {
//           "enable": true,
//           "mode": "repulse"
//         },
//         "onclick": {
//           "enable": true,
//           "mode": "push"
//         },
//         "resize": true
//       },
//       "modes": {
//         "grab": {
//           "distance": 400,
//           "line_linked": {
//             "opacity": 1
//           }
//         },
//         "bubble": {
//           "distance": 400,
//           "size": 40,
//           "duration": 2,
//           "opacity": 8,
//           "speed": 3
//         },
//         "repulse": {
//           "distance": 200,
//           "duration": 0.4
//         },
//         "push": {
//           "particles_nb": 4
//         },
//         "remove": {
//           "particles_nb": 2
//         }
//       }
//     },
//     "retina_detect": true,
//
//   }
//
// );
