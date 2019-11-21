
export class HistoryExample {

  historyRecord: any[] = [{
    callID: 'OrderFlow-Guid',
    result: [
      {
        'callId': 'OrderFlow-Guid',
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
        'tags.UserId': 1343
      },
      {
        'callId': 'OrderFlow-Guid',
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
        'tags.UserId': 1343
      },
      {
        'callId': 'OrderFlow-Guid',
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
        'tags.UserId': 1343
      },
      {
        'callId': 'OrderFlow-Guid',
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
        'tags.UserId': 1343
      }
      , {
        'callId': 'OrderFlow-Guid',
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
        'tags.UserId': 1343
      },
      {
        'callId': 'OrderFlow-Guid',
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
        'tags.UserId': 1343
      }
    ]
  },
  {
    callID: 'FailedOrderFlow-Guid',
    result: [
      {
        'callId': 'FailedOrderFlow-Guid',
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
        'tags.UserId': 1343,
        'durationMs': 10000,
        'error': "TimeOut"
      },
      {
        'callId': 'FailedOrderFlow-Guid',
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
        'tags.UserId': 1343,
        'durationMs': 10000,
        'error': "TimeOut"
      },
      {
        'callId': 'FailedOrderFlow-Guid',
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
        'tags.UserId': 1343,
        'durationMs': 10000,
        'error': 'TimeOut'

      },
      {
        'callId': 'FailedOrderFlow-Guid',
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
        'tags.UserId': 1343
      }
      , {
        'callId': 'FailedOrderFlow-Guid',
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
        'tags.UserId': 1343
      }
    ]
  }

  ];
}
