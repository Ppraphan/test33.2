// ปุ่มโหลดเพิ่มเติม สำหรับโครงการ
$(document).ready(function() {
  $("#loadmorePFOType1").on('click', function() {

    var userid = $('#userid').val();
    var valPFOType1Showon = $('#PFOType1Showon').val();
    var countAllPFOType1input = $('#countAllPFOType1input').val();

    if (Number(valPFOType1Showon) >= Number(countAllPFOType1input)) {
  document.getElementById('loadmorePFOType1').style.display = "none";

    }else{
      $.ajax({
        type: 'GET',
        url: '/getotherpfotype1?valPFOType1Showon=' + valPFOType1Showon + '&userid=' + userid,
        dataType: 'json',
        success: function(data) {
          // $('#getUni').append('<option disabled="disabled" selected="selected">' + "เลือก" + '</option>');
          // for (var i = 0; i < rows.length; i++) {
          //   if (rows[i].uniName != '-' && rows[i].uniName != 'example') {
          //     $('#getUni').append('<option value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>');
          //   }
          // };
          for (var i = 0; i < data.length; i++) {
            if (data[i] != ' ' && data[i] != undefined && data[i] != null) {
              $("#tabPFOType1").append(
                '<a class="ui link card fluid" href="/profile/' + userid + '/' + data[i].pfoID + '">' +
                '<div class="content">' +
                '<div class="header">' + data[i].pfoTitile + '</div>' +
                '  <div class="meta">' +
                '<span class="category">' + data[i].pfoCatagoryID + ' | <i class="calendar alternate outline icon"></i>' + data[i].pfoYears + '</span>' +
                '</div>' +
                '<div class="description">' +

                '<div class="description">' +
                '<p>' + data[i].pfoIntro + '</p>' +

                '</div>' +

                '</div></div></a>');
            }
          }

          document.getElementById('PFOType1Showon').value = data.length + Number(valPFOType1Showon);
          var x= data.length + Number(valPFOType1Showon);
          document.getElementById('PFOType1Showonlabel').innerHTML = data.length + Number(valPFOType1Showon);

          if (x >=countAllPFOType1input) {
        document.getElementById('loadmorePFOType1').style.display = "none";

          }

        }
      });

    }


  });
});


// ปุ่มโหลดเพิ่มเติม สำหรับบริการวิชาการ
$(document).ready(function() {
  $("#loadmorePFOType2").on('click', function() {

    var userid = $('#userid').val();
    var valPFOType2Showon = $('#PFOType2Showon').val();
    var countAllPFOType2input = $('#countAllPFOType2input').val();

    if (Number(valPFOType2Showon) >= Number(countAllPFOType2input)) {
  document.getElementById('loadmorePFOType2').style.display = "none";

    }else{
      $.ajax({
        type: 'GET',
        url: '/getotherpfotype2?valPFOType1Showon=' + valPFOType2Showon + '&userid=' + userid,
        dataType: 'json',
        success: function(data) {
          // $('#getUni').append('<option disabled="disabled" selected="selected">' + "เลือก" + '</option>');
          // for (var i = 0; i < rows.length; i++) {
          //   if (rows[i].uniName != '-' && rows[i].uniName != 'example') {
          //     $('#getUni').append('<option value="' + rows[i].uniID + '">' + rows[i].uniName + '</option>');
          //   }
          // };
          for (var i = 0; i < data.length; i++) {
            if (data[i] != ' ' && data[i] != undefined && data[i] != null) {
              $("#tabPFOType2").append(
                '<a class="ui link card fluid" href="/profile/' + userid + '/' + data[i].pfoID + '">' +
                '<div class="content">' +
                '<div class="header">' + data[i].pfoTitile + '</div>' +
                '  <div class="meta">' +
                '<span class="category">' + data[i].pfoCatagoryID + ' | <i class="calendar alternate outline icon"></i>' + data[i].pfoYears + '</span>' +
                '</div>' +
                '<div class="description">' +

                '<div class="description">' +
                '<p>' + data[i].pfoIntro + '</p>' +

                '</div>' +

                '</div></div></a>');
            }
          }

          document.getElementById('PFOType2Showon').value = data.length + Number(valPFOType2Showon);
          var x= data.length + Number(valPFOType2Showon);
          document.getElementById('PFOType2Showonlabel').innerHTML = data.length + Number(valPFOType2Showon);

          if (x >=countAllPFOType2input) {
        document.getElementById('loadmorePFOType2').style.display = "none";

          }

        }
      });

    }


  });
});


// ปุ่มโหลดเพิ่มเติม สำหรับรางวัล
$(document).ready(function() {
  $("#loadmorePFOType3").on('click', function() {

    var userid = $('#userid').val();
    var valPFOType3Showon = $('#PFOType3Showon').val();
    var countAllPFOType3input = $('#countAllPFOType3input').val();

    if (Number(valPFOType3Showon) >= Number(countAllPFOType3input)) {
    document.getElementById('loadmorePFOType3').style.display = "none";

    }else{
      $.ajax({
        type: 'GET',
        url: '/getotherpfotype3?valPFOType3Showon=' + valPFOType3Showon + '&userid=' + userid,
        dataType: 'json',
        success: function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i] != ' ' && data[i] != undefined && data[i] != null) {
              $("#tabPFOType3").append(
                '<a class="ui link card fluid" href="/profile/' + userid + '/' + data[i].pfoID + '">' +
                '<div class="content">' +
                '<div class="header">' + data[i].pfoTitile + '</div>' +
                '  <div class="meta">' +
                '<span class="category">' + data[i].pfoCatagoryID + ' | <i class="calendar alternate outline icon"></i>' + data[i].pfoYears + '</span>' +
                '</div>' +
                '<div class="description">' +

                '<div class="description">' +
                '<p>' + data[i].pfoIntro + '</p>' +

                '</div>' +

                '</div></div></a>');
            }
          }

          document.getElementById('PFOType3Showon').value = data.length + Number(valPFOType3Showon);
          var x= data.length + Number(valPFOType3Showon);
          document.getElementById('PFOType3Showonlabel').innerHTML = data.length + Number(valPFOType3Showon);

          if (x >=countAllPFOType3input) {
        document.getElementById('loadmorePFOType3').style.display = "none";

          }

        }
      });

    }


  });
});


// ปุ่มโหลดเพิ่มเติม สำหรับอื่น ๆ
$(document).ready(function() {
  $("#loadmorePFOType4").on('click', function() {

    var userid = $('#userid').val();
    var valPFOType4Showon = $('#PFOType4Showon').val();
    var countAllPFOType4input = $('#countAllPFOType4input').val();

    if (Number(valPFOType4Showon) >= Number(countAllPFOType4input)) {
    document.getElementById('loadmorePFOType4').style.display = "none";

    }else{
      $.ajax({
        type: 'GET',
        url: '/getotherpfotype4?valPFOType4Showon=' + valPFOType4Showon + '&userid=' + userid,
        dataType: 'json',
        success: function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i] != ' ' && data[i] != undefined && data[i] != null) {
              $("#tabPFOType4").append(
                '<a class="ui link card fluid" href="/profile/' + userid + '/' + data[i].pfoID + '">' +
                '<div class="content">' +
                '<div class="header">' + data[i].pfoTitile + '</div>' +
                '  <div class="meta">' +
                '<span class="category">' + data[i].pfoCatagoryID + ' | <i class="calendar alternate outline icon"></i>' + data[i].pfoYears + '</span>' +
                '</div>' +
                '<div class="description">' +

                '<div class="description">' +
                '<p>' + data[i].pfoIntro + '</p>' +

                '</div>' +

                '</div></div></a>');
            }
          }

          document.getElementById('PFOType4Showon').value = data.length + Number(valPFOType4Showon);
          var x= data.length + Number(valPFOType4Showon);
          document.getElementById('PFOType4Showonlabel').innerHTML = data.length + Number(valPFOType4Showon);

          if (x >=countAllPFOType4input) {
        document.getElementById('loadmorePFOType4').style.display = "none";

          }

        }
      });

    }


  });
});
