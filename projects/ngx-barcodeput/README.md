# ngx-barcodeput

[![NPM](https://nodei.co/npm/ngx-barcodeput.png?compact=true)](https://nodei.co/npm/ngx-barcodeput/)

**[Demo](https://sezmars.github.io/barcode-scanner-input-detect/)**

*Formerly called [ngx-barcodeput](https://github.com/sezmars/barcode-scanner-input-detect)*

Angular directive for handling input events. Useful for determine input using a barcode-scanner.

Like binding to a regular `type` event in a template, you can do something like this:

```HTML
<input ngxBarCodePut
       (onDetected)="onDetected($event)">
```


## Installation

```shell
npm install --save ngx-barcodeput
```


## Usage

Add `NgxBarCodePutModule` to your list of module imports:

```typescript
import { NgxBarCodePutModule } from 'ngx-barcodeput';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxBarCodePutModule],
  bootstrap: [AppComponent]
})
class AppModule {}
```

You can then use the directive in your templates:

```typescript
@Component({
  selector: 'app',
  template: `
    <input type="text"
       ngxBarCodePut
       maxlength="14"
       [debounce]="300"
       autocomplete="off"
       [skipStartLength]="3"
       (onDelete)="onBackspace($event)"
       (onDetected)="onDetected($event)">
       `
})

export class AppComponent {
  public onDetected(event: IDetect) {
    console.log(event); 
    /* {event: KeyboardEvent, value: "sezmars", time: 0.07083499999716878, type: "scanner"} */
    /* {event: KeyboardEvent, value: "3333333", time: 0.17083499999716878, type: "keyboard"} */
  }

  public onDelete(event: IDelete) {
    console.log(event);
    /* {event: KeyboardEvent, value: "3333333", type: "delete"} */
  }
}
```

### Options

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| `debounce` | number | `0` | This property is necessary for scenarios such as type-ahead where the rate of user input must be controlled. |
| `skipStart` | number | `0` | Allows you to ignore the first values of the length of the input data. The search begins after entering the first character if the value is 0.|
| `onDetected` | event | `empty` | Returns object with keyboard event, input value, data entry time and device type: ` keyboard or scanner`. |
| `onDelete` | event | `empty` | Returns an object with input value, keyboard event, and type. |
