// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
