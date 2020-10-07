import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Sitecore',
    imageUrl: 'img/sitecore.svg',
    description: (
      <>
        デジタルマーケティング基盤となる Sitecore Experience Platform / Sitecore Content Hub に関して紹介をしています。
      </>
    ),
  },
  {
    title: 'Docusaurus',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Facebook が提供している静的サイトを生成するた目のツール、Docusaurus について紹介をしています。
      </>
    ),
  },
  {
    title: 'Netlify',
    imageUrl: 'img/netlify.svg',
    description: (
      <>
        Docusourus で作成したコンテンツのホスティングとして、Netlify を利用しています。
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`ようこそ ${siteConfig.title} のメモサイトへ`}
      description="このサイトは原水が作成しているメモとブログのサイトです。">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('blog')}>
              ブログ
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
