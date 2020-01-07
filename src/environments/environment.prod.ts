export const environment = {
  production: true,
  tracingProvider:
  {
    name: 'default', // default, zipkin
    url: 'http://YourSearchService.com/v1/Search' //http://localhost:9411'
  },
  defaultStickyTags: ['tracer.traceId', 'user.*']
  , 'links': [
    {
      'name': 'ThirdParty2',
      'link': 'http://ThirdParty?StartTime={startDate}&to={endDate}&trace={traceId}'
    },
    {
      'name': 'ThirdParty1',
      // tslint:disable-next-line: max-line-length
      'link': 'http://ThirdParty?StartTime={startDate}&to={endDate}&trace={traceId}'
    }
  ]
};
