---
title: Headless SXA - Variant の追加
date: '2022-12-15'
tags: ['XM Cloud', 'XM', 'Headless SXA']
draft: true
summary: 前回は Headless SXA に関して簡単に紹介をしました。基本コンポーネントだけでは当然 Web サイトを作る上では色々なものが不足しています。今回は、既存のコンポーネントの表示形式を追加する方法を紹介します。
images: ['/static/images/2022/12/promo03.png']
---

前回は Headless SXA に関して簡単に紹介をしました。基本コンポーネントだけでは当然 Web サイトを作る上では色々なものが不足しています。今回は、既存のコンポーネントの表示形式を追加する方法を紹介します。

## Promo コンポーネントの確認

標準で入っているコンポーネントの Promo の表記形式を追加していきます。まず、現在の Promo がどういう形になっているのかを確認すると、画像、文字が組み合わせになっている形です。Variant には Default が設定されているだけです。

![Promo](/static/images/2022/12/promo01.png)

この Promo のコードは、 `src\sxastarter\src\components\Promo.tsx` が表示するためのスクリプトになっています。このコードの中に、Default のコードが以下のように定義されています。

```javascript
export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <PromoDefaultComponent {...props} />
}
```

## Promo の表示形式の追加

今回は手っ取り早く、Default のコードをそのまま利用しつつ、画像の表示位置を変更し、関数名を Demo に変更します。

```javascript
export const Demo = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} />
            </div>
          </div>
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
        </div>
      </div>
    )
  }

  return <PromoDefaultComponent {...props} />
}
```

続いて、サイトに定義として含まれている Presentation - Headless Variants の中にある Promo に対して、新しい Variant として Demo を追加します。

![Promo](/static/images/2022/12/promo02.png)

追加をすると、以下のように Demo の項目が追加されます。

![Promo](/static/images/2022/12/promo03.png)

Demo の表示形式に切り替えると、画像の位置が下に移動する形を確認することができます。

![Promo](/static/images/2022/12/promo04.png)

## まとめ

今回は画像の表示場所を変更するだけではありますが、コンポーネントの表示形式を増やすことができました。そしてレイアウトを変更するところは普通に HTML で記述して、スタイルシートを適用している形になっているのも、上記のコードを見ていただくとわかるかと思います。なるべくシンプルにコンポーネントを作れるようになっています。
