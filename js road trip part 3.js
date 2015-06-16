/* 
Notes and solutions for JavaScript Road Trip, Part 3 from Code School.

Closures Explained:

“A closure is a special kind of object that combines two things: a function, and the environment in which that function was created. The environment consists of any local variables that were in-scope at the time that the closure was created.”

A closure is when references to global variables are wrapped up and preserved when a function is closed. The function then entails those references, and you can still access them even if the function's context changes.

Closures take variables from external scopes and bind them deep within local scopes of other functions

A closure: When we return an inner function, the entire contents of the inner function will still be available from outside the outermost function.

A closure wraps up the entire local environment including bindings of all the necessary variables from other scopes.

A closure is nothing more than a function object with a scope.
Closures are able to capture the local variable and parameter bindings of an outer function.

Closures get their name by the way they "close" over their contents.
Closures cash in big time on JavaScript's lexical scope.
Closures are the way to achieve privacy in JavaScript.
*/

function testClosure(){
	var x = 4;
	return x
};

x; // undef
testClosure(); // 4

//Normally, a function's local variables are no longer available once it is closed.

function testClosure(){
	var x = 4;
	
	function closeX(){
		return x;
	}
	return closeX
};

//What we're doing above is sealing a reference to x inside the inner function.
// We can then still access x even after the outer function has finished.

var checkLocalX = testClosure();
checkLocalX(); // 4


//The inner function can access the outer function's variables.

//1. You can store references to outer/global variables in an inner function.
//2. That inner function will still retain access to those variables after the function that contains them is finished operating.

//=================================

function buildCoveTicketMaker (transport){
	return function(name){
		alert("Here is your transportation ticket via the " + transport + ".\n" +
		"Welcome to the Cold Closures Cove, " + name + "!";
		);
	}
};

//Above we have a function which returns an anonymous inner function, which encloses the transport parameter.

var getSubmarineTicket = buildCoveTickerMaker("Submarine");

var getBattleshipTicket = buildCoveTickerMaker("Battleship");

var getGiantSeagullTicket = buildCoveTickerMaker("Giant Seagull");

//Even though the buildCoveTicketMaker function is finished, we can still use its reference to the transport parameter.

getSubmarineTicket("Mario");

getBattleshipTicket("Luigi");

getGiantSeagullTicket("Bowser");

//These now pass in var name to the inner function:
getSubmarineTicket() = buildCoveTicketMaker("Submarine")()
//The first function actually already entails a baked-in parameter, so whichever parameter we send in to it gets sent to the inner function.
//This, which isn't stated in the lesson, is the key to understanding closures.
	//1. Variables that store functions have unstated () in their names. Sending in an additional () sends it to the inner function.
	//2. When a function is closed, it wraps up and stores a snapshot reference to it's context: all of the variables it uses. This context/reference is accessible even if the function is passed to a different context.
	
//=================================
//Tracing a Closure I
	
function mystery() {
	var secret = 6;
	
	 function mystery2(multiplier) {	// pass in 3, from below 
		multiplier *= 3; 			// 3 *=3 is 9
		return secret * multiplier; 	// stores 6 * 9
	  }
	  
	  return mystery2; 			// returns 54
}

var hidden = mystery();
var result = hidden(3); //var result = mystery()(3) // var result = 54.


//=================================
//Tracing a Closure II

function mystery(input) {			// pass in 4
	var secret = 5;				
	
	function mystery2(multiplier) {	//	//pass in 2
		multiplier *= input;		//multiplier *= 4	// 2 *= 4, multiplier =8
		return secret * multiplier; 	//return 5 * multiplier	// return 5*8 = 40
		}
	
	return mystery2;				//return 
}

var hidden = mystery(4);
var result = hidden(2);				//var result = mystery(4)(2)


//=================================
//Tracing a Closure III

function mystery(input) {			//pass 3
	var secret = 4;				//
	input += 2;					//input = 3+=2 = 5
	
	function mystery2(multiplier) {	//	//pass in 6
		multiplier *= input;		//multiplier *= 5	//6 *=5 is 30
		return secret * multiplier;	//return 4 * multiplier // return 4 *30 = 120
	}
	
	return mystery2;
}

function mystery3(param) {			//pass in mystery(3)
	
	function mystery4(bonus) {
	return param(6) + bonus; 		//pass (6) to mystery(3), so mystery2(6), which is 120, +2 is 122
	}
 
	return mystery4;				//return 122.
}

var hidden = mystery(3);
var jumble = mystery3(hidden);
var result = jumble(2);				//result = mystery3(mystery(3)) (2)

//=================================
//Modifying Bound Variables After Closure

function buildCoveTicketMaker(transport){
	var passengerNumber = 0;		//counter
	return function (name){
		passengerNumber++;		//increment passengerNumber each time we print a new ticket.
		alert("Here is your transportation ticket via the " + transport + ".\n" +
			"Welcome to the Cold Closures Cove, " + name "!" + 
			"You are passenger #" + passengerNumber + ".");

var getSubmarineTicket = buildCoveTicketMaker("Submarine");
getSubmarineTicket("Mario");			//"...You are passenger #1"
getSubmarinTicket("Toad");			//"...You are passenger #2"
			
		);
	}
}
// In the example above, the inner closure function is modifying the counter, to increment it every time the inner function is called.
// Nesting an inner function inside an outer function causes the inner function to take a snapshot of the outer function and retain the values, while allowing access via the inner variable. This access is done by hiding a () inside of the var reference to the outer function, so that whatever is passed in is automatically a ()(), which reaches the inner function only. The outer function thus is then effectively write protected.

//=================================
//3.2.12 - Just Keep Track of It All!

function warningMaker(obstacle) {
	var count = 0;
	var zones = [];
	var list  = "";
	return function (number, location) {
		count++;
		zones.push([number, location]);
		for(var i = 0; i < zones.length; i++) {
			list = list + "\n" + zones[i][1] +
			" (" + zibes[i][0] + ")";
		}
		alert("Beware! There have been " +
			obstacle +
			" sightings in the Cove today!\n" +
			number +
			" have been spotted at the " +
			location +
			"!\n" +
			"This is Alert #" +
			count +
			" today for " +
			obstacle +
			" danger.\n" +
			"Current danger zones are:" +
			list
		);
	};
}

//=================================
//3.2.13 - Dangers at the Moment of Closure

function assignTorpedo(name, passengerArray){
	var torpedoAssignment;
	for (var i = 0; i< passengerArray.length; i++){
		if(passengerArray[i] == name){
			torpedoAssignment = function(){
					alert("Ahoy, " + name + "!\n" + 
						"Man your post at Torpedo #" + (i + 1) + "1"
					);
			};
		}
	}
	return torpedoAssignment;
}
var subPassengers = ["Luke", "Leia", "Han", "Chewie"];
var giveAssignment = assignTorpedo("Chewie", subPassengers); 
giveAssignment() // Assigns Chewie to Torpedo 9

// Why this doesn't work: closures package up and bind values at the very last second, so before torpedoAssignment gets returned, the for loop has completed and added 1.

// What can we do instead?

// 1. Return inner function directly as anonymous function, remove var torpedoAssignment:
function assignTorpedo(name, passengerArray){
	
	for (var i = 0; i< passengerArray.length; i++){
		if(passengerArray[i] == name){
			return function(){  //this returns immediately on access, instead of pausing from storing function as reference
				alert("Ahoy, " + name + "!\n" + 
					"Man your post at Torpedo #" + (i + 1) + "1"
				);
			};
		}
	}
	return torpedoAssignment;
}
var subPassengers = ["Luke", "Leia", "Han", "Chewie"];
var giveAssignment = assignTorpedo("Chewie", subPassengers); 
giveAssignment() // Assigns Chewie to Torpedo 4 as expected


// 2. Pass name directly to inner function, and enclose passengerArray in inner fn by baking it into outer fn.

function makeTorpedAssigner (passengerArray){ //
	 return function (name){
		 for(var i = 0; i < passengerArray.length; i++){ //this 
		 	alert("Ahoy, " + name + "!\n" + 
					"Man your post at Torpedo #" + (i + 1) + "1"
		 }
	 };
}
}
var subPassengers = ["Luke", "Leia", "Han", "Chewie"];
var getTorpedoFor = makeTorpedoAssigner(subPassengers); 
getTorpedoFor("Chewie") // Assigns Chewie to Torpedo 4

//=================================
//3.2.14 - Final Closed Values I

function assignLaser(sharkList ){				// bake in sharkList
	return function(shark){					//inner function takes shark parameter
		for(var i = 0; i<sharkList.length; i++){	//
			if(shark == sharkList[i]){			
				alert("Yo, " +
				      shark +
				      "!\n" +
				      "Visit underwater strapping station " +
				      i +
				      " for your sweet laser.\n" +
				      "'Bout to get real up in here."
				     );
			};
		}
  }
  
 //=================================
//3.2.15 - Final Closed Values II

function makeTargetAssigner( sharks, targets ){
		return function(shark){
			for(var i=0; i< sharks.length; i++){
				if(sharks[i]==shark){
					alert(
					"What up, " + shark + "!\n" +
					"There've been " + targets[i] + " sightings in our 'hood!\n" + "Time for a swim-by lasering, homie!"
					);
				}
			}
		};
}


var getTargetFor = makeTargetAssigner(listOfSharks, listOfTargets);

getTargetFor("Ice Teeth");


 //=================================
//3.3.1 - Hoisting
/*
Website load order can create problems, because parts of your program relies on other parts which aren't available.

Hoisting means automatically moving some elements earlier in the load order.. 

When we open a scope, memory is allocated for necessary variables and declared functions.

JS looks for what will need to be allocated, and these elements are "hoisted" to the top of the load order as undefined.

To fix problems caused by hoisting:
1. Declare functions directly instead of assigning them to vars as expressions, or
2. Place your definitions at the top, and your executable code at the bottom.
*/


function chooseMystery(){		
	function chooseMystery(){	//1. gets hoisted and allocated
		return 12;
	}
	return chooseMystery();
	
	function chooseMystery(){	//2. gets hoisted and allocated, but overwrites (1.)
		return 7;
	}
}
getMysteryNumber();			// returns 7 because of the second hoisted function


//Function expressions (assigned to var) are never hoisted. They are always treated as assignments.

function chooseMystery(){		
	var chooseMystery = function(){	//1. var gets hoisted, allocated, and set to undefined
		return 12;				//3. This first function expression follows normal load order because it's the first executable code, second function gets ignored because it's a function expression and is not hoisted
	}
	return chooseMystery();		//4. Makes the second function unreachable.
	
	var chooseMystery function(){	//2. var gets hoisted, allocated, set to undefined, and overwrites (1.) as undefined
		return 7;					
	}
}
getMysteryNumber();				// 5. returns 12.


//What if we switch the load order around?

function chooseMystery(){		
	
	return chooseMystery();		// 
	
	var chooseMystery = function(){	// 1. hoisted, allocated, set to undefined.
		return 12;				//
	}
	
	var chooseMystery function(){	// 2. hoisted, allocated, set to undefined, overwrites first var.
		return 7;					
	}
}
getMysteryNumber();				// 3. ERROR


// Another example:

function capacityStatus(numPassengers, capacity){
	if(numPassengers == capacity){				//3. Executable gets executed
		noSeats();							//4. noSeats and seatsAvail get their assignments
	}else{
		seatsAvail();	
	}
	
	var noSeats = function(){					//1. var hoisted, allocated, set to undefined
		alert("No seats left!");
		return false;
	}
	
	var seatsAvail = function(){					//2. var hoisted, allocated, set to undefined
		alert("There are " + (capacity - numPassengers) + " seats left!");
		return true;
	}
}
capacityStatus(60, 60); //


//Hoisting causes problems. How do we fix them?
// Put all declarations and assignments at the top, put all conditional code at bottom:

function capacityStatus(numPassengers, capacity){
	var noSeats = function(){						//1. vars get hoisted
		alert("No seats left!");						//2. functions get their definitions
		return false;
	}
	
	var seatsAvail = function(){										//1. vars get hoisted
		alert("There are " + (capacity - numPassengers) + " seats left!");	//2. functions get their definitions
		return true;
	}
	
	if(numPassengers == capacity){				
		noSeats();							
	}else{
		seatsAvail();	
	}
}
capacityStatus(60, 60); 

//Other solution is to declare functions instead of assigning them as expressions (with var)

function capacityStatus(numPassengers, capacity){
	if(numPassengers == capacity){			//2. executable evaluated
		noSeats();							
	}else{
		seatsAvail();	
	}
	
	function noSeats (){					//1. function hoisted, ready for use
		alert("No seats left!");
		return false;
	}
	
	function seatsAvail (){					//1. function hoisted, ready for use
		alert("There are " + (capacity - numPassengers) + " seats left!");
		return true;
	}
}
capacityStatus(60, 60); 


 //=================================
//3.3.2 - Analyzing Load Order I
//Does the following return no function (error), undefined, or one function (which one?)

function thisIsWeird() {
	function secret() {
		var unused3;
	}

	var result;			//1. var hoisted, refers to...

	
	function secret() {
		var unused1;
	}

	result = secret;		//2. this assignment, which is executed at...

	
	function secret() { 		//4. This one, because after definitions are hoisted, the functions execute in order and this second "secret" fn overwrites the first one.
		var unused2;
	}

	return result;			//3. ...this return, which then runs...
}


 //=================================
//3.3.3- Analyzing Load Order II
// Rearrange so it goes var declarations, fn declarations, executable code, conditional code.

function theBridgeOfHoistingDoom() {
	var ring = undefined;
	var power = undefined;
	
	function balrog() {		//1. overwrites other balrog()
		return "whip";
	}
  
	function wizard() {
		return "white";
	}
	
	function elf() {		//2. overwrites other elf()
		return "immortal";
	}
	
	ring = wizard;
	
	wizard = balrog;
	
	return wizard();
}


 //=================================
//3.3.3 - Analyzing Load Order III

/*
1. Manually initialize all vars to undefined.
2. Remove all overwritten functions, keep order for other functions.
3. Remove the var keyword where redundant.
4. Don't rearrange functions
5. Remove unreachable code.

*/

//original:
function theBridgeOfHoistingDoom() {
	function fellowship() {
		return "friends";
	}

var sword = "sting";

var dwarf = function () {
	return "axe";
	};
  
var fall = "Fly you fools!";
  
fellowship = function () {
	return "broken";
	};
 
 ring();
 
 return sword;
 
 fellowship = function () {
	return "mines";
	};
  
sword = function () {
	return "glamdring";
	};
  
var ring = function () {
	return "precious";
	};
}

//modified:
function theBridgeOfHoistingDoom() {
	var sword = undefined;
	var dwarf = undefined;
	var fall = undefined;
	var ring = undefined;

	function fellowship() {
		return "friends";
	}

	dwarf = function () {
		return "axe";
		};
	  
	fellowship = function () {
		return "broken";
		};
	 
	 fellowship = function () {
		return "mines";
		};
	  
	sword = function () {
		return "glamdring";
		};
	  
	ring = function () {
		return "precious";
		};
	
	sword = "sting";
	fall = "Fly you fools!";
		
	ring();
	 
	return sword;
}


//=================================
//3.3.4 - Analyzing Load Order VI

function theBridgeOfHoistingDoom() {
  var sword = undefined;
  var dwarf = undefined;
  var fall = undefined;
  var ring = undefined;
  
  function fellowship() {
    return "friends";
  }
  
  
  sword = "sting";
  
  dwarf = function () {
    return "axe";
  }
  
  fall = "Fly you fools!";
  
  fellowship = function () {
    return "broken";
  }
  
  ring();	//This will get returned, not as the value of "undefined," but as an error because it's trying to reference a nonexistent function.
  
  return sword;
}

//=================================
// 3.4 - Objects
// Objects are just containers for related data. They can contain their own functions.
// Objects have composite value, which means they have multiple types of data.
// Properties can be key: value pairs, strings, functions, arrays, other objects, etc.

// Object literal construction:
var myBox = {};

var myBox = {
	height: 6, width: 8, length: 10, volume: 480,
	material: "cardboard",
	contents: ["Great Expectations", "The Remains of the Day", "Peter Pan"]
	contents2: booksArray //can use variables; makes a reference, not a copy
	};

// We use dot notation to access properties:
myBox.width; // 8
myBox.materials; // "cardboard"

// We use dot notation to change properties:
myBox.width = 12; // 12

myBox.contents2.push("On The Road");

//You can add as many properties to an object as you like.

//We can use bracket notation to access an object as with arrays.
//This requires using a string to access the property key
myBox["volume"] //480
myBox["material"] //"cardboard"

//Using bracket notation to add properties
myBox["# of stops"] = 2;

console.log(myBox["# of stops"]); //need to wrap string in brackets to use it, because it contains strings

//...because a string would just look stupid:
myBox."# of stops"

//the brackets take expressions, so we can use them for dynamic property access, which means we don't need to hard code every property access we need.

//Delete always returns true to say that the property doesn't exist after it's run.
delete myBox.contents;


function addBook (box, name, writer){
	box["# of books"]++;
	box["book" + box["# of books"]] = {title: name, author: writer};
};

//either dot notation or bracket notation can be chained to go deeper in the hierarchy
myBox.book1.title;
myBox["book4"]["author"];

//=================================
//3.4.4 - Accessing Objects II
var vehicle1 = {type: "Motorboat", capacity: 6, storedAt: "Ammunition Depot"};

var vehicle2 = {type: "Jet Ski", capacity: 1, storedAt: "Reef Dock"};

var vehicle3 = {type: "Submarine", capacity: 8, storedAt: "Underwater Outpost"};

var vehicles = [vehicle1, vehicle2, vehicle3];
var findVehicle = function(name, list){
  for(var i = 0; i < list.length; i++){
  	if(name == list[i].type){
  		return list[i].storedAt;
  	}
	}
};

findVehicle("Submarine", vehicles);

//=================================
//3.4.4 - Building Objects II

var vehicle1 = {type: "Motorboat", capacity: 6, storedAt: "Ammunition Depot"};

var vehicle2 = {type: "Jet Ski", capacity: 1, storedAt: "Reef Dock"};

var vehicle3 = {type: "Submarine", capacity: 8, storedAt: "Underwater Outpost"};

vehicle1.capacity += 4;
vehicle2.submersible = false;
vehicle3.weapon = "Torpedoes";
vehicle1.submersible = false;
vehicle2.weapon = "Lasers";
vehicle3.capacity *= 2;
vehicle1.weapon = "Rear-Mounted Slingshot";
vehicle3.submersible = true;

//=================================
//3.4.8 - To the Lighthouse, Quick!
//declare a function that adds objects to the lightHouseRock object

var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];
var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 0
};


function addRanger(location, name, skillz, station){
	lighthouseRock["numRangers"]++;
	lighthouseRock["ranger"+["numRangers"]] = {location: location, name: name, skillz: skillz, station: station};	
}

addRanger(lighthouseRock, "Nick Walsh",  "magnification burn", 2);
addRanger(lighthouseRock, "Drew Barontini",  "uppercut launch", 3);
addRanger(lighthouseRock, "Christine Wong",  "bomb defusing", 1);


//=================================
//3.4.9 - Man Your Bulb Stations!
//declare a function that assigns rangers to stations


var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];
var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 3,
  ranger1: {name: "Nick Walsh", skillz: "magnification burn", station: 2},
  ranger2: {name: "Drew Barontini", skillz: "uppercut launch", station: 3},
  ranger3: {name: "Christine Wong", skillz: "bomb defusing", station: 1}
};

function dontPanic(derp){
  for(var i = 0; i < derp.numRangers; i++){
  	alert(
    "Avast, me hearties!\n" +
    "There be Pirates nearby! Stations!\n" +
    ["ranger"+i].name + ", man the " +
    superBlinders[i] + "!"
    );
  }
  
  
};

dontPanic(lighthouseRock);

//=================================
//3.4.10 - Object Functionality
//"this" is a placeholder for whatever context it's called in
 
//=================================
//3.4.11 - Functions as Properties I

var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];
var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 3,
  ranger1: {name: "Nick Walsh", skillz: "magnification burn", station: 2},
  ranger2: {name: "Drew Barontini", skillz: "uppercut launch", station: 3},
  ranger3: {name: "Christine Wong", skillz: "bomb defusing", station: 1},
  addRanger: function(name, skillz, station){
  	this.numRangers++;
    this["ranger" + this.numRangers] = {
      name: name,
      skillz: skillz,
      station: station
    };
  }

};

//=================================
//3.4.12 - Calling Function Properties I

var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];

var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 3,
  ranger1: {name: "Nick Walsh", skillz: "magnification burn", station: 2},
  ranger2: {name: "Drew Barontini", skillz: "uppercut launch", station: 3},
  ranger3: {name: "Christine Wong", skillz: "bomb defusing", station: 1},	
  addRanger: function (name, skillz, station){
    this.numRangers++;
    this["ranger" + this.numRangers] = {
      name: name, 
      skillz: skillz, 
      station: station 
    }; 
  }
};


lighthouseRock.addBulb = function(name, wattage){
  var tempArray = [name, wattage];
  lighthouseRock.weaponBulbs.push(tempArray);
};


//=================================
//3.4.12 - Calling Function Properties I

function relieveDuty(vehicle, day){			// create a function that takes a vehicle object and a day of the week
	
  var offDuty = [];								// create two new arrays for sorting rangers: on and off duty
  var onDuty = [];
  //here numRangers is 4
  for( var i =0; i < vehicle.numRangers; i++){			// loop through rangers, if passed in day of week is same as their day off...
    if(day == ["ranger"+["numRanger"]].dayOff){
      offDuty.push(["ranger"+["numRanger"]]);                                	// add ranger to end of offDuty group
		} else {
    	onDuty.push(["ranger"+ ["numRanger"]]);					// otherwise add ranger to end of onDuty group
    }
    
		
  for (var j = 0; j < onDuty.length; j++){			//loop through onDuty list
		delete ["ranger"+["numRanger"]]; 					//remove each ranger so we can renumber and reassign them
		vehicle["ranger"+["numRanger"]] = onDuty[j];			// for each ranger object in onDuty group, add that object to the vehicle object with a new number
	};											//This part is causing a problem?
	return offDuty;							//return the offDuty group
  }
};


numRangers = 0;								//now that rangers are sorted to groups, reset numRangers so we can renumber
var offToday = relieveDuty(vehicle3, "Friday");		// store the list of rangers in vehicle3 who are off Friday, in var offToday.

//=================================
//3.4.16 - Using Objects

/*
An object doesn't have a length, that we could use to loop over its properties.
So we enumerate with a for-in loop.
*/

for(key in object){
		do stuff
}
//
aquarium.countFish = function ( ) {
	var numFish = 0;
	for(key in this){  //key can be anything, it's just a parameter that refers to every property in the object
		if(this[key].type == "fish"){
			numFish++;
		}
	}
}

var poorDory = aquarium.takeOut("Dory");
	//removes Dory object and stores it in var
	
////=================================
//3.4.19 - Enumeration III

var rockSpearguns = {
  Sharpshooter: {barbs: 2, weight: 10, heft: "overhand"},
  Pokepistol: {barbs: 4, weight: 8, heft: "shoulder"},
  Javelinjet: {barbs: 4, weight: 12, heft: "waist"},
  Firefork: {barbs: 6, weight: 8, heft: "overhand"},
  "The Impaler": {barbs: 1, weight: 30, heft: "chest"}
};

rockSpearguns["listGuns"] = function(){
  for(property in this){
    if(this[property]["heft"] !== undefined){
    console.log("Behold! " + property +
                  ", with " + this[property] +
                " heft!");
		}
  }
};
rockSpearguns.listGuns();

////=================================
//3.5 - Prototypes
/*
Objects have default hidden properties that they inherit from their prototypes.
Ancestor
Prototype chain, ex: Object prototype -> String prototype > myString

Object.prototype owns:
	valueOf
	constructor
	toLocaleString
	toString
	isPrototypeOf
	propertyIsEnumerable
	hasOwnProperty

		Array.prototype owns:
			length
			pop
			push
			shift
			reverse
			sort
			join
			reduce
			slice

		String.prototype owns:
			length
			charAt
			trim
			concat
			indexOf
			replace
			toUppedCase
			toLowercase
			subString 
			
		Number.prototype owns:
			toFixed
			toPrecision
			toExpontential
			
		Function.prototype owns:
			name
			bind
			call
			apply
*/		

//We can add inheritable properties to prototypes
//Ex: 

String.prototype.countAll = function(letter){
	var letterCount = 0;
	for (var i; i < this.length; i++){
		if(this.charAt(i).toUpperCase() == letter.toUpperCase()){
			letterCount++;
		}
		
	}
};

////=================================
//3.5.1 - Prototypes
//Add a cattle counting function to the Array prototype
Array.prototype.countCattle = function(type){
  var count;
  for(var i ; i < this.length; i++){
    if( this[i].type == type){
    count++;
    }
  }
  return count;
};

////=================================
//3.5.4 - Prototypes III

Object.prototype.noCalvesYet = function(){
	if(this.type == "cow" && this.hadCalf == null){
  	return true;
  } else {
    return false;
  };

Array.prototype.countForBreeding = function(){

};

////=================================
//3.5.6 - Inheritance and Constructors

var shoe = { size:6, gender: "women", construction: "slipper"};
var magicShoe = Object.create( shoe );
//Whatever we pass Object.create turns into a prototype for whatever we assign it to
console.log(magicShoe); // { size:6, gender: "women", construction: "slipper"};

Object.prototype.isPrototypeOf() //can use to check inheritance
shoe.isPrototypeOf(magicShoe); //true
magicShoe.isPrototypeOf(shoe); //false
Object.prototype.isPrototypeOf(shoe) //true, because isPrototypeOf checks the whole chain

//determine common properties of the class for Constructor
function Shoe( shoeSize, shoeColor, forGender, constructStyle){
	this.size = shoeSize;
	this.color = shoeColor;
	this.gender = forGender;
	this.construction = constructStyle;
	this.putOn = function(){alert("Shoe's on!");
	this.takeOff = function(){alert("Uh, what's that smell");
}

//using Constructor:
var beachShoe = new Shoe(10, "blue", "women", "flipflop");

//A constructor is not a prototype... since all instances of Shoe will have putOn() and takeOff(), and it's redundant to store these in each instance, we can just set the constructor's prototype and add them to it.

//First we need to set the constructor's prototype/assign a prototype to the constructor:
Shoe.prototype = {
	this.putOn = function(){alert("Shoe's on!");
	this.takeOff = function(){alert("Uh, what's that smell");
};

Array.prototype;
String.prototype; //notice that whenever we use a prototype, it's been as the property of a constructor.

//Prototypes can refer back to their instances to get data:
Shoe.prototype = {
	this.putOn = function(){alert("Your " + this.construction + "'s on!");
	this.takeOff = function(){alert("Phew! Somebody's size " + this.size + "s are fragrant!");
};


////=================================
//3.5.7 - Creation With Prototypes I

var genericPost =
  {x: 0, y: 0, postNum: undefined,
   connectionsTo: undefined,
   sendRopeTo: function ( connectedPost ) {
     if(this.connectionsTo == undefined){
       var postArray = [ ];
       postArray.push(connectedPost);
       this.connectionsTo = postArray;
     } else {
       this.connectionsTo.push(connectedPost);
     }
   }
  };

var post1 = Object.create(genericPost);
var post2 = Object.create(genericPost);
post1.x = -2;
post1.y = 4;
post1.postNum = 1;
post2.x = 5;
post2.y = 1;
post2.postNum = 2;
post1.sendRopeTo(post2);
post2.sendRopeTo(post1);


////=================================
//5.12 - Overriding Prototypal Methods

//A prototype is an object with default properties and values
//A constructor is a function which build new instances of those objects.
//Prototype properties can be overridden ("customized").

Object.constructor.__proto__;
Object.constructor.prototype;

Object.hasOwnProperty()// useful for finding which prototypal properties have been overridden.