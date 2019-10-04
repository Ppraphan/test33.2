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


  $('#fileInput').on('change', function() {
    var cropper;
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d"),
      $result = $('#result');

    if (this.files && this.files[0]) {
      // cropper.destroy();

      if (this.files[0].type.match(/^image\//)) {

        $('#fileInput').empty();

        var reader = new FileReader();

        reader.onload = function(evt) {

          var img = new Image();

          img.onload = function() {

            context.canvas.height = img.height;
            context.canvas.width = img.width;
            context.drawImage(img, 0, 0);

            cropper = canvas.cropper({
              aspectRatio: 1 / 1
            });
          };

          img.src = evt.target.result;
        };
        reader.readAsDataURL(this.files[0]);

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

      } else {
        alert("Invalid file type! Please select an image file.");
      }
    } else {
      alert('No file(s) selected.');
    }
  });

});
