$(document).ready(function() {
  var croppedImageDataURL;
  var dt;
  $('.menu .item').tab();

  $('.special.cards .image').dimmer({
    on: 'hover'
  });


  $('#profileEdit').dimmer({
      on: 'hover'
    });

});

function newprofile() {
  $('.ui.modal').modal({
    closable  : false,
    onDeny    : function(){
    },
    onApprove : function() {

      $('#userProfile').attr('src', croppedImageDataURL);
      $('#downloadfile').attr('href', croppedImageDataURL);
    }
  })
  .modal('show')
}


$(document).ready(function() {


  var canvas = $("#canvas"),
    context = canvas.get(0).getContext("2d"),
    $result = $('#result');

  // set percentage


  $('#fileInput').on('change', function() {
    if (this.files && this.files[0]) {
      if (this.files[0].type.match(/^image\//)) {



        $("#example0").progress('reset');

        var file = $("#fileInput")[0].files[0];
        var fileData = file.size;

        var percent = (file.size / file.size) * 100;

        $("#example0").progress({
          percent: percent
        });


        //รีเซตรูป
        $('#canvas').cropper('destroy');
        $result.empty();

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
              $result.empty();
              // Get a string base 64 data url
              croppedImageDataURL = canvas.cropper('getCroppedCanvas').toDataURL("image/png");
              $('#base64img').val(croppedImageDataURL);

              $result.append($('<img>').attr('src', croppedImageDataURL));
            });

            $('#btnRestore').click(function() {
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
