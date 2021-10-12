(function($) {
$(document).ready(function(){

  // putting lines by the pre blocks
  $("pre").each(function(){
    var pre = $(this).text().split("\n");
    var lines = new Array(pre.length+1);
    for(var i = 0; i < pre.length; i++) {
      var wrap = Math.floor(pre[i].split("").length / 70)
      if (pre[i]==""&&i==pre.length-1) {
        lines.splice(i, 1);
      } else {
        lines[i] = i+1;
        for(var j = 0; j < wrap; j++) {
          lines[i] += "\n";
        }
      }
    }
    $(this).before("<pre class='lines'>" + lines.join("\n") + "</pre>");
  });

  var headings = [];

  var collectHeaders = function(){
    headings.push({"top":$(this).offset().top - 15,"text":$(this).text()});
  }

  if($(".markdown-body h1").length > 1) $(".markdown-body h1").each(collectHeaders)
  else if($(".markdown-body h2").length > 1) $(".markdown-body h2").each(collectHeaders)
  else if($(".markdown-body h3").length > 1) $(".markdown-body h3").each(collectHeaders)

  $(window).scroll(function(){
    if(headings.length==0) return true;
    var scrolltop = $(window).scrollTop() || 0;
    if(headings[0] && scrolltop < headings[0].top) {
      $(".current-section").css({"opacity":0,"visibility":"hidden"});
      return false;
    }
    $(".current-section").css({"opacity":1,"visibility":"visible"});
    for(var i in headings) {
      if(scrolltop >= headings[i].top) {
        $(".current-section .name").text(headings[i].text);
      }
    }
  });

  $(".current-section a").click(function(){
    $(window).scrollTop(0);
    return false;
  })
});
})(jQuery)


var tOneMonstarz = [
{Name:'Green Slime',Health:[10,10],Defense:1,AttackPower:1,Level:1},
{Name:'Bat',Health:[15,15],Defense:3,AttackPower:3,Level:1},
{Name:'Snake',Health:[22,22],Defense:3,AttackPower:6,Level:1},
{Name:'Feral Cat',Health:[34,34],Defense:5,AttackPower:8,Level:1},
{Name:'Blue Slime',Health:[56,56],Defense:9,AttackPower:5,Level:1},
{Name:'Rat',Health:[35,35],Defense:3,AttackPower:8,Level:1},
{Name:'Fox',Health:[40,40],Defense:8,AttackPower:14,Level:1},
{Name:'Giant Mantis',Health:[72,72],Defense:14,AttackPower:21,Level:1},
{Name:'Giant Worm',Health:[96,96],Defense:18,AttackPower:26,Level:1},
{Name:'Skeleton',Health:[122,122],Defense:22,AttackPower:37,Level:1},
{Name:'Skeletal Warrior',Health:[154,154],Defense:30,AttackPower:46,Level:1},
{Name:'Skeletal Mage',Health:[112,112],Defense:14,AttackPower:58,Level:1}
];
var SpwnVal = 3;
var SpwnDist = 2000;
var MonstarQ = [];
var StVal =[1,1];
var curVal = [1,1];
var SpwnLocs =[];
var PlMxHP = document.getElementById('PlyrMaxHp');
var PlCurHP = document.getElementById('PlyrCurHp');
var PlLv = document.getElementById('PlyrLvl');
var PlDef = document.getElementById('PlyrDef');
var PlAP = document.getElementById('PlyrAP');
var PlExp = document.getElementById('Exp');
var PlPots = document.getElementById('PlyrPots');
var PlGold = document.getElementById('PlyrGold');
var combatScan = function(){
	window.setTimeout(function(){
		if(MonstarQ.length > 0){
		
		let prepMob = MonstarQ[0];
		prepMob.ID = 0;
		CombatCalc(prepMob);
		
	}
	},1000);
};
var StatUI = function(){
	
	window.setInterval(function(){
		PlMxHP.innerHTML = Player.Health[1];
		PlCurHP.innerHTML = "Health: "+Player.Health[0];
		PlLv.innerHTML = "Level: "+Player.Level;
		PlDef.innerHTML = "Defense: "+Player.Defense;
		PlAP.innerHTML = "Attack Power: "+Player.AttackPower;
		PlExp.innerHTML = "Experience: "+Player.Exp;
		PlPots.innerHTML = "Potions: "+Player.Potions;
		PlGold.innerHTML = "Gold: "+Player.Gold;
		
		
		
	},100);
	
};

var getReward = function(monstur){
	Player.Exp += monstur.Health[1];
	LvlChk();
	Player.Gold += Player.Level*2;
	
};

var SetSpawns = function(difficulty){
	
	let diff = difficulty;
	if(diff === "easy"){
		SpwnVal = 4;
		
	}
	if(diff === "normal"){
		SpwnVal = 8;
	}
	if(diff === "hard"){
		SpwnVal = 12;
	}
	else {
		console.log("Difficulty not recognized, Difficulty has been set to easy'.");
		SpwnVal = 4;
	}
};

var Traveling = function(){
	window.setInterval(function(){
	if(curVal[0] >= StVal[0]+SpwnDist || curVal[1] >= StVal[1]+SpwnDist || curVal[0] <= StVal[0] - SpwnDist || curVal[1] <= StVal[1] - SpwnDist){
		
		let RndRoll = Math.floor(Math.random()*SpwnVal);
		MonstarQ.push(tOneMonstarz[RndRoll]);
	}
	
},10000);
	
}

var StartAdventure = function(){
	let difPrompt = prompt('Select a difficulty Enter "easy","normal", or "hard"').toLowerCase();
	SetSpawns(difPrompt)
Traveling();
	combatScan();
	


};

var BuyPotion = function(){
	if(Player.Gold >= (Player.Level+5)){
		Player.Gold -= Player.Level+5;
		Player.Potions+=1;
	} else {
		alert('Pockets on "E" bro..');
		console.log("You broke bastard, you know you cant afford it!");
	}
};

var ToggleAutoPot = function(){
	if(Player.AutoPot === true){
		Player.AutoPot = false;
	} else { Player.AutoPot = true;}
};
var UsePotion = function(){
	if(Player.Potions >= 1){
	Player.Health[0] += (Math.Floor(Player.Health[1]/5));
	console.log("You've used a potion.");
	Player.Potions -=1;
	}
};

var Player = {
AutoPot:true,
Health:[100,100],
AttackPower: 3,
Potions:20,
Defense:5,
Level:1,
Gold:50,
Exp: 0
};

var statIncMod = function(){
 return Math.round(Math.random()*6);

};

var ChkStats = function(){

//change from sending dat to console to sending dat to a text window
console.log("Level: "+Player.Level);
console.log("Health: "+Player.Health);
console.log("Defense: "+Player.Defense);
console.log("Attack Power: "+Player.AttackPower);

};

var LvlChk = function(){
if(Player.Exp >= Math.Round(Player.Level* 50)){
Player.Level +=1;
Player.Exp = 0;
Player.Defense += statModInc();
Player.AttackPower += statModInc();
Player.Health[1]  += statModInc();
Player.Health[1] += 20;

console.log('Player has gained a level!');
ChkStats();
}
};

var Relax = function(){
var id = window.setInterval(function() {}, 0);
while (id--) {
    window.clearInterval(id); // will do nothing if no id is present
};	
};

var CombatCalc = function(monstar){
	monstar.Level = Player.Level;
	monstar.Defense += Player.Level;
	monstar.AttackPower += Player.Level;
	monstar.Health[0] += (Player.Level*3);
	monstar.Health[1] += (Player.Level*3);
	
	//Player Attack
	window.setInterval(function(){
		monstar.Health[0] -= (Player.AttackPower -(Math.floor(monstar.Defense/3)))+1;
		console.log("You hit "+monstar.Name+" for"+Player.AttackPower+"!");
	if(monstar.Health[0] <=0){
		
		getReward(monstar);
		MonstarQ.splice(monstar.ID,1);
		console.log(monstar.Name+" was defeated!");

var id = window.setInterval(function() {}, 0);
while (id--) {
    window.clearInterval(id); // will do nothing if no id is present
};

combatScan();
Traveling();
	}
		
	
	
	},1000);
	
	//Munster Attack
window.setInterval(function(){
		Player.Health[0] -= monstar.AttackPower;
			console.log(monstar.Name+" hit you for "+monstar.AttackPower+"!");
			if(Player.Health[0] <= 10){
				var id = window.setInterval(function() {}, 0);
while (id--) {
    window.clearInterval(id); // will do nothing if no id is present
	
	console.log("You must recover your health before you can continue your adventure");
};
				
			}
		if(Player.Health <= (Player.Health - (Player.Health/5)) && Player.AutoPot === true){
			if(Player.Potions <= 0){
				console.log('Out of Potions, you should purchase some potions');
				document.getElementByID('potIco').style.visibility = "visible";
			}
			else {
			UsePotion();
			document.getElementByID('potIco').style.visibility = "hidden";
			}
		}
	},2000);
	
};


var grabLocDat = function(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(locateMe);
		
	} else {
		
		//log browser does not support geolocation api
	}
};
var locateMe = function(position){
	if(StVal[0] === 1){
	StVal[0] = position.coords.latitude;
	StVal[1] = position.coords.longitude;
	}
	curVal[0] = position.coords.latitude;
	curVal[1] = position.coords.longitude;
	
};
window.setTimeout(function(){
	grabLocDat();
	
},1500);

window.onload = function(){
	
	StatUI();
	
};






var SaveCharacter = function(){
//add player save constructor
let charSave = JSON.stringify(Player);
window.localStorage.setItem(Player.Name,charSave);
console.log(Player.Name+" was saved successfully.");
};
var LoadCharacter = function(){
	
	 var enterName = prompt("Enter your exact character name as its spelled.");
	var charDat = JSON.parse(window.localStorage.getItem(enterName));
	//add new player load function 
  Player = charDat;
  console.log(Player.Name+" was loaded successfully.");
  };
