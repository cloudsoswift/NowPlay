import SockJs from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

const socketClient = new StompJs.Client({
  brokerURL: 'ws://j8d110.p.ssafy.io:9092/ws',
  // connectHeaders: {
  //   login: 'user',
  //   passcode: 'password',
  // },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000, //자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})

socketClient.onConnect = function (frame) {
  console.log("연결?")
};

socketClient.onStompError = function (frame) {
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

socketClient.onConnect = function (frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
};

socketClient.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

export {socketClient}