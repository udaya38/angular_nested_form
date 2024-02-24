import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  reactiveForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      schoolName: this.fb.array([]),
    });
    console.log(this.reactiveForm.value);
  }

  schoolNameList(): FormGroup {
    return this.fb.group({
      name: new FormControl(''),
      teacherName: this.fb.array([]),
    });
  }

  teacherList(): FormGroup {
    return this.fb.group({
      name: new FormControl(''),
      studentName: this.fb.array([]),
    });
  }

  studentList(): FormGroup {
    return this.fb.group({
      name: new FormControl(''),
    });
  }

  getSchool(): FormArray {
    return this.reactiveForm.get('schoolName') as FormArray;
  }

  addSchool() {
    (this.reactiveForm.get('schoolName') as FormArray).push(
      this.schoolNameList()
    );
  }

  removeSchool(index: number) {
    this.getSchool().removeAt(index);
  }

  addTeacher(index: number) {
    (this.getSchool().at(index).get('teacherName') as FormArray).push(
      this.teacherList()
    );
  }

  removeTeacher(ind1: number, ind2: number) {
    (this.getSchool().at(ind1).get('teacherName') as FormArray).removeAt(ind2);
  }

  addStudent(ind1: number, ind2: number) {
    (
      (this.getSchool().at(ind1).get('teacherName') as FormArray)
        .at(ind2)
        .get('studentName') as FormArray
    ).push(this.studentList());
  }

  removeStudent(ind1: number, ind2: number, ind3: number) {
    (
      (this.getSchool().at(ind1).get('teacherName') as FormArray)
        .at(ind2)
        .get('studentName') as FormArray
    ).removeAt(ind3);
  }

  onSubmit() {
    let i = 0;
    console.log(this.reactiveForm.controls.schoolName);
  }
}
