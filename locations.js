let locations = [
    {
        id : 0,
        name : "Driveway",
        script : "You have woken up in someones driveway \nYour head hurts badly \nYou check your phone but the battery is dead \nYou have a look around  \nYou notice there is a mineshaft across from the house \nAlso down the road there you notice a shop \nThre is also a car in the driveway" ,
        errorScript : "BROKE",
        optionNames: "1) Go to House \n2) Inspect Car \n3) Walk to shop \n4) Go down mineshaft",
        optionID: [1,2,3,4],
        optionMethod: [6,1,5,3],
        items : ["MANUAL"],
        moneyValue : 0,
        requirements : [],
    },
    {
        id : 1,
        name : "Car",
        script : "You go and inspect the car \nYou notice a phone charger on the dashboard \nYou also find a note on the windshield that reads \n'Sorry for hitting your car here is £10 to pay for the damage'",
        optionNames: "1) Go back to the driveway \n2) Unlock the car",
        errorScript : "BROKE",
        optionID: [1,2],
        optionMethod: [0,2],
        moneyValue : 10,
        items : ["MONEY"],
        requirements : [],
    },
    {
        id : 2,
        name : "Car Inside",
        script : "You unlock the car and plug your phone in \nYou wait 15 mins and call your friend for help \nCongratulations you win \nThanks for playing",
        errorScript : "You need the CAR KEYS to unlock the vehicle",
        optionNames: -1,
        optionID: [],
        optionMethod: [],
        moneyValue : 0,
        items : [],
        requirements : [2],
    },
    {
        id : 3,
        name : "Cave",
        script : "You find yourself in a mineshaft \nThere is a ladder that appears to lead into a small cave",
        errorScript : "BROKE",
        optionNames: "1) Return to driveway \n2) Go Deeper",
        optionID: [1,2],
        optionMethod: [0,4],
        moneyValue : 50,
        items : ["MONEY"],
        requirements : [],
    },
    {
        id : 4,
        name : "Deeper Cave",
        script : "You find yourself in a dark cave \nYou turn your torch on \nThere is a key glimmering in your torch light with a note that reads 'Spare Key'",
        errorScript : "You will need a TORCH to see in the cave",
        optionNames: "1) Return to mineshaft \n2) Continue going deeper",
        optionID: [1,2],
        optionMethod: [3,9],
        moneyValue : 0,
        items : ["KEY"],
        requirements : [3],
    },
    {
        id : 5,
        name : "Shop",
        script : "",
        errorScript : "",
        optionNames: "",
        optionID: [],
        optionMethod: [],
        moneyValue : 0,
        items : [""],
        requirements : [],
    },
    {
        id : 6,
        name : "House",
        script : "You have entered the house \nYou are in a hallway \nThere are stairs leading to a bedroom\nThere is also a living room",
        errorScript : "You need KEYS to enter the house",
        optionNames: "1) Go back outside\n2) Enter living room \n3) Walk upstairs to bedroom",
        optionID: [1,2,3],
        optionMethod: [0,8,7],
        moneyValue : 100,
        items : ["MONEY"],
        requirements : [1],
    },
    {
        id : 7,
        name : "Bedroom",
        script : "You have entered the bedroom \nThe greasy kid tells you \n'The car keys are on the table",
        errorScript : "There is a greasy kid blocking your way \nYou'll need to show him a RTX 3080 to appease him",
        optionNames: "1) Go back downstairs",
        optionID: [1],
        optionMethod: [6],
        moneyValue : 0,
        items : ["CAR KEY"],
        requirements : [4],
    },
    {
        id : 8,
        name : "Living Room",
        script : "You have entered the house \nThere are stairs leading to a bedroom\nThere is also a living room",
        errorScript : "",
        optionNames: "1) Go back to hallway",
        optionID: [1],
        optionMethod: [6],
        moneyValue : 100,
        items : ["MONEY"],
        requirements : [1],
    },
    {
        id : 9,
        name : "Deeper Cave",
        script : "You have fallen into a caven \nGame over \nEnter RESTART to retry",
        errorScript : "",
        optionNames:-1,
        optionID: [],
        optionMethod: [],
        moneyValue : 0,
        items : [],
        requirements : [],
    },
];
