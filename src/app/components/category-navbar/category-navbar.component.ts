import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/domain/models/response-models/categories/categories-response';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
})
export class CategoryNavbarComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Output() changeActiveCategory: EventEmitter<string> = new EventEmitter();
  public activeCategory!: string;
  constructor() { }

  ngOnInit(): void {
    this.initialActiveCategory();
  }

  private initialActiveCategory() {
    if (this.categories.length > 0) {
      this.activeCategory = this.categories[0].id;
      console.log('initiated and emitting', this.activeCategory)
      this.changeActiveCategory.emit(this.activeCategory);
    }
  }

  public changeCategory(id: string) {
    this.activeCategory = id;
    this.changeActiveCategory.emit(this.activeCategory);
  }
}
