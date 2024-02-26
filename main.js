document.addEventListener('DOMContentLoaded', function(){
    Dico().then(mot =>{
        let motLen = mot.length;
        let temp = 0;
        var indiceMot = document.querySelector('#guessLetter');
        var letterLeft = document.querySelector('#letterLeft');
        letterLeft.textContent = temp  + ' / ' + motLen;
        let letterSaved = [];
        remplirTab(letterSaved, mot);
        for (let i = 0; i < motLen; i++){
            indiceMot.textContent += letterSaved[i];
        }
        VerifMot(letterSaved, mot, temp);
    });
});
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const keyboard = document.getElementById('keyboard-container');

alpha.forEach(letter =>{
    let a = document.createElement('button');
    a.textContent = letter;
    keyboard.appendChild(a);
   
});
function remplirTab(tab, mot){
    for (let i = 0; i < mot.length; i++){
        tab[i] = '_ ';
    }
}
async function Dico(){
    fetch('/Dico/Mots_Français.txt')
    .then(response => response.text())
    .then(text => {
        const mots = text.split(' ');
        let indexRandom = Math.floor(Math.random()*mots.length);
        motRandom = mots[indexRandom];
        return motRandom;
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du fichier:', error);
        return null;
    });
}
function disableButtons() {
    document.querySelectorAll('#keyboard-container button').forEach(function(button) {
        button.classList.add('disabled-button');
    });
}
function winPanel() {
    disableButtons();
    var container = document.querySelector('#second-container');
    var gif = document.querySelector('#gif_img');
    gif.src = 'image/giphy-3.gif';
    container.classList.add('flip');
    setTimeout(resetGame,8000);  
}
function loosePanel(mot) {
    disableButtons();
    var container = document.querySelector('#second-container');
    var gif = document.querySelector('#gif_img');
    var word = document.querySelector('#word');
    gif.src = 'image/giphy-2.gif';
    container.classList.add('flip');
    setTimeout(function(){
        word.classList.add('trans');
        word.textContent = 'THE WORD WAS : ' + mot;
    }, 10);
    setTimeout(resetGame,8000);  
}
async function Dico(){
    try{
        const response = await fetch('Dico/Mots_Français.txt');
        const text = await response.text();
        const mot = text.split(' ');
        const indexRandom = Math.floor(Math.random()*mot.length);
        return mot[indexRandom];
    }catch(error){
        console.error('Erreur lors de la récupération du fichier:', error);
        return null;
    }
}
function VerifMot(tab, mot, temp){
    var letterLeft = document.querySelector('#letterLeft');
    var indiceMot = document.querySelector('#guessLetter');
    var Anim = document.querySelector('#anim');
    let count = 1;
    document.querySelectorAll('#keyboard-container button').forEach(function(button){
        button.addEventListener('click', function(event) {
            var caseClicked = event.target;
            if (caseClicked.classList.contains('disabled')){
                return;
            }else {
                caseClicked.classList.add('disabled');
                let bool = true;
                for(let i = 0; i < mot.length; i++){
                    if (caseClicked.textContent === mot[i]){
                        tab[i] = mot[i];
                        bool = false;
                    }
                }
                indiceMot.textContent = null;
                letterLeft.textContent = null;
                temp = 0;
                for (let i = 0; i < mot.length; i++){
                    indiceMot.textContent += tab[i];
                    if (tab[i] !== '_ '){
                        temp++;
                    }
                }
                letterLeft.textContent = temp + ' / ' + mot.length;
                if(temp === mot.length) winPanel();
                if (bool){
                    count++;
                    let imageSrc = document.querySelector('#img');
                    imageSrc.src = `image/hangman-${count}.svg`;
                    Anim.classList.remove('title');
                    setTimeout(function(){
                        Anim.classList.add('title');
                    }, 10);
                    if(count === 11){
                        setTimeout(function(){
                            loosePanel(mot);                      
                        }, 1);
                        
                    }

                }
            }
        });
    }); 
    
}

function resetGame(){
    window.location.reload();
}

