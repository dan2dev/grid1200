// import "./main.scss";

interface IWidthScreenSize {
	width: number;
	letter: string;
}
// maybe your should remove the C and put b: 6gd and
const widthScreenSizes: IWidthScreenSize[] = [
	{ width: 0, letter: "s" }, // 0
	{ width: 576, letter: "x" }, // 6gd					x
	{ width: 960, letter: "xx" }, // 10gd				xx
	{ width: (1152), letter: "xxx" }, // 1152 / 12gd		xxx
];
namespace BananaGrid {
	let loaded: boolean = false;
	let timer: number | any;
	const currentLetters: string[] = [];
	function set(letter: string): void {
		if (currentLetters.indexOf(letter) === -1) {
			currentLetters.push(letter);
		}
		document.body.classList.add(letter);
	}
	function unset(letter: string): void {
		const index: number = currentLetters.indexOf(letter);
		if (index > -1) {
			currentLetters.splice(index, 1);
		}
		document.body.classList.remove(letter);
	}
	function render(): void {
		const width: number = window.innerWidth;
		const height: number = window.innerHeight;
		widthScreenSizes.forEach((size) => {
			if (size.width <= width) {
				set(size.letter);
			} else {
				unset(size.letter);
			}
			document.body.style.visibility = "hidden";
			requestAnimationFrame(() => {
				document.body.style.width = width + "px";
				document.body.style.minHeight = height + "px";
				document.body.style.visibility = "";
			});
			// requestAnimationFrame(() => {
			// 	document.body.style.visibility = "hidden";
			// 	document.body.style.width = "100vw";
			// 	// document.body.style.height = "100vh";
			// 	document.body.style.minHeight = "100vh";
			// });
			// setTimeout(() => {
			// 	requestAnimationFrame(() => {
			// 		document.body.style.width = width + "px";
			// 		document.body.style.minHeight = "100vh";
			// 		document.body.style.visibility = "";
			// 	});
			// }, 100);
		});
	}
	function resizeChange(e: UIEvent): void {
		clearTimeout(timer);
		timer = setTimeout(render, 100);
	}
	function init(): void {
		if (loaded === false && document.body !== undefined && document.body !== null) {
			loaded = true;
			window.addEventListener("resize", resizeChange);
			window.addEventListener("orientationchange", () => {
				document.body.style.width = "100vw";
			}, false);
			document.body.classList.add("banana-grid");
			render();
		} else {
			setTimeout(init, 50);
		}
	}
	init();
}
