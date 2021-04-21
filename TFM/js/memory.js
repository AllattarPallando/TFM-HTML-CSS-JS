window.addEventListener("load", function() {
    'use strict'
    // Array de cartas según la categoría escogida y el dispositivo
    const geographyCardsPC = [
        ["Madrid", "Madrid", "Himalaya", "Himalaya", "Argentina", "Argentina",
            "Cantábrico", "Cantábrico", "Teide", "Teide", "Nilo", "Nilo"
        ],
        ["Alemania", "Alemania", "Atenas", "Atenas", "Vesubio", "Vesubio",
            "Báltico", "Báltico", "Andes", "Andes", "Amazonas", "Amazonas"
        ]
    ];
    const historyCardsPC = [
        ["Fuego", "Fuego", "Bombilla", "Bombilla", "Napoleón", "Napoleón",
            "Malinche", "Malinche", "Egipto", "Egipto", "Roma", "Roma"
        ],
        ["Rueda", "Rueda", "Imprenta", "Imprenta", "Colón", "Colón",
            "Cleopatra", "Cleopatra", "Sumeria", "Sumeria", "Hunos", "Hunos"
        ]
    ];
    const artCardsPC = [
        ["Gioconda", "Gioconda", "David", "David", "Partenon", "Partenon",
            "Prado", "Prado", "Altamira", "Altamira", "Alhambra", "Alhambra"
        ],
        ["Meninas", "Meninas", "Guernica", "Guernica", "Stonehenge", "Stonehenge",
            "Pirámides", "Pirámides", "Coliseo", "Coliseo", "Guggenheim", "Guggenheim"
        ]
    ];

    const geographyCardsMobile = [
        ["Madrid", "Madrid", "Himalaya", "Himalaya", "Argentina", "Argentina", "Cantábrico", "Cantábrico"],
        ["Teide", "Teide", "Nilo", "Nilo", "Alemania", "Alemania", "Atenas", "Atenas", ],
        ["Vesubio", "Vesubio", "Báltico", "Báltico", "Andes", "Andes", "Amazonas", "Amazonas"]
    ];
    const historyCardsMobile = [
        ["Fuego", "Fuego", "Bombilla", "Bombilla", "Napoleón", "Napoleón", "Malinche", "Malinche"],
        ["Egipto", "Egipto", "Roma", "Roma", "Rueda", "Rueda", "Imprenta", "Imprenta"],
        ["Colón", "Colón", "Cleopatra", "Cleopatra", "Sumeria", "Sumeria", "Hunos", "Hunos"]
    ];
    const artCardsMobile = [
        ["Gioconda", "Gioconda", "David", "David", "Partenon", "Partenon", "Prado", "Prado"],
        ["Altamira", "Altamira", "Alhambra", "Alhambra", "Meninas", "Meninas", "Guernica", "Guernica"],
        ["Stonehenge", "Stonehenge", "Pirámides", "Pirámides", "Coliseo", "Coliseo", "Guggenheim", "Guggenheim"]
    ];

    // Array que guarda el <div> que contiene las cartas
    const cards = document.querySelector(".cards");
    // Array que almacena las cartas volteadas para poder compararlas
    let fliped = [];
    // Array que almacena las parejas encontradas
    let matched = [];

    // Constante que almacena el <button> de reset
    const resetButton = document.querySelector("button");

    // Constante que almacena el <span> que contiene el texto del conteo de movimientos  
    const movesCounter = document.querySelector(".sm-count");
    // Variable que almacena el conteo de movimientos
    let moves = 0;

    // Contante que almacena todos los <li> del <ul> que determina la puntuación
    const stars = document.getElementById("rating").querySelectorAll(".star");
    // Variable que almacena el número de estrellas 
    let starsCount = 0;

    // Constante que almacena el <span> que contiene el texto de conteo del tiempo
    const timerCount = document.querySelector(".timer-start");
    // Variable que almacena el tiempo transcurrido desde que comience el juego
    let time;
    // Variables que almacenarán los minutos y segundos transcurridos
    let minutes = 0;
    let seconds = 0;
    let totalSeconds = 0;
    // Variables booleana que determinará si se empezó o no a jugar en función a si se hace click en una carta
    let timeStart = false;

    //Variable que almacenará el botón de pantalla completa
    const fullScreenBtn = document.querySelector(".full-screen-button");
    //Variable que determinará si se pone o se quita la pantalla completa
    let isFullScreen = false;

    // Constante que almacena la modal que aparece cuando se acaba el juego
    const winPanel = document.getElementById("modal");
    // Constante que almacena el botón de jugar otra vez del winPanel
    const againButton = document.querySelector(".reset-btn-wp");
    // Constante que almacena el botón de volver a la home del winPanel
    const homeButton = document.querySelector(".home-btn");

    // Variable que indicará el dispositivo en el que se visualiza la web
    let device = "PC";

    //Función que indica el dispositivo en elq ue se está visualizndo la web
    function whatDevice() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            device = "Mobile";
        }
    }

    //Seleccionar array de cartas en función a la categoría seleccionada previamente
    function selectWords() {
        if (localStorage.getItem('categoryIndex') == 0) {
            if (device === "PC" || device === "Tablet") {
                return geographyCardsPC[Math.floor(Math.random() * 2)];
            } else if (device === "Mobile") {
                return geographyCardsMobile[Math.floor(Math.random() * 3)];
            }
        } else if (localStorage.getItem('categoryIndex') == 1) {
            if (device === "PC" || device === "Tablet") {
                return historyCardsPC[Math.floor(Math.random() * 2)];
            } else if (device === "Mobile") {
                return historyCardsMobile[Math.floor(Math.random() * 3)];
            }
        } else if (localStorage.getItem('categoryIndex') == 2) {
            if (device === "PC" || device === "Tablet") {
                return artCardsPC[Math.floor(Math.random() * 2)];
            } else if (device === "Mobile") {
                return artCardsMobile[Math.floor(Math.random() * 3)];
            }
        }
    }


    //Función para aleatorizar el array de cartas según el algoritmo de Fisher-Yates de https://borrame.com/recortes/javascript/fisher-yates.html
    function randomizeCards(array) {
        let currentI = array.length;
        let randomI, tmpI;
        //Mientras currentI sea true, es decir mientras no sea 0
        while (currentI--) {
            //Generamos un índice aleatorio entre 0 y la longitud del array
            randomI = Math.floor(Math.random() * (currentI + 1));
            //Almacenamos en tmpI el valor de la posición de currentI dentro del array introducido
            tmpI = array[currentI];
            //Cambiamos el valor del array en la posición de currentI por el de la posición de randomI
            array[currentI] = array[randomI];
            //Cambiamos el valor del array en la posición de randomI por el valor que almacenamos previamente en tmpI
            array[randomI] = tmpI;
        }
        return array;
    }

    //Función que crea las cartas en el HTML
    function createCards(deck) {
        // Almacenamos las cartas barajadas
        const randomCards = randomizeCards(deck);
        console.log(randomCards);
        // Creamos una carta por cada elemento de la baraja
        for (let i = 0; i < randomCards.length; i++) {
            // Creamos el enlace de la carta
            const divCard = document.createElement('a');
            divCard.href = "#";
            // Le creamos una clase al enlace de la carta
            divCard.classList.add('card');
            // Creamos el div de la información de la carta
            const divCardInfo = document.createElement('div');
            // Le creamos una clase al div de la información de la carta
            divCardInfo.classList.add('card-info');
            // Creamos la imagen de la carta
            const cardImage = document.createElement("img");
            //Creamos una clase a la imagen de la carta
            cardImage.classList.add('img');
            //Le asignamos el src correspondiente según la baraja aleatoria
            cardImage.src = `../TFM//img/${randomCards[i]}.png`;
            //Creamos el texto de la carta
            const cardText = document.createElement("h3");
            //Creamos una clase al texto de la carta
            cardText.classList.add('text');
            //El contenido del texto irá en función a la baraja aleatoria
            cardText.innerHTML = randomCards[i];
            // Emparentamos la imagen y el texto con el div de la imformación de la carta
            divCardInfo.appendChild(cardImage);
            divCardInfo.appendChild(cardText);
            //Emparentamos el div de la información de la carta con el enlace de la carta
            divCard.appendChild(divCardInfo);
            //Emparentar el enlace de la carta con el div que las contiene todas
            cards.appendChild(divCard);
            //Dependiendo de la categoría seleccionada el dorso de las cartas y el texto tendrán un fondo u otro
            if (localStorage.getItem('categoryIndex') == 0) {
                divCardInfo.style.backgroundImage = `url("./img/Fondo_Cartas_Geografia.png")`;
                cardText.style.backgroundColor = "#00A676";
                fullScreenBtn.style.backgroundColor = "00A676";
            } else if (localStorage.getItem('categoryIndex') == 1) {
                divCardInfo.style.backgroundImage = `url("./img/Fondo_Cartas_Historia.png")`;
            } else if (localStorage.getItem('categoryIndex') == 2) {
                divCardInfo.style.backgroundImage = `url("./img/Fondo_Cartas_Arte.png")`;
                cardText.style.backgroundColor = "#801A86";
            }
        }
    }

    //Borrar todas las cartas del mazo
    function resetCardsPanel() {
        // Se borrará el primer hijo del contenedor hasta que se quede vacío
        while (cards.hasChildNodes()) {
            cards.removeChild(cards.firstChild);
        }
    }

    //Función que pintará de un color u otro la interfaz en función a la categoría escogida
    function colour(index) {
        if (index == 0) {
            cards.classList.add("geography-background-2");
            movesCounter.classList.add("geography-color");
            timerCount.classList.add("geography-color");
            for (let i = 0; i < stars.length; i++) {
                stars[i].firstChild.classList.add("geography-color");
            }
            fullScreenBtn.classList.add("geography-background");
            resetButton.firstChild.classList.add("geography-color");
            winPanel.classList.add("geography-border");
        } else if (index == 2) {
            cards.classList.add("art-background-2");
            movesCounter.classList.add("art-color");
            timerCount.classList.add("art-color");
            for (let i = 0; i < stars.length; i++) {
                stars[i].firstChild.classList.add("art-color");
            }
            fullScreenBtn.classList.add("art-background");
            resetButton.firstChild.classList.add("art-color");
            winPanel.classList.add("art-border");
        }
    }

    //Función que contabiliza los movimientos
    function movesCount() {
        // Aumentar los movimientos por cada pareja de cartas pulsada
        moves++;
        // Actualizar el innerHTML
        movesCounter.innerHTML = moves;
        console.log(moves);
    }

    //Función que actualiza el cronometro en el HTML, será  invocada cuando el usuario haga el primer click en una carta
    function timeCount() {
        // setInterval hace que se repita una vez por cada intervalo de tiempo transcurrido
        time = setInterval(function() {
            totalSeconds++;
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            // Actualizar el HTML del contador de tiempo
            if (minutes < 10) {
                if (seconds < 10) {
                    timerCount.innerHTML = `0${minutes}:0${seconds}`;
                } else {
                    timerCount.innerHTML = `0${minutes}:${seconds}`;
                }
            } else {
                if (seconds < 10) {
                    timerCount.innerHTML = `${minutes}:0${seconds}`;
                } else {
                    timerCount.innerHTML = `${minutes}:${seconds}`;
                }
            }
        }, 1000); //Se repetirá una vez por segundo
    }

    //Función que para el cronometro será invocada una vez se acierten los 6 pares de cartas
    function stopTimeCount() {
        clearInterval(time);
    }


    /*Función que lleva el conteo de las estrellas conseguidas, 
    por cada determinado número de aciertos se consigue media estrella hasta conseguirlas todas*/
    function starsCounter() {
        //Si se acertó la primera pareja en menos de 5 movimientos
        if (matched.length === 2 && moves < 10) {
            console.log("Pintamos la primera media estrella");
            stars[0].firstChild.classList.remove("far");
            stars[0].firstChild.classList.remove("fa-star");
            //Consigues media estrella
            stars[0].firstChild.classList.add("fas");
            stars[0].firstChild.classList.add("fa-star-half-alt");
            starsCount += 0.5;
        }
        //Si se acertó la segunda pareja en menos de 7 movimientos
        else if ((matched.length === 4) && (moves < 15)) {
            stars[0].firstChild.classList.remove("fa-star-half-alt");
            //Consigues una estrella
            stars[0].firstChild.classList.add("fa-star");
            starsCount += 0.5;
        }
        //Si se acertó la tercera pareja en menos de 9 movimientos
        else if ((matched.length === 6) && (moves < 20)) {
            stars[1].firstChild.classList.remove("far");
            stars[1].firstChild.classList.remove("fa-star");
            //Consigues una estrella y media
            stars[1].firstChild.classList.add("fas");
            stars[1].firstChild.classList.add("fa-star-half-alt");
            starsCount += 0.5;
        }
        //Si se acertó la cuarta pareja en menos de 11 movimientos
        else if ((matched.length === 8) && (moves < 21)) {
            stars[1].firstChild.classList.remove("fa-star-half-alt");
            //Consigues dos estrellas
            stars[1].firstChild.classList.add("fa-star");
            starsCount += 0.5;
        }
        //Si se acertó la quinta pareja en menos de 13 movimientos
        else if ((matched.length === 10) && (moves < 23)) {
            stars[2].firstChild.classList.remove("far");
            stars[2].firstChild.classList.remove("fa-star");
            //Consigues dos estrellas y media
            stars[2].firstChild.classList.add("fas");
            stars[2].firstChild.classList.add("fa-star-half-alt");
            starsCount += 0.5;
        }
        //Si se acertó la última pareja en menos de 15 movimientos
        else if ((matched.length === 12) && (moves < 25)) {
            stars[2].firstChild.classList.remove("fa-star-half-alt");
            //Consigues todas las estrellas
            stars[2].firstChild.classList.add("fa-star");
            starsCount += 0.5;
        }
    }

    //Función que compara dos cartas para comprobar si se acertó o no
    function contrastCards() {
        // Cuando hay dos cartas dadas la vuelta
        if (fliped.length === 2) {
            // Desabilitamos el resto de cartas para que no se puedan pulsar
            document.body.style.pointerEvents = "none";
        }
        // Comparamos el src de las imágenes
        if (fliped.length === 2 && fliped[0].firstChild.src === fliped[1].firstChild.src) {
            // Si se acierta se invoca la función de acierto
            right();
            console.log("Has acertado!");
        } else if (fliped.length === 2 && fliped[0].firstChild.src != fliped[1].firstChild.src) {
            // Si no se acierta se invoca la función de fallo
            wrong();
            console.log("No has acertado!");
        }
    }

    //Función que se invocará en caso de que se acierte la pareja de cartas seleccionada
    function right() {
        // Esperamos unos milisegundos y le asignamos la clase correcto a los elementos HTML correspondientes
        setTimeout(function() {
            fliped[0].parentNode.classList.add("right");
            fliped[1].parentNode.classList.add("right");
            fliped[0].lastChild.classList.add("right");
            fliped[1].lastChild.classList.add("right");
            // Introducimos las cartas acertadas dentro del array de aciertos
            matched.push(...fliped);
            console.log(matched);
            // Volvemos a habilitar el resto de cartas
            document.body.style.pointerEvents = "auto";
            // Vaciamos el array de cartas volteadas
            fliped = [];
            movesCount();
            starsCounter();
            // Comprobamos si el usuario ha acertado los 6 pares de cartas
            winGame();
        }, 600);
    }

    //Función que se invocará en caso de que se falle la pareja de cartas seleccionada
    function wrong() {
        // Esperamos unos milisegundos
        setTimeout(function() {
            // Quitamos la clase flip de las img, textos y enlaces correspondientes
            fliped[0].firstChild.classList.remove("flip");
            fliped[1].firstChild.classList.remove("flip");
            fliped[0].lastChild.classList.remove("flip");
            fliped[1].lastChild.classList.remove("flip");
            fliped[0].parentNode.classList.remove("flip");
            fliped[1].parentNode.classList.remove("flip");
            // Volvemos a habilitar el resto de cartas
            document.body.style.pointerEvents = "auto";
            // Vaciamos el array de cartas volteadas
            fliped = [];
            // Incrementamos los contadores de movimientos
            movesCount();
        }, 700);

    }

    //Función que comprueba si se han acertado todas las parejas
    function winGame() {
        if (matched.length === 12) {
            stopTimeCount();
            updateWinData();
            winPanel.style.display = "block";
        }
    }

    //Función que añade los eventListener a los enlaces de las cartas
    function addEvLiCards() {
        let aCards = document.querySelectorAll(".card");
        for (let i = 0; i < aCards.length; i++) {
            aCards[i].addEventListener("click", function(event) {
                event.preventDefault();
                //Iniciamos el cronómetro al hacer click la primera vez en una carta
                if (timeStart === false) {
                    timeStart = true;
                    timeCount();
                }
                //Invocamos la función para voltear la carta
                flipCard();

                //Volteamos la carta y visualizamos la imagen y el texto
                function flipCard() {
                    let img = event.target.firstChild;
                    let text = event.target.lastChild;
                    // Le añadimos la clase flip a la imagen y al texto para hacerlos visibles y a la carta para hacer la rotación
                    aCards[i].classList.add("flip");
                    img.classList.add("flip");
                    text.classList.add("flip");
                    //Invocamos a la función que añade la carta a la lista de cartas volteadas
                    addToFliped();
                }

                //Función que añade las cartas volteadas al array correspondiente y las compara
                function addToFliped() {
                    //Si el array de cartas volteadas está vacio o contiene un elemento
                    if (fliped.length === 0 || fliped.length === 1) {
                        // Introducimos la carta en el array
                        fliped.push(event.target);
                    }
                    // Invocamos la función que compara las dos cartas si el array de cartas volteadas contiene dos elementos
                    if (fliped.length === 2) {
                        contrastCards();
                    }
                }

            })
        }
    }

    //Función que se invocará cuando se pulse el botón de pantalla completa
    function fullscreen(button) {
        if (!isFullScreen) {
            isFullScreen = true;
            if (button.requestFullscreen) {
                button.requestFullscreen();
            } else if (button.mozRequestFullScreen) {
                button.mozRequestFullScreen();
            } else if (button.webkitRequestFullscreen) {
                button.webkitRequestFullscreen();
            } else if (button.msRequestFullscreen) {
                button.msRequestFullscreen();
            }
        } else {
            isFullScreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

    }

    //Función que resetea el juego
    function resetGame() {
        // Parar el tiempo, y resetear los valores de las variables a 0 y actualizar su correspondiente HTML
        stopTimeCount();
        timeStart = false;
        seconds = 0;
        minutes = 0;
        timerCount.innerHTML = "00:00";
        // Las estrellas
        for (let i = 0; i < stars.length; i++) {
            if (stars[i].firstChild.classList.contains("fas") && stars[i].firstChild.classList.contains("fa-star")) {
                stars[i].firstChild.classList.remove("fas");
                stars[i].firstChild.classList.remove("fa-star");
                stars[i].firstChild.classList.add("far");
                stars[i].firstChild.classList.add("fa-star");
            } else if (stars[i].firstChild.classList.contains("fas") && stars[i].firstChild.classList.contains("fa-star-half-alt")) {
                stars[i].firstChild.classList.remove("fas");
                stars[i].firstChild.classList.remove("fa-star-half-alt");
                stars[i].firstChild.classList.add("far");
                stars[i].firstChild.classList.add("fa-star");
            }

        }
        starsCount = 0;
        // Los movimientos y si correspondiente HTML
        moves = 0;
        movesCounter.innerHTML = 0;
        // Vaciar los arrays que contienen las cartas acertadas y comparadas
        matched = [];
        fliped = [];
        // Vaciar el mazo
        resetCardsPanel();
        // Empezar el juego de nuevo
        colour(localStorage.getItem("categoryIndex"));
        createCards(selectWords());
        addEvLiCards();
    }

    function updateWinData() {
        // Constante que almacena los párrafos de los datos 
        const data = document.querySelectorAll(".data");
        // Constante que almacena las estrellas de la modal
        const wpStars = document.querySelectorAll(".win-panel i");

        // Cambiamos los valores de los spans del tiempo y los movimientos en función a los datos conseguidos al acabar el juego
        if (minutes < 10) {
            if (seconds < 10) {
                data[0].innerHTML = `0${minutes}:0${seconds}`;
            } else {
                data[0].innerHTML = `0${minutes}:${seconds}`;
            }
        } else {
            if (seconds < 10) {
                data[0].innerHTML = `${minutes}:0${seconds}`;
            } else {
                data[0].innerHTML = `${minutes}:${seconds}`;
            }
        }
        console.log(moves);
        data[1].innerHTML = moves;

        //Cambiamos los iconos de las estrellas en función a la puntuación obtenida
        switch (starsCount) {
            case 0:
                for (let i = 0; i < wpStars.length; i++) {
                    wpStars[i].classList.add("far");
                    wpStars[i].classList.add("fa-star");
                }
                break;
            case 0.5:
                wpStars[0].classList.add("fas");
                wpStars[0].classList.add("fa-star-half-alt");
                for (let i = 1; i < wpStars.length; i++) {
                    wpStars[i].classList.add("far");
                    wpStars[i].classList.add("fa-star");
                }
                break;
            case 1:
                wpStars[0].classList.add("fas");
                wpStars[0].classList.add("fa-star");
                for (let i = 1; i < wpStars.length; i++) {
                    wpStars[i].classList.add("far");
                    wpStars[i].classList.add("fa-star");
                }
                break;
            case 1.5:
                wpStars[0].classList.add("fas");
                wpStars[0].classList.add("fa-star");
                wpStars[1].classList.add("fas");
                wpStars[1].classList.add("fa-star-half-alt");
                wpStars[2].classList.add("far");
                wpStars[2].classList.add("fa-star");
                break;
            case 2:
                for (let i = 0; i < wpStars.length - 1; i++) {
                    wpStars[i].classList.add("fas");
                    wpStars[i].classList.add("fa-star");
                }
                wpStars[2].classList.add("far");
                wpStars[2].classList.add("fa-star");
                break;
            case 2.5:
                for (let i = 0; i < wpStars.length - 1; i++) {
                    wpStars[i].classList.add("fas");
                    wpStars[i].classList.add("fa-star");
                }
                wpStars[2].classList.add("fas");
                wpStars[2].classList.add("fa-star-half-alt");
                break;
            case 3:
                for (let i = 0; i < wpStars.length; i++) {
                    wpStars[i].classList.add("fas");
                    wpStars[i].classList.add("fa-star");
                }
                break;
            default:
                console.log("Error en 467");
                break;
        }

        //Cambiamos el color de los textos en función a la categoría
        if (localStorage.getItem("categoryIndex") == 0) {
            for (let i = 0; i < data.length; i++) {
                data[i].classList.add("geography-color");
            }
            for (let i = 0; i < wpStars.length; i++) {
                wpStars[i].classList.add("geography-color");
            }
            againButton.classList.add("geography-background");
            homeButton.classList.add("geography-background");
        } else if (localStorage.getItem("categoryIndex") == 2) {
            for (let i = 0; i < data.length; i++) {
                data[i].classList.add("art-color");
            }
            for (let i = 0; i < wpStars.length; i++) {
                wpStars[i].classList.add("art-color");
            }
            againButton.classList.add("art-background");
            homeButton.classList.add("art-background");
        }
    }


    // *********** PROGRAMA ****************

    colour(localStorage.getItem("categoryIndex"));
    createCards(selectWords());
    addEvLiCards();
    fullScreenBtn.addEventListener("click", function() { fullscreen(document.querySelector("body")) });

    resetButton.addEventListener('click', function(event) {
        event.preventDefault();
        resetGame();
    });

    againButton.addEventListener('click', function(event) {
        winPanel.style.display = "none";
        resetGame();
        history.pushState(null, "", "category-selection.html");
        location.reload();
        localStorage.setItem("gameIndex", "2");
    });

    homeButton.addEventListener('click', function(event) {
        winPanel.style.display = "none";
        resetGame();
        history.pushState(null, "", "index.html");
        location.reload();
    });


})