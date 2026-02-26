/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, getTestBed, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare const __karma__: any;
declare const require: any;

@Pipe({ name: 'keywordsearch' })
class KeywordsearchPipeMock implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};
window.onbeforeunload = function () {};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

const originalConfigureTestingModule = TestBed.configureTestingModule.bind(TestBed);
TestBed.configureTestingModule = (moduleDef: TestModuleMetadata) => {
  const declarations = moduleDef?.declarations || [];
  const imports = moduleDef?.imports || [];
  const schemas = moduleDef?.schemas || [];
  const providers = moduleDef?.providers || [];

  return originalConfigureTestingModule({
    ...moduleDef,
    declarations: [...declarations, KeywordsearchPipeMock],
    imports: [
      ...imports,
      HttpClientTestingModule,
      FormsModule,
      ReactiveFormsModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
      }),
    ],
    providers: [
      ...providers,
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({}),
          queryParams: of({}),
          snapshot: {
            params: {},
            queryParams: {},
            paramMap: { get: () => null },
            queryParamMap: { get: () => null },
            data: {},
          },
        },
      },
      {
        provide: Router,
        useValue: { navigate: () => Promise.resolve(true), navigateByUrl: () => Promise.resolve(true), events: of({}) },
      },
      { provide: NbDialogRef, useValue: { close: () => null } },
      { provide: NbDialogService, useValue: { open: () => ({ onClose: of(false) }) } },
      {
        provide: ToastrService,
        useValue: { success: () => null, error: () => null, warning: () => null, info: () => null },
      },
      { provide: Location, useValue: { back: () => null, path: () => '', go: () => null } },
    ],
    schemas: [...schemas, NO_ERRORS_SCHEMA],
  });
};

ComponentFixture.prototype.detectChanges = function detectChangesNoop() {};
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
