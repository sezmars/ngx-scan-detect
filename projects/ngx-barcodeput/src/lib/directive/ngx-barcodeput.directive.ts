import {from, fromEvent, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

export interface IDetect {
  type?: string;
  time?: number;
  value?: string | number;
}

export interface IBackspace {
  code?: number;
  keyName?: string;
  value?: string | number;
}

@Directive({
  selector: '[ngxBarCodePut]',
})
export class NgxBarCodePutDirective implements AfterViewInit, OnDestroy {

  /**
   * Input delay
   */
  @Input() public debounce: number = 0;

  /**
   * After how many characters start search
   */
  @Input() public skipStart: number = 0;

  /**
   * Event after data entry
   */
  @Output() public onDetected: EventEmitter<IDetect> = new EventEmitter();

  /**
   * Data cleansing event
   */
  @Output() public onBackspace: EventEmitter<IBackspace> = new EventEmitter();

  /**
   * Use for unsubscribe
   */
  private destroy$ = new Subject();

  constructor(private elementRef: ElementRef) {
  }

  public ngAfterViewInit() {

    /**
     * Often the code scanner is connected to the computer.
     * It emulates a press key, so we use keyboard events to press and release keys.
     */
    const events = ['keydown', 'keyup'];

    /**
     * Empty object for delay logic
     */
    const pressed = {};

    /**
     * Look at the
     * {@Link http://reactivex.io/documentation/operators/from.html}
     */
    from(events)
      .pipe(
        /**
         * Look at the
         * {@Link https://rxjs-dev.firebaseapp.com/api/operators/mergeMap}
         */
        mergeMap((event) => fromEvent(this.elementRef.nativeElement, event)),

        /**
         * Prepare input data
         */
        map((event: KeyboardEvent) => {
          switch (event.type) {
            case 'keydown':

              /**
               * Since "which" is deprecated, we use it for a temporary variable
               * and set the processing time keydown.
               */
              pressed[event.which] = event.timeStamp;
              break;
            case 'keyup':

              /**
               * In the delay set the difference between keydown and keyup events.
               */
              Object.assign(event, {duration: (event.timeStamp - pressed[event.which]) / 1000});
              break;
          }

          /**
           * @return {event: KeyboardEvent}
           */
          return event;
        }),
        filter((e: KeyboardEvent) => {
          if (e.keyCode === 8 || e.code === 'Backspace' || e.which === 8) {
            /**
             * Used to clear data.
             */
            this.onBackspace.emit({value: (e.target as HTMLInputElement).value, code: 8, keyName: 'Backspace'});
          }

          /**
           * Return data after typed in two characters.
           */
          return (e.target as HTMLInputElement).value.length > this.skipStart;
        }),

        /**
         * Data entry delay is used to limit requests.
         */
        debounceTime(this.debounce),

        /**
         * Look at the
         * {@Link http://reactivex.io/documentation/operators/distinct.html}
         */
        distinctUntilChanged(),
      )

      /**
       * Use for unsubscribe
       */
      .pipe(takeUntil(this.destroy$))

      /**
       * Subscribe to the input data and determine the delay time for our purposes.
       */
      .subscribe((event: any) => {
        if (event.duration > 0.02) {

          /**
           * Keyboard input.
           */
          this.onDetected.emit({value: event.target.value, time: event.duration, type: 'keyboard'});
        } else if (event.duration <= 0.02) {

          /**
           * Input from the scanner.
           */
          this.onDetected.emit({value: event.target.value, time: event.duration, type: 'scanner'});
        } else if (event.which === 13) {

          /**
           * Input with the enter key.
           */
          this.onDetected.emit({value: event.target.value, time: event.duration, type: 'keyboard:enter'});
        }
      });
  }

  /**
   * Use for unsubscribe
   */
  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
