import Script from 'next/script'

const MooScript = () => {
  return (
    <>
      <Script id="moosend-js" strategy="lazyOnload">
        {`
          mootrack('trackPageView');
        `}
      </Script>
    </>
  )
}

export default MooScript
