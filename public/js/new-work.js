$(document).ready(function() {
  $('#newWorksCat').change(function() {
    var newWorksCat = document.getElementById("newWorksCat");
    var valNewWorksCat = newWorksCat.options[newWorksCat.selectedIndex].value;

    if(valNewWorksCat!=null){
      if(valNewWorksCat=='1_pfoResearch'){
        document.getElementById("pfoResearchForm").style.display = "block";

        document.getElementById("pfoPaperForm").style.display = "none";
        document.getElementById("pfoDesignForm").style.display = "none";
        document.getElementById("pfoLecturerForm").style.display = "none";
      }
      if(valNewWorksCat=='2_pfoPaper'){
        document.getElementById("pfoPaperForm").style.display = "block";

        document.getElementById("pfoResearchForm").style.display = "none";
        document.getElementById("pfoDesignForm").style.display = "none";
        document.getElementById("pfoLecturerForm").style.display = "none";
      }
      if(valNewWorksCat=='3_pfoDesign'){
        document.getElementById("pfoDesignForm").style.display = "block";

        document.getElementById("pfoResearchForm").style.display = "none";
        document.getElementById("pfoPaperForm").style.display = "none";
        document.getElementById("pfoLecturerForm").style.display = "none";
      }
      if(valNewWorksCat=='4_pfoLecturer'){
        document.getElementById("pfoLecturerForm").style.display = "block";

        document.getElementById("pfoResearchForm").style.display = "none";
        document.getElementById("pfoPaperForm").style.display = "none";
        document.getElementById("pfoDesignForm").style.display = "none";
      }
    }else{}

  });
});
