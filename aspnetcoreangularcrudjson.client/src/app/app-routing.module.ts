import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './article/view/view.component';
import { ArticleComponent } from './article/article.component';

// Create a routes Array
const routes: Routes = [
  { path: 'view/:id', component: ViewComponent },
  { path: "**", component: ArticleComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
