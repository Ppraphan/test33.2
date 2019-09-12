$(document).ready(function() {
  var croppedImageDataURL;

  $('.menu .item')
    .tab();

  $('.special.cards .image').dimmer({
    on: 'hover'
  });


  $('#profileEdit')
    .dimmer({
      on: 'hover'
    });
});

function newprofile() {


  $('.ui.modal')
    .modal({
      onApprove: function() {

        // const byteCharacters = atob(croppedImageDataURL);
        $('#userProfile').attr('src', croppedImageDataURL);

      }
    })
    .modal('show');
}

$(document).ready(function() {
  $('#fileInput').empty();
  var canvas = $("#canvas"),
    context = canvas.get(0).getContext("2d"),
    $result = $('#result');



  $('#fileInput').on('change', function() {
    if (this.files && this.files[0]) {

      if (this.files[0].type.match(/^image\//)) {




        var reader = new FileReader();

        reader.onload = function(evt) {
          var img = new Image();
          img.onload = function() {


            context.canvas.height = img.height;
            context.canvas.width = img.width;
            context.drawImage(img, 0, 0);

            var cropper = canvas.cropper({
              aspectRatio: 1 / 1
            });

            $('#btnCrop').click(function() {
              // Get a string base 64 data url
              croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png");
              // $result.append($('<img>').attr('src', croppedImageDataURL));

              $result.attr('src', croppedImageDataURL);
            });
            $('#btnRestore').click(function() {

              context.clearRect(0, 0, canvas.width, canvas.height);
              context.beginPath();

              canvas.cropper('reset');
              $result.empty();
            });
          };


          img.src = evt.target.result;
        };
        reader.readAsDataURL(this.files[0]);

      } else {
        alert("Invalid file type! Please select an image file.");
      }
    } else {
      alert('No file(s) selected.');
    }
  });

});
