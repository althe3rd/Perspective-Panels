$( document ).ready(function() {
  // Handler for .ready() called.
  
  
  	/******   Apple TV Tilt Action  *******/
  	
  	var lastScrollTop = 0;
  	var lastScrollLeft = 0;
  	var scrollTimeout;
  	
  	$(window).scroll(function() {
	  	
	  		  	
	  	  var st = $(this).scrollTop();
	  	  var sl = $(this).scrollLeft();
	  	  
	  	  if (sl > lastScrollLeft){
		  	  $(".tiltWrapper").each(function() {
		  	
			  	  var rotateelem = $(this).find(".tiltPanel");
			  	  
			  	  
			  	  var maxdeg = $(this).attr("data-maxangle");
				  
				  if(!maxdeg) {
					//default to 10deg throw when no max angle is defined in attribute.
				  	var maxdeg = 10;
				  }
		       
			      
			      var rotation = "transform: rotateY(-"+maxdeg+"deg); transition: 0.7s transform; -webkit-transform: rotateY(-"+maxdeg+"deg); -webkit-transition: 0.7s transform;";
				   $(rotateelem).attr("style",rotation);
			   });
		  } else {
			  $(".tiltWrapper").each(function() {
		  	
			  	  var rotateelem = $(this).find(".tiltPanel");
			  	  
			  	  
			  	  var maxdeg = $(this).attr("data-maxangle");
				  
				  if(!maxdeg) {
					//default to 10deg throw when no max angle is defined in attribute.
				  	var maxdeg = 10;
				  }
		       
		       
			       
			       var rotation = "transform: rotateY("+maxdeg+"deg); transition: 0.7s transform; -webkit-transform: rotateY("+maxdeg+"deg); -webkit-transition: 0.7s transform;";
				   $(rotateelem).attr("style",rotation);
			   });
		  }
	  	  
		   if (st > lastScrollTop){
		       // downscroll code
		       
		       
		       $(".tiltWrapper").each(function() {
		  	
			  	  var rotateelem = $(this).find(".tiltPanel");
			  	  
			  	  
			  	  var maxdeg = $(this).attr("data-maxangle");
				  
				  if(!maxdeg) {
					//default to 10deg throw when no max angle is defined in attribute.
				  	var maxdeg = 10;
				  }
		       
		       
			       //console.log("scrolling down");
			       var rotation = "transform: rotateX("+maxdeg+"deg); transition: 0.7s transform; -webkit-transform: rotateX("+maxdeg+"deg); -webkit-transition: 0.7s transform;";
				   $(rotateelem).attr("style",rotation);
			   });
		   } else if(st < lastScrollTop) {
		      // upscroll code
		      clearTimeout(scrollTimeout);
		      
		      $(".tiltWrapper").each(function() {
		  	
			  	  var rotateelem = $(this).find(".tiltPanel");
			  	  
			  	  
			  	  var maxdeg = $(this).attr("data-maxangle");
				  
				  if(!maxdeg) {
					//default to 10deg throw when no max angle is defined in attribute.
				  	var maxdeg = 10;
				  }
		       
		       
			      
			       var rotation = "transform: rotateX(-"+maxdeg+"deg); transition: 0.7s transform; -webkit-transform: rotateX(-"+maxdeg+"deg); -webkit-transition: 0.7s transform;";
				   $(rotateelem).attr("style",rotation);
			   });
		      
		   } 
		   
		   lastScrollTop = st;

		  // $("body").css("background-color","red");
		  
		  clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
		        // do something
		        //console.log("Haven't scrolled in 100ms!");
		       // $("body").css("background-color","transparent");
		        $(".tiltWrapper").each(function() {
				   var rotateelem = $(this).find(".tiltPanel");
				   var rotation = "transform: rotateX(0deg) rotateY(0deg); transition: 0.8s transform; -webkit-transform: rotateX(0deg) rotateY(0deg); -webkit-transition: 0.8s transform;";
					$(rotateelem).attr("style",rotation);
				});
		    }, 100));
		  
  	});
  	
  	
  	
  
  	$( "a.tiltAction" ).mousedown(function(event) {
	  	var elem = $(this).closest(".tiltWrapper");
	  	$(elem).addClass("pressed");
  	});
  	
  	$( "a.tiltAction" ).mouseup(function(event) {
	  	var elem = $(this).closest(".tiltWrapper");
	  	$(elem).removeClass("pressed");
  	});
  	
  	$("a.tiltAction").mouseout(function(event) {
	  	var reflectionelem = $(this).next().find(".reflection");
	  	$(reflectionelem).css("opacity","0");	
  	});
  
  	$( "a.tiltAction" ).mousemove(function( event ) {
	  var rotateelem = $(this).next(".tiltPanel");
	  var reflectionelem = $(this).next().find(".reflection");
	  

	  
	  var maxdeg = $(this).closest(".tiltWrapper").attr("data-maxangle");
	  
	  if(!maxdeg) {
		 
		//default to 10deg throw when no max angle is defined in attribute.
	  	var maxdeg = 10;
	  }
	  
	  var elemoffset = $(this).offset();
	  var elemwidth = $(this).width();
	  var elemheight = $(this).height();
	 
	  var cursorX = event.pageX - elemoffset.left;
	  var cursorY = event.pageY - elemoffset.top;
	  
	  
	  if(cursorX < (elemwidth/2)) {
		  var perX = (cursorX / (elemwidth/2))-1;
		  var opacityX = 1-(cursorX / (elemwidth/2));
		  var degX = Math.floor(maxdeg * perX);
		  var refX = elemwidth - cursorX;
		  
	  } else {
		  var perX = 1-(cursorX / (elemwidth/2));
		  var opacityX = (cursorX / (elemwidth/2))-1;
		  var degX = Math.floor(-(maxdeg * perX));
		  var refX = elemwidth - cursorX;
	  }
	  
	  if(cursorY < (elemheight/2)) {
		  var perY = 1-(cursorY / (elemheight/2));
		  var degY = Math.floor(maxdeg * perY);
		  var refY = elemheight - cursorY;
	  } else {
		  var perY = (cursorY / (elemheight/2))-1;
		  var degY = Math.floor(-(maxdeg * perY));
		  var refY = elemheight - cursorY;
	  }
	  
	  
	  var rotation = "transform: rotateX("+degY+"deg) rotateY("+degX+"deg); -webkit-transform: rotateX("+degY+"deg) rotateY("+degX+"deg);";
	  $(rotateelem).attr("style",rotation);
	  
	  var reflection = "transform: translate("+refX+"px, "+refY+"px); -webkit-transform: translate("+refX+"px, "+refY+"px); opacity: "+opacityX+";";
	  $(reflectionelem).attr("style",reflection);
  
	});
	
	$( "a.tiltAction" ).mouseout(function() {
		var rotateelem = $(this).next(".tiltPanel");
		
		var rotation = "transform: rotateX(0deg) rotateY(0deg); transition: 1.0s transform; -webkit-transform: rotateX(0deg) rotateY(0deg); -webkit-transition: 1.0s transform;";
		$(rotateelem).attr("style",rotation);
	});
  
});