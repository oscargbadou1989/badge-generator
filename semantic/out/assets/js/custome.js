$(document).ready(function(){
	var count = $(".photos .item").length;
	if(count > 5){
		for (var i = 6; i <= count; i++) {
			$(".photos .item:nth-child("+i+")").addClass('hidden');
		}
		$(".photos .item:nth-child(5)").prepend("<div class='img_opacity'></div");
		$(".photos .item:nth-child(5)").append('<a class="more_photo" href="#">Voir toutes les photos</a>');


	}
	
	if(count >= 2 ){
		for (var i = 1; i <= count; i++) {
			switch(i) {
			    case 1:
			        $(".photos .item:nth-child("+i+")").addClass('nine wide mobile only')
			        .prepend("<div class='img_opacity_mobile'></div")
			        .append('<a class="more_photo_mobile" href="#">Voir toutes les photos</a>');
			        break;
			    case 2:
			       $(".photos .item:nth-child("+i+")").addClass('seven wide');
			        break;
			    case 3:
			       $(".photos .item:nth-child("+i+")").addClass('six wide');
			        break;
			    case 4:
			       $(".photos .item:nth-child("+i+")").addClass('five wide');
			        break;
			    case 5:
			       $(".photos .item:nth-child("+i+")").addClass('five wide');
			        break;

			    default:
			        
			}	
		}
	}

	if(count<2){
		$(".photos .item:nth-child(1)").addClass('nine wide mobile only')
			        .prepend("<div class='img_opacity_mobile'></div")
			        .append('<a class="more_photo_mobile" href="#">Voir toutes les photos</a>');
	}
	

});

