![](https://img.shields.io/badge/STATUS-NOT%20CURRENTLY%20MAINTAINED-red.svg?longCache=true&style=flat)

# Important Notice
This public repository is read-only and no longer maintained.

# Tracer

Tracing visualization and debugging assistant for distributed systems.

[![alt text](https://github.com/sap-staging/Tracer/blob/master/ReadMe/Main2.PNG)](https://tracer-demo.web.app)

**Contents**

- [Tracer](#tracer)
  - [Demo](https://tracer-demo.web.app)
  - [Why should I use Tracer?](#why-should-i-use-tracer)
  - [How to run on your development machine](#how-to-run-on-your-development-machine)
  - [Build](#build)
  - [Docker](#docker)
    - [Docker Build](#docker-build)
    - [Docker Run ](#docker-run)
  - [Tracing Provider](#tracing-provider)
    - [Zipkin Provider](#zipkin-provider)
    - [Server Side Tracing Provider](#server-side-tracing-provider)
    - [File provider](#file-provider)
    - [Data Model](#data-model)
  - [Ordering](#ordering)
  - [License](#license)



## Demo

The [demo](https://tracer-demo.web.app) is configure with few record in the history panel.

## Why should I use Tracer?

For me, it all starts when I diagnosed a production issue that spared across a few microservices.  
While trying to make sense I drew the flow who call who, why?  
Then realized that I spent a lot of time and effort trying to understand the flow and visual it.  

I decided to find a better way, then when Tracer was born.

Tracer helps you focus on the "bigger picture" by exposing you to a simplified sequence diagram.  
There are other great tools most of them are focus performance or better suite to read flow that compose form hundreds of interaction.

## How to run on your development machine

Run `ng serve` for a dev server.  
Navigate to `http://localhost:4200/`.  
The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project.  
The build artifacts will be stored in the `dist/` directory.   
Use the `--prod` flag for a production build.

## Docker

### Docker Build 

```bash
 docker build -t tracer .
```

###   Docker Run 

```bash
docker run 
--env TRACER_ENV_TracingProviderName='serverSide'
--env TRACER_ENV_TracingProviderUrl='http://Server'
-p 127.0.0.1:3001:80 tracer
```

| environment variables          | Values                | Description                       |
| ------------------------------ | --------------------- | --------------------------------- |
| TRACER_ENV_TracingProviderName | `zipkin`,`serverSide` | Setting the Tracing provider name |
| TRACER_ENV_TracingProviderUrl  | URL http://Server     | Tracing provider server           |

visit the [app]( http://localhost:3001 ) 



## Tracing Provider

After selecting the tracing provider it should be configure in the environments settings  (`\src\environments\environment.prod.ts` and `\src\environments\environment.ts`).  

### Zipkin Provider

```javascript
  tracingProvider: {
  	 name: 'zipkin',
	   url: 'http://localhost:9411'
 }
```

> :bulb: it use internally Zipkin v2 API [/trace/{traceId}](https://zipkin.io/zipkin-api/#/default/get_trace__traceId_) 


### Server Side Tracing Provider 

```javascript
 tracingProvider: {
  	 name: 'serverSide',
	   url:  'http://YourSearchService.com/v1'
 }
```

Server Side tracing provider let you create your own provider without chancing tracer source code. 

Create a API that receive Get request to ```/trace/{traceId}``` and return [Tracer format](https://github.com/SAP/Tracer#source-format).

>  :bulb: Add [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) support by adding header "Access-Control-Allow-Origin", "*"` .

### File provider

* Load event list from disk.

* Save events on disk. 

  

### Data Model

The application receive from the tracing provider array of Data Model: 

```javascript
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
                'timestamp': 1579170558105231,
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
| direction    | A numeration that effect the sequence diagram:<br /><br />**Logical transaction:**<br />All the inner interactions will be in the same **operation block** .<br />comprise of start and end, when one of them is missing it will auto generate it  (The line courser will be with cross **⥇** ). <br /><br />**Case 0 logical transaction start** (striate line *→* )<br />**Case 1 logical transaction end**   (dashed line *⇠*)<br /> <br /> <br /> **Action with no continuation:** <br />A simple line with no side effect ,Log are excellent example of it.  <br />**Case 2 Action Start** ( striate line *→*) <br /> |
| action       | The action title, e.g. login, GetUserList                    |
| timestamp    | The timestamp the action started <br /> Epoch **microseconds** of this event. |
| error        | An error message, if present, changes the line styling to red. |
| from.name    | A system name generates this request                         |
| to.name      | A system, the request calling to (in a log entry it calling to itself) |
| metadata     | An auto generated field (don't use this field)               |

Any additional fields will be automatically added and can be examine.



## Ordering 

The Sequence Diagram is like tree that start at the top item.
The next level are all the node (spanId) with the same preantSpanId .

Top item: recommended to be one event  with no parentSpanId.

## License

Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.  
This file is licensed under the Apache 2.0 except as noted otherwise in the [LICENSE file](https://github.com/sap-staging/Tracer/blob/master/LICENSE).

Please note that Docker images can contain other software which may be licensed under different licenses.  
This License file is also included in the Docker image.   
For any usage of built Docker images please make sure to check the licenses of the artifacts contained in the images.
