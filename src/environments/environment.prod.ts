export const environment = {
  production: true,
  ShowAggregateSearch: false,
  searchServiceUrl: 'http://YourSearchService.com/v1/Searchf',
  zipkinUrl: 'http://localhost:8962',
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
