import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ItemService} from './item.service';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-creation',
  templateUrl: './item-creation.component.html',
  styleUrls: ['./item-creation.component.scss']
})
export class ItemCreationComponent implements OnInit, OnDestroy {

  creationForm;

  private subscription: Subscription = null;

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
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
      this.subscription = this.itemService.save(value).subscribe(() => {
        this.router.navigate(['/'], { replaceUrl: true });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
  }
}
