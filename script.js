////////////////////////////////////////////////
//Display functions
///////////////////////////////////////////////

//Clear Elements in Board for the next level
var clearBoard = function() {
    var mainGame= document.getElementById('main-game-area')
    for (var i=0; i<=mainGame.childrenlength;i++){
        mainGame.removeChild(mainGame.children[0]);
    }
}

//Increase Progress bar and Dog movement when level up
var increaseProgressBar = function(level) {
    var newProgressImage = level*5;
    var newProgressBar = level*10;

    document.getElementById('level-image').style.marginLeft = `${newProgressImage}%`;
    document.getElementById('progress-bar').style.width = `${newProgressBar}%`;
    document.getElementById('level-text').innerText=`Level ${level}`;
}

// Changes to number of lives after error
var minusLive = function(){
    var lives=document.getElementById('lives-container');
    var lastChild = lives.children.length - 1;

    lives.removeChild(lives.children[lastChild]);

    setTimeout(function(){
        if (lives.children.length === 1){
        alert('Game Lose');
    }},50);
}

///////////////////////////////////////////////
//Main Level Functions
//////////////////////////////////////////////


//Setup of Level 1 and Gameplay of level 1
window.onload = function (){
    document.getElementById('level1-true').onclick = goToLevel2;
    document.getElementById('level1-fake1').onclick = minusLive;
    document.getElementById('level1-fake2').onclick = minusLive;
}

//Setup of Level 2 and Gameplay of level 2
var goToLevel2 = function(){
    document.getElementById('level1').style.display = 'none';
    document.getElementById('level2').style.display = 'initial';
    increaseProgressBar(2);

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

//Setup of Level 3 and Gameplay of level 3
var goToLevel3 = function(checkLevel2Win){
    document.getElementById('level2').style.display = 'none';
    document.getElementById('level3').style.display = 'initial';
    window.removeEventListener('keypress',checkLevel2Win);
    increaseProgressBar(3);

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

//Setup of Level 4 and Gameplay of Level 4
var checkWinOrder4 = [];
var assignedColors = [];
var clearDisplayId = null ;

var checkLevel4win = function(){
    clearDisplayId = this.id;
    var id=parseInt(this.id);

    this.style.backgroundColor=assignedColors[id];
    setTimeout(function(){
        document.getElementById(clearDisplayId).style.backgroundColor='#B4B8C5';
    },100);

    if (id === checkWinOrder4[0]){
        checkWinOrder4.shift();
        if (checkWinOrder4.length === 0){
            alert('Go to level 5');
        }
    } else {
        minusLive();
    }
}

var initialiseGameButton = function (gameButtons){
    for (var i=0; i<8;i++){
        gameButtons[i].onclick=checkLevel4win;
    }
}

var randomiseColor = function(buttonColorBank) {
    for (var i=0; i<8;i++){
        var colorIndex= Math.floor(Math.random()*4);
        assignedColors.push(buttonColorBank[colorIndex]);
    }
};

var goToLevel4 = function(){
    document.getElementById('level3').style.display = 'none';
    document.getElementById('level4').style.display = 'initial';
    document.getElementById('main-game-area').style.paddingTop = '10px';
    increaseProgressBar(4);

    var gameButtons = document.querySelectorAll('.level4-box');

    var buttonColorBank = ['#337CA0','#3EC300','#FFFC31','#FF1D15'];
    randomiseColor(buttonColorBank);

    var assignedOrder = [];

    while (assignedOrder.length!==8){
        var index = Math.floor(Math.random()*8);
        if (!assignedOrder.includes(index)){
            assignedOrder.push(index);
        }
    }

    var countDisplay = 0;

    var initialise = setInterval(function(){
        var order = assignedOrder.shift();
        checkWinOrder4.push(order);
        gameButtons[order].style.backgroundColor=assignedColors[order];
        setTimeout(function(){
            gameButtons[order].style.backgroundColor='#B4B8C5';
            countDisplay++;
            if(countDisplay===8){
                initialiseGameButton(gameButtons);
                console.log(checkWinOrder4);
                clearInterval(initialise);
            }
        },500)
    },1000)
}