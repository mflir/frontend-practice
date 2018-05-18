//creo un array de objetos, cada objeto tiene un nombre de personaje y parte de la ruta de cada archivo

var piezas = [{
    'nave': 'uno',
    'img': 'img/a.jpg'
},{
    'nave': 'dos',
    'img': 'img/b.jpg'
},{
    'nave': 'amatista',
    'img': 'img/c.jpg'
},{
    'nave': 'cuatro',
    'img': 'img/d.jpg'
},{
    'nave': 'cinco',
    'img': 'img/e.jpg'
},{
    'nave': 'seis',
    'img': 'img/f.jpg'
}]

var match1 = ''; //ficha seleccionada 1
var match2 = '';// ficha seleccionada 2
var contSel = 0; // numero de fichas seleccionadas
var delay = 1200 // variable para que la imagen llegue a verse al darla vuelta (1.2 segundos)
var intentos = 0; // variable para contar la cantidad de intentos

//Duplicar el array dentro de una variable para tener dos piezas de cada uno y hacer random de ubicaciones
var tableroArmado = piezas.concat(piezas).sort(function(){
    return 0.5 - Math.random();
});

//traigo el div del juego, y le apendeo una seccion para el armado del tablero
var memotest = document.getElementById('memotest');
var tablero = document.createElement('section');
tablero.setAttribute('class', 'tablero');
memotest.appendChild(tablero);

// por cada objeto creo una pieza y las apendeo al tablero 
tableroArmado.forEach(function (e){
    var nave = e.nave,
        img = e.img;

    var pieza = document.createElement('div');
    pieza.classList.add('pieza');
    pieza.dataset.nave = nave;

    //a cada pieza le agrego las clases para dar vuelta
    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';

    tablero.appendChild(pieza);
    pieza.appendChild(front);
    pieza.appendChild(back);
    
});

//Que el jugador ponga su nombre y se cargue en el tablero
var nombre = prompt("Nombre del jugador");
var respuesta = document.getElementById('nombre');
respuesta.innerHTML = 'Nombre de jugador: ' + nombre 
 
// Funcion para modificar la clase a macheada y que desaparezca la imagen 
var match = function match() {
    var marcada = document.querySelectorAll('.marcada');
    marcada.forEach(function (pieza) {
      pieza.classList.add('match');
    });
  };

//Funcion para poder seguir seleccionando fichas y que no quede trabada despues de la primera seleccion
var resetMacheo = function resetMacheo(){
    match1 = '';
    match2 = '';
    contSel = 0;
    arregloHack = null;
    
    var marcada = document.querySelectorAll('.marcada');
    marcada.forEach(function (pieza) {
    pieza.classList.remove('marcada');
  }); // remueve la clase si no coinciden 
};

// Aplico un listener al tablero para que al seleccionar un elemento, se aplique la clase
tablero.addEventListener('click', function (event) {

    var clicked = event.target;
  
    // este if hace que se especifique que elemento se selecciona y que no seleccione el tablero en si. 
    if (clicked.nodeName === 'SECTION' || clicked.parentNode.classList.contains('marcada') || clicked.parentNode.classList.contains('match')) {
      return;
    }
  // si el contador es menor a dos se puede seleccionar, sino no.
    if (contSel != 2) {
      contSel++;
      if (contSel === 1) {
        match1 = clicked.parentNode.dataset.nave;  // primer macheo, le pongo la clase marcada
        //console.log(match1);
        clicked.parentNode.classList.add('marcada');
      } else {
        match2 = clicked.parentNode.dataset.nave; // se la aplico tambien a la segunda 
       // console.log(match2);
        clicked.parentNode.classList.add('marcada');
      }
  
      // Si ninguna opcion esta vacia, y son iguales
      if (match1 && match2) {
        if (match1 === match2) {
          setTimeout(match, delay);// llama a la funcion y le aplica un delay 
        }
        setTimeout(resetMacheo, delay); // llama a la funcion con un efecto delay
      }
      // contador de intentos cada dos fichas dadas vuelta
      
          if (contSel==2){
              intentos++
              console.log("cantidad de intentos " + intentos);
              var mostrarIntento = document.getElementById('intentos');
              mostrarIntento.innerHTML = 'Cantidad de intentos: ' + (24 - intentos);
          }
    }

    //Si se hacen todo los match, sale mensaje de ganaste
    if (match1===match2){
        var macheadas = document.getElementsByClassName('match');
        // console.log (macheadas);
        //console.log(macheadas.length)
        if (macheadas.length == 10) {
            setTimeout (function(){ alert("Felicidades!!! Ganaste!!!"); }, 2000);
            setTimeout (function() {location.reload(); }, 4000); //resetea el juego pra jugar de nuevo
        }
}
    // Si los intentos son mayores a 24, te avisa que perdiste y se resetea el tablero
    if (intentos > 23 && macheadas.length != 10){
        setTimeout (function(){ alert("Perdiste! Podes volver a intentar!"); }, 1000)
        setTimeout (function() {location.reload(); }, 1500); //resetea el juego pra jugar de nuevo
    }
});