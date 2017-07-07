import { TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserName = ['amit','samit'];
  //Custome Vaildator

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)] ),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies':new FormArray([]) 
    }); 
    /*this.signupForm.valueChanges.subscribe(
      (value)=>console.log(value)
    );*/

    this.signupForm.statusChanges.subscribe(
      (status)=>console.log(status)
    );
    this.signupForm.setValue({
      'userData': {
        'username':'Max',
        'email':'max@TestBed.com'
      },
      'gender':'male',
      'hobbies':[]
    });
  //Template driven apprach
    this.signupForm.patchValue({
      'userData':{
        'username':'Anna',
      }
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  addHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  //Custome Validators
  //belwo function will return like : {nameIsForbidden: true}
  forbiddenNames(control:FormControl): {[s: string]: boolean}{
    if(this.forbiddenUserName.indexOf(control.value) != -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=> {
      setTimeout(()=>{
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden':true});
        }else{
          resolve(null);
        }
      }, 1500)
    });
    return promise;
  }
}
