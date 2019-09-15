$(document).ready(function() {

  $('#editEducationHistory').DataTable();

  $('[data-toggle="datepicker"]').datepicker({
    format: 'yyyy'
  });

  $('#educationHistory').form({
    fields: {
      ehGraduateYear: {
        identifier: 'ehGraduateYear',
        rules: [{
          type: 'empty',
          prompt: 'กรุณาระบุปีที่สำเร็จการศึกษา'
        }]
      },
      ehEducateLavel: {
        identifier: 'ehEducateLavel',
        rules: [{
          type: 'empty',
          prompt: 'กรุณาระบุระดับวุฒิการศึกษา'
        }]
      },
      ehEducationalBackground: {
        identifier: 'ehEducationalBackground',
        rules: [{
          type: 'empty',
          prompt: 'กรุณาระบุวุฒิการศึกษา'
        }]
      },
      ehCollegeName: {
        identifier: 'ehCollegeName',
        rules: [{
          type: 'empty',
          prompt: 'กรุณาระบชืุ่อสถานศึกษา'
        }]
      },


    }
  });
});
