---
title: Next.js に Google Tag Manager を設定する - XM Cloud 編
date: '2022-12-12'
tags: ['XM Cloud', 'XM', 'Headless SXA', 'Next.js']
draft: false
summary: XM Cloud のサイトを外部に公開をしました。他のサービスと連携させるためにも、まずは Google Tag Manager を設定します。
images: ['/static/images/2022/12/gtm08.png']
---

XM Cloud のサイトを外部に公開をしました。他のサービスと連携させるためにも、まずは Google Tag Manager を設定します。

## Next.js に Google Tag Manager を設定する

以前にもブログで紹介をしましたが、今回は少し違う形で実装をしていきます。

- [Next.js に Google Tag Manager を設定する](/blog/2022/02/25/nextjs-googletagmanager)

まずパスを変更して、以下のコマンドでモジュールをインストールします。

```
cd src\sxastarter
npm install react-gtm-module
npm install --save-dev @types/react-gtm-module
```

![GTM](/static/images/2022/12/gtm01.png)

続いて、以下のように新しいコンポーネントを作成します。

```javascript:src\sxastarter\src\components\GoogleTagManager.tsx
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GoogleTagManager = (): JSX.Element => {
  // useEffect for basic page views tracking via router/gtag.
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: process.env.GTM_ID as string,
      auth: process.env.GTM_AUTH as string,
      preview: process.env.GTM_ENVIRONMENT as string,
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  return <></>;
};

export default GoogleTagManager;
```

続いて、スクリプトをインポートしているファイルを編集します。この際、今回は CdpPageView を利用しないのでコメントアウトをして、Google Tag Manager のみにします。

```javascript:src\sxastarter\src\Scripts.tsx
// import CdpPageView from 'components/CdpPageView';
import GoogleTagManager from 'components/GoogleTagManager';

const Scripts = (): JSX.Element => {
  return (
    <>
      <GoogleTagManager />
    </>
  );
};

export default Scripts;
```

上記の GTM_ID などの値は環境で利用できるようにするため、以下のように `next.config.js` ファイルに追加で記述をします。

```javascript:src\sxastarter\next.config.js
const nextConfig = {
  env: {
    PUBLIC_URL: publicUrl,
    GTM_ID: process.env.GTM_ID,
    GTM_AUTH: process.env.GTM_AUTH,
    GTM_ENVIRONMENT: process.env.GTM_ENVIRONMENT,
  },
}
```

最後に、GTM_ID の値を .env ファイルに記載します。

```text:src\sxastarter.env
GTM_ID=
GTM_AUTH=
GTM_ENVIRONMENT=
```

これで準備が完了となりました。

## Google Tag Manager から値を取得する

利用をする Google Tag Manager を立ち上げて、必要なタグを取得します。今回は非本番環境と本番環境の２つのタグを設定していきます。まず、タグマネージャーの環境を開きます。

![GTM](/static/images/2022/12/gtm02.png)

クリックをすると、以下のようなダイアログが開きます。

![GTM](/static/images/2022/12/gtm03.png)

この URL から以下の値を取得できます。

| env             | 設定する値  |
| --------------- | ----------- |
| GTM_ID          | id          |
| GTM_AUTH        | gtm_auth    |
| GTM_ENVIRONMENT | gtm_preview |

## Vercel のプロジェクトに値を設定する

上記で取得した値を、Vercel の環境変数として追加をします。それぞれ上記の表にある値を利用してそのまま設定をしてください。

![GTM](/static/images/2022/12/gtm04.png)

上記の設定をしたあと、development のブランチを展開して改めて Vercel にて build を実行、完了後にアクセスをするとタグが追加されていることを確認できました。

![GTM](/static/images/2022/12/gtm05.png)

## 確認をする

Google Tag Manager の管理画面にあるプレビューのボタンをクリックします。

![GTM](/static/images/2022/12/gtm06.png)

すると以下の画面のように、タグアシスタントの画面が表示されます。このダイアログに、すでにタグを設定した Web サイトを設定して `Connect` のボタンをクリックします。

![GTM](/static/images/2022/12/gtm07.png)

しばらくすると別のウィンドウが立ち上がり、タグがインストールされていると右下の画面にダイアログが表示さます。

![GTM](/static/images/2022/12/gtm08.png)

## まとめ

無事、Google Tag Manager をサイトに実装することができました。あとは Google Analytics の設定や、Moosend の JavaScript など、必要に応じてタグマネージャーを利用してタグを配布することができるようになります。タグマネージャーの設定などは色々なブログなどで紹介されていると思いますので、ぜひ他のブログとかを見ながら参考にしていただければと思います。
