const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const versesArray = [
  "The Lord is my shepherd; I shall not want.",
  "He makes me lie down in green pastures. He leads me beside still waters.",
  "He restores my soul. He leads me in paths of righteousness for His name's sake.",
  "Even though I walk through the valley of the shadow of death, I will fear no evil, for You are with me; Your rod and Your staff, they comfort me.",
  "You prepare a table before me in the presence of my enemies; You anoint my head with oil; my cup overflows.",
  "Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the Lord forever",
];

// Store list items
const listItems = [];

let dragStartIndex;

createList(); // function to create items to display

check.addEventListener("click", verifyOrder); // buttton click function

// To insert list items into DOM

function createList() {
  // versesArray is destructured here to create a copy of the original array, such that original arrray is not scrambled
  [...versesArray]
    .map((verse) => ({ value: verse, sortRandom: Math.random() })) //create an object with name and randomly generated number
    .sort((a, b) => a.sortRandom - b.sortRandom) // sort the object based on random number
    .map((a) => a.value) // get the verses from the sorted object in an array
    .forEach((verse, index) => {
      // for each verse create a list item
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${verse}</p>
      <i class="fas fa-grip-lines"></i>
    </div>`;
      listItems.push(listItem);
      draggable_list.append(listItem);
    });

  addEventListeners();
}

draggable_list.draggable(); // to test jquery touch event on mobile

// To add event listeners on every action on the list item

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  draggableItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index"); // to get the index of the item selected to drag
}

function dragEnter() {
  this.classList.add("over"); // to change the background color while drag enter
}

function dragLeave() {
  this.classList.remove("over"); // to remove the background color while drag leave
}

function dragOver(e) {
  e.preventDefault(); // to prevent the default behaviour while swapping
}

function dragDrop() {
  dragEndIndex = +this.getAttribute("data-index"); // to drop the item on end index
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over"); // to remove the background color after dropping
}

// to swap items on drag and drop the listItem

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// To validate the correct order of list items; change color to red or green based on the correct/wrong ordering

function verifyOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== versesArray[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("correct");
    }
  });
}
