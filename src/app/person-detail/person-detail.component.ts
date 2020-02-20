import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../core/people.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';

@Component({
	selector: 'app-person-detail',
	templateUrl: './person-detail.component.html',
	styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

	person: any;
	emails: any[] = [];
	personCopy: any;
	edit: boolean = false;
	saving: boolean = false;

	constructor(private route: ActivatedRoute, private peopleService: PeopleService, private location: Location) {

		//obtener el id de la ruta (id de la persona)
		let id = this.route.snapshot.paramMap.get('id');
		this.person = this.peopleService.getPerson(id) //obtener a la persona mediante el id
	}

	ngOnInit() {

		this.person.age = this.calculateAge(new Date(this.person.date_of_birth))
		this.emails = this.person.emails.concat();
		this.personCopy = Object.assign({}, this.person); //se crea una copia de el objecto original para no afectar a este si se el cliente edita y cancela

	}

	editPerson() {
		this.edit = !this.edit;
	}

	calculateAge(birthday) { // birthday is a date
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch

		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	drop(event: CdkDragDrop<string[]>) {

		//una vez que se suelta el correo en su nueva posicion, se acomoda el arreglo que contiene a estos
		moveItemInArray(this.emails, event.previousIndex, event.currentIndex);
	}


	goBack() {
		this.peopleService.people = []
		this.location.back();
	}


	deletePerson() {
		if (confirm('Deseas dar de baja a ' + this.person.full_name + ' ?')) {

			this.peopleService.people = this.peopleService.people.filter(person => person != this.person._id)
			this.peopleService.deletePerson(this.person._id)
				.subscribe((succeded) => {
					setTimeout(() => {
						this.goBack()
					}, 300);

				})

		} else {
			// Hacer nada
		}
	}

	submitEdit() { //Se corre una vez que el usuario acaba de editar


		//Se crea el nuevo arreglo con los correos actualizados por preferencia
		this.emails = this.emails.map((email, i) => {
			return {
				email: email.email,
				priority: i + 1
			}
		})
		let data = {
			first_name: this.personCopy.first_name,
			last_name: this.personCopy.last_name,
			full_name: this.personCopy.first_name + " " + this.personCopy.last_name,
			phone: this.personCopy.phone,
			date_of_birth: this.personCopy.date_of_birth,
			emails: this.emails
		}

		this.saving = true;
		this.peopleService.updatePerson(this.person._id, data)
			.subscribe((succeded) => {
				setTimeout(() => {
					this.peopleService.people = []
					this.saving = false;
					this.edit = false;

					//si se creo correctamente, se actualiza la persona de forma local
					this.person = Object.assign({_id: this.person._id, age: this.person.age = this.calculateAge(new Date(this.personCopy.date_of_birth)) }, data);
				}, 500);

			})
	}



}
