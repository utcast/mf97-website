const notSavedMessage = function(e) {
	return true;
}

document.addEventListener("DOMContentLoaded", function() {

	document.querySelector("#input").addEventListener("input", function(e) {

		let result = mdToHTML(e.target.value);

		document.querySelector("article").innerHTML = result.article;
		window.onbeforeunload = notSavedMessage;

	});

	const root = document.querySelector(":root");
	root.style.setProperty('--ruby-display', 'unset');
	root.style.setProperty('--line-height-scale', "1.15");

});

const fileKey = "cast_hp_visual_editor_text";

window.addEventListener("load", function() {
	let text = this.localStorage.getItem(fileKey);
	if (text) {
		let input = this.document.querySelector("#input");
		input.value = text;
		input.dispatchEvent(new Event("input"));
	}
});

const autoSaveIntervalID = setInterval(() => {
	if (this.document.querySelector("#input").value) {
		this.localStorage.setItem(fileKey, this.document.querySelector("#input").value);
	}
	window.onbeforeunload = null;
}, 5000);
