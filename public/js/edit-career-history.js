$(document).ready(function() {

    $('#editCareerHistory').DataTable();


  $('[data-toggle="datepicker"]').datepicker({
    format: 'yyyy'
  });

  $('#careerHistory')
    .form({
      fields: {
        chEntYear: {
          identifier: 'chEntYear',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาระบุปีที่เข้าทำงาน'
          }]
        },
        chLeftYear: {
          identifier: 'chLeftYear',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาระบุปีที่ออกจากงาน'
          }]
        },
        chPosition: {
          identifier: 'chPosition',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาระบุตำแหน่งงาน'
          }]
        },
        chCompany: {
          identifier: 'chCompany',
          rules: [{
            type: 'empty',
            prompt: 'กรุณาระบุชื่อบริษัท หรือ องค์กร'
          }]
        },

      }
    });
});
