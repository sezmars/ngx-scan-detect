import {from, fromEvent, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

export interface IDetect {
  type?: string;
  time?: number;
  event?: KeyboardEvent;
  value?: string | number;
}

export interface IDelete {
  type?: string;
  event?: KeyboardEvent;
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
   * Data cleansing event
   */
  @Output() public onDelete: EventEmitter<IDelete> = new EventEmitter();

  /**
   * Event after data entry
   */
  @Output() public onDetected: EventEmitter<IDetect> = new EventEmitter();

  /**
   * Use for unsubscribe
   */
  private destroy$ = new Subject();

  constructor(private elementRef: ElementRef) {}

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
        filter((event: KeyboardEvent) => {
          if (event.keyCode === 8 || event.code === 'Backspace' || event.which === 8) {
            /**
             * Used to clear data.
             */
            this.onDelete.emit({event, value: (event.target as HTMLInputElement).value, type: 'delete'});
          }

          /**
           * Return data after typed in two characters.
           */
          return (event.target as HTMLInputElement).value.length > this.skipStart;
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
          this.onDetected.emit({event, value: event.target.value, time: event.duration, type: 'keyboard'});
        } else if (event.duration <= 0.02) {

          /**
           * Input from the scanner.
           */
          this.onDetected.emit({event, value: event.target.value, time: event.duration, type: 'scanner'});
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
