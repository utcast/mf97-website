document.addEventListener("DOMContentLoaded", function () {

	// ヘッダー、フッターの内容を設定
	makeHeaderAndFooter();

	// URLクエリからpageを取得し、本文の内容を設定。
	const page = (new URLSearchParams(window.location.search)).get("name");
	const markdownLocation = page ? `${RESOURCE_TOP}/articles/${page}.md` : `${RESOURCE_TOP}/index.md`;
	makeArticle(markdownLocation);

});

window.addEventListener("load", function () {

	// 外部リンクが新規タブで開くように設定
	makeExternalLinksOpenInNewTab();

	// ふりがな指定
	const furiganaSwitch = this.document.getElementById("furigana-switch");
	furiganaSwitch.addEventListener("change", function(e) {
		toggleRuby(e.target.checked);
	});
	toggleRuby(furiganaSwitch.checked);
});

/**
 * GitHubからheader.jsonを取得し、headerの内容を表示する。
 */
const makeHeaderAndFooter = function () {
	const headerElement = document.getElementById("header-content");
	const footerElement = document.getElementById("footer-content");
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
						headerHTML += `<li><a class="dropdown-item" href="${toFullURL(exhibit.href)}">${putRuby(exhibit.text)}</a></li>`;
					}
					if (i < item.dropdown.length - 1) {
						headerHTML += `<li><hr class="dropdown-divider"></li>`;
					}
				}
				headerHTML += "</ul></li>";
			} else {
				headerHTML += `<li class="nav-item"><a class="nav-link" aria-current="page" href="${toFullURL(item.href)}">${putRuby(item.text)}</a></li>`;
			}
		}
		headerElement.innerHTML = headerHTML;

		// Footer
		let footerHTML = "";
		const footerJSON = JSON.parse(request.responseText).footer;
		for (let section of footerJSON) {
			footerHTML += `<div class="col-8 col-sm-4 mb-3"><ul class="nav flex-column">`;
			for (let item of section) {
				footerHTML += `<li class="nav-item mb-2"><a href="${toFullURL(item.href)}" class="nav-link p-0 text-body-secondary">${putRuby(item.text)}</a></li>`;
			}
			footerHTML += `</ul></div>`;
		}
		footerElement.innerHTML = footerHTML;
	};
};

/**
 * GitHubからMarkdownファイルを取得し、記事本文の内容を設定する。
 * @param {string} markdownLocation 取得するMarkdownファイルのURL
 */
const makeArticle = function (markdownLocation) {
	const articleElement = document.getElementById("article");
	const request = new XMLHttpRequest();
	request.open("GET", markdownLocation);
	request.send();
	request.onload = function () {
		// let articleHTML = mdToHTML(request.responseText);
		// articleElement.innerHTML = articleHTML;
		articleElement.innerText = request.responseText;
	};
};


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

/**
 * CSS変数を制御することで、ルビの表示・非表示を切り替える。
 * @param {boolean} on ルビを表示するときはtrue、そうでなければfalse
 */
const toggleRuby = function (on) {
	const root = document.querySelector(":root");
	if (on) {
		// ルビを表示する
		root.style.setProperty('--ruby-display', 'unset');
		root.style.setProperty('--line-height-scale', "1.15");
	} else {
		// ルビを隠す
		root.style.setProperty('--ruby-display', 'none');
		root.style.setProperty('--line-height-scale', "1");
	}
};

/**
 * 「https://ut-cast.net/mayfes2024」以外で始まるリンクに target="_blank" を付与し、新規タブで開くようにする。
 * （最後に呼び出す）
 */
const makeExternalLinksOpenInNewTab = function () {
	for (let a of document.querySelectorAll("a")) {
		if (a.href && !a.href.startsWith("https://ut-cast.net/mayfes2024")) {
			a.target = "_blank";
		}
	}
};