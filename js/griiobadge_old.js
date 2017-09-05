var imgSize = 400;


$(document).ready(function() {
  var canvasSize = $('.cropit-preview').height()+4;
  imgSize = canvasSize;
  console.log('canvas size = '+canvasSize);

  localStorage.setItem('imgloaded', '0');
  $('#share-facebook').click(function(){
    console.log(dataURItoBlob('canvas'));
    //fbs_click();
  });

  /*$('#canvas').css("background-image", "url('img/my_badge.png')");
  $('#canvas').css("background-size", "cover");*/

  var canvas = new fabric.Canvas('canvas');

  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvasSize = $('.cropit-preview').height()+4;
    imgSize = canvasSize;
    canvas.setHeight(canvasSize);
    canvas.setWidth(canvasSize);
    var url = 'img/imgTpl.png';
    canvas.setOverlayImage(url, function() {
      console.log('overlayImage callback function');
      canvas.overlayImage.scaleX = canvasSize/400;
      canvas.overlayImage.scaleY = canvasSize/400;
      canvas.renderAll();
    });
  }

  // resize on init
  resizeCanvas();

  var url = 'img/imgTpl.png';
  canvas.setOverlayImage(url, function() {
    console.log('overlayImage callback function');
    canvas.overlayImage.scaleX = canvasSize/400;
    canvas.overlayImage.scaleY = canvasSize/400;
    canvas.renderAll();
  });

  $('#charger-photo').click(function () {
    $('#userpicture').trigger('click');
    if(localStorage.getItem('imgloaded') == '1'){
      canvas.clear().renderAll();
      var url = 'img/imgTpl.png';
      canvas.setOverlayImage(url, function() {
        console.log('overlayImage callback function');
        canvas.overlayImage.scaleX = canvasSize/400;
        canvas.overlayImage.scaleY = canvasSize/400;
        canvas.renderAll();
      });
    }
  });

  $("#telechargerimg").click(function () {
    localStorage.setItem('imgloaded', '0');
    downloadCanvasAsImage(this, 'canvas', 'preventionvih.png');
  });

  $('#valider-img').click(function(){
    //console.log(document.getElementById('canvas').toDataURL());
    $('#img-preview').attr('src', document.getElementById('canvas').toDataURL());
    $('#img-manager-container').fadeOut(500, function(){
      $('#img-download-container').fadeIn(500);
    })
  });

  $('#changer-photo').click(function(){
    $('#img-download-container').fadeOut(500, function(){
      $('#img-manager-container').fadeIn(500);
    })
  });




  $('#userpicture').change(function () {
    $('#my-range').val(0);
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        //console.log(e.target);
        localStorage.setItem('imgloaded', '1');
        var object = canvas.getActiveObject();
        if(object){
          canvas.remove(object);
          canvas.renderAll();
        }

        var userImg = new Image();
        userImg.src = e.target.result;
        userImg.onload = function(){
          var w = this.width;
          var h = this.height;
          console.log(this.width+"x"+this.height);

          if(w == 0 || h == 0){
            var r = confirm("Image non chargée. Veuillez recharger.");
            if (r == true) {
              $('#userpicture').trigger('click');
            } else {
              console.log('non');
            }
          }else{
            var proportion = w/h;
            if(proportion==1){
              userImg.width = imgSize;
              userImg.height = imgSize;
            }else if(proportion>1){
              userImg.width = (imgSize/h)*w;
              userImg.height = imgSize;

            }else{
              userImg.width = imgSize;
              userImg.height = (imgSize/w)*h;
            }
            console.log(userImg.width+"x"+userImg.height);
            var imgInstance = new fabric.Image(userImg, {
              left: -(userImg.width-imgSize)/2
            });
            imgInstance.hasBorders = false;
            imgInstance.hasControls = false;
            if(userImg.width<imgSize){
              imgInstance.scale(imgSize/userImg.width);
            }else if(userImg.height<imgSize){
              imgInstance.scale(imgSize/userImg.height);
            }

            canvas.add(imgInstance);
            canvas.setActiveObject(imgInstance);
            $('#my-range').on('change mousemove', function(){
              imgInstance.scale(1+2*($(this).val()/100));
              canvas.add(imgInstance);
            });
          }
        }
      }
      reader.readAsDataURL(this.files[0]);
    }

  });
});

function dataURItoBlob(canvasId) {
    var dataURI = document.getElementById(canvasId).toDataURL();
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/png'});
}

function fbs_click() {
  var img = document.getElementById('img-preview');
  u=img.getAttribute('src');
  // t=document.title;
  t=img.getAttribute('alt');
  window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
}

function downloadCanvasAsImage(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL();
  link.download = filename;
}

/*function dataURItoBlob(canvasId) {
  var dataURI = document.getElementById(canvasId).toDataURL();
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
  byteString = atob(dataURI.split(',')[1]);
  else
  byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type: mimeString});
}*/
