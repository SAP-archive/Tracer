# Tracer
Distributed tracing visualization and debugging assistant.

![alt text](https://github.com/sap-staging/Tracer/blob/master/ReadMe/Main.PNG)

## Demo

The [app](http://Demo) can export and load its state from local file(the button in the toolbar right corner), so download the examples paly around and reload.

## What in it for me?
It simplifies the logs so you can focus on what meter.  
Developers and support engineers can understand and solve the problem faster.  
It can even be used to document your flows.  

## Development server

Run `ng serve` for a dev server.  
Navigate to `http://localhost:4200/`.  
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project.  
The build artifacts will be stored in the `dist/` directory.   
Use the `--prod` flag for a production build.

## Integration

This app connects to your local logging/tracing system by implanting simple API. 
First, you should configure the API endpoint by setting `searchServiceUrl` in `\src\environments\environment.prod.ts` and `\src\environments\environment.ts`.

The API should support this Request format: 
``` Http://YourSearchService.com/v1/Search?callID=${callID}&aggregate=${aggregate}```

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
|callId|every flow must have a unique identifier (flow can be everting that happened during user request)|
|parentSpanId| The parent context, the first call should be with no parentSpanId|
|spanId| New context for every call should be unique later it becomes the parentSpanId|
|durationMs| The time this action took|
|direction| 0,2 are request. 1,3 are the response. 0,1 is my recommendation for calls it will create a request/response event if not exist. 2,3 are recommendation logging |
|action| What the action like login, GetUserList|
|startedAt| What is the date that this event stat|
|error| Error message it will change the line style to be red.
|from.name |Which system generate this log|
|to.name | Which system are you calling (in the log you calling to yourself)|
|mateData|auto generated a field, don't pass this data|
|Any other| Tag use for sticky tag(summary), help you get the context like the userID, DataCenter extra 



## License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.  
This file is licensed under the Apache 2.0 except as noted otherwise in the [LICENSE file](https://github.com/sap-staging/Tracer/blob/master/LICENSE).
