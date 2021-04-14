window.addEventListener("load", function() {
    /* ---------------- VARIABLES ---------------- */

    //Enlaces del menú de navegación
    var gameLinks = document.querySelectorAll("a");
    //Array de booleanas para los juegos
    var games = [];
    //Variable que indica la longitud del array de juegos
    var gLength = 3;

    /* ---------------- PROGRAMA ---------------- */

    //Llenamos el array de juegos con los booleanos correspondientes
    for (var i = 0; i < gLength; i++) {
        games.push(new Boolean(false));
    }

    //Añadimos eventListener para saber en qué juego ha hecho click el usuario
    for (let i = 0; i < gameLinks.length; i++) {
        gameLinks[i].addEventListener("click", function(event) {
            //En función al id del enlace pulsado indicamos al array de juegos que booleana es cierta en cada caso
            switch (gameLinks[i].id) {
                case 'h':
                    console.log("ahorcado");
                    games[0] = true;
                    games[1] = false;
                    games[2] = false;
                    break;
                case 'm':
                    console.log("memory");
                    games[1] = true;
                    games[2] = false;
                    games[0] = false;
                    break;
                case 's':
                    console.log("sinonimos");
                    games[2] = true;
                    games[0] = false;
                    games[1] = false;
                    break;
                default:
                    break;
            }

            /*En función a la booleana que sea cierta del array de juegos 
            las variables del almacenamiento local serán verdaderas o no*/
            if (games[0]) {
                console.log("ahorcadoEscogido");
                localStorage.setItem('gameIndex', '1');
            } else if (games[1]) {
                console.log("memoryEscogido");
                localStorage.setItem('gameIndex', '2');
            } else if (games[2]) {
                console.log("sinonimosEscogido");
                localStorage.setItem('gameIndex', '3');
            }
            console.log(localStorage.getItem('gameIndex'));
        })
    }



})