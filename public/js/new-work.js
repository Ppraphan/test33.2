// $(document).ready(function() {
//   $('#myPFOTable').DataTable();
// });


$(document).ready(function() {

  $('[data-toggle="datepicker"]').datepicker({
    format: 'yyyy'
  });

  $('#newWorkFormID')
    .form({
      fields: {
        pfoYears: {
          identifier: 'pfoYears',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาระบุปี'
          }]
        },
        pfoTitile: {
          identifier: 'pfoTitile',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาระบุหัวข้อ'
          }]
        },
        pfoDetails: {
          identifier: 'pfoDetails',
          rules: [{
            type: 'empty',
            prompt: 'กรุณากรอกรายละเอียด'
          }]
        },

      }
    });



  ClassicEditor.create(document.querySelector('#pfoDetails'), {
      removePlugins: ['ImageUpload'],
    })
    .then(editor => {
      console.log(editor);
    })
    .catch(error => {
      console.error(error);
    });


});


$(function() {
  // Multiple images preview in browser
  var imagesPreview = function(input) {

    if (input.files) {
      var filesAmount = input.files.length;

      for (i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = function(event) {

          $("#newWorkFormID").append('<div class="field exImage"><img class="ui fluid image" src="' + event.target.result + '"></div>');
        }

        reader.readAsDataURL(input.files[i]);
      }
    }

  };

  $('#pfoImage').on('change', function() {
    if (this.files.length > 6) {
      alert('จำกัดจำนวนสูงสุดที่ 6 ไฟล์')
      $('#pfoImage').val('');
    } else {
      $("div.exImage").remove();
      imagesPreview(this);
    }

  });
});
