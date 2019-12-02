# Tracer

Tracing visualization and debugging assistant for distributed systems.

![alt text](https://github.com/sap-staging/Tracer/blob/master/ReadMe/Main.PNG)

## [Demo](http://Demo)

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

The application Source format is json array: 

``` json
[   
      {
        'callId': 'guid',
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
  ]
  
```

| Field        | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| callId       | Every flow must have an unique identifier (a flow is comprised of all entities interactions of a single logical transaction)<br />Call Id should be identical across all event |
| spanId       | An unique identifier to define a new scope. Any requests forked from this one, will inherit it as a **parentSpanId** |
| parentSpanId | The parent scope id (the first scope expected to be with no parentSpanId) |
| durationMs   | The time elapsed                                             |
| direction    | A numeration that effect the sequence diagram style:<br />0  **Request** , <br />Line style: striate line *→*<br />Every request generate form this request will be inside of **operation block**  <br />When response don't exists it will auto generate a response with this arrow *X⇠*  to close the **operation block**.<br />The closing response if exists should always be with direction:1<br />1  **Response**, Line style: striate line *⇠*<br />Every request generate form the request will be inside of **operation block**  <br />When request don't exists it will auto generate a request with this arrow *→X* <br />The open request if exists should always be with direction:0<br />2  **Request**: Line style: striate line *→* <br />can be good feet for log or when you don't want operation block<br />3  **Response **:Line style: dashed line *⇠* <br />can be good feet for log or when you don't want operation block |
| action       | The action title, e.g. login, GetUserList                    |
| startedAt    | The timestamp the action started <br />**[Format string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date): **representing a date, specified in a format recognized by the [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) |
| error        | An error message, if present, changes the line styling to red. |
| from.name    | A system name generates this request                         |
| to.name      | A system, the request calling to (in a log entry it calling to itself) |
| metadata     | An auto generated field (don't use this field)               |

Any additional fields will be automatically added. Will be possible to examine them on sticky tags summary bar.

## File Source

* Load event list from disk.
* Save the event  allow you to share it, view it offline. 

## Logging/Tracing Source

To connect your logging/tracing system you have to Implementing simple search API.

The API must receive callID, aggregate as a query pram.

* CallID ```<string>```:  an unique identifier of a request.
* Aggregate ```<boolean>```: true - wait for all result to be returned,  otherwise,  return first result.

  > :bulb: To enable Aggregate option, set `ShowAggregateSearch` to true .

  > :bulb:To define the URL, set `searchServiceUrl` to your search API.

All the settings are in  `\src\environments\environment.prod.ts` and `\src\environments\environment.ts`.  

[Read more about the response](###Event Format).

## Ordering 

The Sequence Diagram is like tree that start at the top item.
The next level are all the node (spanid) with the same preantSpanId .

Top item: recommended to be one event  with no parentSpanID.

## License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.  
This file is licensed under the Apache 2.0 except as noted otherwise in the [LICENSE file](https://github.com/sap-staging/Tracer/blob/master/LICENSE).
