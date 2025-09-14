import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root', // singleton for the entire app
})
export class SocketService {
  private socket: Socket | null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.socket = io('http://localhost:4000', {
        transports: ['websocket'],
        autoConnect: true,
        path: '/socket-route'
      });
    } else {
      this.socket = null;
    }
  }

  // Emit events
  emit(event: string, data: any) {
    if(this.socket !== null) {
      this.socket.emit(event, data);
    }
  }

  // Listen to events as Observable
  listen<T>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      const handler = (data: T) => subscriber.next(data);

      this.socket?.on(event, handler);

      // Clean up when subscriber unsubscribes
      return () => this.socket?.off(event, handler);
    });
  }

  // Disconnect socket (optional)
  disconnect() {
    if(this.socket !== null) {
      this.socket.disconnect();
    }
  }

  // Reconnect socket (optional)
  connect() {
    if(this.socket !== null) {
      this.socket.connect();
    }
  }
}
