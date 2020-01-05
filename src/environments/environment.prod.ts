export const environment = {
  production: true,
  ShowAggregateSearch: false,
  searchProvider:
  {
    name: 'zipkin', // default, zipkin
    url:  'http://localhost:48319'
  },
  defaultStickyTags: ['traceId', 'user.*' ]
  ,  'links': [
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
