
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
  },
  {
    traceId: '5aab74dbb904746bb33447baae403ed6',
    name:'messaging.json',
    result: [
      {
        'tracer': {
          'from': {
            'name': 'frontend'
          },
          'to': {},
          'action': 'get /',
          'traceId': '5aab74dbb904746bb33447baae403ed6',
          'durationMs': 2.839,
          'spanId': 'b33447baae403ed6',
          'timestamp': 1521186011926119,
          'direction': 1
        },
        'traceId': '5aab74dbb904746bb33447baae403ed6',
        'id': 'b33447baae403ed6',
        'kind': 'SERVER',
        'name': 'get /',
        'timestamp': 1521186011926119,
        'duration': 2839,
        'localEndpoint': {
          'serviceName': 'frontend',
          'ipv4': '192.168.0.10'
        },
        'remoteEndpoint': {
          'ipv6': '::1',
          'port': 54602
        },
        'tags': {
          'http.method': 'GET',
          'http.path': '/',
          'mvc.controller.class': 'Frontend',
          'mvc.controller.method': 'callBackend'
        }
      },
      {
        'tracer': {
          'from': {
            'name': 'frontend'
          },
          'to': {
            'name': 'rabbitmq'
          },
          'action': 'publish',
          'traceId': '5aab74dbb904746bb33447baae403ed6',
          'durationMs': 0.013,
          'parentSpanId': 'b33447baae403ed6',
          'spanId': '05e3ac9a4f6e3b90',
          'timestamp': 1521186011927475,
          'direction': 2
        },
        'traceId': '5aab74dbb904746bb33447baae403ed6',
        'parentId': 'b33447baae403ed6',
        'id': '05e3ac9a4f6e3b90',
        'kind': 'PRODUCER',
        'name': 'publish',
        'timestamp': 1521186011927475,
        'duration': 13,
        'localEndpoint': {
          'serviceName': 'frontend',
          'ipv4': '192.168.0.10'
        },
        'remoteEndpoint': {
          'serviceName': 'rabbitmq'
        }
      },
      {
        'tracer': {
          'from': {
            'name': 'backend'
          },
          'to': {
            'name': 'rabbitmq'
          },
          'action': 'next-message',
          'traceId': '5aab74dbb904746bb33447baae403ed6',
          'durationMs': 0.014,
          'parentSpanId': '05e3ac9a4f6e3b90',
          'spanId': 'e457b5a2e4d86bd1',
          'timestamp': 1521186011929043,
          'direction': 3
        },
        'traceId': '5aab74dbb904746bb33447baae403ed6',
        'parentId': '05e3ac9a4f6e3b90',
        'id': 'e457b5a2e4d86bd1',
        'kind': 'CONSUMER',
        'name': 'next-message',
        'timestamp': 1521186011929043,
        'duration': 14,
        'localEndpoint': {
          'serviceName': 'backend',
          'ipv4': '192.168.0.10'
        },
        'remoteEndpoint': {
          'serviceName': 'rabbitmq'
        },
        'tags': {
          'rabbit.exchange': '',
          'rabbit.queue': 'backend',
          'rabbit.routing_key': 'backend'
        }
      },
      {
        'tracer': {
          'from': {
            'name': 'backend'
          },
          'to': {
            'name': 'backend'
          },
          'action': 'on-message',
          'traceId': '5aab74dbb904746bb33447baae403ed6',
          'durationMs': 0.371,
          'parentSpanId': 'e457b5a2e4d86bd1',
          'spanId': '4ad2db84ac76def7',
          'timestamp': 1521186011929105,
          'direction': 2
        },
        'traceId': '5aab74dbb904746bb33447baae403ed6',
        'parentId': 'e457b5a2e4d86bd1',
        'id': '4ad2db84ac76def7',
        'name': 'on-message',
        'timestamp': 1521186011929105,
        'duration': 371,
        'localEndpoint': {
          'serviceName': 'backend',
          'ipv4': '192.168.0.10'
        },
        'isLog': true
      }
    ]

    }
    ,
    {
      traceId: '0562809467078eab',
      name:'messaging-kafka.json',
      result: [
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 252.09,
            'parentSpanId': '0562809467078eab',
            'spanId': '09fdf808ef0d60c0',
            'timestamp': 1541405397200002,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '0562809467078eab',
          'id': '09fdf808ef0d60c0',
          'name': 'on-message',
          'timestamp': 1541405397200002,
          'duration': 252090,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'poll',
            'traceId': '0562809467078eab',
            'durationMs': 0.026,
            'spanId': '0562809467078eab',
            'timestamp': 1541405397200023,
            'direction': 3
          },
          'traceId': '0562809467078eab',
          'id': '0562809467078eab',
          'kind': 'CONSUMER',
          'name': 'poll',
          'timestamp': 1541405397200023,
          'duration': 26,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'handle',
            'traceId': '0562809467078eab',
            'durationMs': 0.866,
            'parentSpanId': '09fdf808ef0d60c0',
            'spanId': '5141af930f03274e',
            'timestamp': 1541405397413496,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '09fdf808ef0d60c0',
          'id': '5141af930f03274e',
          'name': 'handle',
          'timestamp': 1541405397413496,
          'duration': 866,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'tags': {
            'class': 'Projector',
            'method': 'handle'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 3.268,
            'parentSpanId': '5141af930f03274e',
            'spanId': '79145dc8245c2899',
            'timestamp': 1541405397414201,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '5141af930f03274e',
          'id': '79145dc8245c2899',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397414201,
          'duration': 3268,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'command-messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 1.471,
            'parentSpanId': '09fdf808ef0d60c0',
            'spanId': '2e22a0564764943a',
            'timestamp': 1541405397450652,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '09fdf808ef0d60c0',
          'id': '2e22a0564764943a',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397450652,
          'duration': 1471,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.key': 'e1b2f8b5-dd1e-11e8-93d1-0050568b53f5',
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 102.48,
            'parentSpanId': '09fdf808ef0d60c0',
            'spanId': '26bd982d53f50d1f',
            'timestamp': 1541405397451227,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '09fdf808ef0d60c0',
          'id': '26bd982d53f50d1f',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397451227,
          'duration': 102480,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.key': 'e1b2f8b5-dd1e-11e8-93d1-0050568b53f5',
            'kafka.topic': 'central.messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 223.097,
            'parentSpanId': '0562809467078eab',
            'spanId': 'e73d7bc0194a76e0',
            'timestamp': 1541405397452002,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '0562809467078eab',
          'id': 'e73d7bc0194a76e0',
          'name': 'on-message',
          'timestamp': 1541405397452002,
          'duration': 223097,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'serviceb'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'poll',
            'traceId': '0562809467078eab',
            'durationMs': 0.001,
            'parentSpanId': '2e22a0564764943a',
            'spanId': 'b4a2a87ee7f003bc',
            'timestamp': 1541405397452008,
            'direction': 3
          },
          'traceId': '0562809467078eab',
          'parentId': '2e22a0564764943a',
          'id': 'b4a2a87ee7f003bc',
          'kind': 'CONSUMER',
          'name': 'poll',
          'timestamp': 1541405397452008,
          'duration': 1,
          'localEndpoint': {
            'serviceName': 'serviceb'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'serviceb'
            },
            'to': {
              'name': 'serviceb'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 0.31,
            'parentSpanId': 'b4a2a87ee7f003bc',
            'spanId': '2f77d5b0b8e0de35',
            'timestamp': 1541405397453001,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'b4a2a87ee7f003bc',
          'id': '2f77d5b0b8e0de35',
          'name': 'on-message',
          'timestamp': 1541405397453001,
          'duration': 310,
          'localEndpoint': {
            'serviceName': 'serviceb'
          },
          'tags': {
            'error': 'some error'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'handle',
            'traceId': '0562809467078eab',
            'durationMs': 1.255,
            'parentSpanId': 'e73d7bc0194a76e0',
            'spanId': '556955e15da195f5',
            'timestamp': 1541405397655018,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'e73d7bc0194a76e0',
          'id': '556955e15da195f5',
          'name': 'handle',
          'timestamp': 1541405397655018,
          'duration': 1255,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'tags': {
            'class': 'Projector',
            'method': 'handle'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 0.937,
            'parentSpanId': '556955e15da195f5',
            'spanId': 'e2feae695b1d1a6a',
            'timestamp': 1541405397655722,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '556955e15da195f5',
          'id': 'e2feae695b1d1a6a',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397655722,
          'duration': 937,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'command-messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 1.035,
            'parentSpanId': 'e73d7bc0194a76e0',
            'spanId': '5133caca649f802b',
            'timestamp': 1541405397674703,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'e73d7bc0194a76e0',
          'id': '5133caca649f802b',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397674703,
          'duration': 1035,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.key': 'e1b2f8b5-dd1e-11e8-93d1-0050568b53f5',
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 0.957,
            'parentSpanId': 'e73d7bc0194a76e0',
            'spanId': 'b7808dc69c7726f2',
            'timestamp': 1541405397674873,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'e73d7bc0194a76e0',
          'id': 'b7808dc69c7726f2',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397674873,
          'duration': 957,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.key': 'e1b2f8b5-dd1e-11e8-93d1-0050568b53f5',
            'kafka.topic': 'central.messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 171.798,
            'parentSpanId': '0562809467078eab',
            'spanId': 'd1b4806e7e9eed25',
            'timestamp': 1541405397675002,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '0562809467078eab',
          'id': 'd1b4806e7e9eed25',
          'name': 'on-message',
          'timestamp': 1541405397675002,
          'duration': 171798,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'serviceb'
            },
            'to': {
              'name': 'serviceb'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 0.265,
            'parentSpanId': 'a5524eec8147b1da',
            'spanId': '4a64a63e4b58e665',
            'timestamp': 1541405397676001,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'a5524eec8147b1da',
          'id': '4a64a63e4b58e665',
          'name': 'on-message',
          'timestamp': 1541405397676001,
          'duration': 265,
          'localEndpoint': {
            'serviceName': 'serviceb'
          },
          'tags': {
            'error': 'some error'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'serviceb'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'poll',
            'traceId': '0562809467078eab',
            'durationMs': 0.001,
            'parentSpanId': '5133caca649f802b',
            'spanId': 'a5524eec8147b1da',
            'timestamp': 1541405397676009,
            'direction': 3
          },
          'traceId': '0562809467078eab',
          'parentId': '5133caca649f802b',
          'id': 'a5524eec8147b1da',
          'kind': 'CONSUMER',
          'name': 'poll',
          'timestamp': 1541405397676009,
          'duration': 1,
          'localEndpoint': {
            'serviceName': 'serviceb'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'handle',
            'traceId': '0562809467078eab',
            'durationMs': 0.774,
            'parentSpanId': 'd1b4806e7e9eed25',
            'spanId': '97a1159e0eb74759',
            'timestamp': 1541405397827569,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'd1b4806e7e9eed25',
          'id': '97a1159e0eb74759',
          'name': 'handle',
          'timestamp': 1541405397827569,
          'duration': 774,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'tags': {
            'class': 'Projector',
            'method': 'handle'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 0.746,
            'parentSpanId': '97a1159e0eb74759',
            'spanId': 'b42b60c5c19ce714',
            'timestamp': 1541405397827998,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '97a1159e0eb74759',
          'id': 'b42b60c5c19ce714',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397827998,
          'duration': 746,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'command-messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 1.259,
            'parentSpanId': 'd1b4806e7e9eed25',
            'spanId': '085a9df516127e50',
            'timestamp': 1541405397846422,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'd1b4806e7e9eed25',
          'id': '085a9df516127e50',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397846422,
          'duration': 1259,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.key': 'e1b2f8b5-dd1e-11e8-93d1-0050568b53f5',
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'send',
            'traceId': '0562809467078eab',
            'durationMs': 0.803,
            'parentSpanId': 'd1b4806e7e9eed25',
            'spanId': '5bc03264c704f245',
            'timestamp': 1541405397846576,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'd1b4806e7e9eed25',
          'id': '5bc03264c704f245',
          'kind': 'PRODUCER',
          'name': 'send',
          'timestamp': 1541405397846576,
          'duration': 803,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.key': 'e1b2f8b5-dd1e-11e8-93d1-0050568b53f5',
            'kafka.topic': 'central.messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'poll',
            'traceId': '0562809467078eab',
            'durationMs': 0.001,
            'parentSpanId': '2e22a0564764943a',
            'spanId': 'e0473dc3d8732e8b',
            'timestamp': 1541405397847007,
            'direction': 3
          },
          'traceId': '0562809467078eab',
          'parentId': '2e22a0564764943a',
          'id': 'e0473dc3d8732e8b',
          'kind': 'CONSUMER',
          'name': 'poll',
          'timestamp': 1541405397847007,
          'duration': 1,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'serviceb'
            },
            'to': {
              'name': 'serviceb'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 0.251,
            'parentSpanId': '519d27c657334615',
            'spanId': '568b33e6af8a225a',
            'timestamp': 1541405397848001,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '519d27c657334615',
          'id': '568b33e6af8a225a',
          'name': 'on-message',
          'timestamp': 1541405397848001,
          'duration': 251,
          'localEndpoint': {
            'serviceName': 'serviceb'
          },
          'tags': {
            'error': ''
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'poll',
            'traceId': '0562809467078eab',
            'durationMs': 0.001,
            'parentSpanId': '085a9df516127e50',
            'spanId': 'bad2ddec9d33837b',
            'timestamp': 1541405397848002,
            'direction': 3
          },
          'traceId': '0562809467078eab',
          'parentId': '085a9df516127e50',
          'id': 'bad2ddec9d33837b',
          'kind': 'CONSUMER',
          'name': 'poll',
          'timestamp': 1541405397848002,
          'duration': 1,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 0.149,
            'parentSpanId': 'e0473dc3d8732e8b',
            'spanId': 'd77b1306b69e39a5',
            'timestamp': 1541405397848002,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'e0473dc3d8732e8b',
          'id': 'd77b1306b69e39a5',
          'name': 'on-message',
          'timestamp': 1541405397848002,
          'duration': 149,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'poll',
            'traceId': '0562809467078eab',
            'durationMs': 0.001,
            'parentSpanId': '5133caca649f802b',
            'spanId': '08e980b0e786309b',
            'timestamp': 1541405397848003,
            'direction': 3
          },
          'traceId': '0562809467078eab',
          'parentId': '5133caca649f802b',
          'id': '08e980b0e786309b',
          'kind': 'CONSUMER',
          'name': 'poll',
          'timestamp': 1541405397848003,
          'duration': 1,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'serviceb'
            },
            'to': {
              'name': 'kafka'
            },
            'action': 'poll',
            'traceId': '0562809467078eab',
            'durationMs': 0.001,
            'parentSpanId': '085a9df516127e50',
            'spanId': '519d27c657334615',
            'timestamp': 1541405397848005,
            'direction': 3
          },
          'traceId': '0562809467078eab',
          'parentId': '085a9df516127e50',
          'id': '519d27c657334615',
          'kind': 'CONSUMER',
          'name': 'poll',
          'timestamp': 1541405397848005,
          'duration': 1,
          'localEndpoint': {
            'serviceName': 'serviceb'
          },
          'remoteEndpoint': {
            'serviceName': 'kafka'
          },
          'tags': {
            'kafka.topic': 'messages'
          }
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 0.045,
            'parentSpanId': 'bad2ddec9d33837b',
            'spanId': 'd5d4778b19cf7e93',
            'timestamp': 1541405397849001,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': 'bad2ddec9d33837b',
          'id': 'd5d4778b19cf7e93',
          'name': 'on-message',
          'timestamp': 1541405397849001,
          'duration': 45,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'isLog': true
        },
        {
          'tracer': {
            'from': {
              'name': 'servicea'
            },
            'to': {
              'name': 'servicea'
            },
            'action': 'on-message',
            'traceId': '0562809467078eab',
            'durationMs': 0.065,
            'parentSpanId': '08e980b0e786309b',
            'spanId': '630c1215f2e430a7',
            'timestamp': 1541405397849002,
            'direction': 2
          },
          'traceId': '0562809467078eab',
          'parentId': '08e980b0e786309b',
          'id': '630c1215f2e430a7',
          'name': 'on-message',
          'timestamp': 1541405397849002,
          'duration': 65,
          'localEndpoint': {
            'serviceName': 'servicea'
          },
          'isLog': true
        }
      ]

      }
      ,
  {
    traceId: 'ef86c83c0a05a6d6',
    name:'ascend.json',
    result: [
      {
        'tracer': {
          'from': {
            'name': 'mobile-gateway'
          },
          'to': {
            'name': '110.170.201.178'
          },
          'action': 'get',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 38.793,
          'spanId': 'ef86c83c0a05a6d6',
          'timestamp': 1531282088533035,
          'direction': 1
        },
        'traceId': 'ef86c83c0a05a6d6',
        'id': 'ef86c83c0a05a6d6',
        'kind': 'SERVER',
        'name': 'get',
        'timestamp': 1531282088533035,
        'duration': 38793,
        'localEndpoint': {
          'serviceName': 'mobile-gateway',
          'ipv4': '172.17.0.13'
        },
        'remoteEndpoint': {
          'ipv4': '110.170.201.178',
          'port': 39308
        },
        'tags': {
          'http.method': 'GET',
          'http.path': '/mobile-gateway/content/personal'
        }
      },
      {
        'tracer': {
          'from': {
            'name': 'mobile-gateway'
          },
          'to': {},
          'action': 'get',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 14.077,
          'parentSpanId': 'ef86c83c0a05a6d6',
          'spanId': '52b1ab4956917c39',
          'timestamp': 1531282088533834,
          'direction': 0
        },
        'traceId': 'ef86c83c0a05a6d6',
        'parentId': 'ef86c83c0a05a6d6',
        'id': '52b1ab4956917c39',
        'kind': 'CLIENT',
        'name': 'get',
        'timestamp': 1531282088533834,
        'duration': 14077,
        'localEndpoint': {
          'serviceName': 'mobile-gateway',
          'ipv4': '172.17.0.13'
        },
        'tags': {
          'http.method': 'GET',
          'http.path': '/auth-service/v1/authentications/'
        }
      },
      {
        'tracer': {
          'from': {
            'name': 'mobile-gateway'
          },
          'to': {},
          'action': 'get',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 20.333,
          'parentSpanId': 'ef86c83c0a05a6d6',
          'spanId': 'ecc00062ceef4bf0',
          'timestamp': 1531282088548312,
          'direction': 0
        },
        'traceId': 'ef86c83c0a05a6d6',
        'parentId': 'ef86c83c0a05a6d6',
        'id': 'ecc00062ceef4bf0',
        'kind': 'CLIENT',
        'name': 'get',
        'timestamp': 1531282088548312,
        'duration': 20333,
        'localEndpoint': {
          'serviceName': 'mobile-gateway',
          'ipv4': '172.17.0.13'
        },
        'tags': {
          'http.method': 'GET',
          'http.path': '/content/personal'
        }
      },
      {
        'tracer': {
          'from': {
            'name': 'content-service'
          },
          'to': {
            'name': '10.230.16.208'
          },
          'action': 'get /content/personal',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 15.888,
          'parentSpanId': 'ef86c83c0a05a6d6',
          'spanId': 'ecc00062ceef4bf0',
          'timestamp': 1531282088552037,
          'direction': 1
        },
        'traceId': 'ef86c83c0a05a6d6',
        'parentId': 'ef86c83c0a05a6d6',
        'id': 'ecc00062ceef4bf0',
        'kind': 'SERVER',
        'name': 'get /content/personal',
        'timestamp': 1531282088552037,
        'duration': 15888,
        'localEndpoint': {
          'serviceName': 'content-service',
          'ipv4': '172.17.0.10'
        },
        'remoteEndpoint': {
          'ipv4': '10.230.16.208',
          'port': 3400
        },
        'tags': {
          'http.method': 'GET',
          'http.path': '/content/personal',
          'mvc.controller.class': 'GenericController',
          'mvc.controller.method': 'getPersonalGeneric'
        },
        'shared': true
      },
      {
        'tracer': {
          'from': {
            'name': 'auth-service'
          },
          'to': {},
          'action': 'http:/parent/auth-service/v1/authentications/',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 4.157,
          'parentSpanId': 'ef86c83c0a05a6d6',
          'spanId': '52b1ab4956917c39',
          'timestamp': 1531282088553000,
          'direction': 1
        },
        'traceId': 'ef86c83c0a05a6d6',
        'parentId': 'ef86c83c0a05a6d6',
        'id': '52b1ab4956917c39',
        'kind': 'SERVER',
        'name': 'http:/parent/auth-service/v1/authentications/',
        'timestamp': 1531282088553000,
        'duration': 4157,
        'localEndpoint': {
          'serviceName': 'auth-service',
          'ipv4': '172.17.0.9',
          'port': 8080
        },
        'tags': {
          'http.host': 'auth-service-alp',
          'http.method': 'GET',
          'http.path': '/auth-service/v1/authentications/',
          'http.url': 'http://auth-service-alp/auth-service/v1/authentications/',
          'mvc.controller.class': 'AuthenticationController',
          'mvc.controller.method': 'authenticationsWithAuthorizationHeader',
          'spring.instance_id': 'bb52cfc01466:auth-service'
        },
        'shared': true
      },
      {
        'tracer': {
          'from': {
            'name': 'auth-service'
          },
          'to': {
            'name': 'auth-service'
          },
          'action': 'extend-token-life',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 1.291,
          'parentSpanId': '52b1ab4956917c39',
          'spanId': '80c0d1d62f437a1b',
          'timestamp': 1531282088553000,
          'direction': 2
        },
        'traceId': 'ef86c83c0a05a6d6',
        'parentId': '52b1ab4956917c39',
        'id': '80c0d1d62f437a1b',
        'name': 'extend-token-life',
        'timestamp': 1531282088553000,
        'duration': 1291,
        'localEndpoint': {
          'serviceName': 'auth-service',
          'ipv4': '172.17.0.9',
          'port': 8080
        },
        'tags': {
          'class': 'AuthenticationService',
          'lc': 'async',
          'method': 'extendToken'
        },
        'isLog': true
      },
      {
        'tracer': {
          'from': {
            'name': 'content-service'
          },
          'to': {
            'name': 'content-service'
          },
          'action': 'hystrix',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 0.863,
          'parentSpanId': 'ecc00062ceef4bf0',
          'spanId': 'e6422f7ff7d78099',
          'timestamp': 1531282088555338,
          'direction': 2
        },
        'traceId': 'ef86c83c0a05a6d6',
        'parentId': 'ecc00062ceef4bf0',
        'id': 'e6422f7ff7d78099',
        'name': 'hystrix',
        'timestamp': 1531282088555338,
        'duration': 863,
        'localEndpoint': {
          'serviceName': 'content-service',
          'ipv4': '172.17.0.10'
        },
        'isLog': true
      },
      {
        'tracer': {
          'from': {
            'name': 'content-service'
          },
          'to': {},
          'action': 'get',
          'traceId': 'ef86c83c0a05a6d6',
          'durationMs': 8.965,
          'parentSpanId': 'ecc00062ceef4bf0',
          'spanId': 'c21c6c51ac71b3ba',
          'timestamp': 1531282088556600,
          'direction': 0
        },
        'traceId': 'ef86c83c0a05a6d6',
        'parentId': 'ecc00062ceef4bf0',
        'id': 'c21c6c51ac71b3ba',
        'kind': 'CLIENT',
        'name': 'get',
        'timestamp': 1531282088556600,
        'duration': 8965,
        'localEndpoint': {
          'serviceName': 'content-service',
          'ipv4': '172.17.0.10'
        },
        'tags': {
          'http.method': 'GET',
          'http.path': '/api/v1/banners/10000001502'
        }
      }
    ]

    }
]  ;
}
