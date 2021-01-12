let c;
let ctx;
let line = 60;
let loaded = false;
let player = {};
let counter = 0;
let currentLocationId = "Shell";
let items = [false,false,false,false,false];
let itemName = ["Manual","Key","Car Key","Torch","3080"];
let textColour = "white"
let locations = $.extend(true, {}, originalLocations );
let today;
let enteredCommands = [];
let commandCount = 0;
let helpCount = 0;
let ip;
let i = 0;
player.money = 0;
player.inventory = [];

function restart(){
	currentLocationId = 0;
	locations = $.extend(true, {}, originalLocations );
	items = [false,false,false,false,false];
	itemName = ["Manual","Key","Car Key","Torch","3080"];
	player.money = 0;
	$("#balance").html("£" + player.money);
	player.inventory = [];
	$("#torch").css("visibility","hidden");
	$("#manual").css("visibility","hidden");
	$("#key").css("visibility","hidden");
	$("#3080").css("visibility","hidden");
	$("#carKey").css("visibility","hidden");
	$("#inventory").show();
	$("#inputArea").show();
	draw();
	loadScript();
}

function getIP(){
	fetch("https://icanhazip.com").then(res => res.text()).then(function(data){
		return data.toString();
	});
}

let keys = [
	new Audio("./sound/key1.mp3"),
	new Audio("./sound/key2.mp3"),
	new Audio("./sound/key3.mp3"),
	new Audio("./sound/key4.mp3")
];

function typeSound() {
	let i = Math.floor(Math.random() * keys.length);
	keys[i].currentTime = 0;
	keys[i].play();
}


$(document).click(function(e){
	document.getElementById("input").focus(); // Reselects input box
});

function toggleMusic(){
	let music = document.getElementById('musicPlayer');
	let button = document.getElementById("playPauseButton");
	if(music.paused){
		music.play();
		button.innerHTML = "<i class='fas fa-pause'></i>"
	}else{
		music.pause();
		button.innerHTML = "<i class='fas fa-play'></i>"
	}
}

function typeHelp(){
	let input = "./textAdventure"
	if (i < input.length) {
		let value = $("#input").val() + input.charAt(i);
		$("#input").val(value)
		i++;
		setTimeout(typeHelp, 100);
	  }else{
		setTimeout(shellMenu, 300);
	  }
}

function help(){
	switch(helpCount){
		case 0:
			addText("Use ls to find available files","orange");
			addText("The prefix ./ is used to run executable files indicated with a green colour","orange");
		break;
		case 1:
			addText("Try ./textAdventure","orange");
		break;
		case 2:
			addText("Fine I'll start it for you","red");
			$("#input").val("");
			typeHelp();
		break;
	}
	helpCount++;
}

$(document).ready(function (){
	draw();
	today = new Date();
	today = today.toUTCString();
	fetch("https://icanhazip.com").then(res => res.text()).then(function(data){
		ip = data;
		addText(`Welcome to Ubuntu 20.04.1 LTS (GNU/Linux 5.4.0-54-generic x86_64)\n\n * Documentation:  https://help.ubuntu.com\n * Management:     https://landscape.canonical.com\n * Support:        https://ubuntu.com/advantage\n\n  System information as of ${today}\n\n  System load:  0.17              Processes:             115\n  Usage of /:   5.7% of 38.60GB   Users logged in:       0\n  Memory usage: 68%               IPv4 address for ens3: ${ip}\n  Swap usage:   0%\n\n * Introducing self-healing high availability clusters in MicroK8s.\n   Simple, hardened, Kubernetes for production, from RaspberryPi to DC.\n\n     https://microk8s.io/high-availability\n`)
	
	});
	document.getElementById("inputArea").style.top = (line-10) + "px";
	let input = document.getElementById("input");
	input.addEventListener("keydown", function(event) {
		typeSound();
	});
	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			commandCount = enteredCommands.length + 1;
			if(currentLocationId != "Shell"){
				parseInput();
			}else{
				shellMenu();
			}
		}else if(event.keyCode === 38){
			if(commandCount > 0)commandCount--;
			$("#input").val(enteredCommands[commandCount]);
		}else if(event.keyCode === 40){
			if(commandCount < enteredCommands.length)commandCount++;
			$("#input").val(enteredCommands[commandCount]);
		}
	});
	window.addEventListener("keyup",function(event){
		if(currentLocationId != 5)return;
		$("#input").val("");
		useShop(event.key);
	});
});


function shellMenu(){
	let input = $("#input").val();
	input = input.split(" ");
	enteredCommands.push($("#input").val());
	if(!loaded)addText("root@mainframe:~$ " + $("#input").val(),"white");
	$("#input").val("");
	if(!loaded){
		switch(input[0]){
			case "ls":
				addText("textAdventure","green");
			break;
			case "./textAdventure":
				textColour = "#20C20E"
				$("#helpButton").remove();
				draw();
				addText("Loading Game...");
				addText("Unpacking assets");
				addText("Drawing inventory");
				$("#inventory").css("visibility","visible");
				addText("Drawing controls");
				$("#menu").css("visibility","visible");
				addText("Do you want music? \nNOTE: This can be changed later in the bottom right \n	Press 1 for yes \n	Press 2 for no");
				loaded = true;
				$("#inputIndicator").html("> ");
				$("#inputIndicator").css("color","#20C20E");
				enteredCommands = [];
				commandCount = 0;
			break;
			default:
				if(input[0] != ""){
					addText(`Command '${input[0]}' not found`);
				}else{
					addText("");
				}
			break;
				
		}
	}else{
		let button = document.getElementById("playPauseButton");
		if(input == "1"){		
			document.getElementById("musicPlayer").play();
			button.innerHTML = "<i class='fas fa-pause'></i>";
			currentLocationId = 0;
			enteredCommands = [];
			commandCount = 0;
			draw();
			loadScript();
		}else if(input == "2"){
			button.innerHTML = "<i class='fas fa-play'></i>";
			currentLocationId = 0;
			enteredCommands = [];
			commandCount = 0;
			draw();
			loadScript();
		}
	}
}


function draw(){
	let height = window.innerHeight *0.99; // Sets canvas height to fit scaling
	let width = window.innerWidth;   // Sets canvas width to fit scaling
	line = 20;
	canvas = document.getElementById("gameCanvas");
	document.getElementById("input").focus();
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function cheat(){
	textColour = "#" + Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("musicPlayer").volume = 1;
	document.getElementById("musicPlayer").play();
	document.getElementById("menu").style.visibility = "hidden";
	setInterval(function(){
		textColour = "#" + Math.floor(Math.random()*16777215).toString(16);
		document.getElementById("game").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
		document.getElementById("input").style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
	},100)
	draw();
	loadScript();
}

function notCheats(){
	items =  [true,true,true,true,true];
	player.money = 30000000;
}

function addText(text , fontColour = textColour){
	if(currentLocationId != 5 && currentLocationId != "Shell")document.getElementById("inputIndicator").innerHTML = "> ";
	if(text != -1){    
		ctx.font = "20px monospace"
		ctx.fillStyle = fontColour;
		text = text.split("\n");
		for(let i = 0;i<text.length;i++){  
			ctx.fillStyle = fontColour; //Resets the text color
			ctx.fillText(text[i],10,line); //Adds text to canvas
			line += 20;
			if (line > (window.innerHeight*0.99) -20 )scroll(20); // Auto Scrolls if necessary 
			document.getElementById("inputArea").style.top = (line-10) + "px";
		}
		if (line > (window.innerHeight*0.99) -20 )scroll(20); // Auto Scrolls if necessary 
	}
}

function addArt(art){
	ctx.font = "20px monospace"
	ctx.fillStyle = textColour;
	art = art.split("\n");
	for(let i = 0;i<art.length;i++){  
		ctx.fillText(art[i],10,line);
		line += 10;
		if (line > (window.innerHeight*0.99) ) scroll(10);
		document.getElementById("inputArea").style.top = (line-10) + "px";
	}
	line +=10;
	if (line > (window.innerHeight*0.99)) scroll(10);
	document.getElementById("inputArea").style.top = (line-10) + "px";
}

function scroll(dy) {
	let imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
	ctx.putImageData(imgData, 0, -dy);
	ctx.clearRect(0, window.innerHeight-dy, window.innerWidth, dy);
	line -= dy;
	if (line > (window.innerHeight*0.99) - 20)scroll(20);
	
}

function loadScript(){
	if(currentLocationId != 5){ //Checks if shop
		addText(locations[currentLocationId].script);
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("input").focus(); 
		if(currentLocationId != 2 && currentLocationId != 9)addText("\nYou can :"); //Checks if the player can move
		addText(locations[currentLocationId].optionNames);
		if(locations[currentLocationId].items.length != 0){
			addText("\nOr pickup:");
			addText(locations[currentLocationId].items.join("\n"));
		}
	}else{
		loadShop()
	}
	if(currentLocationId == 2){ //Checks for victory
		addArt(asciiMario);
		$("#inventory").hide();
		$("#inputArea").hide();
	}
}

function loadShop(){
	document.getElementById("inputIndicator").innerHTML = "";
	document.getElementById("input").style.visibility = "hidden";
	addText("    Welcome to the shop");
	addText("┌───┬──────────┬─────────┐");
	addText("│ID │ ITEM     │    Price│");
	if(!items[3] || !items[4])addText("├───┼─BUY──────┼─────────┤");
	if(!items[3])addText("│1  | Torch    │    £10  │");
	if(!items[4])addText("│2  | RTX 3080 │    £260 │");
	if(items[3] || items[4])addText("├───┼─SELL─────┼─────────┤");
	if(items[3])addText("│3  | Torch    │    £10  │");
	if(items[4])addText("│4  | RTX 3080 │    £260 │");
	addText("└───┴──────────┴─────────┘");
	addText("Enter the ID to buy/sell a item");
	addText("Enter 0 to exit");
	// addText("Your current balance is : £"+player.money);
	useShop();
}

function useShop(input){
	switch(input){
		case "0":
			currentLocationId = 0;
			draw();
			loadScript();
		break;
		case "1":
			if(player.money >= 10){
				if(!items[3]){
					items[3] = true;
					player.money -= 10;
					draw();
					loadScript();
					addText("You have bought the TORCH");
					addArt(asciiTorch);
					player.inventory.push("TORCH");
					$("#torch").css("visibility","visible");
				}else{
					addText("You already have the TORCH")
				}
			}else{
				addText("You need £10 to buy TORCH")
			}
		break;
		case "2":
			if(player.money >= 260){
				if(!items[4]){
					items[4] = true;
					player.money -= 260;
					draw();
					loadScript();
					addText("You have bought the RTX 3080");
					addArt(ascii3080);
					player.inventory.push("RTX 3080");
					$("#3080").css("visibility","visible");
				}else{
					addText("You already have the RTX 3030");
				}
			}else{
				addText("You need £260 to buy RTX 3080");
			}
		break;
		case "3":
			if(items[3]){
				items[3] = false;
				player.money +=10;
				draw();
				loadScript();
				addText("You sold the TORCH");
				addArt(asciiTorch);
				$("#torch").css("visibility","hidden");
				player.inventory.splice(player.inventory.indexOf("TORCH"),1);
			}else{
				addText("You don't have a TORCH to sell")
			}
		break;
		case "4":
			if(items[4]){
				items[4] = false;
				player.money +=260;
				draw();
				loadScript();
				addText("You sold the RTX 3080");
				$("#3080").css("visibility","hidden");
				addArt(ascii3080);
				player.inventory.splice(player.inventory.indexOf("RTX 3080"),1);
			}else{
				addText("You don't have a RTX 3080 to sell")
			}
		break;
	}
	$("#balance").html("£" + player.money);
}

function manual(){
	addText("Welcome to (INSERT NAME HERE) \nTo get started read the prompt and make a decision \nI suggest starting with the car \nTo view all available commands type ?");
}

function pickup(item){
	let areaItems = locations[currentLocationId].items;
	if(areaItems.indexOf(item) != -1){
		switch(item){
			case "MANUAL":
				addText("You have picked up"); 
				items[0] = true;
				addArt(asciiManual);
				$("#manual").css("visibility","visible");
				player.inventory.push(item);
			break;
			case "KEY":
				addText("You have picked up");
				items[1] = true;
				addArt(asciiKey);
				$("#key").css("visibility","visible");
				player.inventory.push(item);
			break;
			case "CAR KEY":
				addText("You have picked up"); 
				items[2] = true;
				addArt(asciiCarKey);
				$("#carKey").css("visibility","visible");
				player.inventory.push(item);
			break;
			case "TORCH":
				addText("You have picked up"); 
				items[3] = true;
				addArt(asciiTorch);
				$("#torch").css("visibility","visible");
				player.inventory.push(item);
			break;
			case "MONEY":
				player.money += locations[currentLocationId].moneyValue;
				locations[currentLocationId].moneyValue = 0;
				addText("You have picked up");
				addArt(asciiMoney);
				$("#balance").html("£" + player.money);
				addText("Your balance is now £" + player.money);
			break;
		}
		areaItems.splice(areaItems.indexOf(item),1);
		locations[currentLocationId].items = areaItems;
		
		
	}else{
		addText("You can not pickup "+item);
	}
}

function viewInventory(){
	if(player.inventory.length>0){
		addText("You are currently holding");
		for(let i = 0;i<player.inventory.length;i++){
			addText(" -  " + player.inventory[i]);
		}
	}else{
		addText("You are currently not holding anything");
	}
}

function helpMenu(){
	addText("Available Commands:");
	addText("   Take => Take item");
	addText("   Inventory(inv) => View Inventory");
	addText("   Balance(bal) => View Balance");
	addText("   Clear => Clears screen");
	addText("   Look => Looks around");
	addText("   Restart => Restarts the game");
}


function parseInput(){
	let input = $("#input").val().toUpperCase();
	addText("> " + $("#input").val(),"white");
	input = input.split(" ");
	enteredCommands.push($("#input").val());
	$("#input").val("");
	found = false;
	for(let i = 0;i<locations[currentLocationId].optionID.length;i++){
		inputValue = parseInt(input[0],10);
		if(locations[currentLocationId].optionID[i] == inputValue){
			let met = true;
			for(let x = 0; x<locations[locations[currentLocationId].optionMethod[i]].requirements.length;x++){
				if(!items[locations[locations[currentLocationId].optionMethod[i]].requirements[x]])met = false; //Find the requirements tied to the input given by the user using the 
			}
			if(met){
				currentLocationId = locations[currentLocationId].optionMethod[i]; // Chages current loacation to requested location
				draw();
				loadScript();
				found = true;
			}else{
				addText(locations[locations[currentLocationId].optionMethod[i]].errorScript);
				found = true;
			}
		}
	}
	if(!found){
		if(currentLocationId != 5){
			switch(input[0]){
				case "LOOK":
					loadScript();
				break;
				case "CLEAR":
					draw();
					loadScript();
				break;
				case "TAKE":
					input.shift();
					pickup(input.join(" "));
				break;
				case "READ":
					if(items[0])manual()
					else{addText("You need the MANUAL to read the MANUAL");}
				break;
				case "INVENTORY":
					viewInventory();
				break;
				case "INV":
					viewInventory();
				break;
				case "BALANCE":
					addText("Your current balance is : £"+player.money);
				break;
				case "BAL":
					addText("Your current balance is : £"+player.money);
				break;
				case "RESTART":
					restart();
				break;
				case "?":
					helpMenu();
				break;
				case "HRLP":
					helpMenu();
				break;
				case "":
				break;
				default:
					addText("Unknown command");
					addText("Use ? to view comands");
				break;
			}
		}else{
			useShop(input[0]);
		}
	}
}
