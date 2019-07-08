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
    var newProgressBar = level*10;

    document.getElementById('progress-bar').style.width = `${newProgressBar}%`;
    document.getElementById('level-text').innerText=`Level ${level}`;

    var imageMargin = document.getElementById('progress-bar').offsetWidth;
    imageMargin-=20;
    document.getElementById('level-image').style.marginLeft = `${imageMargin}px`;
}

// Changes to number of lives after error
var minusLive = function(){
    var lives=document.getElementById('lives-container');
    var lastChild = lives.children.length - 1;

    lives.removeChild(lives.children[lastChild]);

    setTimeout(function(){
        if (lives.children.length === 1){
        var gamelose = document.getElementById('gamelose');

        document.getElementById('header').style.opacity = 0.2;
        document.getElementById('main-game-area').style.opacity=0.2;
        document.getElementById('footer').style.opacity=0.2;
        document.getElementById('gamelose').style.display='initial'

        document.getElementById('restart-game2').addEventListener('click', function() {
            location.reload();
        });
    }},50);
}

///////////////////////////////////////////////
//Main Level Functions
//////////////////////////////////////////////

////////////////////////////////////////////
//Setup of Level 1 and Gameplay of level 1
////////////////////////////////////////////
window.onload = function (){
    document.getElementById('level1-true').onclick = goToLevel2;
    document.getElementById('level1-fake1').onclick = minusLive;
    document.getElementById('level1-fake2').onclick = minusLive;
}

////////////////////////////////////////////
//Setup of Level 2 and Gameplay of level 2
////////////////////////////////////////////
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

///////////////////////////////////////////////
//Setup of Level 3 and Gameplay of level 3
///////////////////////////////////////////////
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

//////////////////////////////////////////////
//Setup of Level 4 and Gameplay of Level 4
//////////////////////////////////////////////
//need to solve extra scroll on touch pad
// var dotCount = 0;

var goToLevel4 = function(){
    document.getElementById('level3').style.display = 'none';
    document.getElementById('level4').style.display = 'initial';
    document.getElementById('main-game-area').style.paddingTop = '50px';
    increaseProgressBar(4);

    document.getElementById('lives-title').onclick=minusLive;
    document.getElementById('level4-fake').onclick=minusLive;
    document.getElementById('dot2').onclick=minusLive;

    var dotOne = document.getElementById('dot1');

    //Scrolling of wheel to shrink the dot
    dotOne.addEventListener('wheel', function(){
        var width = this.offsetWidth;
        var marginTop = this.style.marginTop;

        if (marginTop ==='100px' && width ==='3px'){
           return;
        }

        width = width - 18.5;

        this.style.width=`${width}px`;
        this.style.height=`${width}px`;

        if (marginTop.length > 0 && marginTop!=='100px'){
            marginTop = marginTop.substr(0,2);
            marginTop = parseInt(marginTop) + 10;

            this.style.marginTop=`${marginTop}px`;

        } else {
            this.style.marginTop = '10px';
        }
    })

    //dot win check
    dotOne.onclick = function(){
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

////////////////////////////////////////////
//Setup of Level 5 and Gameplay of Level 5
////////////////////////////////////////////
var catMove = function() {
    var cat=document.getElementById('cat');
    var newLength = Math.floor(Math.random()*1100);
    var newHeight = Math.floor(Math.random()*400);

    cat.style.top = `${newHeight}px`;
    cat.style.left = `${newLength}px`;
}

var dogMove=function() {
    document.querySelector('body').removeEventListener('mouseover',catMove);
    document.getElementById('main-game-area').removeEventListener('click',minusLive);

    var cat=document.getElementById('cat');
    var dog=document.getElementById('level-image');

    document.getElementById('level5-container').prepend(dog);

    cat.style.position = 'static';
    cat.style.top = '0px';
    cat.style.left = '0px';

    dog.style.display = 'inline-block';
    dog.style.width = '50px';
    dog.style.marginLeft = 0;
}

var goToLevel5 = function(){
    document.getElementById('level4').style.display = 'none';
    document.getElementById('level5').style.display = 'initial';
    increaseProgressBar(5);

    var cat=document.getElementById('cat');
    var body=document.querySelector('body');
    var dog=document.getElementById('level-image');

    cat.onclick = function(){
        goToLevel6();
    }

    body.onmouseover=catMove;
    dog.onclick = dogMove;

    setTimeout(function() {
        document.getElementById('main-game-area').addEventListener('click',minusLive);
    },200);
}


////////////////////////////////////////////
//Setup of Level 6 and Gameplay of Level 6
///////////////////////////////////////////
var resetLevel5 = function(){
    var dog = document.getElementById('level-image');

    document.querySelector('.progress-container').prepend(dog);
    dog.removeEventListener('click',dogMove);
    dog.style.display='block';
    dog.style.width='30px';

}

var mainIndex6 = [10,11,12,13,14,15,16,17,18,19];
var iconColorBank = ['#FB5012','#01FDF6','#CBBAED','#E9DF00','#03FCBA'];

var changeNextNumber = function(){
    var id = this.id;
    id=parseInt(id);
    if (mainIndex6.length >=6 && id===mainIndex6[0]){
        this.style.display='none';
        mainIndex6.shift();

        var currentIndex=document.getElementById(`${mainIndex6[0]}`);
        currentIndex.removeEventListener('click',minusLive);
        currentIndex.onclick=changeNextNumber;
    }else if(mainIndex6.length === 5 && id===mainIndex6[0]){
        this.style.display='none';
        document.getElementById('level6-text1').style.display='none';
        document.getElementById('level6-text2').style.display='initial';
        mainIndex6.shift();

        var length = mainIndex6.length;

        var currentIndex=document.getElementById(`${mainIndex6[length-1]}`);
        document.getElementById(`${mainIndex6[0]}`).removeEventListener('click',minusLive);
        currentIndex.onclick=changeNextNumber;

    }else if ((mainIndex6.length<5 && mainIndex6.length>0) && (id===mainIndex6[mainIndex6.length-1])) {
        this.style.display='none';
        mainIndex6.pop();

        if(mainIndex6.length===0){
            this.style.display = 'none';
            goToLevel7();
            return;
        }

        var length = mainIndex6.length;

        var currentIndex=document.getElementById(`${mainIndex6[length-1]}`);
        currentIndex.removeEventListener('click',minusLive);
        currentIndex.onclick=changeNextNumber;
    }
}

var goToLevel6 = function(){
    document.getElementById('level5').style.display = 'none';
    document.getElementById('level6').style.display = 'initial';
    resetLevel5();
    increaseProgressBar(6);

    for (var i=0; i<10; i++){
        var fontSize=Math.floor(Math.random()*71);
        var randomColor = Math.floor(Math.random()*5);
        if (fontSize<30){
            fontSize+=30
        }

        document.getElementById(`${mainIndex6[i]}`).style.fontSize=`${fontSize}px`;
        document.getElementById(`${mainIndex6[i]}`).style.color = iconColorBank[randomColor];
    }

    document.getElementById(`${mainIndex6[0]}`).onclick=changeNextNumber;

    for (var j=1; j<10; j++){
        document.getElementById(`${mainIndex6[j]}`).onclick=minusLive;
    }


}

//////////////////////////////////////////////
//Setup of Level 7 and Gameplay of Level 7
/////////////////////////////////////////////
var checkWinOrder7 = [];
var assignedColors = [];
var clearDisplayId = null ;

var checkLevel7Win = function(){
    clearDisplayId = this.id;
    var id=parseInt(this.id);

    this.style.backgroundColor=assignedColors[id];
    setTimeout(function(){
        document.getElementById(clearDisplayId).style.backgroundColor='#B4B8C5';
    },100);

    if (id === checkWinOrder7[0]){
        checkWinOrder7.shift();
        if (checkWinOrder7.length === 0){
            goToLevel8();
        }
    } else {
        minusLive();
    }
}

var initialiseGameButton = function (gameButtons){
    for (var i=0; i<8;i++){
        gameButtons[i].onclick=checkLevel7Win;
    }
}

var randomiseColor = function(buttonColorBank) {
    for (var i=0; i<8;i++){
        var colorIndex= Math.floor(Math.random()*4);
        assignedColors.push(buttonColorBank[colorIndex]);
    }
};

var goToLevel7 = function(){
    document.getElementById('level6').style.display = 'none';
    document.getElementById('level7').style.display = 'initial';

    document.getElementById('main-game-area').style.paddingTop = '10px';
    increaseProgressBar(7);

    var gameButtons = document.querySelectorAll('.level7-box');

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
        checkWinOrder7.push(order);
        gameButtons[order].style.backgroundColor=assignedColors[order];
        setTimeout(function(){
            gameButtons[order].style.backgroundColor='#B4B8C5';
            countDisplay++;
            if(countDisplay===8){
                initialiseGameButton(gameButtons);
                console.log(checkWinOrder7);
                clearInterval(initialise);
                document.getElementById('level7-board-text').innerText='';
            }
        },500)
    },1000)
}

////////////////////////////////////////////
//Setup of Level 8 and Gameplay of Level 8
////////////////////////////////////////////
var mainIndex8 = [20,21,22,23,24,25,26,27,28];
var previousEight = null;
var levelSuccess = false;

var success8 = function() {
    levelSuccess=true;
    goToLevel9();
}

var goToLevel8 = function(){
    document.getElementById('level7').style.display = 'none';
    document.getElementById('level8').style.display = 'initial';
    document.getElementById('main-game-area').style.paddingTop = '50px';

    increaseProgressBar(8);

    var fakeEights = document.querySelectorAll('level8-fake');
    fakeEights.forEach (function(){
        this.addEventListener('click',minusLive);
    });

    var trueEights = document.querySelectorAll('level8-true');
    trueEights.forEach (function(){
        this.addEventListener('click',minusLive);
    });


    var subIndex = Math.floor(Math.random()*9);
    var realEight = document.getElementById(`${mainIndex8[subIndex]}`);
    previousEight = realEight;

    realEight.innerText = '8';
    realEight.removeEventListener('click',minusLive);
    realEight.onclick = success8;

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
    },2000);
}

//////////////////////////////////////////////
//Setup of Level 9 and Gameplay of Level 9
/////////////////////////////////////////////
var time = {
    hundredMilli: 0,
    tenthMilli: 0,
    secondOnes: 0,
    secondTenths: 0,
    stopPress: false,
    levelClear: false
}

var checkTime = function(){

    console.log(`${time.secondTenths}${time.secondOnes}:${time.tenthMilli}${time.hundredMilli}`);
    if (time.secondTenths === 1 && time.secondOnes === 0) {
        if (time.tenthMilli <=2){
            time.levelClear=true;
            alert('go to level 10');
        } else {
            minusLive();
        }
    } else if (time.secondTenths === 0 & time.secondOnes === 9){
        if (time.tenthMilli >= 8){
            time.levelClear=true;
            alert('go to level 10');
        } else {
            minusLive()
        }
    } else {
        minusLive();
    }
}

var startTime = function(){
    document.getElementById('start-clock').style.display = 'none';
    document.getElementById('stop-clock').style.display = 'initial';

    time.hundredMilli = 0;
    time.tenthMilli = 0;
    time.secondOnes = 0;
    time.secondTenths = 0;

    var timerStart = setInterval(function(){
        console.log('trigger');
        time.hundredMilli++;
        if (time.hundredMilli === 10){
            time.hundredMilli = 0;
            time.tenthMilli++;
        }

        if (time.tenthMilli === 10){
            time.tenthMilli = 0;
            time.secondOnes++;
        }

        if (time.secondOnes === 10){
            time.secondOnes = 0;
            time.secondTenths ++;
        }

        document.getElementById('clock-text').innerText = `${time.secondTenths}${time.secondOnes}:${time.tenthMilli}${time.hundredMilli}`;

        if ((time.secondOnes === 1 && time.secondTenths === 1)|| time.stopPress){
            clearInterval(timerStart);
            checkTime();
            if (!time.levelClear) {
                time.stopPress=false;
                document.getElementById('start-clock').style.display='initial';
                document.getElementById('stop-clock').style.display = 'none';
            }
        }
    })
}

var stopTime = function () {
    time.stopPress = true;
}

var goToLevel9 = function(){
    document.getElementById('level8').style.display = 'none';
    document.getElementById('level9').style.display = 'initial';
    document.getElementById('main-game-area').style.paddingTop = '20px';

    increaseProgressBar(9);

    document.getElementById('start-clock').style.display='initial';
    document.getElementById('stop-clock').style.display = 'none';

    document.getElementById('start-clock').onclick = startTime;
    document.getElementById('stop-clock').onclick = stopTime;
}

//////////////////////////////////////////////
//Setup of Level 10 and Gameplay of Level 10
//////////////////////////////////////////////
var goToLevel10 = function() {
    document.getElementById('level9').style.display = 'none';
    document.getElementById('level10').style.display = 'initial';

    increaseProgressBar(10);

    document.getElementById('level10-answer').onkeypress = function() {
        if(event.keyCode === 13){
            if (this.value === 'What'){
                document.getElementById('level10').style.display = 'none';
                document.getElementById('gamewon').style.display = 'initial';

                document.getElementById('restart-game2').addEventListener('click', function() {location.reload();});
            } else {
                minusLive();
            }
        }
    };
}