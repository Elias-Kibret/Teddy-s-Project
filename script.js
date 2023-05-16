const data = [
	{
		title: {
			value: "Step 1: Eggs",
		},
		panel: {
			value:
				"Frogs begin life as fertilized eggs. Female frogs lay thousands of eggs at one time in a pond. The eggs float on water in a jelly mass or cluster. Soon, the eggs will hatch into tadpoles!",
			image: {
				src: "Frog Lifecycle Step 1.jpg",
				title:
					"frog eggs in various stages of development, starting with an olive-colored ball and ending with a visible tail",
			},
		},
	},
	{
		title: {
			value: "Step 2: Tadpoles",
		},
		panel: {
			value:
				"When a tadpole hatches, it looks more like a fish than a frog. A tadpole doesn\u0026rsquo;t have any legs. It has gills that allow it to breathe underwater. A tadpole swims, eats and grows for several weeks. Nutrients are stored in the tadpole\u0027s tail, as hind legs begin to grow.",
			image: {
				src: "Frog Lifecycle Step 2.jpg",
				title:
					"tadpoles in various stages of development, ending with an organism with a small frog head with eyes and newly-formed back legs",
			},
		},
	},
	{
		title: {
			value: "Step 3: Froglet",
		},
		panel: {
			value:
				"As a tadpole grows two front legs, its long tail becomes shorter. The tadpole uses stored nutrients as food, so until its tail is completely gone, it doesn\u0026rsquo;t need anything else to eat! When just a little stub of its tail is left, the tadpole has now become a young frog. It can hop right out of the water and onto dry land for the first time.",
			image: {
				src: "Frog Lifecycle Step 3.jpg",
				title: "3 phases of the froglet\u0027s development",
			},
		},
	},
	{
		title: {
			value: "Step 4: Adult Frog",
		},
		panel: {
			value:
				"The frog\u0026rsquo;s tail eventually disappears and the frog will begin eating insects instead of plants from the water. A young frog continues to grow for about 2-4 years until it becomes an adult. Adult frogs then lay their own eggs and more tadpoles hatch and begin the cycle again!",
			image: {
				src: "Frog Lifecycle Step 4.jpg",
				title:
					"two adult frogs: the left frog is younger and smaller, the right frog is a full-grown adult",
			},
		},
	},
];
let container = document.getElementById("main");
let buttons = document.getElementsByClassName("icon");
let panel = document.getElementsByClassName("panel");
let title = document.getElementsByClassName("title");
let arrowButton = document.getElementsByClassName("arrow");
let lockButton = document.getElementsByClassName("lock");

const state = [true, false, false, false];
let active = false;
let intialClicked = false;

const intial = () => {
	const AccordionDOM = data?.map((item, index) => {
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
	container.innerHTML = AccordionDOM;
	for (let i = 0; i < buttons.length; i++) {
		if (!state[i] || i == 0) {
			panel[i].style.display = "none";
		}
		if (i == 0 && state[i]) {
			title[i].classList.add("active");
		}
	}
};
intial();
let prevReturned;
for (let i = 0; i < buttons.length; i++) {
	active = true;
	buttons[i].addEventListener("click", () => {
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
		if (!intialClicked && i == 0) {
			panel[i].style.display = "flex";
			intialClicked = true;
		}

		if ((i == 0 || state[i - 1]) && active && i !== state.length - 1) {
			title[i + 1].classList.add("active");
			arrowButton[i + 1].classList.add("show");
			arrowButton[i + 1].classList.remove("hide");
			lockButton[i + 1].classList.add("hide");
			lockButton[i + 1].classList.remove("show");
		}
		//Toggle Arrow
		if (state[i]) {
			console.log("add", i);
			arrowButton[i].classList.add("rotateIcons");
		}
		if (!state[i]) {
			arrowButton[i].classList.remove("rotateIcons");
		}
		const currentReturn = state.every((item) => item == false);

		if (intialClicked && state[0] && prevReturned) {
			intial();
		}
		prevReturned = currentReturn;
	});
}
