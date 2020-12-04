let c;
let ctx;
let line = 60;
let player = {};
let counter = 0;
let currentLocationId = 0;
let items = [false,false,false,false,false];
let itemName = ["Manual","Key","Car Key","Torch","3080"];
player.money = 0;
player.inventory = [];


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  


$(document).ready(function (){
    draw();
    loadScript();
    document.getElementById("minecraft").volume = 0.3;
    let input = document.getElementById("input");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            parseInput();
        }
    });
});



function draw(){
    let height = (1249 / window.innerHeight)*(1249*0.97)
    let width = (2560 / window.innerWidth)*(2560)
    line = 20;
    canvas = document.getElementById("gameCanvas");
    document.getElementById("input").focus();
    ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
}



function addText(text){
    ctx.font = "20px monospace"
    ctx.fillStyle = "white";
    text = text.split("\n");
    for(let i = 0;i<text.length;i++){  
        ctx.fillStyle = "white";
        ctx.fillText(text[i],10,line);
        line += 20;
        if (line > window.innerHeight)scroll(20);
    }
}

function addArt(art){
    ctx.font = "20px monospace"
    ctx.fillStyle = "white";
    art = art.split("\n");
    for(let i = 0;i<art.length;i++){  
        ctx.fillText(art[i],10,line);
        line += 10;
        if (line > window.innerHeight) scroll(10);
    }
    line +=10;
    if (line > window.innerHeight) scroll(10);
}

function scroll(dy) {
    let imgData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
    ctx.putImageData(imgData, 0, -dy);
    ctx.fillStyle = "black";
    ctx.fillRect(0, window.innerHeight-dy, window.innerWidth, dy);
    line -= dy;
    console.log(line + " | " + dy);
    
}

function loadScript(){
    if(currentLocationId != 5){
        addText(locations[currentLocationId].script);
        if(currentLocationId != 2 && currentLocationId != 9)addText("\nYou can :");
        addText(locations[currentLocationId].optionNames);
        if(locations[currentLocationId].items.length != 0){
            addText("\nOr pickup:");
            addText(locations[currentLocationId].items.join("\n"));
        }
        if(currentLocationId == 9){
           addArt(asciiMario);
        }
    }else{
        loadShop()
    }
}

function loadShop(){
        addText("    Welcome to the shop");
        
        addText("┌───┬──────────┬─────────┐");
        addText("│ID │ ITEM     │    Price│");
        addText("├───┼─BUY──────┼─────────┤");
        if(!items[3])addText("│1  | Torch    │    £10  │");
        if(!items[4])addText("│2  | RTX 3080 │    £260 │");
        if(items[3] && items[4])addText("You have everthing");
        addText("├───┼─SELL─────┼─────────┤");
        if(items[3])addText("│3  | Torch    │    £10  │");
        if(items[4])addText("│4  | RTX 3080 │    £260 │");
        if(items[3] && items[4])addText("You have nothing");
        addText("└───┴──────────┴─────────┘");
        addText("Enter the ID to buy/sell a item");
        addText("Enter 0 to exit");
        addText("Your current balance is : £"+player.money);
}

function useShop(input){
    $("#input").val("");
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
                }else{
                    addText("You already have the RTX 3030")
                }
            }else{
                addText("You need £260 to buy RTX 3080")
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
                addArt(ascii3080);
                player.inventory.splice(player.inventory.indexOf("RTX 3080"),1);
            }else{
                addText("You don't have a RTX 3080 to sell")
            }
        break;

    }
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
                player.inventory.push(item);
            break;
            case "KEY":
                addText("You have picked up");
                items[1] = true;
                addArt(asciiKey);
                player.inventory.push(item);
            break;
            case "CAR KEY":
                addText("You have picked up"); 
                items[2] = true;
                addArt(asciiCarKey);
                player.inventory.push(item);
            break;
            case "TORCH":
                addText("You have picked up"); 
                items[3] = true;
                addArt(asciiTorch);
                player.inventory.push(item);
            break;
            case "MONEY":
                player.money += locations[currentLocationId].moneyValue;
                locations[currentLocationId].moneyValue = 0;
                addText("You have picked up");
                addArt(asciiMoney);
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

function parseInput(){
    let input = $("#input").val().toUpperCase();
    input = input.split(" ");
    $("#input").val("");
    found = false;
    for(let i = 0;i<locations[currentLocationId].optionID.length;i++){
        inputValue = parseInt(input[0],10);
        if(locations[currentLocationId].optionID[i] == inputValue){
            let met = true;
            for(let x = 0; x<locations[locations[currentLocationId].optionMethod[i]].requirements.length;x++){
                if(!items[locations[locations[currentLocationId].optionMethod[i]].requirements[x]])met = false;
            }
            if(met){
                currentLocationId = locations[currentLocationId].optionMethod[i];
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
                    location.reload()
                break;
                case "?":
                    addText("Available Commands:");
                    addText("   Take => Take item");
                    addText("   Inventory(inv) => View Inventory");
                    addText("   Balance(bal) => View Balance");
                    addText("   Clear => Clears screen");
                    addText("   Look => Looks around");
                    addText("   Restart => Restarts the game");

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
