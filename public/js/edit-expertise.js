$(document).ready(function() {
  $('.ui.multiple.selection.dropdown')
    .dropdown({
      maxSelections: 3
    });


  ClassicEditor
    .create(document.querySelector('#skill'), {
      removePlugins: ['ImageUpload'],
    })
    .then(editor => {
      console.log(editor);
    })
    .catch(error => {
      console.error(error);
    });




});



$(document).ready(function() {
  $('#expertiseForm')
    .form({
      fields: {
        userExpertiseID: {
          identifier: 'userExpertiseID',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาเลือกสายงานของท่าน'
          }]
        },
        majorHideinput: {
          identifier: 'majorHideinput',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาเลือกสาขาของท่าน'
          }]
        },
      }
    });
});




$(document).ready(function() {

  $('#expertiseDiv').on('click', function() {
    $('#majorDiv').dropdown('clear');
  });

  $("#expertiseID").on('change', function() {
    $('#majorDiv').dropdown('clear');

    var expertiseSelectData = $('#expertiseID').val();

    $.ajax({
      type: 'GET',
      url: '/edit-expertise-data/?expertiseSelectData=' + expertiseSelectData,
      dataType: 'json',
      success: function(rows) {
        $("#majorSelect").empty();

        for (var i = 0; i < rows.length; i++) {
          $('#majorSelect').append('<div class="item" data-value="' + rows[i].subExpertiseAI_ID + '">' + rows[i].subExpertiseName + '</div>');

        };


        document.getElementById("majorDiv").classList.remove("disabled");
        $('#majorDiv').dropdown('clear');
      }
    });


  });



});
