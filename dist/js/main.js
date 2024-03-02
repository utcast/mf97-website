document.addEventListener("DOMContentLoaded", function () {

	makeHeaderAndFooter();

});

/**
 * GitHubからheader.jsonを取得し、headerの内容を表示する。
 */
const makeHeaderAndFooter = function () {
	const headerContent = document.getElementById("header-content");
	const footerContent = document.getElementById("footer-content");
	const request = new XMLHttpRequest();
	request.open("GET", `${RESOURCE_TOP}/header-and-footer.json`);
	request.send();
	request.onload = function () {

		// Header
		let headerHTML = "";
		const headerJSON = JSON.parse(request.responseText).header;
		for (let item of headerJSON) {
			if (item.dropdown) {
				headerHTML += `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">${putRuby(item.text)}</a><ul class="dropdown-menu">`;
				for (let i = 0; i < item.dropdown.length; i++) {
					for (let exhibit of item.dropdown[i]) {
						headerHTML += `<li><a class="dropdown-item" href="${SITE_TOP + exhibit.href}">${putRuby(exhibit.text)}</a></li>`;
					}
					if (i < item.dropdown.length - 1) {
						headerHTML += `<li><hr class="dropdown-divider"></li>`;
					}
				}
				headerHTML += "</ul></li>";
			} else {
				headerHTML += `<li class="nav-item"><a class="nav-link" aria-current="page" href="${item.href}">${putRuby(item.text)}</a></li>`;
			}
		}
		headerContent.innerHTML = headerHTML;

		// Footer
		let footerHTML = "";
		const footerJSON = JSON.parse(request.responseText).footer;
		for (let section of footerJSON) {
			for (let item of section) {

			}
		}
	};
}

/**
 * GitHubからfooter.jsonを取得し、footerの内容を表示する。
 */
const makeFooter = function () {
	const footerSection1 = document.getElementById("footer-section1");
	const footerSection2 = document.getElementById("footer-section2");
	const request = new XMLHttpRequest();
	request.open("GET", `${RESOURCE_TOP}/header.json`);
	request.send();
	request.onload = function () {
		let innerHTML1 = "";
		let innerHTML2 = "";
		const footerJSON = JSON.parse(request.responseText);
		
	}
}


/**
 * 振り仮名を表記したMDをHTML記法に変換する
 * @param {string} inputText [漢字|ふりがな]が含まれるテキスト
 * @returns {string} <span data-ruby="ふりがな">漢字</span>が含まれるテキスト
 */
const putRuby = function (inputText) {

	// ["["を除く任意の文字列|任意の文字列]の最短一致
	const rubySearch = /\[[^\[]+?\|.+?\]/g;

	// 正規表現でSplitした配列（前後の空文字も含む）
	let baseTextArray = inputText.split(rubySearch, -1);
	// 正規表現にMatchした文字列
	let rubyTextArray = inputText.match(rubySearch);

	if (!rubyTextArray) {
		return inputText;
	}

	// 返す文字列
	let output = "";
	for (let i = 0; i < rubyTextArray.length; i++) {
		let rubyText = rubyTextArray[i];
		let splitIndex = rubyText.lastIndexOf("|");
		let ruby_kanji = rubyText.substring(1, splitIndex);
		let ruby_kana = rubyText.substring(splitIndex + 1, rubyText.length - 1);
		output += `${baseTextArray[i]}<span data-ruby="${ruby_kana}">${ruby_kanji}</span>`;
	}
	output += baseTextArray[baseTextArray.length - 1];

	return output;

};