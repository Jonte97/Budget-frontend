import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() text!: string;
  @Input() link!: string;

  constructor(private router: Router) { }

  public navigate(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit(): void { }
}
