import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from './jwt.service';
import { CreateUserDto } from '../dto/create-user.dto';
import axios from 'axios';
import { Error } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(publicID) {
    console.log("get",publicID);
    let  user = await this.usersService.findByUserID(publicID);
    if (user==null){
      try {
        const response = await axios.post('http://localhost:3002/users/', {"publicID":publicID}, {
          headers: {
            'Content-Type': 'application/json', // Set appropriate headers if needed
            // Add other headers if required
          },
        })
        console.log(" data  " ,response.data.data)
        user = response.data.data;
      }
        catch(error){
          console.log("Error");
          throw new UnauthorizedException();
        }
    }
    console.log("get 2");
    const payload = { sub: user.publicID, id: user._id };
    return {
      access_token: await this.jwtService.signToken(payload),
    };
  }
}






// {
//   status: 201,
//   statusText: 'Created',
//   headers: Object [AxiosHeaders] {
//     'x-powered-by': 'Express',
//     'content-type': 'application/json; charset=utf-8',
//     'content-length': '140',
//     etag: 'W/"8c-6Va3L6rQ0Gt7M8/Fvi1TMPsGduE"',
//     date: 'Thu, 14 Dec 2023 08:46:23 GMT',
//     connection: 'close'
//   },
//   config: {
//     transitional: {
//       silentJSONParsing: true,
//       forcedJSONParsing: true,
//       clarifyTimeoutError: false
//     },
//     adapter: [ 'xhr', 'http' ],
//     transformRequest: [ [Function: transformRequest] ],
//     transformResponse: [ [Function: transformResponse] ],
//     timeout: 0,
//     xsrfCookieName: 'XSRF-TOKEN',
//     xsrfHeaderName: 'X-XSRF-TOKEN',
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     env: { FormData: [Function], Blob: [class Blob] },
//     validateStatus: [Function: validateStatus],
//     headers: Object [AxiosHeaders] {
//       Accept: 'application/json, text/plain, */*',
//       'Content-Type': 'application/json',
//       'User-Agent': 'axios/1.6.2',
//       'Content-Length': '2',
//       'Accept-Encoding': 'gzip, compress, deflate, br'
//     },
//     method: 'post',
//     url: 'http://localhost:3002/users/',
//     data: '{}'
//   },
//   request: <ref *1> ClientRequest {
//     _events: [Object: null prototype] {
//       abort: [Function (anonymous)],
//       aborted: [Function (anonymous)],
//       connect: [Function (anonymous)],
//       error: [Function (anonymous)],
//       socket: [Function (anonymous)],
//       timeout: [Function (anonymous)],
//       finish: [Function: requestOnFinish]
//     },
//     _eventsCount: 7,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     destroyed: false,
//     _last: true,
//     chunkedEncoding: false,
//     shouldKeepAlive: false,
//     maxRequestsOnConnectionReached: false,
//     _defaultKeepAlive: true,
//     useChunkedEncodingByDefault: true,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     strictContentLength: false,
//     _contentLength: '2',
//     _hasBody: true,
//     _trailer: '',
//     finished: true,
//     _headerSent: true,
//     _closed: false,
//     socket: Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: 'localhost',
//       _closeAfterHandlingError: false,
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 7,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       allowHalfOpen: false,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: null,
//       _server: null,
//       parser: null,
//       _httpMessage: [Circular *1],
//       [Symbol(async_id_symbol)]: 162,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: null,
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kCapture)]: false,
//       [Symbol(kSetNoDelay)]: true,
//       [Symbol(kSetKeepAlive)]: true,
//       [Symbol(kSetKeepAliveInitialDelay)]: 60,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     _header: 'POST /users/ HTTP/1.1\r\n' +
//       'Accept: application/json, text/plain, */*\r\n' +
//       'Content-Type: application/json\r\n' +
//       'User-Agent: axios/1.6.2\r\n' +
//       'Content-Length: 2\r\n' +
//       'Accept-Encoding: gzip, compress, deflate, br\r\n' +
//       'Host: localhost:3002\r\n' +
//       'Connection: close\r\n' +
//       '\r\n',
//     _keepAliveTimeout: 0,
//     _onPendingData: [Function: nop],
//     agent: Agent {
//       _events: [Object: null prototype],
//       _eventsCount: 2,
//       _maxListeners: undefined,
//       defaultPort: 80,
//       protocol: 'http:',
//       options: [Object: null prototype],
//       requests: [Object: null prototype] {},
//       sockets: [Object: null prototype],
//       freeSockets: [Object: null prototype] {},
//       keepAliveMsecs: 1000,
//       keepAlive: false,
//       maxSockets: Infinity,
//       maxFreeSockets: 256,
//       scheduling: 'lifo',
//       maxTotalSockets: Infinity,
//       totalSocketCount: 1,
//       [Symbol(kCapture)]: false
//     },
//     socketPath: undefined,
//     method: 'POST',
//     maxHeaderSize: undefined,
//     insecureHTTPParser: undefined,
//     joinDuplicateHeaders: undefined,
//     path: '/users/',
//     _ended: true,
//     res: IncomingMessage {
//       _readableState: [ReadableState],
//       _events: [Object: null prototype],
//       _eventsCount: 4,
//       _maxListeners: undefined,
//       socket: [Socket],
//       httpVersionMajor: 1,
//       httpVersionMinor: 1,
//       httpVersion: '1.1',
//       complete: true,
//       rawHeaders: [Array],
//       rawTrailers: [],
//       joinDuplicateHeaders: undefined,
//       aborted: false,
//       upgrade: false,
//       url: '',
//       method: null,
//       statusCode: 201,
//       statusMessage: 'Created',
//       client: [Socket],
//       _consuming: false,
//       _dumped: false,
//       req: [Circular *1],
//       responseUrl: 'http://localhost:3002/users/',
//       redirects: [],
//       [Symbol(kCapture)]: false,
//       [Symbol(kHeaders)]: [Object],
//       [Symbol(kHeadersCount)]: 12,
//       [Symbol(kTrailers)]: null,
//       [Symbol(kTrailersCount)]: 0
//     },
//     aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: false,
//     host: 'localhost',
//     protocol: 'http:',
//     _redirectable: Writable {
//       _writableState: [WritableState],
//       _events: [Object: null prototype],
//       _eventsCount: 3,
//       _maxListeners: undefined,
//       _options: [Object],
//       _ended: true,
//       _ending: true,
//       _redirectCount: 0,
//       _redirects: [],
//       _requestBodyLength: 2,
//       _requestBodyBuffers: [],
//       _onNativeResponse: [Function (anonymous)],
//       _currentRequest: [Circular *1],
//       _currentUrl: 'http://localhost:3002/users/',
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(kCapture)]: false,
//     [Symbol(kBytesWritten)]: 0,
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(corked)]: 0,
//     [Symbol(kOutHeaders)]: [Object: null prototype] {
//       accept: [Array],
//       'content-type': [Array],
//       'user-agent': [Array],
//       'content-length': [Array],
//       'accept-encoding': [Array],
//       host: [Array]
//     },
//     [Symbol(errored)]: null,
//     [Symbol(kHighWaterMark)]: 16384,
//     [Symbol(kRejectNonStandardBodyWrites)]: false,
//     [Symbol(kUniqueHeaders)]: null
//   },
//   data: {
//     message: 'User created successfully',
//     data: {
//       name: 'UnNamed',
//       profileImg: 'Img',
//       purchased: [],
//       _id: '657ac0dffc26959a72c32375',
//       __v: 0
//     }
//   }
// }