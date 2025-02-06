import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { from, fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  takeUntil,
} from 'rxjs/operators';

export interface IDetect {
  type?: 'keyboard' | 'scanner';
  time?: number;
  event?: KeyboardEvent;
  value?: string;
}

export interface IDelete {
  type?: 'delete';
  event?: KeyboardEvent;
  value?: string;
}

interface ExtendedKeyboardEvent extends KeyboardEvent {
  duration?: number;
}

@Directive({
  selector: 'input[ngxScanDetect]',
  standalone: true,
})
export class NgxScanDetectDirective implements AfterViewInit, OnDestroy {
  /**
   * Working Mode
   */
  @Input() public workMode: 'manual' | 'multiple' = 'manual';
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
  @Output() public delete: EventEmitter<IDelete> = new EventEmitter();

  /**
   * Event after data entry
   */
  @Output() public detected: EventEmitter<IDetect> = new EventEmitter();

  /**
   * Use for unsubscribe
   */
  private destroy$: Subject<boolean> = new Subject();

  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    /**
     * Often the code scanner is connected to the computer.
     * It emulates a press key, so we use keyboard events to press and release keys.
     */
    const events: string[] = ['keydown', 'keyup'];

    /**
     * Empty object for delay logic
     */
    const pressed: { [key: string | number]: string | number } = {};

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
        mergeMap((event: string) =>
          fromEvent<KeyboardEvent>(this.elementRef.nativeElement, event)
        ),

        /**
         * Prepare input data
         */
        map((event: KeyboardEvent) => {
          switch (event.type) {
            case 'keydown':
              pressed[event.key] = event.timeStamp;
              break;
            case 'keyup':
              /**
               * In the delay set the difference between keydown and keyup events.
               */
              Object.assign(event, {
                duration: (event.timeStamp - +pressed[event.key]) / 1000,
              });
              break;
          }

          /**
           * @return {event: KeyboardEvent}
           */
          return event;
        }),
        filter((event: ExtendedKeyboardEvent) => {
          if (event.key === 'Backspace' || event.code === 'Backspace') {
            /**
             * Used to clear data.
             */
            this.delete.emit({
              event,
              value: (event.target as HTMLInputElement).value,
              type: 'delete',
            });
          }

          /**
           * Return data after typed in two characters.
           */
          return (
            event.target instanceof HTMLInputElement &&
            event.target.value.length > this.skipStart
          );
        }),

        /**
         * Data entry delay is used to limit requests.
         */
        debounceTime(this.debounce),

        /**
         * Look at the
         * {@Link http://reactivex.io/documentation/operators/distinct.html}
         */
        distinctUntilChanged()
      )

      /**
       * Use for unsubscribe
       */
      .pipe(takeUntil(this.destroy$))

      /**
       * Subscribe to the input data and determine the delay time for our purposes.
       */
      .subscribe((event: ExtendedKeyboardEvent) => {
        this.detected.emit({
          event,
          value: (event.target as HTMLInputElement).value,
          time: event.duration,
          type: event.duration! > 0.02 ? 'keyboard' : 'scanner',
        });

        if (this.workMode === 'multiple') {
          /**
           * Clear input value on each event in 'multiple' mode
           */
          (event.target as HTMLInputElement).value = '';
        }
      });
  }

  /**
   * Use for unsubscribe
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
