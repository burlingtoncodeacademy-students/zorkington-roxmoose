const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

async function start() {
  /******************* ITEM CLASS *************************/
  class Item {
    constructor(name, nameinasentence, action, actionResponse, takeable) {
      this.name = name;
      this.nameinasentence = nameinasentence;
      this.action = action;
      this.actionResponse = actionResponse;
      this.takeable = takeable;
    }

    take() {
      // if user inputs "take item" e.g. "take pear"
      if (this.takeable) {
        // makes sure the item is takeable
        inventory.push(this.name); // adds pear
        console.log(
          `\nYou have added ${this.nameinasentence} to your inventory.`
        );
      } else {
        console.log(`\nYou can't take ${this.nameinasentence}!`);
      }
    }

    drop() {
      if (inventory.includes(this.name)) {
        inventory.pop(this.name);
        console.log(
          `\nYou have dropped ${this.nameinasentence} from your inventory.`
        );
      } else {
        console.log("\nYou can't drop something you don't have!");
      }
    }

    talkto() {
      // if user inputs "talk to [item name] " e.g. "talk to Bailey"
      if (this.action === "talk to") {
        // makes sure "talk to" is an allowed action for the target item
        console.log(this.actionResponse);
      } else {
        console.log(
          `\nYou're trying to speak to ${this.nameinasentence}? Awkward...` // totes awks
        );
      }
    }

    sniff() {
      if (this.action === "sniff") {
        // makes sure "sniff" is an allowed action for the target item
        console.log(this.actionResponse);
      } else {
        console.log(`\nYou'll sniff anything, won't you?`);
      }
    }

    drink() {
      if (this.action === "drink") {
        // makes sure "drink" is an allowed action for the target item
        console.log(this.actionResponse);
      } else {
        console.log(
          `\nYou...can't drink ${this.nameinasentence}. This may be a strange land to you, but most basic laws of existence still apply...`
        );
      }
    }

    pull() { // Only applies to the vine, which is on the Outside (before dropping into the Underland), so set up with the message hard-coded in
      if (this.action === "pull") {
        console.log(
          "You have pulled the vine of a moonflower. Doing this opened a trap door, and you fell down into it! Don't worry, it's a soft landing. \nYou look around and see you're in some sort of borrow lit by candles. The dirt walls have paintings on them. \nThe apparent painter is working in a corner of the room. She turns to you and says 'Welcome to the Underland of Pitkin! It's like Pitkin Street, but a little...stranger. You've landed in my Candlearium."
        );
        console.log(`\nAnd this  might not make any sense to you now, but know that at any time, if you type in "inventory", you'll get to see what you have.`)
      } else {
        console.log("Hey, don't pull that, you animal.");
      }
    }
  } // ---------------------END OF ITEM CLASS-------------------

  /******************* ITEM VARIABLES *************************/
  let vine = new Item(
    "vine",
    "a vine",
    "pull",
    "\nYou have pulled the vine of a moonflower. ",
    false
  );

  let candle = new Item(
    "candle",
    "a candle",
    "sniff",
    "\nSmells nice! Perhaps you want to take it... ",
    true
  );
  let painting = new Item(
    "painting",
    "a painting",
    "look at",
    "\nIt's beautiful! Now what? ",
    false
  );
  let moonshine = new Item(
    "moonshine",
    "crabapple moonshine",
    "drink",
    "\nOooo. That's good. Now what? ",
    false
  );
  let bartender = new Item(
    "bartender",
    "the bartender",
    "talk to",
    "\nThe bartender tells you about the moonshine. He makes it himself and is very proud of it, though is thinking about making a batch with pears instead of crabapples next. \nHe explains that beyond the tavern is the Pear Tree Root Cellar where he could get an unlimited amount of pears...",
    false
  );
  let pear = new Item(
    "pear",
    "a pear",
    "sniff",
    "\nSmells strange. Nothing you want to eat, but this may be helpful to have...",
    true
  );
  let bailey = new Item(
    "Bailey",
    "Bailey",
    "talk to",
    "\nBailey raises his bearded head and tells you that when faced with a decision between the river and the stream, you should definitely follow the stream...",
    false
  );
  let painter = new Item(
    "painter",
    "the painter",
    "talk to",
    "\nThe painter, peering up from her cozy corner, points you to a red door that says 'Brickhouse Tavern'...",
    false
  );
  let dan = new Item(
    "Dan",
    "Dan",
    "talk to",
    "\nDan starts babbling on and on about a dog named Bailey who lives in the yard beyond the den. Dan loves the yard, but he loves his den more. \nHe recommends you go to the yard. However...he's really hungry and knows you've been through the root cellar. He asks if you brought him a pear. If so, could you drop a pear on the ground for him? It appears he might not let you beyond here if you haven't...",
    false
  );
  let opossum = new Item(
    "opossum",
    "a random opossum",
    "sniff",
    "\nThe opossum liked that. Now it thinks you're married. Mazel tov!",
    false
  );

  /******************* ITEM LOOKUP *************************/
  // e.g. if they say "candle", it'll associate that with the variable/item candle
  let itemLookup = {
    vine: vine,
    candle: candle,
    painting: painting,
    moonshine: moonshine,
    bartender: bartender,
    pear: pear,
    bailey: bailey,
    painter: painter,
    dan: dan,
    opossum: opossum,
  };

  /******************* ROOM CLASS *************************/
  class Room {
    constructor(name, nameinasentence, message, items) {
      this.name = name;
      this.nameinasentence = nameinasentence;
      this.message = message;
      this.items = items;
    }
  }

  /******************* ROOM VARIABLES *************************/

  let outside = new Room("Outside", "Outside", "(n/a)", ["vine"]);

  let candlearium = new Room(
    "Candlearium",
    "in the Candlearium",
    "You're back in the Candlearium!", // User always starts here after dropping into the Pitkin Underland (and get an initial message then). So anytime this is called, it will be a return. Thus this welcome back message with no description.
    ["candle", "painting", "painter"]
  );

  let tavern = new Room(
    "Tavern",
    "in the Brickhouse Tavern",
    "\nYou are now in the Brickhouse Tavern. The bartender is a tall man wearing green-rimmed glasses. He's hunched over the bar writing a screenplay. When he sees you, he puts aside the screenplay and asks if you'd like a glass of crabapple moonshine...",
    ["moonshine", "bartender"]
  );

  let cellar = new Room(
    "Cellar",
    "in the Pear Tree Root Cellar",
    "\nYou're now in the Pear Tree Root Cellar -- beneath what was once a 100-year-old pear tree. \nWhile the pear tree has since been chopped down (2020 was the worst), its roots run rampant in the Underland of Pitkin, and there seems to be a neverending supply of fermented pears lying around...\nOn the other side of the cellar, you can see a glass door (interesting material option for an underground cave...) where you can see pairs of red eyes and long white tails...it must be an opossum den?\nBut for now, here you are in the Pear Tree Root Cellar. Probably here for a reason...",
    ["pear"]
  );

  let den = new Room(
    "Den",
    "in the Opossum Den",
    "\nYou're now in -- you guessed it -- an opossum den. Those pairs of red eyes are looking at you in the darkness. A chonky opossum bumbles forward and introduces himself as Dan.",
    ["opossum", "dan"]
  );

  let yard = new Room(
    "Yard",
    "in Bailey's yard",
    "\nYou're now in the yard of the great Irish Wolfhound Bailey. He lives in immortality and has found contentedness in this belowground world. He lives in this yard but knows the Pitkin Underland very well and is a being that everyone comes to for advice...He loves being right next to the Strong Reservoir especially, where he takes daily swims, including in the winter (#polarbearing #dogsthatpolarbear). We're having a warm October, so you're eyeing the reservoir for a pleasant paddle.",
    ["bailey"]
  );

  let reservoir = new Room(
    "Reservoir",
    "on Strong Reservoir",
    "\nYou've stepped onto a canoe on the Strong Reservoir. To the north is a river. To the west is a stream. Behind you, you can hear wise Bailey in his yard..."
    // no objects
  );

  let river = new Room(
    "River",
    "on Nattahnam River",
    "\nYou've started paddling down the river. Uh-oh, the current is picking up pace! And what's that noise coming from ahead? A waterfall!!!...\nWell, as the kids say these days, you're being 'yeeted.'" // Game will end with being yeeted
  );

  let stream = new Room(
    "Stream",
    "on Blodgett Stream",
    "\nYou've started paddling down the stream. It's just deep enough! You've made a good choice. Soon enough, you arrive at the Olde Northender. It looks exactly the same as the aboveland one!\nTurns out there's a downstairs and it's the same as the upstairs, and there's a staircase up if you want to go back to the overland. Whatever you decide to do next, I hope you'll remember this time fondly. Enjoy life, traveler!" // Game will end on a positive note
  );

  /******************* ROOM TRANSITION TABLE *************************/

  let transitions = {
    candlearium: ["tavern"],
    tavern: ["candlearium", "cellar"], // was thinking tavern would also connect to den, but let's not complicate things
    cellar: ["tavern", "den"],
    den: ["cellar", "yard"],
    yard: ["cellar", "reservoir"],
    reservoir: ["yard", "river", "stream"],
    // river and stream each only go one place that you can't come back from so they're not listed here
  };

  /******************* ROOM LOOKUP TABLE *************************/
  let roomLookup = {
    outside: outside,
    candlearium: candlearium,
    tavern: tavern,
    cellar: cellar,
    den: den,
    yard: yard,
    reservoir: reservoir,
    river: river,
    stream: stream,
  };

  /******************* FUNCTION TO GO BETWEEN ROOMS *************************/
  function goto(targetroom) {
    if (
      // -------------------FOR SPECIAL CASE: TO DEN FROM YARD (can't go to yard without dropping a pear in the den for the opossum)
      targetroom === "yard" &&
      currentRoom === "den" &&
      roomInventory.includes("pear") // if you're trying to go from the den to the yard and the den has a pear in it,
    ) {
      currentRoom = targetroom; // then it'll let you do that.
      console.log(roomLookup[currentRoom].message); // and will spit out the message for the new current room (the yard)
    } else if (
      targetroom === "yard" &&
      currentRoom === "den" // if you're trying to go from the den to the yard and the den DOESN'T have a pear in it,
    ) {
      console.log(
        "Dan isn't going to let you through to Bailey's yard unless you've left him a fermented pear from the root cellar. "
      );
    } else if ( // --------------------- FOR SPECIAL CASE: RIVER ----------------------
      transitions[currentRoom].includes(targetroom) &&
      targetroom === "river"
    ) {
      currentRoom = targetroom;
      console.log(roomLookup[currentRoom].message); // gives river message
      process.exit(); // ends game if they go to the river!!
    } else if ( // --------------------- FOR SPECIAL CASE: STREAM -------------------------
      transitions[currentRoom].includes(targetroom) &&
      targetroom === "stream"
    ) {
      currentRoom = targetroom;
      console.log(roomLookup[currentRoom].message); // gives stream message
      process.exit();
    } else if (transitions[currentRoom].includes(targetroom)) {
      // ---------------------------STANDARD FUNCTION RESPONSE (applicable to most situations) ------------
      // if transitions @ current room includes target room,
      currentRoom = targetroom; // then current room will change to target room
      console.log(roomLookup[currentRoom].message); // and user will get welcome message for new room
    } else {
      console.log("You can't get there from here..."); // if not an allowed transition
    }
  }

  /**************************** THE FUN STARTS HERE *****************************************/

  console.log(
    "\n:: Current Location: " + roomLookup[currentRoom].nameinasentence + " ::" // some nice formatting ya know
  );
  input = await ask(":: What would you like to do? >>> ");

  let inputArray = input.toLowerCase().split(" "); // makes an array of user input, e.g. ["sniff", "a", "candle"]
  let action = inputArray[0]; // would take "sniff"
  let target = inputArray.slice(-1).join(" "); // takes the last word in case there's an "a" or "an" or descriptive word in the middle, which should be the target. in this case "candle". If they say "drink crabapple moonshine" this'll just take "moonshine"! If they say "sniff an opossum" it'll just take "opossum"! 

  if (input === "inventory") {
    console.log("Your inventory includes the following: " + inventory);
  } else if (
    action === "pull" && // PULL --------------------------------------------- PULL (only applies when outside)
    itemLookup[target] instanceof Item &&
    roomLookup[currentRoom].items.includes(target)
  ) {
    itemLookup[target].pull();
    console.log();
    currentRoom = "candlearium";
  } else if (action === "pull" && itemLookup[target] instanceof Item) {
    console.log("Nice try trying to take something that's not even here...");
  } else if (action === "pull") {
    console.log("That item does not exist");
  } else if (
    // TAKE --------------------------------------------------------- TAKE
    action === "take" &&
    itemLookup[target] instanceof Item &&
    roomLookup[currentRoom].items.includes(target)
  ) {
    // if action is take, and target is a legit item, and the item is in the room,
    itemLookup[target].take();
  } else if (action === "take" && itemLookup[target] instanceof Item) {
    // else if action is take and target is a legit item, but item is NOT in the room
    console.log("Nice try trying to take something that's not even here...");
  } else if (action === "take") {
    // TAKE
    // else if action is take and item ain't legit,
    console.log("That item does not exist");
  } else if (action === "go" && roomLookup[target] instanceof Room) {
    // GO TO ------------------------------------------------------------------- GO TO
    // If action is GO and target is a room name (using the room lookup table),
    goto(target);
  } else if (action === "go") {
    console.log(
      "Nice try going somewhere that doesn't even exist...(or maybe you just need to change your sentence structure...)"
    );
  } else if (
    // TALK TO ---------------------------------------------------------------- TALK TO
    action === "talk" &&
    itemLookup[target] instanceof Item &&
    roomLookup[currentRoom].items.includes(target)
  ) {
    itemLookup[target].talkto();
  } else if (action === "talk") {
    console.log("Uh...not possible, you bird.");
  } else if (
    // DROP ------------------------------------------------------------------- DROP
    action === "drop" &&
    itemLookup[target] instanceof Item &&
    inventory.includes(target)
  ) {
    itemLookup[target].drop();
    roomInventory.push(itemLookup[target].name); // adds dropped item to current room's inventory. not working quite yet
  } else if (action === "drop") {
    console.log("You can't drop something you don't have!");
  } else if (
    // SNIFF ------------------------------------------------------------------- SNIFF
    action === "sniff" &&
    itemLookup[target] instanceof Item &&
    roomLookup[currentRoom].items.includes(target)
  ) {
    itemLookup[target].sniff();
  } else if (action === "sniff") {
    console.log("You can't sniff something that's not here!");
  } else if (
    // DRINK ------------------------------------------------------------------- DRINK
    action === "drink" &&
    itemLookup[target] instanceof Item &&
    roomLookup[currentRoom].items.includes(target)
  ) {
    itemLookup[target].drink();
  } else if (action === "drink") {
    console.log("You can't drink something that's not here!");
  } else {
    console.log("\nI don't understand, sorry!");
  }

  return start(); 
}
//----------------END OF ASYNC FUNCTION---------------------------------

/******************  WHEN FILE IS FIRST OPENED *********************/
console.log(
  "\nYou are standing on North Street facing Pitkin Street. You look at the street sign for Pitkin and see that it has a wide wooden base. No other street signs have that. A vine is popping out from the base and curling out towards you. You could ignore all this, or... "
);

/******************* ASSIGNING VARIABLES *************************/
let currentRoom = "outside";
let inventory = [];
let roomInventory = [];
let input =
  "this is going to change and it doesn't matter what it's set to right now but I needed this variable to exist here";

start();