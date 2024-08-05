import {AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms'

export function confrimPasswordMaatching(register_password: string, register_CONpassword:string): ValidatorFn{

    return(formgroup: AbstractControl): {[key: string]: any} | null => {

        const password =  formgroup.parent?.get(register_password);
    
        const confirm_password = formgroup.parent?.get(register_CONpassword)
       if(password?.value !== confirm_password?.value){
            confirm_password?.setErrors({passwordMismatch:true})
            return {passwordMismatch:true}
        }else{
            confirm_password?.setErrors(null)
            return null
        }   
    }

}