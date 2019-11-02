$(document).ready(function() {
  $('.ui.sticky').sticky({
    offset: 70,
    context: '#example1',
    pushing: true,

  });

  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();

  $('.ui.accordion').accordion();

  $('.ui.fluid.selection.dropdown ')
    .dropdown({
      clearable: true
    });

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





$(function() {
  $('html,body').animate({
    scrollTop: 0
  }, 'slow');

});
var timeout;

$(window).scroll(function() {
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    var previousScroll = 0;
    var countscroll = 0;

    var beginshow = $('#countCurrentUsers').val();
    beginshow = parseInt(beginshow);
    var allshow = $('#countAllUsers').val();
    allshow = parseInt(allshow);

    var listElm = document.querySelector('#allResearcher');
    var scrollBottom = $(window).scrollTop() + $(window).height();

    var currentScroll = $(this).scrollTop();
    if (currentScroll > previousScroll) {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {

        // alert("bottom");
        if (beginshow <= allshow) {
          $('#countCurrentUsers').val(beginshow + 10);
          document.getElementById("nowShow").innerHTML = beginshow + 10;
          loadMore(beginshow);
          // alert("sald");


        }



      }



    }
    previousScroll = currentScroll;

  }, 50);

});

function loadMore(beginshow) {
  var beginshow = beginshow;
  $.ajax({
    type: 'GET',
    url: '/getuserdata/?beginshow=' + beginshow,
    dataType: 'json',
    success: function(data) {

      // Add 20 items.
      var nextItem = 1;


      for (var i = 0; i < data.length; i++) {
        if (data[i] != ' ' && data[i] != undefined && data[i] != null) {
          $("#allResearcher").append('<a class="ui card" id="" href="/profile/' + data[i].id + '-' + data[i].firstname + '-' + data[i].lastname + '" target="_self">' +
            '<div class="image">' +
            '<img src="./userprofile/' + data[i].profilePic + '" >' +
            '</div>' +
            '<div class="content">' +
            '<div class="ui small header">' + data[i].firstname + '  ' + data[i].lastname +
            '<div class="meta">' + data[i].userPosition +
            '</div>' +
            '</div>' +
            '<div class="extra content">' +
            '<span><i class="map marker alternate icon"></i>' + data[i].userSubWpName +
            '</span>' +
            '</div>' +
            '</div>' +
            '</a>');
        }


      }

      $('.ui.sticky').sticky('refresh');

    }
  });
}
