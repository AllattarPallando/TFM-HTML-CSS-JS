window.addEventListener("load", function() {

    /* ---------------- VARIABLES ---------------- */

    //Array de booleanas para las categorías
    var categories = [];
    //Array de nombres para las categorías
    var cNames = ["geography", "history", "art"];
    //Variable que indica la longitud del array de categorías
    var cLength = 3;
    //Array de enlaces
    var buttons = document.querySelectorAll("a");


    /* ---------------- PROGRAMA ---------------- */


    //Llenamos el array de categorías con los booleanos correspondientes
    for (var i = 0; i < cLength; i++) {
        categories.push(cNames[i] = new Boolean(false));
        console.log(categories[i]);
    }

    //Añadir evento click a los botones para saber que categoría quiere el usuario
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(event) {
            //En función al id del enlace pulsado indicamos al array de categorías que booleana es cierta en cada caso
            switch (buttons[i].id) {
                case 'g':
                    console.log("geografía");
                    categories[0] = true;
                    categories[1] = false;
                    categories[2] = false;
                    console.log("Categoria " + categories[0]);
                    break;
                case 'h':
                    console.log("historia");
                    categories[1] = true;
                    categories[2] = false;
                    categories[0] = false;
                    break;
                case 'a':
                    console.log("arte");
                    categories[2] = true;
                    categories[0] = false;
                    categories[1] = false;
                    break;
                default:
                    break;
            }

            //Dependiendo del juego escogido previamente, el link una vez se escoja la categoría será uno u otro
            console.log(localStorage.getItem('gameIndex'));
            if (localStorage.getItem('gameIndex') == 1) {
                buttons[i].href = "ahorcado.html";
                console.log("ahorcado");
                localStorage.setItem('gameIndex', '0');
            }
            if (localStorage.getItem('gameIndex') == 2) {
                buttons[i].href = "memory.html";
                console.log("memory");
                localStorage.setItem('gameIndex', '0');
            }
            if (localStorage.getItem('gameIndex') == 3) {
                buttons[i].href = "sinonimos.html";
                console.log("sinonimos");
                localStorage.setItem('gameIndex', '0');
            }

            /*En función a la categoría seleccionada la variable global tendrá un valor u 
            otro para decir al resto de scripts que palabras o imágenes usar*/
            if (categories[0] == true) {
                console.log("create geography");
                localStorage.setItem('categoryIndex', '0');
            } else if (categories[1] == true) {
                console.log("create history");
                localStorage.setItem('categoryIndex', '1');
            } else if (categories[2] == true) {
                console.log("create art");
                localStorage.setItem('categoryIndex', '2');
            }
        })
    }




})