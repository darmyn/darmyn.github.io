var listsData = [
    [
      ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"],
      ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"],
      ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"],
      ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"],
      ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"]
    ],
    [
      ["The bird", "Mother", "Father", "The puppy", "My instructor", "The giraffe", "The feline"],
      ["perched on", "consumed", "waltzed with", "observed", "dislikes", "embraced"],
      ["an amusing", "a frightening", "a silly", "a slippery", "a yapping", "a plump"],
      ["goose", "ape", "salmon", "bull", "toad", "beetle", "larva"],
      ["on the asteroid", "on the stool", "in my noodles", "in my stew", "on the lawn", "in my boots"]
    ],
    [
      ["The chicken", "Mum", "Pop", "The puppy", "My mentor", "The rhinoceros", "The kitten"],
      ["rested on", "devoured", "twirled with", "spotted", "abhors", "smooched"],
      ["an entertaining", "a terrifying", "a playful", "a slippery", "a barking", "a chubby"],
      ["duck", "chimp", "trout", "ox", "toad", "ant", "maggot"],
      ["on the asteroid", "on the bench", "in my noodles", "in my broth", "on the lawn", "in my boots"]
    ]
];  

// several useful references to elements in the DOM
wordListElements = document.querySelectorAll("#columns ul li");
listSelectionButtons = document.querySelectorAll("#word-selector-buttons li");
listSelectionButtons = document.querySelectorAll("#word-selector-buttons li");
currentSentance = document.querySelector("#controls p")

currentListVersion = 0 // cycles between word list index
wordLists = listsData[currentListVersion]
listSelectionIndexes = [0, 0, 0, 0, 0] // index corresponding to wordList index values corresponding to wordList chosen sublist

// this function changes the words being used for the story
function changeWords() {
    currentListVersion = (currentListVersion + 1) % 3
    wordLists = listsData[currentListVersion]
    refresh()
    for (let i = 0; i < wordListElements.length; i++) {
        var wordChoices = wordListElements[i].querySelectorAll(".word-choice p")
        for (let j = 0; j < wordChoices.length; j++) {
            wordChoices[j].textContent = wordLists[i][j]
        }
    }
}

// refreshes to display updated game state
function refresh() {
    for (let i = 0; i < listSelectionIndexes.length; i++) {
        listSelectionIndexes[i] = 0
        updateListSelection(i)
    }
    updateSentance()
}

// simply calls update sentance because the playback button
// should just story the new text you have selected
function playback() {
    updateSentance();
}

// picks a random word from each list and selects it
function random() {
    for (let i = 0; i < listSelectionIndexes.length; i++) {
        let randNum = Math.floor(Math.random() * wordLists[i].length);
        listSelectionIndexes[i] = randNum
        updateListSelection(i)
    }
    updateSentance()
}

// updates the visual sentance on screen according to game state
function updateSentance() {
    sentance = ""
    for (let i = 0; i < wordLists.length; i++) {
        sentance += wordLists[i][listSelectionIndexes[i] - 1]
        if (i != wordLists.length - 1) {
            sentance += " - "
        }
    }
    currentSentance.textContent = sentance
}

function reset() {
    refresh()
}

// updates the word lists selection visuals
function updateListSelection(index) {
    currentList = wordLists[index];
    currentIndex = listSelectionIndexes[index];
    currentVal = currentList[currentIndex - 1];
    listSelectionIndexes[index] = (currentIndex + 1) % (currentList.length);

    for (var element of wordListElements[index].querySelectorAll(".word-choice p")) {
        element.classList.remove("selected")
        element.classList.add("deselected")
    }
    wordListElements[index].querySelectorAll(".word-choice p")[currentIndex].classList.add("selected")
    wordListElements[index].querySelectorAll(".word-choice p")[currentIndex].classList.remove("deselected")
}

// connect event listeners for control buttons
document.getElementById("random").addEventListener("click", random)
document.getElementById("playback").addEventListener("click", playback)
document.getElementById("reset").addEventListener("click", reset)
document.getElementById("change-words").addEventListener("click", changeWords)

// connect event listeners for word selector buttons
// using a for loop instead of writing code for each
for (let i = 0; i < listSelectionButtons.length; i++) {
    listSelectionButtons[i].onclick = function() {
        updateListSelection(i);
    };
}

// initial render
refresh()