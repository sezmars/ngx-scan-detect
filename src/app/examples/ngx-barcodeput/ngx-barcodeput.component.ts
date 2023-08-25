import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
/*
import {IDelete, IDetect} from 'ngx-barcodeput';
*/
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

import { NgxBarCodePutDirective } from '../../../../projects/ngx-barcodeput/src/lib/directive/ngx-barcodeput.directive';

@Component({
  selector: 'app-ngx-barcodeput',
  templateUrl: './ngx-barcodeput.component.html',
  styleUrls: ['./ngx-barcodeput.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxBarCodePutDirective, MatTooltipModule],
})
export class NgxBarCodePutComponent {
  /**
   * Used for example
   */
  public delayTime: string = '';
  public inputType: string = '';
  public exampleCodes: string[] = [];

  /**
   * Used for additional info
   */
  private deviceInfo: DeviceInfo = this.deviceService.getDeviceInfo();

  public userAgent: string = this.deviceInfo.userAgent;
  public isMobile: boolean = this.deviceService.isMobile();
  public isTablet: boolean = this.deviceService.isTablet();

  constructor(private deviceService: DeviceDetectorService) {}

  public onDetected(event: any): void {
    this.delayTime = event.time;
    this.inputType = event.type;

    console.info(event);

    this.exampleCodes.push(event.value);
  }

  public onDelete(event: any): void {
    /**
     * Used to clear data.
     */
    console.info(event);
  }
}
