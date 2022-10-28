//let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/
let arrayAnimali = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

var iconsFind = document.getElementsByClassName("find");
var modal = document.getElementById("modal");
var time = document.querySelector(".timer");

var interval;
var check = [];
var seconds = 0;
var minutes = 0;
var combinations = 0;

var title = document.createElement("h1");
title.innerHTML = "Memory Game";
document.body.insertBefore(title, document.body.children[0]);

function timer() {
    seconds = 0;
    minutes = 0;    
    clearInterval(interval);
    interval = setInterval(function count(){
        time.innerHTML = `Tempo: ${minutes} min ${seconds} sec`;    
        seconds++;
        if (seconds == 60) {
        minutes++;
        seconds = 0;
        }
    }, 1000);        
}

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function startGame() { 
    clearInterval(interval);
    combinations = 0;
    arrayComparison = [];                        
    var arrayShuffle = shuffle(arrayAnimali);
    var grid = document.getElementById("griglia");   
    grid.innerHTML = "";
    for (i = 0; i < arrayShuffle.length; i++) {
        let card = document.createElement("div");
        let picture = document.createElement("div");
        picture.className = "icon";
        picture.onclick = displayIcon;
        grid.appendChild(card).appendChild(picture);
        //picture.innerHTML = arrayShuffle[i];
        picture.innerHTML = `<img src="assets/img/${arrayShuffle[i]}.png" style="width:90%; padding:5%">`;    
        // grid.innerHTML += `<div><div class="icon" onclick=displayIcon()>${arrayShuffle[i]}</div></div>`;        
    }    
    timer();
}

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
    this.classList.toggle("show");
    this.parentElement.style.background = "transparent";                           /*graphic fix*/
    this.parentElement.style.border = "transparent";                                    /*graphic fix*/
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    
    arrayComparison.push(this);

    if (check.length != 2) {                                                  /* fix su 2 volte medesima carta */
        check[0] = this.offsetLeft;
        check[1] = this.offsetTop;
    }
    else {
        if (check[0] == this.offsetLeft && check[1] == this.offsetTop) {
            check = [];
            arrayComparison[0].parentElement.style.background = "url(assets/img/back.png)";         /*graphic fix*/
            arrayComparison[0].parentElement.style.backgroundSize = "cover";                    /*graphic fix*/
            arrayComparison = [];
        }
        else {
            check = [];
        }
    }

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        combinations++;
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[0].parentElement.style.background = "url(assets/img/back.png)";     /*graphic fix*/
                arrayComparison[0].parentElement.style.backgroundSize = "cover";                /*graphic fix*/
                arrayComparison[1].classList.remove("show");
                arrayComparison[1].parentElement.style.background = "url(assets/img/back.png)";     /*graphic fix*/
                arrayComparison[1].parentElement.style.backgroundSize = "cover";                /*graphic fix*/
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 1200);
        }
    }               //una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
    if (iconsFind.length == arrayAnimali.length) {
        modal.style.display = "flex";
        if (minutes == 1 && seconds == 1) {
            document.getElementsByTagName("h2")[0].innerHTML = `Congratulazioni! Hai risolto il gioco in: ${minutes} minuto e ${seconds} secondo`;
        }
        else if (minutes == 1 && seconds != 1){
            document.getElementsByTagName("h2")[0].innerHTML = `Congratulazioni! Hai risolto il gioco in: ${minutes} minuto e ${seconds} secondi`;
        }
        else if (minutes != 1 && seconds == 1){
            document.getElementsByTagName("h2")[0].innerHTML = `Congratulazioni! Hai risolto il gioco in: ${minutes} minuti e ${seconds} secondo`;
        }
        else {
            document.getElementsByTagName("h2")[0].innerHTML = `Congratulazioni! Hai risolto il gioco in: ${minutes} minuti e ${seconds} secondi`;
        }
        document.getElementById("tempoTrascorso").innerHTML = `Stavolta hai utilizzato ${combinations} mosse`;
    }
}

// una funzione che nasconde la modale alla fine e riavvia il gioco
function playAgain() {
    clearInterval(interval);
    time.innerHTML = `Tempo: 0 min 0 sec`;
    document.getElementsByClassName("content")[0].style.display = "none";
    if (!document.getElementById("newGame")){    
        let newGame = document.createElement("div");
        let question = document.createElement("h2");
        newGame.id = "newGame";
        question.innerHTML = "In che modalità preferisci giocare?"
        modal.appendChild(newGame).appendChild(question);
        let easyMode = document.createElement("button");
        easyMode.innerHTML = "Facile";
        easyMode.className = "button";
        easyMode.onclick = startEasy;
        let normalMode = document.createElement("button");
        normalMode.innerHTML = "Standard";
        normalMode.className = "button";
        normalMode.onclick = startNormal;
        let hardMode = document.createElement("button");
        hardMode.innerHTML = "Difficile";
        hardMode.className = "button";
        hardMode.onclick = startHard;
        newGame.appendChild(easyMode);
        newGame.appendChild(normalMode);
        newGame.appendChild(hardMode);
    }
    document.getElementById("newGame").style.display = "block";
}
// una funzione che calcola il tempo e aggiorna il contenitore sotto
// document.getElementById("modal").style.display = "none";
function startEasy() {
    arrayAnimali = ['01', '02', '03', '04', '05', '06', '01', '02', '03', '04', '05', '06'];
    startAgain();
}

function startNormal() {
    arrayAnimali = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    startAgain();
}

function startHard() {
    arrayAnimali = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15'];
    startAgain();
}

function startAgain() {
    modal.style.display = "none";
    document.getElementsByClassName("content")[0].style.display = "block";
    document.getElementById("newGame").style.display = "none";
    startGame();
}