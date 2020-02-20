import { Component, OnInit, OnDestroy } from '@angular/core';
import { PeopleService } from '../core/people.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	toggleForm: boolean = false;
	skip: number = 0;
	searchInput: string;
	searchInputChanged: Subject<string> = new Subject<string>();
	searchInputChangeSubscription: Subscription
	notFound: boolean = false;
	searching: boolean = false;


	constructor(public peopleService: PeopleService) { }

	ngOnInit() {

		//crear observable y subscribirse al input del searchbox 
		this.searchInputChangeSubscription = this.searchInputChanged
			.pipe(
				debounceTime(600), //esperar 600ms despues de que el cliente deja de escribir para ejecutar la función
				distinctUntilChanged()
			)
			.subscribe(newText => {
				this.searchInput = newText;  
				this.notFound = false;
				if(newText.length == 0) return this.peopleService.people = []; //se el usuario borra todo en el searchbox
				this.searchPersonByEmail(newText); 
			});
	}


	searchPersonByEmail(searchInput: string) {
		this.searching = true;
		this.peopleService.searchPersonByEmail(searchInput)
			.subscribe((people: any) => {
				setTimeout(() => {
					if (people.length == 0) this.notFound = true;
					this.searching = false;
					this.peopleService.people = people; //asignar personas al arreglo 
				}, 300);
				

			},
				(err) => {
					this.searching = false;
				})
	}

	ngOnDestroy() {
		this.searchInputChangeSubscription.unsubscribe();
	  }

	showForm() {
		this.toggleForm = !this.toggleForm
	}

	
	added() {
		this.toggleForm = false;
	}


}
