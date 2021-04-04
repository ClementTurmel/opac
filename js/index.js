setTimeout(function(){

  $( "#logo" ).fadeOut( 1000, function() {
  });
      setTimeout(function(){
      
          document.body.style.backgroundColor = "#fff";
          document.getElementById('presentation').style.display='none';
          document.getElementById('presentation').style.visibility='hidden';
          document.getElementById('menu').style.display='block';
          document.getElementById('menu').style.visibility='visible';        
      }, 900);
      
}, 1500);
