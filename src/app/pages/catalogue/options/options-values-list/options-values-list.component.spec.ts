import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NbDialogService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';

import { OptionsValuesListComponent } from './options-values-list.component';
import { OptionValuesService } from '../services/option-values.service';
import { StorageService } from '../../../shared/services/storage.service';
import { StoreService } from '../../../store-management/services/store.service';

@Pipe({ name: 'translate' })
class TranslatePipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('OptionsValuesListComponent', () => {
  let component: OptionsValuesListComponent;
  let fixture: ComponentFixture<OptionsValuesListComponent>;

  beforeEach(waitForAsync(() => {
    const optionValuesServiceMock = {
      getListOfOptionValues: () => of({ recordsTotal: 0, optionValues: [] }),
      deleteOptionValue: () => of({})
    };
    const storageServiceMock = {
      getMerchant: () => 'DEFAULT',
      getLanguage: () => 'en'
    };
    const storeServiceMock = {
      getListOfMerchantStoreNames: () => of([])
    };

    TestBed.configureTestingModule({
      declarations: [OptionsValuesListComponent, TranslatePipeMock],
      providers: [
        { provide: OptionValuesService, useValue: optionValuesServiceMock },
        { provide: StorageService, useValue: storageServiceMock },
        { provide: StoreService, useValue: storeServiceMock },
        { provide: Router, useValue: { navigate: () => null } },
        { provide: NbDialogService, useValue: { open: () => ({ onClose: of(false) }) } },
        { provide: ToastrService, useValue: { success: () => null } },
        { provide: TranslateService, useValue: { instant: (key: string) => key, onLangChange: of({}) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
