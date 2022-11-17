const start = document.querySelector(".start");
const startButton = document.querySelector(".startButton");
const selection = document.querySelector(".selection");
const easyButton = document.querySelector(".easyButton");
const normalButton = document.querySelector(".normalButton");
const hardButton = document.querySelector(".hardButton");
const game = document.querySelector(".game");
const number = document.querySelector(".number");
const question = document.querySelector(".question");
const popUp = document.querySelector(".popUp");
const answer = document.querySelector(".answer");
const image = document.querySelector(".image");
const final = document.querySelector(".final");
const againButton = document.querySelector(".againButton");
const homeButton = document.querySelector(".homeButton");

const clickSound = document.getElementById("click")
const phone = document.getElementById("phone")
const clap = document.getElementById("clap")
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")

let sound;
let firstHalf;
let secondHalf;
let squenece = [];
let phoneNumber;
let currentSquence;

startButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        start.classList.add("hide")
        selection.classList.remove("hide")
    }, 200);
})

easyButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "easy"
        ready()
    }, 200);
})

normalButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "normal"
        ready()
    }, 200);
})

hardButton.addEventListener("click", () => {
    playClickSound()
    let delay = setTimeout(() => {
        difficulty = "hard"
        ready()
    }, 200);
})

function ready(){
    selection.classList.add("hide")
    game.classList.remove("hide")
    
    total = 5;
    current = 0;
    sound = false;

    Question()
}

function Question(){
    current += 1;

    if(current > total){
        clap.currentTime = 0
        clap.play()
        game.classList.add("hide")
        final.classList.remove("hide")
        return
    }

    phoneNumber = ""
    firstHalf = ""
    secondHalf = ""
    currentSquence = 0;
    squenece = []
    number.innerHTML = `Call ${current} / ${total}:`

    for(let q = 0; q < 8; q++){
        let randomNumber = Math.floor(Math.random() * 10)

        phoneNumber += randomNumber;

        if(difficulty == "normal"){
            if(q < 4){
                firstHalf += randomNumber; 
                console.log(firstHalf)
            }
            if(q > 3){
                secondHalf += randomNumber;
                console.log(secondHalf)
            }
        }
        if(q == 3){
            phoneNumber += " "
        }
        
        squenece.push(randomNumber);
    }
    question.style.textDecoration = "none"
    question.innerHTML = phoneNumber
    console.log(phoneNumber ,squenece);

    console.log(firstHalf, secondHalf)

    if(difficulty == "normal"){
        question.innerHTML = `${firstHalf} <span class="underline">????</span>`
        setTimeout(()=>{
            question.innerHTML = `${firstHalf} <span class="underline">${secondHalf}</span>`
            setTimeout(()=>{
                question.innerHTML = `${firstHalf} <span class="underline">????</span>`
            },4000)
        },500)
    }

    if(difficulty == "hard"){
        question.innerHTML = "???? ????"
        question.style.textDecoration = "underline"
        setTimeout(()=>{
            question.innerHTML = phoneNumber
            setTimeout(()=>{
                question.innerHTML = "???? ????"
            },5000)
        },400)
    }
}

for(let b = 0; b < 10; b++){
    let btnClass = "btn" + b
    let btn = document.querySelector(`.${btnClass}`)

    console.log(btn)

    btn.addEventListener("click", ()=>{
        if(!btn.classList.contains("empty") && sound == false){
            sound = true;
            btn.classList.add("active")

            let data = btn.getAttribute("data")
            console.log(squenece[currentSquence])

            phone.currentTime = 0;
            phone.play()

            setTimeout(() =>{
                btn.classList.remove("active")
            }, 200)
            
            setTimeout(()=>{
                if(data != squenece[currentSquence]){
                    wrong.currentTime = 0
                    wrong.play()
                    answer.style.color = "#EA3946"
                    answer.innerHTML = "Wrong number."
                    image.src = "./img/wrong.png"
                    popUp.classList.remove("hide")
                    setTimeout(()=>{
                        popUp.classList.add("hide")
                        sound = false;
                    },1500)
                    currentSquence = 0
                    
                    
                    return
                }
                if(data == squenece[currentSquence]){
                    currentSquence += 1
                    console.log(currentSquence, squenece.length)
                    if(currentSquence == squenece.length){
                        correct.currentTime = 0
                        correct.play()
                        answer.innerHTML = "Connected!"
                        answer.style.color = "#70BF52"
                        image.src = "./img/correct.png"
                        popUp.classList.remove("hide")
                        setTimeout(()=>{
                            popUp.classList.add("hide")
                            Question()
                            sound = false;
                        },1500)
                    }
                    else{
                        sound = false;
                    }
                }
            },300)
        }
    })
}

//againButton.addEventListener("click", () =>{
//    playClickSound()
//    let daley = setTimeout(() =>{
//        final.classList.add("hide")
//        start.classList.remove("hide")
//    }, 200)
//})
//
//homeButton.addEventListener("click", ()=>{
//    playClickSound()
//    let daley = setTimeout(() =>{
//        location.assign('https://gimme.sg/activations/dementia/');
//    }, 200)
//})


function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });