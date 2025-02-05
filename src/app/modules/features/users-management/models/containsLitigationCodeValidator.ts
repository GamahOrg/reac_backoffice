import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator to check if value contains `{LitigationCode}`
export function containsLitigationCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.includes('{LitigationCode}')) {
      return null;  // valid
    }
    return { containsLitigationCode: true };  // invalid
  };
}

export function containsCitizenNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.includes('{CitizenName}')) {
      return null;  // valid
    }
    return { containsCitizenName: true };  // invalid
  };
}