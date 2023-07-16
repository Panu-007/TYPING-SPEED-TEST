const typingText = document.querySelector(".text p"),
 inpField = document.querySelector(".wrapper .input-field"),
 tryAgainBtn = document.querySelector("#try_again"),
 timeTag = document.querySelector(".time span b"),
 mistakeTag = document.querySelector(".mistake span"),
 wpmTag = document.querySelector(".wpm span"),
 cpmTag = document.querySelector(".cpm span");



let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {

    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";

    //This one get the each paragarph char with <span>x<span> 
    paragraphs[ranIndex].split("").forEach(char => {

        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
        
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {

    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0) {

        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
       
        //this condition deals with backspace and removing correct and incorrect css
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }

        } else {
            if(characters[charIndex].innerText == typedChar) {
                 play_beat();
                characters[charIndex].classList.add("correct");
            } else {
                play_beep();
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }

        //this code deals with giving active css to current typing char
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;

    } else {
        
        display_result();
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        display_result();
        clearInterval(timer);
    }
}

function resetGame() {
    window.location.reload();
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

function display_result()
{  
    play_tada();
    get_confetti();
    document.getElementsByClassName("wrapper")[0].innerHTML = document.getElementsByClassName("result-details")[0].innerHTML ;

}

function play_beat()
{
    const audio = new Audio("sound/TYPEWRITER.mp3");
    audio.play();
}

function play_tada()
{
    const audio = new Audio("sound/TADA.mp3");
    audio.play();
}
function play_beep()
{
    const audio = new Audio("sound/BEEP.mp3");
    audio.play();
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
