import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input() person: any;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }


  goToDetail() {
    this.router.navigate(['/people/', this.person._id]);
  }

}
