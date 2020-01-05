# Tracer

Tracing visualization and debugging assistant for distributed systems.

![alt text](https://github.com/sap-staging/Tracer/blob/master/ReadMe/Main.PNG)

## [Demo](https://tracer-demo.web.app)

There is demo link showing few record in the history panel to play with.

## Why should I use Tracer?

Tracer helps you focus on the "bigger picture" by exposing you to a simplified sequence diagram comprised 
of accurate component interactions within your application's logical flows.

## How to run on your development machine

Run `ng serve` for a dev server.  
Navigate to `http://localhost:4200/`.  
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project.  
The build artifacts will be stored in the `dist/` directory.   
Use the `--prod` flag for a production build.

### Source Format

The application source format is json array: 

``` 
[   
     {
      'tracer': {
                'traceId': 'guid',
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
      },
      additionalfield1:1,
      additionalfield2:2
      }
  ]
  
```

| Field        | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| traceId      | Every flow must have an unique identifier (a flow is comprised of all entities interactions of a single logical transaction)<br />traceId should be identical across all event. |
| spanId       | An unique identifier to define a new scope. Any interactions forked from this one, will inherit it as a **parentSpanId** |
| parentSpanId | The parent scope id (the first scope expected to be with no parentSpanId) |
| durationMs   | The time elapsed                                             |
| direction    | A numeration that effect the sequence diagram:<br /><br />**Logical transaction:**<br />All the inner interactions will be in the same **operation block** .<br />comprise of start and end, when one of them is missing it will auto generate it  (The line courser will be with cross **⥇** ). <br /><br />**Case 0 logical transaction start** (striate line *→* )<br />**Case 1 logical transaction end**   (dashed line *⇠*)<br /> <br /> <br /> **Action with no continuation:** <br />A simple line with no side effect ,Log are excellent example of it.  <br />**Case 2 Action Start** ( striate line *→*) <br />**Case 3 Action End**  ( dashed line *⇠* )<br /> |
| action       | The action title, e.g. login, GetUserList                    |
| startedAt    | The timestamp the action started <br /> [**Format string**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date): representing a date, specified in a format recognized by the [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) |
| error        | An error message, if present, changes the line styling to red. |
| from.name    | A system name generates this request                         |
| to.name      | A system, the request calling to (in a log entry it calling to itself) |
| metadata     | An auto generated field (don't use this field)               |

Any additional fields will be automatically added and can be examine.


## File Source

* Load event list from disk.
* Save events on disk. 

## Tracing Provider

All Provider can be configure in the environments settings  at  `\src\environments\environment.prod.ts` and `\src\environments\environment.ts`.  

#### Zipkin Provider

```json
  tracingProvider: {
  	 name: 'zipkin',
	   url: 'http://localhost:3199'
 }
```

>​ :bulb: it use internally Zipkin v2 API [/trace/{traceId}](https://zipkin.io/zipkin-api/#/default/get_trace__traceId_) 


### Default Provider

```json
 tracingProvider: {
  	 name: 'default',
	   url:  'http://YourSearchService.com/v1'
 }
```

To connect your logging/tracing system you have to Implementing simple search API.  
The API must receive `trace`  ```http://YourSearchService.com/v1/trace/{traceId}```  
* Trace ```<string>```:  an unique identifier of a request.  
>​  :bulb: Add [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) support by adding header "Access-Control-Allow-Origin", "*"` .


## Ordering 

The Sequence Diagram is like tree that start at the top item.
The next level are all the node (spanId) with the same preantSpanId .

Top item: recommended to be one event  with no parentSpanId.

## License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.  
This file is licensed under the Apache 2.0 except as noted otherwise in the [LICENSE file](https://github.com/sap-staging/Tracer/blob/master/LICENSE).
