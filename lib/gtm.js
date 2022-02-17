export const GTM_ID = 'GTM-MQSXXN7'

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
}
