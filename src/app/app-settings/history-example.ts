
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
          'action': 'Order',
          'durationMs': 10000,
          'error': 'TimeOut'
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
          'timestamp': 1502787600000000,
          'action': 'GetOrder',
          'durationMs': 10000,
          'error': 'TimeOut'
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
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
          'timestamp': 1502787600000000,
          'action': 'Query',
        }
        , 'userId': 1343

      }
    ]
  }]  ;
}
