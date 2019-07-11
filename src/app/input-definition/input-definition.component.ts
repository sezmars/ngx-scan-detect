import * as _assign from 'lodash/assign';
import {from, fromEvent, Subject} from 'rxjs';
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';
import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, map, mergeMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-input-definition',
  templateUrl: './input-definition.component.html',
  styleUrls: ['./input-definition.component.scss']
})
export class InputDefinitionComponent implements AfterViewInit, OnDestroy {
  public userAgent: string;
  public isMobile: boolean;
  public isTablet: boolean;
  private deviceInfo: DeviceInfo = this.deviceService.getDeviceInfo();

  constructor(private deviceService: DeviceDetectorService) {
    this.userAgent = this.deviceInfo.userAgent;
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();
  }

  /**
   * Used for cleaning input logic
   */
  public query: string = null;

  /**
   * Used for example
   */
  public delayTime: number = null;

  /**
   * Used for example
   */
  public inputType: string = null;

  /**
   * Used to create observable
   */
  public queryChanged: Subject<string> = new Subject<string>();

  // @ts-ignore
  @ViewChild('searchElementRef') public searchElementRef: ElementRef;

  /**
   * Use for unsubscribe
   */
  private destroy$ = new Subject();

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
        mergeMap((event) => fromEvent(this.searchElementRef.nativeElement, event)),

        /**
         * Prepare input data
         */
        map((event: KeyboardEvent) => {
          switch (event.type) {
            case 'keydown':

              /**
               * Since "which" is deprecated, we use it for a temporary variable
               * and set the processing time keydown .
               */
              pressed[event.which] = event.timeStamp;
              break;
            case 'keyup':

              /**
               * In the delay set the difference between keydown and keyup events
               */
              _assign(event, {duration: (event.timeStamp - pressed[event.which]) / 1000});
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
          }

          /**
           * Return data after typed in two characters
           */
          return (e.target as HTMLInputElement).value.length > 2;
        }),

        /**
         * Data entry delay is used to limit requests
         */
        debounceTime(300),

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
          this.delayTime = event.duration;
          this.inputType = 'Keyboard input';
          /**
           * Keyboard input.
           * Use the data in the function.
           * e.g
           * this.someFunction(event.target.value);
           */
        } else if (event.duration <= 0.02) {
          this.delayTime = event.duration;
          this.inputType = 'Input from the scanner';
          /**
           * Input from the scanner.
           * Use the data in the function.
           * e.g
           * this.someFunction(event.target.value);
           */
        } else if (event.which === 13) {
          /**
           * Input with the enter key.
           * Use the data in the function.
           * e.g
           * this.someFunction(event.target.value);
           */
        }
      });
  }

  public onQueryChange(query) {

    /**
     * Call the next() method of the observer object to inform it of the available values.
     */
    this.queryChanged.next(query);
  }

  /**
   * Use for unsubscribe
   */
  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
