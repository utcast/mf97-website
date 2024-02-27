/**
 * ドキュメントを読み込んだ際、URLクエリを解析し、該当する記事のMDファイルを取得して画面上に表示する。
 */

import { mdToHTML } from "./md-to-html.js";

// トップページのURL
// const homepageURL = "https://ut-cast.net/mayfes2024/";
const homepageURL = "http://localhost/src/";

document.addEventListener("DOMContentLoaded", async function(e) {
	// URLクエリから、表示する記事のnameを得る
	const searchParams = new URLSearchParams(window.location.search);
	const articleName = searchParams.get("name");
	// nameが空欄の場合は、トップページに遷移
	if (!articleName) {
		// this.location.href = homepageURL;
	}

	// GitHubからMDファイルを取得する
	const request = new XMLHttpRequest();
	request.open("GET", resourceLocation + articleName + ".md");
	request.send();
	request.onload = function() {
		
		// 表示を更新する
		const html = mdToHTML(request.response);
		document.title = html.title;
		document.querySelector("article").innerHTML = html.article; 
	};
});

const resourceLocation = "https://raw.githubusercontent.com/utcast/mf97-website/compose/src/articles/";