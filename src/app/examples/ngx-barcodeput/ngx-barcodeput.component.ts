import {Component} from '@angular/core';
import {IBackspace, IDetect} from 'ngx-barcodeput';
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';

@Component({
  selector: 'app-ngx-barcodeput',
  templateUrl: './ngx-barcodeput.component.html',
  styleUrls: ['./ngx-barcodeput.component.scss']
})
export class NgxBarCodePutComponent {
  public userAgent: string;
  public isMobile: boolean;
  public isTablet: boolean;

  /**
   * Used for example
   */
  public delayTime: number = null;

  /**
   * Used for example
   */
  public inputType: string = null;

  private deviceInfo: DeviceInfo = this.deviceService.getDeviceInfo();

  constructor(private deviceService: DeviceDetectorService) {
    this.userAgent = this.deviceInfo.userAgent;
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();
  }

  public onDetected(event: IDetect) {
    this.delayTime = event.time;
    this.inputType = event.type;

    console.log(event.type, event.time, event.value);
  }

  public onBackspace(event: IBackspace) {

    /**
     * Used to clear data.
     */
    console.log(event.code, event.keyName, event.value);
  }

}
