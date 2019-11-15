import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {ArticleService} from './article.service';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit, OnDestroy {

  creationForm;

  private subscription: Subscription = null;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.creationForm = this.formBuilder.group({
      sku: ['', [
        Validators.required,
        ArticleCreationComponent.notBlank
      ]],
      name: ['', [
        Validators.required,
        ArticleCreationComponent.notBlank
      ]],
      description: ['', [
        Validators.required,
        ArticleCreationComponent.notBlank
      ]],
      priceInUsd: ['', [
        Validators.required,
        Validators.min(0.01)
      ]],
      imageUrl: [''],
      quantity: ['', [
        Validators.required,
        Validators.pattern(/^(0|[1-9]\d*)$/),
        Validators.max(Math.pow(2, 31) - 1)
      ]],
    });
  }

  onSubmit(value: any) {
    if (this.creationForm.valid) {
      this.subscription = this.articleService.save(value).subscribe(() => {
        this.router.navigate(['/list'], {replaceUrl: true});
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }

  static notBlank(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.trim().length > 0) {
      return null;
    }
    return {'notblank': value};
  }
}
