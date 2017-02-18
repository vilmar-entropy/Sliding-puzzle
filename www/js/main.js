var good = 0;

var time = 0;
var lost = 0;
var empty = 0;
var sec = 0;
var min = 0;

function start() { /*
     //alert("started");
     $('#start').hide();
      $('#press').hide();
      $('#viewFinalImage').show();
       $('#main').show();
       $('#stats').show(); */
       $('#pageOne').hide();
       $('#pageTwo').show();
}

function showMainPage() { /*
       $('#main').hide();
       $('#stats').hide();
        $('#start').show();
      $('#press').show();
      $('#viewFinalImage').hide(); */
      $('#pageTwo').hide();
      $('#pageOne').show();
}

function reload() {
    window.location.reload(true);
}

function counttime(){
	time++;
	if(time < 1800){ // game will end after 30 minutes
	min = Math.floor(time/60);
	sec = time%60;
		document.getElementById("time").innerHTML = min + ":" + sec  ;
		setTimeout("counttime()",1000);
	}else{
		lost = 1;
		var htm = "Timeout! You lose!";
		document.getElementById("stats").innerHTML = htm;
		
	}
}
// correct image position (before shuffle)
var imgs = Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,'x');

function initialShuffle(){
	for(var i = 0; i < imgs.length; i++){
		var n = Math.floor((Math.random() * 15));
		var temp = imgs[i];
		imgs[i] = imgs[n];
		imgs[n] = temp;
		
		document.getElementById("position"+i).style.display = "block";
		document.getElementById("position"+n).style.display = "block";
		
		if(imgs[i] == 'x'){
			empty = i;
			document.getElementById("position"+i).style.display = "none";
		}else if(imgs[n] == 'x'){
			empty = n;
			document.getElementById("position"+n).style.display = "none";
		}
		document.getElementById("position"+i).innerHTML = "<img class='pcs' src='pieces/"+imgs[i]+".png'>";
		document.getElementById("position"+n).innerHTML = "<img class='pcs' src='pieces/"+temp+".png'>";
	}
}

// squares to where each piece is allowed to move
var moves = Array();
moves[0] = Array(1,4);
moves[1] = Array(0,2,5);
moves[2] = Array(1,3,6);
moves[3] = Array(2,7);
moves[4] = Array(0,5,8);
moves[5] = Array(1,4,6,9);
moves[6] = Array(2,5,7,10);
moves[7] = Array(3,6,11);
moves[8] = Array(4,9,12);
moves[9] = Array(5,8,10,13);
moves[10] = Array(6,9,11,14);
moves[11] = Array(7,10,15);
moves[12] = Array(8,13);
moves[13] = Array(9,12,14);
moves[14] = Array(10,13,15);
moves[15] = Array(11,14);


function in_array(needle, haystack){
	for(var i = 0; i < haystack.length; i++){
		if(needle == haystack[i]){
			return true;
		}
	}
	return false;
}

function move(num){
	// do not allow moves if game was lost:
	if(lost == 1) return 0;
	// start counting time on first move:
	if(time == 0) counttime();
	// check if pressed piece is allowed to move:
	if(in_array(empty,moves[num])){
		var temp = imgs[num];
		imgs[num] = imgs[empty];
		imgs[empty] = temp;
		
		var piece = document.getElementById("position"+num).innerHTML;
		var blank = document.getElementById("position"+empty).innerHTML;
		document.getElementById("position"+num).innerHTML = blank;
		document.getElementById("position"+num).style.display = "none";
		//imgs[num] = blank;
		document.getElementById("position"+empty).innerHTML = piece;
		document.getElementById("position"+empty).style.display = "block";
		//imgs[empty] = num;
		empty = num;
		countMoves(1);
		checkResults();
	}else{
		countMoves(0);
	}
}
function countMoves(m){
	if(m == 1){
		good +=1;
		document.getElementById("good").innerHTML = good;
	}
}

function checkResults(){
	var countCorrect = 0;
	for(var i = 0; i < imgs.length;i++){
		if(imgs[i] == i){
			countCorrect ++;
		}
	}
	document.getElementById("badto").innerHTML = "Correct: "+countCorrect;
	if(countCorrect == 15){
		$('#main').html("<figure class='title'> <img id ='finalImage' src='Img/keyle.jpg' onclick='reload();'>  </figure>");
		$('#toResult').append("<center><h1>Congrats Keylalou! </h1></center>");
		  $('#stats').hide();
      $('#viewFinalImage').hide();
		//alert ("CONGRATULATIONS!\n You've finished the puzzle in "+min+":" + sec +" with "+good+ " moves.");
		lost = 1;
	}
}














