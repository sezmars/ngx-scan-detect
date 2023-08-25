# ngx-barcodeput [![NPM version](https://img.shields.io/npm/v/ngx-barcodeput.svg?style=flat)](https://www.npmjs.com/package/ngx-barcodeput) [![NPM monthly downloads](https://img.shields.io/npm/dm/ngx-barcodeput.svg?style=flat)](https://npmjs.org/package/ngx-barcodeput)  [![NPM total downloads](https://img.shields.io/npm/dt/ngx-barcodeput.svg?style=flat)](https://npmjs.org/package/ngx-barcodeput) [![Made with Angular](https://img.shields.io/badge/Made%20with-Angular-E13137.svg)](https://angular.io)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### OR

Go to [ngx-barcodeput](https://github.com/sezmars/ngx-barcodeput).

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

Angular directive for handling input events. Useful for determine input using a barcode-scanner.

Like binding to a regular `type` event in a template, you can do something like this:

```HTML
<input ngxBarCodePut
       (detected)="onDetected($event)">
```


## Installation

```shell
npm install --save ngx-barcodeput
```


## Usage

You can then use the directive in your templates:

```typescript
@Component({
  selector: 'app-ngx-barcodeput',
  templateUrl: './ngx-barcodeput.component.html',
  styleUrls: ['./ngx-barcodeput.component.scss'],
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
