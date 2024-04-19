import { Injectable } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionTimeoutService {
  private timeoutHandle: any;

  constructor() { }

  startSessionTimeout() {
    this.resetSessionTimeout();

    // Subscribe to user activity events
    fromEvent(document, 'mousemove').pipe(
      debounceTime(1000) // Adjust debounce time as needed
    ).subscribe(() => this.resetSessionTimeout());

    fromEvent(document, 'keypress').pipe(
      debounceTime(1000) // Adjust debounce time as needed
    ).subscribe(() => this.resetSessionTimeout());

    fromEvent(document, 'touchstart').pipe(
      debounceTime(1000) // Adjust debounce time as needed
    ).subscribe(() => this.resetSessionTimeout());
  }

  resetSessionTimeout() {
    // Clear existing timeout
    clearTimeout(this.timeoutHandle);

    // Start a new timeout for 1 minute
    this.timeoutHandle = setTimeout(() => {
      sessionStorage.clear(); // Clear sessionStorage after 1 minute of inactivity
    }, 60000); // 1 minute in milliseconds
  }
}
