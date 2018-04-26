$(document).ready(function(){
  function title() {
    var t = $("h1[class = main-titulo]");
    t.animate( {color : "White"}, 1500,'swing');
    t.animate( {color : "Yellow"}, 600,'swing', title);
  }

  function generador() {
    var r = Math.round(10*Math.random());
    while(r <= 0 || r > 4){
      r = Math.round(10*Math.random());
    }
    return r;
  }

  function dulces() {
    var divs = $("div[class *= col ]"), j = 0, cad="";
    for (j ; j < 7; j++) {
      for (var i = 0; i < divs.length; i++) {
        num = generador();
        cad = '<img src="image/'+ num.toString() +'.png" class= "imagenes">'
        $(divs[i]).prepend(cad);
        $(divs[i]).find("img").css("width","82%");
      }
    }
  }

  function ocultar() {
      var images = $(".imagenes");
      for (var i = 1; i < images.length - 1; i++) {
        if($(images[i]).attr("src") == $(images[i]).next().attr("src")){
          if($(images[i]).prev().attr("src") == $(images[i]).attr("src")){
            $(images[i]).prev().fadeOut(5000, 'swing');
            $(images[i]).next().fadeOut(5000, 'swing');
            $(images[i]).fadeOut(5000, 'swing' );
          }
        }
      }
      setTimeout(function() { ocultar(); }, 100);
    }

  function generarDulces() {
    var o = $("img[style*='display: none;']");
    if ($(o[0]).css("display") == "none") {

      for(var i = 0; i < o.length ; i++){
        var padre = $(o[i]).parent();
        num = generador();
        cad = "image/" + num.toString() +".png"
        $(o[i]).attr("src", cad);
        $(o[i]).css("display", "flex");
        $(padre).prepend($(o[i]));
      }

    }
    setTimeout(function() { generarDulces(); }, 100);
  }

  function ocultarH() {
    var h = $(".imagenes");
    for (var i = 7; i <= h.length-7; i++) {
      if( $(h[i]).attr("src") == $(h[i+7]).attr("src") ){
        if( $(h[i]).attr("src") == $(h[i-7]).attr("src") ){
          $(h[i-7]).fadeOut(5000, 'swing');
          $(h[i+7]).fadeOut(5000, 'swing');
          $(h[i]).fadeOut(5000, 'swing' );
        }
      }
    }
    setTimeout(function() { ocultarH(); }, 300);
  }

  function temporizador() {
      var cuenta, i = 59, j = 1; cont= 0;
      var t = $("#timer"), cuentaRegresiva = new Timer();
      cuentaRegresiva.every('1 seconds', function () {
        $(t).text(j + ":" + i);
        i--;
        if(i==0){
          j=0;
          i=60;
          cont++;
          if(cont==2){
            i="00";
          }

          }


        if(cuentaRegresiva.ticks() == 120){
          cuentaRegresiva.stop();
        }
      });


      cuentaRegresiva.start();

}

  function Drag() {
    var dulces = $(".imagenes");
    var dragDistance = 100;
    for (var i = 0; i < dulces.length; i++) {
      $(dulces[i]).draggable({
        drag: function (event, ui) {

        }
      });
    }
  }

  function drop() {
    var dulces = $(".imagenes");
    for (var i = 0; i < dulces.length; i++) {
      $(dulces[i]).droppable({
        accept : ".imagenes"
      });
    }
  }

  function iniciar() {
    var boton = $(".btn-reinicio");
    $(boton[0]).on('click', function () {
      if ($(boton).text()=="Reiniciar") {
        location.reload(true);
      }
      $(boton).text("Reiniciar");
      temporizador();
      ocultar();
      ocultarH();
      Drag();
      drop();
    });
  }

  title();
  dulces();
  generarDulces();
  iniciar();

  /*
  function ejemplo(){
    console.log("codigo magico");
     setTimeout(function() { ejemplo(); }, 100);
}

ejemplo();
*/
});