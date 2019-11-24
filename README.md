# Tracer
Tracing visualization and debugging assistant for distributed systems.

![alt text](https://github.com/sap-staging/Tracer/blob/master/ReadMe/Main.PNG)

## [Demo](http://Demo)

There is demo link showing few record in the history panel to play with.

## Why to use?
It simplifies the flow understanding so you can focus on what is metter.  
Developers and support engineers can understand and solve the problem easier.  
It can even be used to document your flows.  

## How to run on your development machine

Run `ng serve` for a dev server.  
Navigate to `http://localhost:4200/`.  
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project.  
The build artifacts will be stored in the `dist/` directory.   
Use the `--prod` flag for a production build.

## Integration 

You can use this app with two possible sources of data.
The files from local file system or remote logging/tracing system.
To connect with logging/tracing system by implementing simple API configure the API endpoint by setting `searchServiceUrl` in `\src\environments\environment.prod.ts` and `\src\environments\environment.ts`.

The API should support the following request format: 
``` http://YourSearchService.com/v1/Search?callID=${callID}&aggregate=${aggregate}```

* CallID ```<string>```:  an unique identifier for request
* Aggregate ```<boolean>```: false means taking the first result with data that returns, true - wait for all result to be returned. 
To disable Aggregate option, set ShowAggregateSearch to false.

The return format.  

``` 
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

|field| Description|
|-----| -----------|
|callId|every flow must have an unique identifier (flow can be everything that happened during user request)|
|spanId| An unique identifier to define a new scope. Any requests forked from this one, will inherit it as a parentSpanId|
|parentSpanId| The parent scope id (the first scope expected to be with no parentSpanId)|
|durationMs| The time elapsed |
|direction| A number. 0 or 2: the request. 1 or 3: the response. 0 or 1, to create automatically completion if wasn't exist|
|action| The action title, e.g. login, GetUserList|
|startedAt| The timestamp the action started |
|error| An error message, if present, changes the line styling to red.
|from.name | A system name generates this request|
|to.name | A system, the request calling to (in a log entry it calling to itself)|
|metaData| An auto generated field (don't use this field)|

Any additional fields will be automatically added. Will be possible to examine them on sticky tags summary bar.

## License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.  
This file is licensed under the Apache 2.0 except as noted otherwise in the [LICENSE file](https://github.com/sap-staging/Tracer/blob/master/LICENSE).
