// Level 4 Version 1
//Inside wheelevent
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



// Level 6 Version 1

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
//////////////////////////////////////////////////////////////////////////////////////////////