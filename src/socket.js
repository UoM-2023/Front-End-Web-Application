// socket.js
// import { serverHost } from "./services/api.js"
import io from 'socket.io-client';

export default function getSocketInit() {
    if (window.socket) {
        return window.socket;
    }
    const socket = io('http://localhost:3001', {
        autoConnect: true,
        auth: {
            "userId":1,
            "user": "{Praneeth}"
        }
    });
    window.socket = socket;
    return socket;
}