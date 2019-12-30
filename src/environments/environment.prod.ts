export const environment = {
  production: true,
  ShowAggregateSearch: false,
  searchProvider:
  {
    name: 'default', // default, zipkin
    url:  'http://YourSearchService.com/v1/Search'//'http://localhost:9411'
  },
  defaultStickyTags: ['callId', 'tags.*' ]
  ,  'links': [
    {
      'name': 'ThirdParty2',
      'link': 'http://ThirdParty?StartTime={startDate}&to={endDate}&callID={callID}'
    },
    {
      'name': 'ThirdParty1',
      // tslint:disable-next-line: max-line-length
     'link': 'http://ThirdParty?StartTime={startDate}&to={endDate}&callID={callID}'
    }
  ]
};
