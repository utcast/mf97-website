const SITE_TOP = "https://ut-cast.net/mayfes2024";
const RESOURCE_TOP = "https://raw.githubusercontent.com/utcast/mf97-website/main/contents";

/**
 * ルート相対パスを絶対パスに変換する。
 * urlが / で始まる場合　→　サイトトップをルートとして扱う
 * urlが contents/ で始まる場合　→ GitHubのcontentsをルートとして扱う
 * それ以外の場合はそのまま返す
 * @param {string} url 絶対パスもしくはルート相対パスのURL
 * @returns {string} 絶対パス
 */
const toFullURL = function(url) {
	if (url.startsWith("/")) {
		return SITE_TOP + url;
	}
	if (url.startsWith("contents/")) {
		return RESOURCE_TOP + url;
	}
	return url;
}