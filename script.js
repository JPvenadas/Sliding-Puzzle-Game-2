
let start = document.querySelector('.start-button')
let welcome = document.querySelector('.welcome-screen-container');
let options = document.querySelector('.options-container')
let firstback = document.querySelector('.back1')
let secondback = document.querySelector('.back2')
let playerName = document.getElementById('name')
let playerName2 = document.querySelector('.player-name')
let btnSave = document.querySelector('.save-name')
let upperOptions = document.querySelector('.options-top')
let lowerOptions = document.querySelector('.options-bot')
let easy = document.querySelector('.easy')
let normal = document.querySelector('.normal')
let difficult = document.querySelector('.difficult')
let modes = document.querySelectorAll('.mode-container')
let menu = document.querySelector('.Menu')
let menuContainer = document.querySelector('.menu-container')
let resume = document.getElementById('resume')
let mainMenu = document.getElementById('menu')
let goal = document.querySelector('.btn-goal')
let goalIMG = document.querySelector('.goal-image')
let goalContainer = document.querySelector('.goal-container')
let puzzleBoard = document.querySelector('.puzzle-board')
let restart = document.querySelector('.restart')


const { unwrapGrid, forceGridAnimation } = animateCSSGrid.wrapGrid(puzzleBoard, {stagger: 50});
let gameLevel;

start.addEventListener('click', ()=>{
    options.style.top = "0"
})
firstback.addEventListener('click', ()=>{
    options.style.top = "-400%"
})
playerName.addEventListener('keydown', ()=>{
   if(playerName.value !== "" || playerName.value !== " "){
    btnSave.innerHTML = "Done"
   }
})
btnSave.addEventListener('click', ()=>{
    upperOptions.style.transform = "translateX(-100%)";
    lowerOptions.style.transform = "translateX(0)";
})
secondback.addEventListener('click', ()=>{
    upperOptions.style.transform = "translateX(0)";
    lowerOptions.style.transform = "translateX(-100%)";
})

menu.addEventListener('click', ()=>{
    menuContainer.style.display = "flex";
})
resume.addEventListener('click', ()=>{
    menuContainer.style.display = "none"
})
mainMenu.addEventListener('click', ()=>{
    welcome.style.top = "0";
    menuContainer.style.display = "none"
})
goal.addEventListener('click', ()=>{
    goalContainer.style.top = "0"
})
goalContainer.addEventListener('click', ()=>{
    goalContainer.style.top = "-400%"
})
easy.addEventListener('click', ()=>{
    gameLevel = "Easy"
    CreateTiles(9);
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3" "P4 P5 P6" "P7 P8 P9"'
    setPosition(solvablearray(9))
   
})
normal.addEventListener('click', ()=>{
    gameLevel = "Normal"
    CreateTiles(16)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10" "P4 P5 P6 P11" "P7 P8 P9 P12" "P13 P14 P15 P16"'
    setPosition(solvablearray(16))
   
})
difficult.addEventListener('click', ()=>{
    gameLevel = "Difficult"
    CreateTiles(25)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10 P17" "P4 P5 P6 P11 P18" "P7 P8 P9 P12 P19" "P13 P14 P15 P16 P20" "P21 P22 P23 P24 P25"'
    setPosition(solvablearray(25))
   
})
modes.forEach(mode =>{
    mode.addEventListener('click', ()=>{
        let tiles = Array.from(puzzleBoard.querySelectorAll('button'))
        unlock(unlocklist, trimGridArea(document.querySelector('.empty-tile').style.gridArea), tiles)
        playerName2.innerText = playerName.value
        goal.style.background = `url(Pictures/${gameLevel}-mode/Full-img.png) no-repeat center`
        goalIMG.src = `Pictures/${gameLevel}-mode/Full-img.png`
        options.style.top = "-400%";
        setTimeout(() => {
        welcome.style.top = "-400%"
        }, 500);
        let empty = document.querySelector('.empty-tile')
        tiles.map(clickabletiles=>{
            clickabletiles.addEventListener('click', ()=>{
              emptypos = trimGridArea(empty.style.getPropertyValue('grid-area'))
              currentpos = trimGridArea(clickabletiles.style.getPropertyValue('grid-area'));
              clickabletiles.style.setProperty("grid-area", emptypos)
              empty.style.setProperty('grid-area',currentpos)
              unlock(unlocklist,currentpos,tiles)
                forceGridAnimation();
            })
        })
    })
   
})
restart.addEventListener('click', ()=>{
    if(gameLevel == "Easy"){
        setPosition(solvablearray(9))
        
    }
    if(gameLevel == "Normal"){
        setPosition(solvablearray(16))
        
    }
    if(gameLevel == "Difficult"){
        setPosition(solvablearray(25))
    }
    let tiles = Array.from(puzzleBoard.querySelectorAll('button'))
    unlock(unlocklist, trimGridArea(document.querySelector('.empty-tile').style.gridArea), tiles)
    forceGridAnimation()
   
})
let CreateTiles = (tilenumber) =>{
    puzzleBoard.innerHTML = "";
    for(let num= 0; num < tilenumber; num++){
        let tile = document.createElement("button")
        puzzleBoard.appendChild(tile)
        tile.classList = `button`
    
        if(num == (tilenumber - 1)){
            tile.style.background = "transparent"
            tile.className = "empty-tile" 
        }
        else{
            tile.style.background= `url(Pictures/${gameLevel}-mode/Parts/image_${num+1}.png) no-repeat center`
            tile.className = `button${num + 1}`
            tile.style.gridArea = `P${num+1}`
            tile.disabled = true
        }  
    }
}

let Randomizer = (num) =>{
    let array = []
    while(array.length < num){
        let randomNum = Math.floor((Math.random() * num)+ 1);
       if(array.includes(randomNum)){
       }
       else{
           array.push(randomNum);
       }
    }
   return array
}

let setPosition = (Randomnumbers) =>{
    for(let num=1; num < Randomnumbers.length; num++){
       document.querySelector(`.button${num}`).style.gridArea = `P${Randomnumbers[num-1]}`
    }
        document.querySelector('.empty-tile').style.gridArea = `P${Randomnumbers[Randomnumbers.length -1]}`
}
let unlocklist = {
    P1: ['P2', 'P4'],
    P2: ['P1', 'P3', 'P5'],
    P3: ['P2', 'P6', 'P10'],
    P4: ['P1', 'P5', 'P7'],
    P5: ['P2', 'P4', 'P6', 'P8'],
    P6: ['P3', 'P5', 'P9', 'P11'],
    P7: ['P4', 'P8', 'P13'],
    P8: ['P5', 'P7', 'P9', 'P14'],
    P9: ['P6', 'P8', 'P12', 'P15'],
    P10: ['P3', 'P11', 'P17'],
    P11: ['P6', 'P10', 'P12', 'P18'],
    P12: ['P11', 'P9', 'P16', 'P19'],
    P13: ['P7', 'P14', 'P21'],
    P14: ['P8', 'P13', 'P15', 'P22'],
    P15: ['P9', 'P14', 'P16', 'P23'],
    P16: ['P12', 'P15', 'P20', 'P24'],
    P17: ['P10', 'P18'],
    P18: ['P11', 'P17', 'P19'],
    P19: ['P12', 'P18', 'P20'],
    P20: ['P19', 'P16', 'P25'],
    P21: ['P13', 'P22'],
    P22: ['P14', 'P21', 'P23'],
    P23: ['P15', 'P22', 'P24'],
    P24: ['P16', 'P23', 'P25'],
    P25: ['P20', 'P24']
}
let unlock = (list, emptyposition, tiles) =>{
    let unlockable = list[emptyposition]
    tiles.forEach(tile =>{
        if(unlockable.includes(trimGridArea(tile.style.getPropertyValue('grid-area')))){
            tile.disabled = false
        }
        else{
            tile.disabled = true
        }
    })
}
 let solvablearray = (num) =>{
        let numstatus = num%2
        let inversionsStatus
        let random
        do{
            random = Randomizer(num)
            inversionsStatus = inversionchecker(random)
        }while(numstatus === inversionsStatus || numstatus == inversionsStatus)
        return random
 }
let trimGridArea = (GridPositionstring) =>{
    let regex = /[P][0-9]+/
    let result = GridPositionstring.match(regex)
    return result[0]
}

function inversionchecker(array){
    let inversions= 0;
    let NormalArrange = [1,2,3,10,4,5,6,11,7,8,9,12,13,14,15,16]
    let difficultArrange = [1,2,3,10,17,4,5,6,11,18,7,8,9,12,19,13,14,15,16,20,21,22,23,24,25]
    for(let num1 = 0; num1< (array.length-1); num1++){
       for(let num2 = (num1+1); num2 < (array.length-1); num2++){
           if(array.length == 9){
                if(array[num1]>array[num2]){
                    inversions++
                }
           } 
           if(array.length == 16){
                if(NormalArrange.indexOf(array[num1])>(NormalArrange.indexOf(array[num2]))){
                    inversions++
                }
           } 
           if(array.length == 25){
            if(difficultArrange.indexOf(array[num1])>(difficultArrange.indexOf(array[num2]))){
                inversions++
            }
           }
       }
    }
    console.log(inversions)
    return oddOrEven(inversions)
}
function oddOrEven(num){
    let remainder = num % 2 
    return remainder
}

console.log(inversionchecker([9,1,2,3,4,5,6,7,8]))
 
