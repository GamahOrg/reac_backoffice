import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArbitratorsLookupDto } from '@app/modules/features/arbitration/models/arbitrators-lookup-dto';
import { AreaResponse } from '@app/modules/features/citizen-requests/models/area-response.model';
import { CitizenReformer } from '@app/modules/features/citizen-requests/models/citizen.model';
import { CityResponse } from '@app/modules/features/citizen-requests/models/city-response.model';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { EmployeeLookupResponse } from '@app/shared/models/employee.lookup.model';
import { LitigationAmountResponse } from '@app/shared/models/litigation.Amount.model';
import { LitigationCategoryResponse } from '@app/shared/models/litigation.categories.model';
import { LitigationStatusResponse } from '@app/shared/models/litigation.status.model';
import { LookupsService } from '@app/shared/services/lookups/lookups.service';
import { take, takeUntil } from 'rxjs';

export interface FilterVisibility {
  requestCode: boolean;
  employee: boolean;
  reformers: boolean;
  arbitrators: boolean;
  fromDate: boolean;
  toDate: boolean;
  areaIds: boolean;
  citiesIds: boolean;
  litigationRequestCategoryIds: boolean;
  litigationRequestStatusIds: boolean;
  litigationRequestAmountId: boolean;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends BaseComponent implements OnInit {
  @Input() visibleFilters: FilterVisibility = {
    employee: false,
    reformers: false,
    arbitrators: false,
    requestCode: false,
    fromDate: false,
    toDate: false,
    areaIds: false,
    citiesIds: false,
    litigationRequestCategoryIds: false,
    litigationRequestStatusIds: false,
    litigationRequestAmountId: false,

  };
  selectedArea!: AreaResponse
  areaOptions: AreaResponse[] = [];
  citiesOptions: CityResponse[] = [];
  citiesDropDownList: CityResponse[] = [];  
  litigationRequestCategoryOptions: LitigationCategoryResponse[] = [];
  litigationRequestAmountOptions: LitigationAmountResponse[] = [];
  litigationRequestStatusOptions: LitigationStatusResponse[] = [];
  employeeOptions: EmployeeLookupResponse[] = [];
  reformersOptions: CitizenReformer[] = [];
  arbitratorsOptions: ArbitratorsLookupDto[] = [];
  @Output() filterChange = new EventEmitter<any>();

  filterForm: FormGroup = this.fb.group({
    requestCode: [null], // string
    fromDate: [null], // Date or string
    toDate: [null], // Date or string
    areaIds: [[]], // array of ids
    citiesIds: [[]], // array of ids
    litigationRequestCategoryIds: [[]], // array of ids
    litigationRequestStatusIds: [[]], // array of ids
    employeeIds: [[]], // array of ids
    reformersIds: [[]], // array of ids
    arbitratorsIds: [[]], // array of ids
    litigationRequestAmountId: [null], // array of ids
    skip: [null], // number
    take: [null], // number
    isAdmin: [false], // Employee Or Department Admin
  });

  constructor(
    private _lookupService: LookupsService, // Replace with actual service
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    
    this.observeAreaControl();
    // this.filterForm.valueChanges.subscribe(val => {
    //   this.filterChange.emit(val);
    // });

    if (this.visibleFilters.employee) {
      this.fetchEmployeeOptions();
    }
    if (this.visibleFilters.reformers) {
      this.fetchReformersOptions();
    }
    if (this.visibleFilters.arbitrators) {
      this.fetchArbitratorsOptions();
    }
    if (this.visibleFilters.areaIds) {
      this.fetchAreaOptions();
    }
    if (this.visibleFilters.citiesIds) {
      this.fetchCitiesOptions();
    }
    if (this.visibleFilters.litigationRequestCategoryIds) {
      this.fetchLitigationRequestCategoryOptions();
    }
    if (this.visibleFilters.litigationRequestAmountId) {
      this.fetchLitigationRequestAmountOptions();
    }
    if (this.visibleFilters.litigationRequestStatusIds) {
      this.fetchLitigationRequestStatusOptions();
    }
  }

  isVisible(filter: keyof FilterVisibility): boolean {
    return !!this.visibleFilters[filter];
  }

  fetchAreaOptions() {
    this._lookupService.GetSysArea().subscribe((response) => {
      if (response?.data) {
        this.areaOptions = response.data;
      }
    }, (error) => {
    })
  }

  fetchEmployeeOptions() {
    this._lookupService.GetAllEmployeeByDepartmentType(1).subscribe((response) => {
      if (response?.data) {
        this.employeeOptions = response.data;
      }
    }, (error) => {
    })
  }
  fetchReformersOptions() {
    this._lookupService.getAllReformers().subscribe((response) => {
      if (response?.data) {
        this.reformersOptions = response.data;
      }
    }, (error) => {
    })
  }
  fetchArbitratorsOptions() {
    this._lookupService.getAllArbitrators().subscribe((response) => {
      if (response?.data) {
        this.arbitratorsOptions = response.data;
      }
    }, (error) => {
    })
  }

  fetchCitiesOptions() {
    this._lookupService.SysCity().subscribe((response) => {
      if (response?.data) {
        this.citiesOptions = response.data;
      }
    }, (error) => {
    })
  }

  fetchLitigationRequestCategoryOptions() {
    this._lookupService.GetSysCategories().subscribe((response) => {
      if (response?.data) {
        this.litigationRequestCategoryOptions = response.data;
      }
    }, (error) => {
    })
  }

  fetchLitigationRequestAmountOptions() {
    this._lookupService.SysLitigationRequestAmountList().subscribe((response) => {
      if (response?.data) {
        this.litigationRequestAmountOptions = response.data;
      }
    }, (error) => {
    })
  }

  fetchLitigationRequestStatusOptions() {
    this._lookupService.GetSysLitigationStatus().subscribe((response) => {
      if (response?.data) {
        this.litigationRequestStatusOptions = response.data;
      }
    }, (error) => {
    })
  }

 get controls() {
        return this.filterForm.controls;
    }
      private observeAreaControl(): void {
        this.controls['areaIds'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
            console.log("this.controls.areasId.valueChange", res);
            if (res) {
                this.filterCity(res as string);
            }
        })
    };

    private filterCity(areaId: string): void {
debugger
const selectedAreaIds: string[] = (this.controls['areaIds'].value as string[]) ?? [];

this.citiesDropDownList = this.citiesOptions.filter(city =>
  city.areaId && selectedAreaIds.includes(city.areaId)
);
    };

  onSubmit() {
    this.filterChange.emit(this.filterForm.value);
  }
}