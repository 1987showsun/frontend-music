import axios   from 'axios';
import io      from 'socket.io-client';

let socket  = io('http://localhost:4000');
let message = [];

export function chatEmit(author,text){
  return function(dispatch){
    socket.emit('chat', text);
  }
}
