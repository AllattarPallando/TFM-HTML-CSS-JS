window.addEventListener("load", function() {
    let tabs = document.querySelectorAll("nav a");
    let panels = document.querySelectorAll(".panel");
    let instructionsH = document.querySelectorAll(".instruction.hunged");
    let instructionsM = document.querySelectorAll(".instruction.memory");
    let buttons = document.querySelectorAll(".next-btn");

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", function(event) {
            event.preventDefault();
            console.log(i);

            //desactivo todas
            for (let j = 0; j < tabs.length; j++) {
                tabs[j].classList.remove("active");
                panels[j].classList.remove("active");
            }

            //activo la que se haya pulsado y reinicio las instrucciones
            for (let i = 0; i < instructionsH.length; i++) {
                instructionsH[i].classList.remove("active");
            }
            instructionsM[1].classList.remove("active");
            instructionsH[0].classList.add("active");
            instructionsM[0].classList.add("active");
            this.classList.add("active");
            panels[i].classList.add("active");
        })
    }

    for (let i = 0; i < buttons.length; i++) {
        console.log(i);

        buttons[i].addEventListener("click", function(event) {
            event.preventDefault();
            console.log("next");
            if (buttons[i].parentElement.classList.contains("hunged")) {
                //desactivo todas las instrucciones del ahorcado
                for (let j = 0; j < instructionsH.length; j++) {
                    instructionsH[j].classList.remove("active");
                }
                //activo siguiente instrucción del ahorcado
                instructionsH[i + 1].classList.add("active");
            } else if (buttons[i].parentElement.classList.contains("memory")) {
                console.log(i);
                //desactivo todas las instrucciones del memory
                instructionsM[0].classList.remove("active");
                //activo siguiente instrucción del memory
                instructionsM[1].classList.add("active");
            }
        });
    }

});