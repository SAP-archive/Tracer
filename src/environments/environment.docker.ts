export const environment = {
  production: true,
  docker: true,
  tracingProvider:
  {
    name: '${TRACER_ENV_TracingProviderName}',
    url: '${TRACER_ENV_TracingProviderUrl}',
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
