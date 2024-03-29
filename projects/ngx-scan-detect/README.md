# ngx-scan-detect

Detects barcode or qr code scanning on document and emits the scanned barcode.

[![NPM](https://nodei.co/npm/ngx-scan-detect.png?compact=true)](https://nodei.co/npm/ngx-scan-detect/)

**[Demo](https://sezmars.github.io/ngx-scan-detect/)** | <a href="https://github.com/sezmars/ngx-scan-detect/blob/main/demo.mp4" target="_blank">Video Demo</a>

Angular directive for handling input events. Useful for determine input using a barcode-scanner.

Like binding to a regular `type` event in a template, you can do something like this:

```HTML
<input ngxBarCodePut
       (detected)="onDetected($event)">
```


## Installation

```shell
npm install --save ngx-scan-detect
```


## Usage

You can then use the directive in your templates:

```typescript
@Component({
  selector: 'app-ngx-scan-detect',
  templateUrl: './ngx-scan-detect.component.html',
  styleUrls: ['./ngx-scan-detect.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxBarCodePutDirective],
})

export class AppComponent {
  public onDetected(event: IDetect) {
    console.info(event); 
    /* {event: KeyboardEvent, value: "sezmars", time: 0.07083499999716878, type: "scanner"} */
    /* {event: KeyboardEvent, value: "3333333", time: 0.17083499999716878, type: "keyboard"} */
  }

  public onDelete(event: IDelete) {
    console.info(event);
    /* {event: KeyboardEvent, value: "3333333", type: "delete"} */
  }
}
```

### Options

| Property name | Type   | Default | Description                                                                                                                                    |
|---------------|--------| ------ |------------------------------------------------------------------------------------------------------------------------------------------------|
| `debounce`    | number | `0` | This property is necessary for scenarios such as type-ahead where the rate of user input must be controlled.                                   |
| `workMode`    | string | `manual` | This property controls the automatic clearing of the input field.                                                                              |
| `skipStart`   | number | `0` | Allows you to ignore the first values of the length of the input data. The search begins after entering the first character if the value is 0. |
| `detected`    | event  | `empty` | Returns object with keyboard event, input value, data entry time and device type: ` keyboard or scanner`.                                      |
| `delete`      | event  | `empty` | Returns an object with input value, keyboard event, and type.                                                                                  |
