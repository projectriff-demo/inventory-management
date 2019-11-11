import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
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
      sku: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      priceInUsd: ['', Validators.required]
    });
  }

  onSubmit(value: any) {
    if (this.creationForm.valid) {
      this.subscription = this.articleService.save(value).subscribe(() => {
        this.router.navigate(['/list'], { replaceUrl: true });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }
}
