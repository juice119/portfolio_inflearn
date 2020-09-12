// lecture-bodySelect
let layer_registration = document.querySelector("#layer-registration");

$(".button_registration").on("click", e => {
  modal_on(layer_registration);
});

setLayer(0);
function setLayer(index) {
  let headers = document.querySelectorAll('#bodyInfo .header_nav div');
  console.log(headers);
  headers.forEach(header => {
    console.log(header.className);
    header.className =header.className.replace("on", "");
    console.log(header.className);
  });
  headers[index].className = headers[index].className + " on"; 
  console.log(headers[index].className);
  showLectureLayer(index);
}

function showLectureLayer(index) {
  let layers = document.querySelectorAll('.layer');
  for(let layer of layers) {
    layer.className = layer.className.replace("on", "");
  }
  layers[index].className = layers[index].className + " on";
}
document.querySelector(".button-lecture_question").addEventListener("click", e => {
  e.preventDefault();     
  e.stopPropagation();

  document.querySelector("#layer-question").style.display = "block";
});
function resistation(lecture_id) {
  let data = {lecture_id: lecture_id};
  let jsonData = JSON.stringify(data);
  let url = location.origin + "/resistation";
  $.ajax({
    url : url,
    type: "POST",
    data : jsonData,
    dataType: "json",
    contentType: 'application/json',
    success: function(data, textStatus, jqXHR)
    {
      alert(data.message);
      if(data.code == 200) {
        window.location = location.href;
      }
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
      console.log(jqXHR, textStatus, errorThrown);
      alert(jqXHR.responseJSON.message);
      // alert("시스템에 문제가 생겼습니다.");
    }
  });
}
$(".layer-question").each((index, layer) => {
  layer.addEventListener("submit", e => {
    e.preventDefault();
    console.log(e);
    let url = e.target.action;
    let formData = new FormData(e.target);
    for(let data of formData) {
      if(data[1].length == 0) {
        let emptyField = "";
        switch(data[0]) {
          case "tit":
            emptyField = "질문 제목";
          break;
          case "descript":
            emptyField = "질문 내용";
          break;
          case "lecture_id":
            alert("시스템에 문제가 발생하였습니다.");
            window.location = location.href;
          break;
        }
        alert(emptyField+ "을 입력하지 않으셨습니다.");
        return;
      }
    }
    let jsonData = formDataToJson(formData);
    $.ajax({
      url : url,
      type: "POST",
      data : jsonData,
      dataType: "json",
      contentType: 'application/json',
      success: function(data, textStatus, jqXHR)
      {
        alert(data.message);
        if(data.code == 200) {
          // window.location = location.origin;
        }
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        console.log(jqXHR, textStatus, errorThrown);
        alert("시스템에 문제가 생겼습니다.");
      }
    });
  });
});