/*__________________VARIABLES______________________*/
const tabColor = [
	"blue",
	"red",
	"yellow",
	"green",
	"indigo",
	"maroon",
	"springgreen",
	"violet",
];
const cursor = document.getElementById("cursor");
const colorsTable = document.querySelector("#colors");
const gameTable = document.querySelector("#tab");
const bravo = document.querySelector("h1");
const button = document.querySelector("button");
let prototypeNumber = ["", "", "", ""];
let prototypeColor = ["", "", "", ""];
let colorGetted = "";
let actualRow = "";
let arrayOfColors = ["", "", "", ""];
let check = false;
let compare = false;
let solved = false;
let nbrOfTrys = 0;
/*_________________________________________________*/
/*_***********************************************_*/
/*_***********************************************_*/

/*_______________FUNCTIONS_________________________*/
function congratulation() {
	bravo.style.visibility = "visible";
}
function testArray(tab) {
	let test = false;
	tab.forEach((x) => {
		if (x) {
			test = true;
		} else {
			test = false;
		}
	});
	return test;
}
function removeCursorColor() {
	cursor.style.background = "";
}
function incrementChar(char) {
	let x = char.charCodeAt(0);
	x++;
	return String.fromCharCode(x);
}
function getRandom() {
	let x;
	x = Math.floor(Math.random() * 8);
	return x;
}
function getPrototypeColor() {
	let tab = [];
	for (let i = 0; i < 4; i++) {
		tab[i] = tabColor[getRandom()];
	}
	return tab;
}
function changeCursorColor() {
	colorsTable.addEventListener("mouseleave", () => {
		cursor.style.background = colorGetted;
	});
	colorsTable.addEventListener("mousemove", (e) => {
		cursor.style.background = e.target.style.background;
	});
}
function compareArrays(t1, t2) {
	if (t1[0] === t2[0] && t1[1] === t2[1] && t1[2] === t2[2] && t1[3] === t2[3])
		return true;
}
function piqueColorFromTabColors() {
	colorsTable.addEventListener("click", (e) => {
		if (colorGetted == "") {
			colorGetted = e.target.style.background;
		} else if (colorGetted == e.target.style.background) {
			colorGetted = "";
		} else {
			colorGetted = e.target.style.background;
		}
	});
}
function exists(x, tab) {
	let m = 0;
	for (let i = 0; i < tab.length; i++) {
		if (tab[i] == x) m++;
	}
	return m;
}
function existsNumber(t1, t2) {
	let t3 = [];
	let n = 0;
	t1.forEach((e) => {
		if (exists(e, t2) > exists(e, t3)) {
			t3.push(e);
		}
		n++;
	});
	return t3.length;
}

function existsInPlace(t1, t2) {
	let np = 0;
	for (let i = 0; i < 4; i++) {
		if (t1[i] == t2[i]) {
			np++;
		}
	}
	return np;
}
function emptyArray(tab) {
	tab[0] = "";
	tab[1] = "";
	tab[2] = "";
	tab[3] = "";
}
function reset() {
	button.addEventListener("mousemove", () => {
		button.style.background = "rgb(155, 146, 146)";
		button.style.color = "white";
	});
	button.addEventListener("mouseleave", () => {
		button.style.background = "black";
		button.style.color = "rgb(155, 146, 146)";
	});
	button.addEventListener("click", () => {
		document.location.reload();
	});
}
function getColoreFromKeyboard() {
	document.addEventListener("keypress", (e) => {
		switch (e.key) {
			case "b" || "B":
				colorGetted = "blue";
				cursor.style.background = colorGetted;
				break;
			case "r" || "R":
				colorGetted = "red";
				cursor.style.background = colorGetted;
				break;
			case "y" || "Y":
				colorGetted = "yellow";
				cursor.style.background = colorGetted;
				break;
			case "g" || "G":
				colorGetted = "green";
				cursor.style.background = colorGetted;
				break;
			case "i" || "I":
				colorGetted = "indigo";
				cursor.style.background = colorGetted;
				break;
			case "m" || "M":
				colorGetted = "maroon";
				cursor.style.background = colorGetted;
				break;
			case "s" || "S":
				colorGetted = "springgreen";
				cursor.style.background = colorGetted;
				break;
			case "v" || "V":
				colorGetted = "violet";
				cursor.style.background = colorGetted;
				break;

			default:
				break;
		}
	});
}
function putColorInTheGrid() {
	prototypeColor = getPrototypeColor();
	prototypeColor.forEach((e) => {
		console.log(e);
	});
	gameTable.addEventListener("click", (e) => {
		if (colorGetted) {
			let row = e.target.id.charAt(0);
			let colon = parseInt(e.target.id.charAt(1));
			if (actualRow == "") {
				actualRow = row;
			} else if (actualRow == row) {
				gameTable.querySelector(`#${e.target.id}`).style.background =
					colorGetted;
				arrayOfColors[colon - 1] = colorGetted;
				if (
					arrayOfColors[0] != "" &&
					arrayOfColors[1] != "" &&
					arrayOfColors[2] != "" &&
					arrayOfColors[3] != ""
				) {
					check = true;
				}
				if (check /*If row is full)*/) {
					compare = compareArrays(prototypeColor, arrayOfColors);
					if (compare) {
						console.log("******OK******");
						for (let i = 0; i < prototypeColor.length; i++) {
							document.querySelector(`#res${i + 1}`).style.background =
								prototypeColor[i];
							document.querySelector(`#res${i + 1}`).style.border =
								prototypeColor[i];
						}
						solved = true;
					} else {
						let idIncrementRed = existsNumber(arrayOfColors, prototypeColor);
						let idIncrementBlack = existsInPlace(arrayOfColors, prototypeColor);
						let idAlpha = actualRow.toLowerCase();

						for (let i = 1; i <= idIncrementRed; i++) {
							document.querySelector(`#${idAlpha}${i}`).style.background =
								"red";
						}
						for (let i = 1; i <= idIncrementBlack; i++) {
							document.querySelector(`#${idAlpha}${i}`).style.background =
								"white";
						}
						arrayOfColors.forEach((e) => {
							console.log(e);
						});
						emptyArray(arrayOfColors);
						prototypeColor.forEach((e) => {
							console.log(e);
						});
						actualRow = incrementChar(actualRow);
						check = false;
						nbrOfTrys += 1;
					}
				}
				//console.log(`new row is: ${actualRow}`);
			}
			//console.log(`****${check}****`);

			// removeCursorColor();
			//colorGetted="";
		} else {
			alert("Pleas select a color");
		}
		if (solved) {
			congratulation();
		}
		if (nbrOfTrys > 11) {
			bravo.textContent = "Fail";
			bravo.style.visibility = "visible";
		}
	});
}
/*_____________________________________________________________________________*/
/*_***************************************************************************_*/

/*______________BUILDING________________*/
for (let i = 65; i < 77; i++) {
	let n = String.fromCharCode(i);
	let firstCircle = document.querySelector(`#${n}0`);
	firstCircle.style.background = "black";
	firstCircle.style.border = "none";
}
for (let i = 1; i < 9; i++) {
	const colors = document.querySelector(`#color${i}`);
	colors.style.background = tabColor[i - 1];
}
/*___________BUILDING END___________________*/
/*__________CIRCLE FOLLOWS CURSOR_____________________*/
document.addEventListener("mousemove", (e) => {
	cursor.style.left = e.pageX + "px";
	cursor.style.top = e.pageY + "px";
});
/*____________________________________________________*/

changeCursorColor();
piqueColorFromTabColors();
putColorInTheGrid();
getColoreFromKeyboard();
reset();
