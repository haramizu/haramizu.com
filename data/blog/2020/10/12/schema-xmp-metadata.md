---
title: Content Hub - アセットのメタデータ拡張 (XMP 対応)
date: '2020-10-12'
tags: ['Content Hub']
draft: false
summary: デジタルアセットに付随するメタデータに関して、インポートの際に自動的にカメラメーカー等が記録さている EXIF に含まれる情報を、アセットのメタデータとしてインポートが可能です。今回は、この項目に関して、アセットのスキーマを拡張して、拡張した項目に自動的に設定をする、という拡張をします。今回のブログ記事では手順と関連情報に関して紹介をしています。
images: ['/static/images/2020/10/brandcameraupdate.png']
---

デジタルアセットに付随するメタデータに関して、インポートの際に自動的にカメラメーカー等が記録さている EXIF に含まれる情報を、アセットのメタデータとしてインポートが可能です。今回は、この項目に関して、アセットのスキーマを拡張して、拡張した項目に自動的に設定をする、という拡張をします。ここではその手順と関連情報に関して紹介をしています。

## XMP データとは？

XMP （Extensible Metadata Platform）をサポートするためには、デジタルアセットに関してメタデータを付与して管理する仕組みがデジタルアセット管理のツールとしては求められます。Sitecore Content Hub では標準的なメタデータはもちろん、必要に応じて拡張することができます。

なお、標準でインポートしたあとのファイルのプロパティとして表示されるのは以下のようなデータとなります。

![プロパティ](/static/images/2020/10/fileproperties.png 'プロパティ')

## 今回のシナリオ

写真に含まれているデータとして、カメラメーカーの名前があります。これをスキーマに拡張をして、自動的に設定をする手順を紹介します。

- Camera brand （カメラブランド）

テストとして利用するサンプルの画像は、以下のサイトからダウンロードしました。

- https://exiftool.org/sample_images.html

## スキーマの拡張

まず最初に、スキーマの拡張を行って、カメラブランドに関して入力する項目を作成します。

1. 管理画面の `スキーマ` を開きます
2. スキーマの種類として、 `M.Asset` を選択します
3. **概要** のグループを選択したあと、`新規メンバー` をクリックします
4. 項目としては今回はプロパティを選択して次へ
5. プロパティのタイプは文字列を選択して次へ
6. スキーマの項目を入力します（今回は CameraBrand ）
7. 保存したあと、スキーマを公開します

これにより、スキーマが拡張された形となります。

![スキーマの拡張](/static/images/2020/10/schemacamerabrand.gif 'スキーマの拡張')

## スクリプトの作成

メタデータの処理に関するサンプルのスクリプトを、以下のサイトで紹介をしています。

- [メディア処理スクリプトの例](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/scripting-api/scripting-examples/media-processing-example.html?rp=true&rv=true)

コードをまずはそのまま貼り付けます。（細かい処理に関する解説はページにありますので、ここでは処理内容のみを紹介します）。

```
using System.Linq;

var masterFileRelation = await Context.File.GetRelationAsync<IChildToManyParentsRelation>("MasterFile");

if (!masterFileRelation.Parents.Any() || !masterFileRelation.Parents.Contains(Context.Asset.Id.Value))
{
    return;
}

string ToCsvValue(object source)
{
    var str = source.ToString();
    if (str.Contains(","))
    {
        return "\"" + str + "\"";
    }
    return str;
}

var headers = string.Join(", ", Context.MetadataProperties.Keys.Select(ToCsvValue));
var values = string.Join(", ", Context.MetadataProperties.Values.Select(ToCsvValue));

var metadataProp = await Context.Asset.GetPropertyAsync<ICultureInsensitiveProperty>("Metadata");
metadataProp.SetValue(headers + "\n" + values);

await MClient.Entities.SaveAsync(Context.Asset);
```

このスクリプトは、メタデータの情報を CSV として取得して、アセットの Metadata プロパティに出力しています。この部分に関して、JSON のデータとして処理をして、JToken を使って処理をしていきます。JToken を利用する際には、まず using に Newtonsoft.Json.Linq; を追加します。そして JSON のデータの中で、カメラブランドは _make_ として記載されているので、定義を追加しておきます。

```
using System.Linq;
using Newtonsoft.Json.Linq;

string cameraBrandKey = "make";

MClient.Logger.Info("Metadata Mapping starts.");

var masterFileRelation = await Context.File.GetRelationAsync<IChildToManyParentsRelation>("MasterFile");

if (!masterFileRelation.Parents.Any() || !masterFileRelation.Parents.Contains(Context.Asset.Id.Value))
{
    return;
}

JToken cameraBrand;

if(Context.MetadataProperties.TryGetValue(cameraBrandKey, out cameraBrand))
{
     Context.Asset.SetPropertyValue("CameraBrand", cameraBrand.ToString());
}
else
{
    MClient.Logger.Info($"Could not find a value for {cameraBrandKey}");
    Context.Asset.SetPropertyValue("CameraBrand", $"{cameraBrandKey} not found");
}

await MClient.Entities.SaveAsync(Context.Asset);
```

他にキーを追加している場合は、JToken の記述の部分を複数作成することで、項目を増やしていくことができます。

## スクリプトの登録

スクリプトを登録する際、今回はメディア処理で実行するスクリプトになるため、メタデータ処理のタイプを選択する必要があります。

![メタデータ処理](/static/images/2020/10/brandname.png 'メタデータ処理')

あとはスクリプトを登録、ビルド、有効にする手順を進めていきます。

![スクリプトの登録](/static/images/2020/10/registscript.gif 'スクリプトの登録')

登録が終わった段階で、スクリプトを有効にしておきましょう。

## テスト、結果の確認

スクリプトが有効になっている段階で、設定は完了しています。処理としてはトリガーとかの設定は不要で、ファイルをアップロードした時のメディア処理の際に、登録したスクリプトが実行される形となります。このため、テストとしてはファイルをアップロードすると、自動的に _make_ の項目から、スキーマとして拡張した項目にデータが設定されるようになります。

![カメラブランド](/static/images/2020/10/brandcameraupdate.png 'カメラブランド')

## まとめ

上記のように、ファイルのプロパティとして持っているデータをスキーマに展開して、スキーマに展開したデータを利用して、ファセットの設定、絞り込みなどもできるようになります。実際の運用に合わせて、スキーマの拡張をしてスクリプトを登録することになります。

## 参考情報

- [メディア処理スクリプトの例](https://docs.stylelabs.com/ja-jp/contenthub/4.0.x/content/integrations/scripting-api/scripting-examples/media-processing-example.html?rp=true&rv=true)
- [Viewing Asset XMP Data in Sitecore Content Hub](https://www.cmsbestpractices.com/viewing-asset-xmp-data-in-sitecore-content-hub/)
