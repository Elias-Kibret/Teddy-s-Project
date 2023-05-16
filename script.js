
//import json files

import data from "./data.json" assert { type: "json" };


// Intialiaze DOM 

let container = document.getElementById("main");
let buttons = document.getElementsByClassName("icon");
let panel = document.getElementsByClassName("panel");
let title = document.getElementsByClassName("title");
let arrowButton = document.getElementsByClassName("arrow");
let lockButton = document.getElementsByClassName("lock");


// Intial state of the accordion

const state = [true, false, false, false];
let active = false;
let prevReturned = false;
let lastChecked = false;
let intialClicked = false;


// Intialiaze DOM


const intial = () => {

	//Map for the json data 
	const AccordionDOM = data?.sections?.map((item, index) => {
		return `<section>
				  <div class="header">
					 <h1 class="title">
						${item.title.value}
					 </h1>
					 <div class="icon">
                      
					 <img src="./assets/arrowDown.svg" class="${
							state[index] ? "show" : "hide"
						} arrow" alt="arrow down"/>	
					 <img src="./assets/lock.svg" class="${
							!state[index] ? "show" : "hide"
						} lock" alt="lock"/>				
	               
									
					 </div>
				  </div>
              
				  <div class="panel">
					<p>${item.panel.value}
				  </p>
				  <div class="panel-image">
				  <img src="${"./assets/" + item?.panel?.image?.src}" alt=${
			item?.panel.image.title
		}/>
	
				  </div>
            
				  </div>
			</section>`;
	});

	// put the Mapped json Data into HTML Container 
	container.innerHTML = AccordionDOM;

	 
	
	for (let i = 0; i < buttons.length; i++) {

		//By default all the accordion is closed
		// Move over the state and turn the default display block to none
		// Basically we can set this in css file

		if (!state[i] || i == 0) {
			panel[i].style.display = "none";
		}


		// Added Active class to the first accordion and

		if (i == 0 && state[i]) {
			title[i].classList.add("active");
		}
	}
};


//Run 
intial();


// Add click event to each button
// Manupulate each button accordingly 

for (let i = 0; i < buttons.length; i++) {
	//once  the button clicked , activated
	active = true;


	buttons[i].addEventListener("click", () => {

		// Toggle opening and closing of the accordion
		if (
			state[i] &&
			state.slice(i + 1).every((item) => item == false) &&
			intialClicked
		) {
			panel[i].style.display = "none";
			state[i] = false;
		} else if (state.slice(0, i).every((item) => item == true)) {
			panel[i].style.display = "flex";
			state[i] = true;
		}

		//The first click must be accordion 1;
		// check is the the accordion click has began 

		if (!intialClicked && i == 0) {
			panel[i].style.display = "flex";
			intialClicked = true;
		}
        
		//Toggle the rotation of the arrow icons

		if ((i == 0 || state[i - 1]) && active && i !== state.length - 1) {

			//Add active class to title of the subsequeant elemets

			title[i + 1].classList.add("active");

			//change lock Icon to Arrow icons
			arrowButton[i + 1].classList.add("show");
			arrowButton[i + 1].classList.remove("hide");
			lockButton[i + 1].classList.add("hide");
			lockButton[i + 1].classList.remove("show");
		}

		if (state[i]) {
            //Edge case rotation
			arrowButton[i].classList.add("rotateIcons");
		}
		if (!state[i]) {
			//Edge case rotation
			arrowButton[i].classList.remove("rotateIcons");
		}


		//Checked if all accordion have been checked 
		
		const currentReturn = state.every((item) => item == false);

		//Resturn to the initial value

		if (intialClicked && state[0] && prevReturned && lastChecked) {
            
			intialClicked = false
			prevReturned = false;
			state[0] = true;
			lastChecked = false;
			intial()
			location.reload()
		}
		//Check is the last accordion has checked
		if (state[state.length - 1]) {
			lastChecked = true;
		}
		prevReturned=currentReturn
		
	});
}
