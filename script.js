////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//This file contains all the Javascript Global Variables and functions for The Impossible Game
//
//For Quick Search for each section, search by index based on the table of content below:

//1.Header Display functions & Game Lose Function
//  1.1 [increaseProgressBar] - Movement of Progress Bar after each Level
//  1.2 [minusLive] - Minus live and check game loss function

//2. Main Level Functions
//  2.1 [Press Start] Setup of Level 1 and Gameplay of Level 1
//      2.1.1 [window.onload] - Level 1 Game Function
//  2.2 [1+1] Setup of Level 2 and Gameplay of level 2
//      2.2.1 [goToLevel2] - Level 2 Game Function
//  2.3 [Type Backwards] Setup of Level 3 and Gameplay of level 3
//      2.3.1 [goToLevel3] - Level 3 Game Function
//  2.4 [Find the Dot!] Setup of Level 4 and Gameplay of Level 4
//      2.4.1 [goToLevel4] - Level 4 Game Function
//  2.5 [Catch the Cat] Setup of Level 5 and Gameplay of Level 5
//      2.5.1 [catMove] - Randomised Movement of Cat
//      2.5.2 [dogMove] - Stopping of cat movement after clicking on dog
//      2.5.3 [goToLevel5] - Level 5 Game function
//  2.6 [Ascending/Descending Number] Setup of Level 6 and Gameplay of Level 6
//      2.6.1 [resetLevel5] - Reset Aesthetic Changes to Dog element
//      2.6.2 [Global Variables] - Declaring of Level 6 Global variable
//      2.6.3 [changeNextNumber] - Add and Remove event listener and ascending/descending switch
//      2.6.4 [goToLevel6] - Level 6 Game Function
//  2.7 [Pay Attention] - Setup of Level 7 and Gameplay of Level 7
//      2.7.1 [Global Variable] - Global Variable for level 7
//      2.7.2 [checkLevel7Win] - Check win condition for level 7
//      2.7.3 [initialiseGameButton] initialise each button to check for win conditions
//      2.7.4 [randomiseColor] issue random color to boxes
//      2.7.5 [goToLevel7] Level 7 Game Function
//  2.8 [What is the level?] - Setup of Level 8 and Gameplay of Level 8
//      2.8.1 [Global Variable] - Global Variable for Level 8
//      2.8.2 Success Function
//      2.8.3 [goToLevel8] - Level 8 Main Function
//  2.9 [Take A Break!] - Setup of Level 9 and Gameplay of Level 9
//      2.9.1 [Timer Object] - Set up timer object
//      2.9.2 [checkTime] - function to check time when it stops and if it is within win range
//      2.9.3 [startTime] - function to start clock run when start is pressed
//      2.9.4 [stopTime] - function when stop button is pressed
//      2.9.5 [goToLevel9] - Level 9 Main Function
//  2.10 [What is the answer?] Setup of Level 10 and Gameplay of Level 10
//      2.10.1 [goToLevel10] - Level 10 Game Function
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//1. Header Display functions & Game Lose Function
////////////////////////////////////////////////////////////////////////////////////////////////

//1.1 [increaseProgressBar] - Movement of Progress Bar after each Level
var increaseProgressBar = function(level) {
    var newProgressBar = level*10;

    document.getElementById('progress-bar').style.width = `${newProgressBar}%`;
    document.getElementById('level-text').innerText=`Level ${level}`;

    var imageMargin = document.getElementById('progress-bar').offsetWidth;
    imageMargin-=20;
    document.getElementById('level-image').style.marginLeft = `${imageMargin}px`;
}

//1.2 [minusLive] - Minus live and check game loss function
var minusLive = function(){
    var lives=document.getElementById('lives-container');
    var lastChild = lives.children.length - 1;

    lives.removeChild(lives.children[lastChild]);

    //Provide a bit of lag for the heart to disappear
    setTimeout(function(){
        if (lives.children.length === 1){
        var gamelose = document.getElementById('gamelose');

        document.getElementById('header').style.opacity = 0.2;
        document.getElementById('main-game-area').style.opacity=0.2;
        document.getElementById('footer').style.opacity=0.2;
        document.getElementById('gamelose').style.display='initial'

        document.getElementById('background-music').pause();
        document.getElementById('failure-music').play()

        document.getElementById('restart-game2').addEventListener('click', function() {
            location.reload();
        });
    }},50);
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.Main Level Functions
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//2.1 [Press Start] Setup of Level 1 and Gameplay of Level 1
////////////////////////////////////////////////////////////////////////////////////////////////

//2.1.1 - [window.onload] - Level 1 Game Function
window.onload = function (){
    //Set Game functions
    document.getElementById('level1-true').onclick = goToLevel2;
    document.getElementById('level1-fake1').onclick = minusLive;
    document.getElementById('level1-fake2').onclick = minusLive;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.2 [1+1] Setup of Level 2 and Gameplay of level 2
////////////////////////////////////////////////////////////////////////////////////////////////

//2.2.1 [goToLevel2] - Level 2 Game Function
var goToLevel2 = function(){
    //Hide previous level and load new level
    document.getElementById('level1').style.display = 'none';
    document.getElementById('level2').style.display = 'initial';
    //Update Level Bar
    increaseProgressBar(2);
    //Set Game Functions
    document.getElementById('level2-fake').onclick=minusLive;

    var checkLevel2Win = function() {
        if(event.keyCode===50){
            goToLevel3(checkLevel2Win);
        } else {
            minusLive();
        }
    }

    window.addEventListener('keypress',checkLevel2Win);
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.3 [Type Backwards] Setup of Level 3 and Gameplay of level 3
////////////////////////////////////////////////////////////////////////////////////////////////

//2.3.1 [goToLevel3] - Level 3 Game Function
var goToLevel3 = function(checkLevel2Win){
    //Hide previous level and load new level
    document.getElementById('level2').style.display = 'none';
    document.getElementById('level3').style.display = 'initial';
    //Remove previous level window event listener
    window.removeEventListener('keypress',checkLevel2Win);
    //Update Level bar
    increaseProgressBar(3);
    //Set Game Function
    document.getElementById('level3-answer').onkeypress = function() {
        if(event.keyCode === 13){
            if (this.value === 'backwards'){
                goToLevel4();
            } else {
                minusLive();
            }
        }
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.4 [Find the Dot!] Setup of Level 4 and Gameplay of Level 4
////////////////////////////////////////////////////////////////////////////////////////////////
//need to solve extra scroll on touch pad
// var dotCount = 0;

//2.4.1 [goToLevel4] - Level 4 Game Function
var goToLevel4 = function(){
    //Hide previous level and load new level
    document.getElementById('level3').style.display = 'none';
    document.getElementById('level4').style.display = 'initial';
    //Update game aesthetic
    document.getElementById('main-game-area').style.paddingTop = '50px';
    //Update Level Bar
    increaseProgressBar(4);

    //Function Variable Declaration
    var dotOne = document.getElementById('dot1');

    //Set Game Functions
    document.getElementById('lives-title').onclick=minusLive;
    document.getElementById('level4-fake').onclick=minusLive;
    document.getElementById('dot2').onclick=minusLive;

    //Scrolling of wheel to shrink the dot - decreasing Width by 5px and increasing MarginTop-10px
    dotOne.addEventListener('wheel', function(){
        //Getting current Width and Margin Top of element
        var width = this.offsetWidth;
        var marginTop = this.style.marginTop;
        //if reach final size, stop shinking
        if (marginTop ==='100px' && width ==='3px'){
           return;
        }
        //Decreasing of width
        width = width - 18.5;
        //Setting of width and height (square)
        this.style.width=`${width}px`;
        this.style.height=`${width}px`;

        //Setting of Margin Top: set initial Margin Top to 10px and increase thereafter
        //if condition required as first read of MarginTop will be undefined. Will require initialization.of Margin Top
        if (marginTop.length > 0 && marginTop!=='100px'){
            //Getting of current margin top
            marginTop = marginTop.substr(0,2);
            marginTop = parseInt(marginTop) + 10;

            this.style.marginTop=`${marginTop}px`;

        } else {
            this.style.marginTop = '10px';
        }
    })

    //Win condition that only if dot has been shrunk.
    dotOne.onclick = function(){
        //Getting of current width
        var width = dotOne.style.width;
        width = width.substr(0,3);
        width = parseInt(width);

        if (width === 3){
            document.getElementById('lives-title').removeEventListener('click',minusLive);
            goToLevel5();
        } else {
            minusLive();
        }
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.5 [Catch the Cat] Setup of Level 5 and Gameplay of Level 5
////////////////////////////////////////////////////////////////////////////////////////////////
//2.5.1 [catMove] - Randomised Movement of Cat
var catMove = function() {
    var cat=document.getElementById('cat');
    var newLength = Math.floor(Math.random()*1100);
    var newHeight = Math.floor(Math.random()*400);

    cat.style.top = `${newHeight}px`;
    cat.style.left = `${newLength}px`;
}

//2.5.2 [dogMove] - Stopping of cat movement after clicking on dog
var dogMove=function() {
    //Remove catMove and minusLive from the game area
    document.querySelector('body').removeEventListener('mouseover',catMove);
    document.getElementById('main-game-area').removeEventListener('click',minusLive);

    //Function Variable Declaration
    var cat=document.getElementById('cat');
    var dog=document.getElementById('level-image');

    //Move Dog into Game Area
    document.getElementById('level5-container').prepend(dog);

    //Aesthetic Styling of Cat and Dog
    cat.style.position = 'static';
    cat.style.top = '0px';
    cat.style.left = '0px';

    dog.style.display = 'inline-block';
    dog.style.width = '50px';
    dog.style.marginLeft = 0;
}

//2.5.3 [goToLevel5] - Level 5 Game function
var goToLevel5 = function(){
    //Hide previous level and load new level
    document.getElementById('level4').style.display = 'none';
    document.getElementById('level5').style.display = 'initial';
    //Update Progress Bar
    increaseProgressBar(5);
    //Function Variable Declaration
    var cat=document.getElementById('cat');
    var body=document.querySelector('body');
    var dog=document.getElementById('level-image');

    //Win condition
    cat.onclick = function(){
        goToLevel6();
    }

    //Addition of DOM Events onto elements.
    body.onmouseover=catMove;
    dog.onclick = dogMove;
    //Set Timeout to prevent accidental mouseUp from previous level
    setTimeout(function() {
        document.getElementById('main-game-area').addEventListener('click',minusLive);
    },200);
}


////////////////////////////////////////////////////////////////////////////////////////////////
//2.6 [Ascending/Descending Number] Setup of Level 6 and Gameplay of Level 6
////////////////////////////////////////////////////////////////////////////////////////////////

//2.6.1 [resetLevel5] - Reset Aesthetic Changes to Dog element
var resetLevel5 = function(){
    var dog = document.getElementById('level-image');

    document.querySelector('.progress-container').prepend(dog);
    dog.removeEventListener('click',dogMove);
    dog.style.display='block';
    dog.style.width='30px';
}

//2.6.2 [Global Variables] - Declaring of Level 6 Global variable
var mainIndex6 = [10,11,12,13,14,15,16,17,18,19];
var iconColorBank = ['#FB5012','#01FDF6','#CBBAED','#E9DF00','#03FCBA'];

//2.6.3 [changeNextNumber] - Change to next number on the list, add and remove event listener and ascending/descending switch
var changeNextNumber = function(){
    //Getting Id number of event
    var id = this.id;
    id=parseInt(id);

    //for first 5 numbers in ascending order
    if (mainIndex6.length >=6 && id===mainIndex6[0]){
        //Remove number from display and index
        this.style.display='none';
        mainIndex6.shift();

        //Remove minusLive event listener and add new event Listener
        var currentIndex=document.getElementById(`${mainIndex6[0]}`);
        currentIndex.removeEventListener('click',minusLive);
        currentIndex.onclick=changeNextNumber;
    }else if(mainIndex6.length === 5 && id===mainIndex6[0]){ //change from ascending to descending
        //Remove number from display and index
        this.style.display='none';
        mainIndex6.shift();
        //Change of text from ascending to descending
        document.getElementById('level6-text1').style.display='none';
        document.getElementById('level6-text2').style.display='initial';

        //Set Last Element as next element
        var length = mainIndex6.length;
        var currentIndex=document.getElementById(`${mainIndex6[length-1]}`);
        //Remove minusLive event listener and add new event Listener
        document.getElementById(`${mainIndex6[0]}`).removeEventListener('click',minusLive);
        currentIndex.onclick=changeNextNumber;
    }else if ((mainIndex6.length<5 && mainIndex6.length>0) && (id===mainIndex6[mainIndex6.length-1])) { //descending order+check Win
        //Remove Number from display and index
        this.style.display='none';
        mainIndex6.pop();

        //Check Win condition
        if(mainIndex6.length===0){
            goToLevel7();
            return;
        }

        //Set Last Element as next element
        var length = mainIndex6.length;
        var currentIndex=document.getElementById(`${mainIndex6[length-1]}`);
        //Remove minusLive event listener and add new event listener
        currentIndex.removeEventListener('click',minusLive);
        currentIndex.onclick=changeNextNumber;
    }
}

//2.6.4 [goToLevel6] - Level 6 Game Function
var goToLevel6 = function(){
    //Hide Previous Level and Load Next Level
    document.getElementById('level5').style.display = 'none';
    document.getElementById('level6').style.display = 'initial';
    //Remove previous level display
    resetLevel5();
    //Update Progress Bar
    increaseProgressBar(6);

    //Set random font-size for each number
    for (var i=0; i<10; i++){
        var fontSize=Math.floor(Math.random()*71);
        var randomColor = Math.floor(Math.random()*5);
        if (fontSize<20){
            fontSize+=20;
        }

        document.getElementById(`${mainIndex6[i]}`).style.fontSize=`${fontSize}px`;
        document.getElementById(`${mainIndex6[i]}`).style.color = iconColorBank[randomColor];
    }

    //Initialise correct click for first number
    document.getElementById(`${mainIndex6[0]}`).onclick=changeNextNumber;

    //Initialise incorrect click for the rest of the numbers
    for (var j=1; j<10; j++){
        document.getElementById(`${mainIndex6[j]}`).onclick=minusLive;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.7 [Pay Attention] - Setup of Level 7 and Gameplay of Level 7
////////////////////////////////////////////////////////////////////////////////////////////////

//2.7.1 [Global Variable] - Global Variable for level 7
var checkWinOrder7 = [];
var assignedColors = [];
var clearDisplayId = null ;

//2.7.2 [checkLevel7Win] - Check win condition for level 7
var checkLevel7Win = function(){
    //Find out Id for curent input
    clearDisplayId = this.id;
    var id=parseInt(this.id);

    //Flash color to confirm selection
    this.style.backgroundColor=assignedColors[id];
    setTimeout(function(){
        document.getElementById(clearDisplayId).style.backgroundColor='#B4B8C5';
    },100);

    // Remove id according to initial order
    if (id === checkWinOrder7[0]){
        checkWinOrder7.shift();
        if (checkWinOrder7.length === 0){
            goToLevel8();
        }
    } else {
        minusLive();
    }
}

//2.7.3 [initialiseGameButton] initialise each button to check for win conditions
var initialiseGameButton = function (gameButtons){
    for (var i=0; i<8;i++){
        gameButtons[i].onclick=checkLevel7Win;
    }
}

//2.7.4 [randomiseColor] issue random color to boxes
var randomiseColor = function(buttonColorBank) {
    for (var i=0; i<8;i++){
        var colorIndex= Math.floor(Math.random()*4);
        assignedColors.push(buttonColorBank[colorIndex]);
    }
};

//2.7.5 [goToLevel7] Level 7 Game Function
var goToLevel7 = function(){
    //Hide Previous Level and Load Next Level
    document.getElementById('level6').style.display = 'none';
    document.getElementById('level7').style.display = 'initial';
    //Update game aesthetic
    document.getElementById('main-game-area').style.paddingTop = '10px';
    //Update Progress Bar
    increaseProgressBar(7);

    //Declare Function Variables
    var gameButtons = document.querySelectorAll('.level7-box');
    var buttonColorBank = ['#337CA0','#3EC300','#FFFC31','#FF1D15'];

    //Assign Colors to buttons
    randomiseColor(buttonColorBank);

    //Initialise Random Order of Button to click
    var assignedOrder = [];
    while (assignedOrder.length!==8){
        var index = Math.floor(Math.random()*8);
        if (!assignedOrder.includes(index)){
            assignedOrder.push(index);
        }
    }

    //Display initialised order
    var initialise = setInterval(function(){
        var order = assignedOrder.shift();
        checkWinOrder7.push(order);
        gameButtons[order].style.backgroundColor=assignedColors[order];
        setTimeout(function(){
            gameButtons[order].style.backgroundColor='#B4B8C5';
            if(checkWinOrder7.length===8){
                initialiseGameButton(gameButtons);
                console.log(checkWinOrder7);
                clearInterval(initialise);
                document.getElementById('level7-board-text').innerText='';
            }
        },400)
    },800)
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.8 [What is the level?] - Setup of Level 8 and Gameplay of Level 8
////////////////////////////////////////////////////////////////////////////////////////////////

//2.8.1 [Global Variable] - Global Variable for Level 8
var mainIndex8 = [20,21,22,23,24,25,26,27,28];
var previousEight = null;
var levelSuccess = false;

//2.8.2 Success Function
var success8 = function() {
    levelSuccess=true;
    goToLevel9();
}

//2.8.3 [goToLevel8] - Level 8 Main Function
var goToLevel8 = function(){
    //Hide previous level and Load next level
    document.getElementById('level7').style.display = 'none';
    document.getElementById('level8').style.display = 'initial';
    //Update Game Aesthetic
    document.getElementById('main-game-area').style.paddingTop = '50px';
    //Update Game Progress bar
    increaseProgressBar(8);

    //Add minusLive to all 0
    var fakeEights = document.querySelectorAll('level8-fake');
    fakeEights.forEach (function(){
        this.addEventListener('click',minusLive);
    });

    //initialise minusLive to all 8 containers
    var trueEights = document.querySelectorAll('level8-true');
    trueEights.forEach (function(){
        this.addEventListener('click',minusLive);
    });


    //Randomly choose a 8 container to add a 8 and add success condition
    var subIndex = Math.floor(Math.random()*9);
    var realEight = document.getElementById(`${mainIndex8[subIndex]}`);
    previousEight = realEight;

    realEight.innerText = '8';
    realEight.removeEventListener('click',minusLive);
    realEight.onclick = success8;

    //Loop within the 8 containers randomly to remove and show an 8
    var eightLoop = setInterval(function(){
        var subIndex = Math.floor(Math.random()*9);
        previousEight.removeEventListener('click',success8);
        previousEight.onclick=minusLive;
        previousEight.innerText = '0';

        currentEight = document.getElementById(`${mainIndex8[subIndex]}`);
        previousEight = currentEight;
        console.log(mainIndex8[subIndex]);

        currentEight.removeEventListener('click',minusLive);
        currentEight.onclick=success8;
        currentEight.innerText = '8';

        if(levelSuccess){
            clearInterval(eightLoop);
        }
    },1500);
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.9. [Take A Break!] Setup of Level 9 and Gameplay of Level 9
////////////////////////////////////////////////////////////////////////////////////////////////

//2.9.1 [Timer Object] - Set up timer object
var timeClock = {
    hundredMilli: 0,
    tenthMilli: 0,
    secondOnes: 0,
    secondTenths: 0,
    stopPress: false,
    levelClear: false
}

//2.9.2 [checkTime] - function to check time when it stops and if it is within win range
var checkTime = function(){
    //if 9.8s <= Time <= 10.2sec, level clear
    if (timeClock.secondTenths === 1 && timeClock.secondOnes === 0) {
        if (timeClock.tenthMilli <=9){
            timeClock.levelClear=true;
            goToLevel10();
        } else {
            minusLive();
        }
    } else if (timeClock.secondTenths === 0 & timeClock.secondOnes === 9){
        if (timeClock.tenthMilli >= 0){
            timeClock.levelClear=true;
            goToLevel10();
        } else {
            minusLive()
        }
    } else {
        minusLive();
    }
}

//2.9.3 [startTime] - function to start clock run when start is pressed
var startTime = function(){
    //Change Button display from start to stop
    document.getElementById('start-clock').style.display = 'none';
    document.getElementById('stop-clock').style.display = 'initial';
    //Reset clock value
    timeClock.hundredMilli = 0;
    timeClock.tenthMilli = 0;
    timeClock.secondOnes = 0;
    timeClock.secondTenths = 0;
    //Set Interval to start clock run
    var timeClockStart = setInterval(function(){
        console.log('trigger');
        timeClock.hundredMilli++;
        if (timeClock.hundredMilli === 10){
            timeClock.hundredMilli = 0;
            timeClock.tenthMilli++;
        }

        if (timeClock.tenthMilli === 10){
            timeClock.tenthMilli = 0;
            timeClock.secondOnes++;
        }

        if (timeClock.secondOnes === 10){
            timeClock.secondOnes = 0;
            timeClock.secondTenths ++;
        }

        document.getElementById('clock-text').innerText = `${timeClock.secondTenths}${timeClock.secondOnes}:${timeClock.tenthMilli}${timeClock.hundredMilli}`;
        //If stop button is pressed or clock reaches 11 second, check time
        if ((timeClock.secondOnes === 1 && timeClock.secondTenths === 1)|| timeClock.stopPress){
            clearInterval(timeClockStart);
            checkTime();
            if (!timeClock.levelClear) {
                timeClock.stopPress=false;
                document.getElementById('start-clock').style.display='initial';
                document.getElementById('stop-clock').style.display = 'none';
            }
        }
    })
}

//2.9.4 [stopTime] - function when stop button is pressed
var stopTime = function () {
    timeClock.stopPress = true;
}

//2.9.5 [goToLevel9] - Level 9 Main Function
var goToLevel9 = function(){
    //Hide previous level and load current level
    document.getElementById('level8').style.display = 'none';
    document.getElementById('level9').style.display = 'initial';
    //Update aesthetics
    document.getElementById('main-game-area').style.paddingTop = '20px';
    //Update progress bar
    increaseProgressBar(9);
    //initialise DOM onclick on buttons
    document.getElementById('start-clock').onclick = startTime;
    document.getElementById('stop-clock').onclick = stopTime;
}

////////////////////////////////////////////////////////////////////////////////////////////////
//2.10 [What is the answer?] Setup of Level 10 and Gameplay of Level 10
////////////////////////////////////////////////////////////////////////////////////////////////

//2.10.1 [goToLevel10] - Level 10 Game Function
var goToLevel10 = function() {
    //Hide previous level and load current level
    document.getElementById('level9').style.display = 'none';
    document.getElementById('level10').style.display = 'initial';
    //Update Progress Bar
    increaseProgressBar(10);
    //Check if answer is the answer to the riddle in level 7
    document.getElementById('level10-answer').onkeypress = function() {
        if(event.keyCode === 13){
            if (this.value.toLowerCase() === 'name'){
                document.getElementById('level10').style.display = 'none';
                document.getElementById('gamewon').style.display = 'initial';

                document.getElementById('main-game-area').style.paddingTop = '100px';
                document.getElementById('restart-game2').addEventListener('click', function() {location.reload();});
            } else {
                minusLive();
            }
        }
    };
}