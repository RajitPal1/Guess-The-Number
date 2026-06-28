let buttons = document.querySelectorAll("#easy-button, #normal-button, #hard-button, #impossible-button");
let easy = document.querySelector("#easy-button");
let normal = document.querySelector("#normal-button");
let hard = document.querySelector("#hard-button");
let impossible = document.querySelector("#impossible-button");
let hides = document.querySelectorAll(".hide");
let attemptLines = document.querySelectorAll(".attempt-line");
let achivements = document.querySelector("#achivement-button");
let winImg = document.querySelector("#win");
let loseImg = document.querySelector("#lose");
let instruction = document.querySelector(".instruction");
let correctSign = document.querySelector("#correct");
let attempt;

winImg.style.display = "none";
loseImg.style.display = "none";
correctSign.style.display = "none";

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        hides.forEach((hide) => {
            if(!hide.contains(button)){
                hide.style.display = "none";
            }
        })

        if(button === easy){
            attempt = 7;
        }
        else if(button === normal){
            attempt = 5;
        }
        else if(button === hard){
            attempt = 3;
        }
        else{
            attempt = 1;
        }
        button.disabled = true;
        button.style.color = "black";
        attemptLines.forEach((attemptLine) => {
            attemptLine.textContent = `Find the number in ${attempt} attempts.`
        })
        instruction.style.display = "none";
        createGame(attempt);
    })
})


const createGame = (attempt) => {
    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";

    let p = document.createElement("p");
    p.textContent = "Enter your number";
    p.style.fontSize = "1.5rem";
    p.style.marginRight = "0.5rem";
    div.appendChild(p);

    let form = document.createElement("form");
    div.appendChild(form);

    let numberBox = document.createElement("input");
    numberBox.style.height = "2rem";
    numberBox.style.width = "10rem";
    numberBox.style.border = "1px solid black";
    numberBox.style.borderRadius = "5px";
    numberBox.style.textAlign = "center";
    numberBox.style.fontSize = "1rem";
    div.appendChild(numberBox);

    document.body.appendChild(div);

    let check = document.createElement("button");
    check.textContent = "Check";
    check.style.height = "1.5rem";
    check.style.width = "5rem";
    check.style.display = "flex";
    check.style.justifyContent = "center";
    check.style.alignItems = "center";
    check.style.fontSize = "1rem";
    check.style.backgroundColor = "#28A745";
    check.style.color = "#1F2937";
    div.appendChild(check);

    numberBox.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            event.preventDefault();
            check.click();
        }
    })

    let showChecker = document.createElement("div");
    document.body.appendChild(showChecker);

    let checker = document.createElement("p");
    checker.style.textAlign = "center";
    checker.style.fontSize = "1.5rem";
    checker.style.marginTop = "1.5rem";
    showChecker.appendChild(checker);

    let remainingAttempt = document.createElement("p");
    remainingAttempt.style.fontSize = "1.5rem"
    remainingAttempt.style.textAlign = "center";
    document.body.appendChild(remainingAttempt);

    let gameButton = document.createElement("div");
    gameButton.style.display = "flex";
    gameButton.style.justifyContent = "center";
    gameButton.style.alignItems = "center";
    document.body.appendChild(gameButton);
    
    let reset = document.createElement("button");
    reset.textContent = "Reset Game";
    reset.style.height = "1.5rem";
    reset.style.width = "5rem";
    reset.style.display = "flex";
    reset.style.justifyContent = "center";
    reset.style.alignItems = "center";
    reset.style.fontSize = "1rem";
    reset.style.padding = "1.5rem";
    reset.style.backgroundColor = "#F59E0B";
    reset.style.color = "black";
    gameButton.appendChild(reset);

    let newGame = document.createElement("button");
    newGame.textContent = "New Game";
    newGame.style.height = "1.5rem";
    newGame.style.width = "5rem";
    newGame.style.display = "flex";
    newGame.style.justifyContent = "center";
    newGame.style.alignItems = "center";
    newGame.style.fontSize = "1rem";
    newGame.style.padding = "1.5rem";
    newGame.style.backgroundColor = "#0D6EFD";
    newGame.style.color = "#E5E7EB";
    gameButton.appendChild(newGame);


    check.disabled = false;

    startGame(numberBox,attempt,check,checker,remainingAttempt,reset,newGame,p);
}


const startGame = (numberBox,attempt,check,checker,remainingAttempt,reset,newGame,p) => {
    let original = Math.floor(Math.random() * 100) + 1;
    let maxAttempt = attempt;
    
    check.onclick = () => {
        if(numberBox.value.trim() === ""){
        checker.textContent = "Please enter a number.";
        numberBox.focus();
        return;
    }

        let guess = Number(numberBox.value);
        
        if(isNaN(guess)){
            checker.textContent = "Please enter a number.";
            numberBox.value = "";
            numberBox.focus();
        }
        else if(guess > 100 || guess <= 0){
            checker.textContent = "Number should be between 1 - 100.";
            numberBox.value = "";
            numberBox.focus();
        }
        else{
        if(guess < original){
            checker.textContent = `${guess} is too low. Think bigger.`;
        }
        else if(guess > original){
            checker.textContent = `${guess} is too big. Think smaller.`;
        }
        else{
            achivementChecker(p,numberBox,check,checker,maxAttempt,guess,original);
            winImg.style.display = "flex";
        }
        --attempt;
        remainingAttempt.textContent = `Remaining Attempt:${attempt}`;
        numberBox.value = "";
        numberBox.focus();
    }
        if(attempt === 0 && guess !== original){
            achivementChecker(p,numberBox,check,checker,maxAttempt,guess,original);
            loseImg.style.display = "flex";
        }
    }

    reset.onclick = () => {
    original = Math.floor(Math.random() * 100) + 1;
    attempt = maxAttempt;

    checker.textContent = "";
    numberBox.value = "";
    remainingAttempt.style.display = "block";
    remainingAttempt.textContent = `Remaining Attempt:${attempt}`;
    check.disabled = false;

    winImg.style.display = "none";
    loseImg.style.display = "none";
    p.style.display = "block"
    numberBox.style.display = "block";
    check.style.display = "flex";
    }

    newGame.onclick = () => {
        location.reload();
    }
    }

    let achivementsName = ["Easy Peasy",
        "Its Normal",
        "Hard Fighter",
        "Made It Possible",
        "Am I a Noob?"];

    let achivementsGet = ["Win a game in Easy mode",
        "Win a game in Normal mode",
        "Win a game in Hard mode",
        "Win a game in Impossible mode",
        "Lose a game in Easy mode"];

    let achievementIds = [
    "easy",
    "normal",
    "hard",
    "impossible",
    "noob"];   

    let achivementsColor = ["rgb(23, 216, 23)","yellow","rgb(236, 32, 32)","blueviolet","#2563EB"]

    achivements.addEventListener("click", () => {
       let achivementsFolder = document.createElement("div");
       achivementsFolder.style.height = "29rem";
       achivementsFolder.style.width = "30rem";
       achivementsFolder.style.position = "fixed";
       achivementsFolder.style.top = "50%";
       achivementsFolder.style.left = "50%";
       achivementsFolder.style.transform = "translate(-50%,-50%)";
       achivementsFolder.style.zIndex = "1000";
       achivementsFolder.style.borderRadius = "10px";
       achivementsFolder.style.backgroundColor = "white";
       achivementsFolder.style.border = "1px solid black";
       document.body.appendChild(achivementsFolder);

       let achivementsFolderHeading = document.createElement("div");
       achivementsFolderHeading.style.height = "3rem";
       achivementsFolderHeading.style.position = "relative";
       achivementsFolderHeading.style.borderBottom = "1px solid black";
       achivementsFolder.appendChild(achivementsFolderHeading);
       

       let achivementsFolderHeadingPara = document.createElement("p");
       achivementsFolderHeadingPara.textContent = "Achievements";
       achivementsFolderHeadingPara.style.color = "gold";
       achivementsFolderHeadingPara.style.display = "flex";
       achivementsFolderHeadingPara.style.justifyContent = "center";
       achivementsFolderHeadingPara.style.marginTop = "10px";
       achivementsFolderHeadingPara.style.fontSize = "2rem";
       achivementsFolderHeadingPara.style.textAlign = "center";
       achivementsFolderHeading.appendChild(achivementsFolderHeadingPara);

       achivementsFolderHeading.appendChild(closeImg);
       let closeImg = document.createElement("i");
       closeImg.className = "fa-solid fa-xmark";
       closeImg.style.display = "block";
       closeImg.style.position = "absolute";
       closeImg.style.top = "0px";
       closeImg.style.right = "10px";
       closeImg.style.cursor = "pointer";
       closeImg.style.color = "red";
       closeImg.style.fontSize = "1.5rem";
       closeImg.onclick = () => {
        achivementsFolder.style.display = "none";
       }

       let achievementsContainer = document.createElement("div");
       achievementsContainer.style.height = "25rem";
       achievementsContainer.style.overflowY = "auto";
       achievementsContainer.style.scrollbarWidth = "none";
       achivementsFolder.appendChild(achievementsContainer);

    for(let i = 0; i < achivementsName.length;i++)
    {
       let achivement = document.createElement("div");
       achivement.style.height = "5rem";
       achivement.style.width = "30rem";
       achivement.style.borderBottom = "1px solid black";
       let achivementHeading = document.createElement("h2");
       achivementHeading.textContent = `${achivementsName[i]}`;
       achivementHeading.style.display = "flex";
       achivementHeading.style.justifyContent = "center";
       achivementHeading.style.alignItems = "center";
       achivementHeading.style.position = "relative";
       achivementHeading.style.top = "1rem";
       achivementHeading.style.color = `${achivementsColor[i]}`;
       achivement.appendChild(achivementHeading);

       let achivementHeadingPara = document.createElement("p");
       achivementHeadingPara.textContent = `${achivementsGet[i]}`;

       achivement.appendChild(achivementHeadingPara);
       achivementHeadingPara.style.position = "relative";
       achivementHeadingPara.style.top = "1.5rem";
       achivementHeadingPara.style.textAlign = "center";
       achivementHeadingPara.style.fontSize = "1.25rem";
       achivementHeadingPara.style.color = "grey";

    let correctSign = document.createElement("i");
    correctSign.className = "fa-solid fa-check";
    correctSign.style.display = "none";
    correctSign.style.color = "white";
    correctSign.style.position = "absolute";
    correctSign.style.right = "15px";
    correctSign.style.top = "25px";
    correctSign.style.padding = "7px";
    correctSign.style.borderRadius = "50%";
    correctSign.style.backgroundColor = "#22C55E"

    achivement.style.position = "relative";
    achivement.appendChild(correctSign);
      

       if (isAchievementUnlocked(achievementIds[i])) {
       correctSign.style.display = "block";
    }
       else {
       correctSign.style.display = "none";
    }
       achievementsContainer.appendChild(achivement);
    }
    }) 

let achivementDisplayer = document.createElement("div");
achivementDisplayer.style.height = "4rem";
achivementDisplayer.style.width = "20rem";
achivementDisplayer.style.position = "fixed";
achivementDisplayer.style.top = "20%";
achivementDisplayer.style.right = "-11.5%";
achivementDisplayer.style.transform = "translate(-50%,-50%)";
achivementDisplayer.style.zIndex = "1000";
achivementDisplayer.style.border = "1px solid black";
achivementDisplayer.style.borderRadius = "5px";
achivementDisplayer.style.textAlign = "center";
achivementDisplayer.style.background = "linear-gradient(135deg, #1e1e1e, #2c2c2c)";
achivementDisplayer.style.display = "flex";
achivementDisplayer.style.justifyContent = "center";
achivementDisplayer.style.alignItems = "center";
achivementDisplayer.style.flexDirection = "column";
achivementDisplayer.style.display = "none";
document.body.appendChild(achivementDisplayer);

function isAchievementUnlocked(id) {
    return localStorage.getItem(id) === "true";
}

function unlockAchievement(id) {
    localStorage.setItem(id, "true");
}

function showAchievement(id,title, description) {

      if(isAchievementUnlocked(id)) {
        return;
    }

    // Save permanently
    unlockAchievement(id);

    achivementDisplayer.style.display = "block";
    
    achivementDisplayer.innerHTML = `
        <h2 style="
            margin-top:1rem;
            text-align:center;
            color:gold;
            font-size:1.5rem;
        ">
            Achievement Unlocked! 🏆
        </h2>`
         setTimeout(() => {

    achivementDisplayer.innerHTML = 
            `<p style="
            margin-top:0.7rem;
            text-align:center;
            font-size:1.5rem;
            font-weight:bold;
            color:white;">
            ${title}</p>

        <small style="
            display:block;
            text-align:center;
            color:darkgray;
            font-size:1rem;
            magin-top:10px">
            ${description}
        </small>`},2000);


    setTimeout(() => {
        achivementDisplayer.style.display = "none";
    }, 5000);
}

function achivementChecker(p,numberBox,check,checker,maxAttempt,guess,original){
    p.style.display = "none"
    numberBox.style.display = "none";
    check.style.display = "none";
    checker.textContent = `The number is ${original}.`

    if(maxAttempt === 7 && guess === original){
        showAchievement("easy","Easy Peasy","Win a game in Easy Mode");
    }
    else if(maxAttempt === 5 && guess === original){
        showAchievement("normal","Its Normal","Win a game in Normal Mode");
    }
    else if(maxAttempt === 3 && guess === original){
        showAchievement("hard","Hard Fighter","Win a game in  Hard Mode");
    }
    else if(maxAttempt === 1 && guess === original){
        showAchievement("impossible","Made It Possible","Win a game in Impossible Mode");
    }
    if(maxAttempt === 7 && guess !== original){
        showAchievement("noob","Am I a Noob?","Lose a game in Easy Mode");
    }
}







