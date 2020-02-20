import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from '../../core/people.service';
import { ValidationService } from '../../shared/validators.service';


@Component({
    selector: 'add-person',
    templateUrl: 'add-person.component.html',
    styleUrls: ['add-person.component.scss']

})

export class AddPersonComponent implements OnInit {

    addForm: FormGroup;
    @Output() added: EventEmitter<any> = new EventEmitter<any>();
    errorMessage: string;
    loading: boolean = false;
    emailsForm: any;
    ages: number[] = []
    addingLoader: boolean = false;
    get formData() { return <FormArray>this.addForm.get('emails'); }

    constructor(private formBuilder: FormBuilder, private peopleService: PeopleService) { }

    ngOnInit() {
        this.buildForm(); 
    }


    buildForm() { //creaciñon de la form
        
        this.addForm = this.formBuilder.group({
            first_name: ["", [Validators.required,]],
            last_name: ["", [Validators.required]],
            phone: ["", [Validators.required]],
            date_of_birth: ["", [Validators.required]],
            emails: this.formBuilder.array([this.createItem()])
        });
    }

    createItem(): FormGroup {

       /* debido a que se pueden añadir varios correros, la llama de emails
        es un arreglo que puede crecer o reducir dinámicamente */
        return this.formBuilder.group({
            email: ['', ValidationService.emailValidator]
        });
    }

    addEmail() {
        this.emailsForm = this.addForm.get('emails') as FormArray;
        this.emailsForm.push(this.createItem());
    }

    deleteEmail(i: number) {
        this.emailsForm = this.addForm.get('emails') as FormArray;
        this.emailsForm.removeAt(i)
    }


    submitPerson(formValues: any) {

        this.addingLoader = true;

        /* Cada elemento dentro del arreglo es un objeto que contiene dos propiedades:
        1. email (el email de el usuario)
        2. la prioridad que este le da, siendo 1 el más importante
        */
        formValues.email = formValues.emails.filter(email => !!email.email)
            .map((email, i) => {
                return {
                    email: email.email,
                    priority: i + 1
                }
        })

        this.peopleService.newPerson(formValues)
            .subscribe((person: any) => {
                setTimeout(() => {
                    this.addingLoader = false;
                    this.added.emit();
                }, 500);

            }, (err) => {
                this.addingLoader = false;
            })

    }
}

