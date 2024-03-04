# mf97-website
東大CAST　駒場祭2024の特設サイトです。

## しくみ
- 記事データは、`mf97-website/contents/articles`フォルダにMarkdownファイルとして格納されています。
- 画像などのリソースは、`mf97-website/contents/img/(企画のid)`フォルダに格納されています。
- 記事に画像などのリソースを含めたいときは、`/img/(企画のid)/(ファイル名).jpg`などと指定します。
- 他企画のページや、アクセス・タイムテーブルページへのリンクを貼りたいときは、`timetable`のようにリンク先の記事のidだけを指定します。

## 準備
1. [VS Codeを入手する](https://code.visualstudio.com/)。
2. `https://github.com/utcast/mf97-website.git`を、作業用フォルダにクローンする。
3. 拡張機能「[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)」、「[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)」をインストールする。

## 書き方
https://docs.google.com/document/d/1GXvp3zUu9v38bjKGT2gUDsh63UoUOskJtCZ211bQpQc/edit
を参照してください。CASTのGoogleアカウントから閲覧できます。

## エディター
見た目を確認しながら編集できます。保存はできないので、最後にコピペする必要があります。
1. `~/mf97-website/editor/editor.html`を開く。
2. ふりがなを振るには、[ふりがなエディター](https://bull-frog.github.io/ruby-editor/)の「CASTホームページ用」を使う。

## 仕上がりを確認する
`~/mf97-website/contents`以下を編集したら、ここで仕上がりを確認します。
1. VS Codeのサイドバーで、`~/mf97-website/test/index.html`を右クリック。
2. 「Open with Live Server」をクリック。

## GitHubに反映させる
1. VS Codeでコミット操作をすると、`compose`ブランチに反映されます。
2. 時間差で、 [ここ]() に反映されます。
3. 校正が通ったら、`compose`ブランチを`main`ブランチにmergeします。
