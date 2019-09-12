/*ฟังก์ชันเก็บค่าเก่า-ค่าใหม่ไปแสดงตอนอัปเดท-รูปบบงานวิจัย*/
function openEditDiv(data) {
  var x = document.getElementById("id_RF_Edit_Div");
  var y = document.getElementById("id_RF_Add_Div");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  var x2 = document.getElementById("researchformTable").value = data;
  document.getElementById("id_RF_Edit_label_oldrFormName").innerHTML = x2;
  document.getElementById("id_RF_Edit_hideInput_oldrFormName").value = x2;
};

function myFunction2() {
  var x = document.getElementById("id_RF_Edit_Div");
  var y = document.getElementById("id_RF_Add_Div");
  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};

function myFunction2() {
  var x = document.getElementById("id_RF_Edit_Div");
  var y = document.getElementById("id_RF_Add_Div");

  if (x.style.display === "block") {
    y.style.display = "block";
    x.style.display = "none";
  }
};


/*ฟังก์ชัน ตรวจสอบค่า เพิ่มประเภทงานวิจัยใหม่*/
$(document).ready(function() {
  var availableTagsForNewResearchForm = [];


  /*Init แถบแจ้งเตือน และปุ่ม*/
  $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

  document.getElementById("id_RF_Add_Div_alertEmptryName").classList.add("hide");
  document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.add("hide");


  availableTagsForNewResearchForm = [];

  $.ajax({
    type: 'GET',
    url: '/research-form/reqAlltype/',
    dataType: 'json',
    success: function(r2) {
      for (var i = 0; i < r2.length; i++) {
        availableTagsForNewResearchForm.push(r2[i].researchformName);
      }
    }
  });

  /*Check Error*/
  $('#id_RF_Add_Input_rFormName').keyup(function() {

    var inputBoxRF = document.getElementById('id_RF_Add_Input_rFormName').value;
    var inputBoxRFlowcase = inputBoxRF.toLowerCase();
    var choicesRF = availableTagsForNewResearchForm;
    for (let i = 0; i < choicesRF.length; i++) {

      var resultOfsearchRF = choicesRF.includes(inputBoxRFlowcase);
      if (resultOfsearchRF == false) {
        var empt2yRF = false;
        $('.RFCLASSINPUTfield input').each(function() {
          if ($(this).val().length == 0) {
            empt2yRF = true;
          }
        });

        if ($.trim($('#id_RF_Add_Input_rFormName').val()) == '') {
          $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

          /*Emptyinput*/
          document.getElementById("id_RF_Add_Div_alertEmptryName").classList.remove("hide");
          document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.add("hide");


        } else {
          /*เคสผ่าน*/
          $('#id_RF_Add_Confirm_newrFormName').removeAttr('disabled');

          document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.add("hide");
          document.getElementById("id_RF_Add_Div_alertEmptryName").classList.add("hide");

        }

      } else {
        /*Duplicateinput*/
        $('#id_RF_Add_Confirm_newrFormName').attr('disabled', 'disabled');

        document.getElementById("id_RF_Add_Div_alertDuplicateName").classList.remove("hide");
        document.getElementById("id_RF_Add_Div_alertEmptryName").classList.add("hide");

      }
    }

  });
});



/*ฟังก์ชัน ตรวจสอบค่า แก้ไขประเภทงานวิจัยใหม่*/
$(document).ready(function() {
  var availableTagsForEditResearchForm = [];


  /*Init แถบแจ้งเตือน และปุ่ม*/
  $('#id_RF_Edit_Comfirm_ChangedRFName').attr('disabled', 'disabled');

  document.getElementById("id_RF_Add_Div_alertEmptryName").classList.add("hide");
  document.getElementById("id_RF_Add_DivEdit_alertEmptryName").classList.add("hide");


  availableTagsForEditResearchForm = [];

  $.ajax({
    type: 'GET',
    url: '/research-form/reqAlltype/',
    dataType: 'json',
    success: function(r2) {
      for (var i = 0; i < r2.length; i++) {
        availableTagsForEditResearchForm.push(r2[i].researchformName);
      }
    }
  });

  /*Check Error*/
  $('#id_RF_Edit_input_newrFormName').keyup(function() {

    var inputEditBoxRF = document.getElementById('id_RF_Edit_input_newrFormName').value;
    var inputEditBoxRFlowcase = inputEditBoxRF.toLowerCase();
    var choicesRF = availableTagsForEditResearchForm;
    for (let i = 0; i < choicesRF.length; i++) {

      var resultOfsearchEditRF = choicesRF.includes(inputEditBoxRFlowcase);
      if (resultOfsearchEditRF == false) {
        var empt2yeditRF = false;
        $('.RFCLASSINPUTfield input').each(function() {
          if ($(this).val().length == 0) {
            empt2yeditRF = true;
          }
        });

        if ($.trim($('#id_RF_Edit_input_newrFormName').val()) == '') {
          $('#id_RF_Edit_Comfirm_ChangedRFName').attr('disabled', 'disabled');

          /*Emptyinput*/
          document.getElementById("id_RF_Add_DivEdit_DuplicateName").classList.add("hide");
          document.getElementById("id_RF_Add_DivEdit_alertEmptryName").classList.remove("hide");


        } else {
          /*เคสผ่าน*/
          $('#id_RF_Edit_Comfirm_ChangedRFName').removeAttr('disabled');

          document.getElementById("id_RF_Add_DivEdit_alertEmptryName").classList.add("hide");
          document.getElementById("id_RF_Add_DivEdit_DuplicateName").classList.add("hide");

        }

      } else {
        /*Duplicateinput*/
        $('#id_RF_Edit_Comfirm_ChangedRFName').attr('disabled', 'disabled');

        document.getElementById("id_RF_Add_DivEdit_alertEmptryName").classList.add("hide");
        document.getElementById("id_RF_Add_DivEdit_DuplicateName").classList.remove("hide");

      }
    }

  });
});
