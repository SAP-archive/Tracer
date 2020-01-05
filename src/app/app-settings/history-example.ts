
export class HistoryExample {

  historyRecord: any[] = [{
    traceId: 'OrderFlow-Guid',
    result: [
      {
        tracer: {
          'traceId': 'OrderFlow-Guid',
          'direction': 1,
          'durationMs': 15,
          'spanId': '1',
          'from': {
            'name': 'Web'
          },
          'to': {
            'name': 'User'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'Order',
        }
        , 'userId': 1343

      },
      {
        tracer:
        {
          'traceId': 'OrderFlow-Guid',
          'direction': 0,
          'durationMs': 15,
          'spanId': '2',
          'parentSpanId': '1',
          'from': {
            'name': 'Web'
          },
          'to': {
            'name': 'ShoppingCart'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'GetOrder',
        }
        , 'userId': 1343

      },
      {
        tracer: {
          'traceId': 'OrderFlow-Guid',
          'direction': 1,
          'durationMs': 15,
          'spanId': '2',
          'parentSpanId': '1',
          'from': {
            'name': 'ShoppingCart'
          },
          'to': {
            'name': 'Web'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'GetOrder',
        }
        , 'userId': 1343

      },
      {
        tracer: {
          'traceId': 'OrderFlow-Guid',
          'direction': 0,
          'durationMs': 15,
          'spanId': '3',
          'parentSpanId': '1',
          'from': {
            'name': 'Web'
          },
          'to': {
            'name': 'OrderService'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'ConfirmOrder',
        }
        , 'userId': 1343

      }
      , {
        tracer: {
          'traceId': 'OrderFlow-Guid',
          'direction': 0,
          'durationMs': 15,
          'spanId': '4',
          'parentSpanId': '3',
          'from': {
            'name': 'OrderService'
          },
          'to': {
            'name': 'DB'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'Query',
        }
        , 'userId': 1343

      },
      {
        tracer: {
          'traceId': 'OrderFlow-Guid',
          'direction': 3,
          'durationMs': 0,
          'parentSpanId': '1',
          'from': {
            'name': 'Web'
          },
          'to': {
            'name': 'Web'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'FindSession',
        }
        , 'userId': 1343

      }
    ]
  },
  {
    traceId: 'FailedOrderFlow-Guid',
    result: [
      {
        tracer: {
          'traceId': 'FailedOrderFlow-Guid',
          'direction': 1,
          'spanId': '1',
          'from': {
            'name': 'Web'
          },
          'to': {
            'name': 'User'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'Order',
          'durationMs': 10000,
          'error': "TimeOut"
        },
        'UserId': 1343

      },
      {
        tracer: {
          'traceId': 'FailedOrderFlow-Guid',
          'direction': 0,
          'spanId': '2',
          'parentSpanId': '1',
          'from': {
            'name': 'Web'
          },
          'to': {
            'name': 'ShoppingCart'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'GetOrder',
          'durationMs': 10000,
          'error': "TimeOut"
        }
        , 'userId': 1343
      },
      {
        tracer: {
          'traceId': 'FailedOrderFlow-Guid',
          'direction': 1,
          'spanId': '2',
          'parentSpanId': '1',
          'from': {
            'name': 'ShoppingCart'
          },
          'to': {
            'name': 'Web'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'GetOrder',
          'durationMs': 10000,
          'error': 'TimeOut'

        }
        , 'userId': 1343

      },
      {
        tracer: {
          'traceId': 'FailedOrderFlow-Guid',
          'direction': 0,
          'durationMs': 15,
          'spanId': '3',
          'parentSpanId': '1',
          'from': {
            'name': 'Web'
          },
          'to': {
            'name': 'OrderService'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'ConfirmOrder',
        }
        , 'userId': 1343

      }
      , {
        tracer: {
          'traceId': 'FailedOrderFlow-Guid',
          'direction': 0,
          'durationMs': 15,
          'spanId': '4',
          'parentSpanId': '3',
          'from': {
            'name': 'OrderService'
          },
          'to': {
            'name': 'DB'
          },
          'startedAt': '2019-09-15T10:29:17.688Z',
          'action': 'Query',
        }
        , 'userId': 1343

      }
    ]
  }

  ];
}
