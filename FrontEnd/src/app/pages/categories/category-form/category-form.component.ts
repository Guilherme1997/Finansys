import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router"

import { Category } from "../shared/category.model";

import { CategoryService } from "../shared/category.service";

import { switchMap } from "rxjs/operators"


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  providers: [FormBuilder]
})
export class CategoryFormComponent implements OnInit {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittinForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuildr: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }


  private setPageTitle(pageTitle: string): void {
    const categoryName = this.category.name || "";
    this.pageTitle = pageTitle + " " + categoryName;
  }

  private setCurrentAction(): void {
    let title;
    if (this.activatedRoute.snapshot.url[0].path == "new") {
      this.currentAction = "new";
      title = "Cadastro de Nova Categoria";
      this.setPageTitle(title);
      return;
    }
    this.currentAction = "edit";
    title = "Edição de nova Categoria:";
    this.setPageTitle(title);
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuildr.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  private loadCategory() {
    if (this.currentAction == "edit") {
      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category
          this.categoryForm.patchValue(this.category)
        },
        (error) => alert("Ocorreu um erro no servidor, tente mais tarde")
      )
    }
  }

}
