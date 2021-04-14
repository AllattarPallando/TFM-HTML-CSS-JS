// Iniciar
window.addEventListener("load", function() {
    // ------------ VARIABLES ------------

    // PALABRAS SEGÚN EL TEMA ESCOGIDO
    var geographyWords = [
        ["Madrid", "Ciudad española", "Tiene una sola provincia", "Es conocida por su gran cocido"],
        ["Alemania", "País europeo", "Tiene frontera con Polonia", "Su capital tiene un muro muy conocido"],
        ["Argentina", "País de America del Sur", "El nombre de su capital son dos palabras", "Hay unas catarátas muy conocidas situadas allí"],
        ["Atenas", "Ciudad griega", "Participaron activamente en las guerras médicas", "El ejercito de esta ciudad participó en la batalla de Maratón"],
        ["Teide", "Volcán español", "Situado en una isla", "Es el pico más alto de España"],
        ["Vesubio", "Volcán italiano", "Es activo a día de hoy", "Hace mucho tiempo arrasó varias ciudades romanas en una erupción"],
        ["Himalaya", "Cordillera asiática", "Contiene un gran número de glaciares", "Es la cordillera más alta de la Tierra"],
        ["Andes", "Cordillera situada en America del Sur", "Es la más extensas del mundo", "Recorre casi toda la costa del océano"],
        ["Cantábrico", "Mar que baña las costas de la Península Ibérica", "Sus aguas son frías", "Lleva el nombre de una de las comunidades españolas que baña"],
        ["Báltico", "Mar que baña las costas europeas", "Es un mar interior", "Baña las costas de Lituania"],
        ["Nilo", "Río africano", "Conocido por su historia", "En sus orillas hay muchos templos y restos de la civilización egipcia"],
        ["Amazonas", "Río situado en el continente americano", "A sus orillas crece la selva", "Es el río más largo y caudaloso del mundo"]
    ];
    var historyWords = [
        ["Fuego", "Descubrimiento humano", "Peligroso", "Da calor"],
        ["Rueda", "Invento antiguo", "Tiene muchas utilidades", "A día de hoy es una pieza clave para el transporte"],
        ["Bombilla", "Invento del siglo XIX", "La primera patente es de Thomas Alva Edison", "Se utiliza para iluminar"],
        ["Imprenta", "Invento del siglo XV", "Los romanos y los chinos ya habían hecho reproducciones antes", "Dió la oportunidad de imprimir en papel"],
        ["Napoleón", "Personaje histórico europeo", "Revolución francesa", "Fue derrotado en la batalla de Waterloo"],
        ["Colón", "Personaje histórico español", "Siglo XVI", "Emprendió un viaje en busca de las Indias"],
        ["Malinche", "Personaje histórico femenino", "Originaria de América del Sur", "Su papel como interprete fue clave para Hernán Cortés"],
        ["Cleopatra", "Personaje histórico femenino", "Originaria de Alejandría", "Fue la última faraona de la dinastía ptolemaica"],
        ["Egipto", "Civilización de la Edad Antigua", "Su historia abarca más de tres milenios", "Se originó a orillas del río Nilo"],
        ["Sumeria", "Civilización de la Edad Antigua", "Oriente Medio", "Es considerada la primera civilización del mundo"],
        ["Roma", "Civilización de la Edad Antigua", "Se extendió por toda la costa del Mediterraneo", "El castellano proviene de su lengua"],
        ["Hunos", "Confederación de pueblos", "Provienen de Asia Central", "Los caballos son muy importantes para ellos"]
    ];
    var artWords = [
        ["Gioconda", "Retrato de una mujer", "Se expone en el Louvre", "Su pintor es Leonardo Da Vinci"],
        ["Meninas", "Pintura barroca", "Representa a la familia de un rey", "La obra maestra de Diego Velázquez"],
        ["David", "Escultura de marmol blanco", "Representa a un rey", "Actualmente está en la Galería de la Academia en Florencia"],
        ["Partenon", "Templo griego", "Consagrado a Atenea Pártenos", "Está situado en la Acrópolis de Atenas"],
        ["Guernica", "Cuadro español", "Alude a un bombardeo", "Su pintor es Pablo Picasso"],
        ["Stonehenge", "Monumento megalítico", "Finales del Neolítico y principios de la Edad de Bronce", "Situado en Inglaterra"],
        ["Pirámides", "Monumentos funerarios", "Vestigios de una gran cultura antigua", "El Valle de los Reyes alberga las más importantes"],
        ["Coliseo", "Arquitectura de la Antigua Roma", "Situado en Roma", "Anfiteatro Flavio"],
        ["Guggenheim", "Museo de arte contemporáneo", "Diseñado por un arquitecto canadiense", "Situado en Bilbao"],
        ["Prado", "Uno de los museos más importantes del mundo", "Situado en España", "Muchas obras de Velázquez, el Greco, Goya Tiziano, Rubens y el Bosco"],
        ["Alhambra", "Monumento español", "En su momento fue un palacio", "Situado en Andalucía, España"],
        ["Altamira", "Arte rupestre", "Cueva de la cornisa cantábrica", "Patrimonio Mundial de la UNESCO"]
    ];
    //Array que almacena las palabras adivinadas
    var guessedWords = [];
    //Array de categorías
    var category = [geographyWords, historyWords, artWords];
    // Palabra a averiguar
    var word = "";
    // Nº aleatorio
    var random;
    // Palabra seleccionada
    var selectedWord = [];
    // Elemento html de la palabra
    var wordHTML = document.getElementById("word");
    // Contador de intentos
    var count = 6;
    // Botones del alfabeto
    var buttons = document.getElementsByClassName('letter');
    // Boton de reset
    var startBtn = document.getElementById("reload");
    // Array de los listItems de las pistas
    var clueCards = document.getElementsByClassName("clue");
    // Array de los enlaces de las pistas
    var clueTexts = document.querySelectorAll("a");
    //Contador de los grados que girará la carta de pista al hacer click
    var flip = 0;
    //Botón de recarga
    var reload = document.getElementById("reload");
    //Variable que indicará si hay que recargar o no la página
    var re = 0;
    //Variable que indicará si se pone event listener a las letras con tilde o no
    var aELAccents = 0;

    // ------------ FUNCIONES ------------

    //Seleccionar array de palabras en función a la categoría seleccionada previamente
    function selectWords() {
        if (localStorage.getItem('index') == 0) {
            return geographyWords;
        } else if (localStorage.getItem('index') == 1) {
            return historyWords;
        } else if (localStorage.getItem('index') == 2) {
            return artWords;
        }
    }

    // Escoger palabra al azar
    function generateWord(words) {
        random = (Math.random() * 11).toFixed(0);
        word = words[random][0].toUpperCase();
        console.log(word);
    }

    // Funcion para pintar los guiones de la palabra
    function drawDashes(num) {
        selectedWord = [];
        for (var i = 0; i < num; i++) {
            selectedWord[i] = "_";
        }
        wordHTML.innerHTML = selectedWord.join("");
    }

    //Generar abecedario
    function generateABC(a, z) {
        document.getElementById("alphabet").innerHTML = "";
        var i = a.charCodeAt(0),
            j = z.charCodeAt(0); //Damos valores Unicode a los dos parametros             
        var letter = "";
        for (; i <= j; i++) {
            letter = String.fromCharCode(i).toUpperCase();
            document.getElementById("alphabet").innerHTML += `<button value='${letter}' class='letter' id='${letter}'>${letter}</button>`;
            if (i == 110) {
                document.getElementById("alphabet").innerHTML += `<button value='Ñ' class='letter' id='Ñ'>Ñ</button>`;
            }
        }
        if (!document.getElementById("Á")) {
            for (var k = 225; k < 251; k++) {
                if (k == 225) {
                    document.getElementById("b-accents").innerHTML += `<button value='Á' class='letter' id='Á'>Á</button>`;
                } else if (k == 233) {
                    document.getElementById("b-accents").innerHTML += `<button value='É' class='letter' id='É'>É</button>`;
                } else if (k == 237) {
                    document.getElementById("b-accents").innerHTML += `<button value='Í' class='letter' id='Í'>Í</button>`;
                } else if (k == 243) {
                    document.getElementById("b-accents").innerHTML += `<button value='Ó' class='letter' id='Ó'>Ó</button>`;
                } else if (k == 250) {
                    document.getElementById("b-accents").innerHTML += `<button value='Ú' class='letter' id='Ú'>Ú</button>`;
                }
            }
        }
    }

    //Añadir eventListener a las pistas y los botones del abecedario 
    function addEvList(words) {
        for (let i = 1; i < clueCards.length; i++) {
            clueCards[i].addEventListener("click", function(event) {
                //Al hacer click en una pista se dará la vuelta y se cambiará el texto al de la pista correspondiente 
                flip = 0;
                flip += 180;
                this.style.transform = `rotateY(${flip}deg)`;
                this.style.transitionDuration = "0.5s";
                clueTexts[i].style.transform = `rotateY(-${flip}deg)`;
                clueTexts[i].innerHTML = words[random][i + 1];
            });
        }

        for (let i = 0; i < buttons.length; i++) {
            //Al hacer click en una letra se dispara el evento de intento en el que se comprueba si la letra existe o no en la palabra
            if (i <= 26) {
                buttons[i].addEventListener("click", function() { tried(buttons[i].innerHTML) });
            } else {
                if (aELAccents == 0) {
                    buttons[i].addEventListener("click", function() { tried(buttons[i].innerHTML) });
                }
            }
        }
        aELAccents = 1;
    }

    // Chequear letra pulsada
    function tried(letter) {
        let b = document.getElementById(letter);
        b.disabled = true;
        var h3 = document.getElementById("press-message");

        if (word.indexOf(letter) != -1) { //Si existe la letra en la palabra a adivinar
            for (var i = 0; i < word.length; i++) {
                if (word[i] == letter) {
                    b.style.color = "rgba(0, 255, 0, 0.6)";
                    selectedWord[i] = letter;
                }
            }
            wordHTML.innerHTML = selectedWord.join("");
            h3.innerHTML = "Bien!";
            h3.className += "press-message green fade-in animation";
        } else { // Si no existe la letra en la palabra a adivinar
            b.style.color = "rgba(255, 0, 0, 0.6)";
            count--;
            document.getElementById("opportunities").innerHTML = count;
            h3.innerHTML = "Fallo!";
            h3.className += "press-message red fade-in animation";
            if (count != 0) {
                document.getElementById("image" + count).className = "fade-in";
            } else {
                for (var i = 0; i < 6; i++) {
                    if (i != 5) {
                        document.getElementById("image" + i).className = " fade-out";
                    }
                }
                document.getElementById("image" + count).className = "fade-in";
            }
        }
        checkEnd(selectWords());
        setTimeout(function() {
            document.getElementById("press-message").className = "";
        }, 800);
    }

    // Cambiar el texto de la pista 1 dependiendo de la palabra escogida 
    function changeTextClueOne(words) {
        clueTexts[0].innerHTML = words[random][1];
    }

    // Comprueba si ha finalizado
    function checkEnd(words) {
        if (selectedWord.indexOf("_") == -1) {
            document.getElementById("final-img").src = "";
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
            guessedWords.push(words.splice(random, 1));

        } else if (count == 0) {
            document.getElementById("final-img").src = "";
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
    }
    // Iniciar juego
    function start(words) {
        if (re == 1) { //Si se ha pulsado el botón de recarga del menú del juego
            count = 6;
            let cluesT = document.getElementsByClassName("clue-text");
            let cluesP = document.getElementsByClassName("clue");
            let accentLetters = [document.querySelector("#Á"), document.querySelector("#É"),
                document.querySelector("#Í"), document.querySelector("#Ó"), document.querySelector("#Ú")
            ];

            //Reiniciamos las letras con tilde
            for (let i = 0; i < accentLetters.length; i++) {
                accentLetters[i].disabled = false;
                accentLetters[i].style.color = "#00A676";
            }

            //Reiniciamos los paneles de pista
            for (let i = 1; i < cluesT.length; i++) {
                cluesT[i].innerHTML = `Pista ${i + 1}`;
                cluesP[i].style.transform = "rotateY(-0deg)";
                cluesT[i].style.transform = "rotateY(0deg)";
            }

            //Reiniciamos las imágenes de los fallos y las oportunidades
            for (var i = 0; i < 6; i++) {
                document.getElementById("image" + i).className = " fade-out";
            }
            document.getElementById("opportunities").innerHTML = count;


        } else { // Si se recargó la página desde el navegador se vuelven a incluir las palabras acertadas dentro del array original
            for (let i = 0; i < guessedWords.length; i++) {
                words.push(guessedWords[i]);
            }
        }
        generateWord(selectWords());
        drawDashes(word.length);
        generateABC("a", "z");
        addEvList(selectWords());
        changeTextClueOne(selectWords());
    }


    //--------------PROGRAMA--------------

    start(selectWords());
    reload.addEventListener("click", function(event) {
        event.preventDefault();
        re = 1;
        start(selectWords());
    })


})