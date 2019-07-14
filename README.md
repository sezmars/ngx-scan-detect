# BarcodeScannerInputDetect

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### OR

Go to [Barcode Scanner Input Detect](https://sezmars.github.io/barcode-scanner-input-detect/).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


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
       [skipStart]="5"
       [debounce]="300"
       autocomplete="off"
       (onDetected)="onDetected($event)"
       (onBackspace)="onBackspace($event)">
       `
})

export class AppComponent {
  public onDetected(event: IDetect) {
    console.log(event.type, event.time, event.value);
  }

  public onBackspace(event: IBackspace) {
    console.log(event.code, event.keyName, event.value);
  }
}
```

### Options

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| `debounce` | number | `0` | This property is necessary for scenarios such as type-ahead where the rate of user input must be controlled. |
| `skipStart` | number | `0` | Allows you to ignore the first values of the length of the input data. The search begins after entering the first character if the value is 0.|
| `onDetected` | event | `empty` | Returns object with input value, data entry time and device type: ` keyboard, scanner or enter key`. |
| `onBackspace` | event | `empty` | Returns the object with input value, the code and name of the backspace key. |
