var score = $("#score-text").text();
score = parseInt(score);
var j = 1, t = $("#timer");
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
    var op;
    for (var i = 7; i <= h.length-7; i++) {
      if( $(h[i]).attr("src") == $(h[i+7]).attr("src") ){
        if( $(h[i]).attr("src") == $(h[i-7]).attr("src") ){
          $(h[i-7]).fadeOut(5000, 'swing');
          $(h[i+7]).fadeOut(5000, 'swing');
          $(h[i]).fadeOut(5000, 'swing' );
          //sumar puntos al marcador
          op = $(h[i]).attr("src");
          switch (op) {
            case "image/1.png":
              score = score + 5;
              score = score.toString();
              $("#score-text").text(score);
              score = parseInt(score);
              break;
            case "image/2.png":
              score = score + 10;
              score = score.toString();
              $("#score-text").text(score);
              score = parseInt(score);
              break;
            case "image/3.png":
              score = score + 15;
              score = score.toString();
              $("#score-text").text(score);
              score = parseInt(score);
              break;
            case "image/4.png":
              score = score + 20;
              score = score.toString();
              $("#score-text").text(score);
              score = parseInt(score);
              break;
          }
        }
      }
    }
    setTimeout(function() { ocultarH(); }, 300);
  }

  function terminar() {
        var t = $("#timer").text();
        if(t == "00:00"){
          var mov = $(".moves"), pan = $(".panel-score"), tm = $(".time"), tb = $(".panel-tablero");
          $(tb[0]).animate(
            {
              width: "0%",
              height: "0%"
            }, 3000, 'linear', function () {
              $(tb[0]).detach();
            }
          );

          $(pan[0]).animate(
            {
              width: "100%"
            }, 3000, 'linear'
          );

          $(mov[0]).animate(
            {
              width: "100%"
            }, 3000, 'linear'
          );

          $(tm).animate(
            {
              width: "100%"
            }, 3000, 'linear'
          );

        }

  }

  function temporizadorF() {
    var cuentaFinal = new Timer();
    var k = 9;
    cuentaFinal.every('1 seconds', function () {
      $(t).text("0" + j + ":" + "0" + k);
      if (k == 0) {
        cuentaFinal.stop();
        terminar();
      }
      k--;

    });
    cuentaFinal.start();
  }

  function temporizadorT() {
    var cuentaTernaria = new Timer();
    var z = 59;
    j--;
    cuentaTernaria.every('1 seconds', function () {
      $(t).text("0" + j + ":" + z);
      if (z == 10) {
        cuentaTernaria.stop();
        temporizadorF();
      }
      z--;

    });
    cuentaTernaria.start();
  }

  function temporizadorS() {
    var cuentaSecundaria = new Timer();
    var k = 9;
    cuentaSecundaria.every('1 seconds', function () {
      $(t).text("0" + j + ":" + "0" + k);
      if (k == 0) {
        cuentaSecundaria.stop();
        temporizadorT();
      }
      k--;

    });
    cuentaSecundaria.start();
  }


  function temporizadorP() {
      var cuenta, i = 59, cont= 0;
      var cuentaRegresiva = new Timer();
      cuentaRegresiva.every('1 seconds', function () {
        $(t).text("0" + j + ":" + i);
        if(i==10){
          cuentaRegresiva.stop();
          temporizadorS();
        }
        i--;
      });



      cuentaRegresiva.start();

}

  function Drag() {
    var dulces = $(".imagenes");
    for (var i = 0; i < dulces.length; i++) {
      $(dulces[i]).draggable({
        axis: "x",
        containment: "parent",

      });

    }
  }

  function drop() {
    var columnas = $("div[class *= col]");
    for (var i = 0; i < columnas.length; i++) {
      $(columnas[i]).droppable({
        accept: ".imagenes"
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
      temporizadorP();
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
