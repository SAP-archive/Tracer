export const environment = {
  production: true,
  searchServiceUrl: 'http://YourSearchService.com/v1/Search',
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
