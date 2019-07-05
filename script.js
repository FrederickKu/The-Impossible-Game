window.onload = function (){
    document.getElementById('level1').addEventListener('click',function(){
        alert('You have found the Start!');
    });

    document.getElementById('level1-fake1').addEventListener('click',minusLive);

    document.getElementById('level1-fake2').addEventListener('click',minusLive);
}

var clearBoard() = function {
    var mainGame= document.getElementById('main-game-area')

    for (var i=0; i<=mainGame.childrenlength;i++)
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
    clearBoard();

}