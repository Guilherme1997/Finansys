import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router"

import { Category } from "../shared/category.model";

import { CategoryService } from "../shared/category.service";

import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  providers: [FormBuilder]
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  public currentAction: string;
  public categoryForm: FormGroup;
  public pageTitle: string;
  private serverErrorMessages: string[] = null;
  public submittinForm: boolean = false;
  private category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private formBuildr: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {

  }

  private setPageTitle(pageTitle: string): void {
    this.pageTitle = pageTitle;
  }

  private setCurrentAction(): void {
    let title;
    if (this.activatedRoute.snapshot.url[0].path == "new") {
      this.currentAction = "new";
      title = "Cadastro de Categoria";
      this.setPageTitle(title);
      return;
    }
    this.currentAction = "edit";
    title = "Edição de Categoria";
    this.setPageTitle(title);
  }

  submitForm() {
    this.submittinForm = true;
    if (this.currentAction == "new") {
      this.createCategory();
      return
    }
    this.updateCategory();
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
        () => alert("Ocorreu um erro no servidor, tente mais tarde")
      )
    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.create(category).subscribe(
      () => this.actionsForSuccess(),
      error => this.actionsForError(error)
    )
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category).subscribe(
      () => this.actionsForSuccess(),
      error => this.actionsForError(error)
    );

  }

  private actionsForSuccess() {
    alert("Solicitação processada com sucesso");

    this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
      () => this.router.navigate(["categories"])
    );
  }

  private actionsForError(error) {
    alert("Ocorreu um erro no servidor!");
    if (error.status == 422) {
      this.serverErrorMessages = JSON.parse(error.body).errors
      return
    }

    if(error.status == 404){
      this.serverErrorMessages = ["Problema ao se comunica com o servidor"];
    }
    else{
      this.serverErrorMessages = ["Ocorreu um erro interno no servidor"];
    }

  }

}
