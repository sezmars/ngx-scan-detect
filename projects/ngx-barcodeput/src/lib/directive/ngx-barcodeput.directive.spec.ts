import {NgxBarCodePutDirective} from './ngx-barcodeput.directive';

describe('NgxBarCodePutDirective', () => {
  const elRefMock = {
    nativeElement: document.createElement('div'),
  };
  it('should create an instance', () => {
    const directive = new NgxBarCodePutDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
