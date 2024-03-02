# mf97-website
東大CAST　駒場祭2024の特設サイトです。

## サーバーの起動

```shell
npm install -g superstatic
cd mf97-website/src/
superstatic "/"
```

Visit http://localhost:3474 

## リンクの扱い

内部リンクは、```"rittaishi"```、```"access"```、```""```（トップページ）のように記述します。

GitHubに置かれている、JSON、MD、画像などのリソースへのアクセスは、```"/exhibits.json"```、```"/articles/rittaishi.md"```、```"/img/rittaishi/img1.jpg"```のように記述します。

外部リンクは、ふつうのURLを記述します。