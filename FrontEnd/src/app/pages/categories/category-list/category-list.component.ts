import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../shared/category.service";
import { Category } from "../shared/category.model";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: []
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  public categories: Category[] = [];

  getCategories() {
    this.categoryService.getAll().subscribe(
      response => {
        this.categories = response;
      }
    );
  }

  deleteCategory(category: Category) {
    const confirmDelet = confirm("Deseja realmente deletar esta categoria?");
    if (confirmDelet === true)
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category)
      );
    else return
  }

}
