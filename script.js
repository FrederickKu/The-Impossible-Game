window.onload = function (){
    document.getElementById('level1').onclick = goToLevel2;
    document.getElementById('level1-fake1').onclick = minusLive;
    document.getElementById('level1-fake2').onclick = minusLive;
}

var clearBoard = function() {
    var mainGame= document.getElementById('main-game-area')
    for (var i=0; i<=mainGame.childrenlength;i++){
        mainGame.removeChild(mainGame.children[0]);
    }
}

var increaseProgressBar = function(level) {
    var newProgressImage = level*5;
    var newProgressBar = level*10;

    document.getElementById('level-image').style.marginLeft = `${newProgressImage}%`;
    document.getElementById('progress-bar').style.width = `${newProgressBar}%`;
    document.getElementById('level-text').innerText=`Level ${level}`;
}

var minusLive = function(){
    var lives=document.getElementById('lives-container');
    var lastChild = lives.children.length - 1;

    lives.removeChild(lives.children[lastChild]);

    setTimeout(function(){
        if (lives.children.length === 1){
        alert('Game Lose');
    }},50);
}

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

var goToLevel3 = function(checkLevel2Win){
    document.getElementById('level2').style.display = 'none';
    document.getElementById('level3').style.display = 'initial';
    window.removeEventListener('keypress',checkLevel2Win);
    increaseProgressBar(3);

    document.getElementById('level3-answer').onkeypress = function() {
        if(event.keyCode === 13){
            if (this.value === 'backwards'){
                alert('Go to Level 4');
            } else {
                minusLive();
            }
        }
    };

}