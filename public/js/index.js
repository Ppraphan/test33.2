$(document).ready(function() {
  $('.ui.sticky').sticky({
      offset: 70,
      context: '#example1',
      pushing: true,

    });

  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();

  $('.ui.accordion')
    .accordion();
});

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

  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('.profile-pic').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".file-upload").on('change', function() {
    readURL(this);
  });

  $(".upload-button").on('click', function() {
    $(".file-upload").click();
  });
});

$(function() {
  // this will get the full URL at the address bar
  var url = window.location.href;
  var currentLocation = window.location.pathname;

  var currentLocation3 = window.location.pathname.split('/')[1];

  // passes on every "a" tag
  $(".nav-edit  a").each(function() {
    // checks if its the same on the address bar
    if (url == (this.href)) {
      $(this).closest("a").addClass("active");
    }
  });

});





// var beginshow = 10;
// var lastshow = 20;
// var previous;
//
// function loadmoreuser() {
//
//   document.getElementById("Neighbor2").classList.add("loading");
//
//   $.ajax({
//     type: 'GET',
//     url: '/getuserdata/?beginshow=' + beginshow,
//     dataType: 'json',
//     success: function(data) {
//       /* Adds Element AFTER NeighborElement */
//       Element.prototype.appendAfter = function(element) {
//         element.parentNode.insertBefore(this, element.nextSibling);
//       }, false;
//
//       /* Typical Creation and Setup A New Orphaned Element Object */
//       var newElement = document.createElement('div');
//       newElement.innerHTML = 'New Element';
//
//       /*  Add NewElement BEFORE -OR- AFTER Using the Aforementioned Prototypes */
//       // newElement.appendAfter(document.getElementById('Neighbor2'));
//
//       // newElement.insertBefore("#Neighbor2");
//
//
//       for (var i = 0; i < data.length; i++) {
//         $("#allResearcher").append('<div class="card" id=""><div class="image"><img src="./userprofile/' + data[i].profilePic + '" ></div><div class="content"><div class="ui small header">' + data[i].firstname + ' ' + data[i].lastname +
//           '</div><div class="meta"><a>' + data[i].userPermission + '</a></div></div><div class="extra content"><span><i class="map marker alternate icon"></i>' + data[i].university + '</span></div></div>');
//       }
//
//     }
//   });
//
//
//   beginshow = beginshow + 10;
//   document.getElementById("countNowShow").innerHTML = beginshow;
//   document.getElementById("Neighbor2").classList.remove("loading");
// };




function loadMore(beginshow){
  var beginshow=beginshow;
  $.ajax({
    type: 'GET',
    url: '/getuserdata/?beginshow=' + beginshow,
    dataType: 'json',
    success: function(data) {

      // Add 20 items.
      var nextItem = 1;


  for (var i = 0; i < 5; i++) {
    $("#allResearcher").append('<div class="card" id="">\
      <div class="image">\
        <img src="" >\
      </div>\
      <div class="content">\
        <div class="ui small header"></div>\
        <div class="meta"></div>\
      </div>\
      <div class="extra content">\
        <span>\
          <i class="map marker alternate icon"></i>\
        </span>\
      </div>\
    </div>');
  }
  $('.ui.sticky').sticky('refresh')
  ;



    }
  });
}


$(function() {
  var beginshow = 10;
  var listElm = document.querySelector('#allResearcher');
  var scrollBottom = $(window).scrollTop() + $(window).height();

  var previousScroll = 0;
  var countscroll = 0;

  $('html,body').animate({
    scrollTop: 0
  }, 'slow');
  $(window).scroll(function() {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > previousScroll) {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        // alert("bottom");
        if(beginshow<=70){
        loadMore(beginshow);
        beginshow=beginshow+10;
        }
      }



    }
    previousScroll = currentScroll;
  });

  // Initially load some items.
  // loadMore();

});
