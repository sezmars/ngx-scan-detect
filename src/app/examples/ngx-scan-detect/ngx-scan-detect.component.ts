import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { IDelete, IDetect, NgxScanDetectDirective } from 'ngx-scan-detect';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-ngx-scan-detect',
  standalone: true,
  imports: [CommonModule, NgxScanDetectDirective, MatTooltipModule],
  templateUrl: './ngx-scan-detect.component.html',
  styleUrls: ['./ngx-scan-detect.component.scss'],
})
export class NgxScanDetectComponent {
  /**
   * Used for example
   */
  public delayTime: number = 0;
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

  public onDetected(event: IDetect): void {
    this.delayTime = event.time ? event.time : 0;
    this.inputType = event.type ? event.type : '';

    console.info(event);

    if (event.value) {
      this.exampleCodes.push(event.value);
    }
  }

  public onDelete(event: IDelete): void {
    /**
     * Used to clear data.
     */
    console.info(event);
  }
}
