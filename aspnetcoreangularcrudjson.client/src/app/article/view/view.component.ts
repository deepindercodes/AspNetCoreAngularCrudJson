import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Article {
  id: string;
  articletitle: string;
  articleauthor: string;
  articlebody: string;
  articleimage: string;
  createdonutc: string;
  modifiedonutc: string;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public id: string = "";
  public article: Article = {
      id: '',
      articletitle: '',
      articleauthor: '',
      articlebody: '',
      articleimage: '',
      createdonutc: '',
      modifiedonutc: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params) => {
      this.id = params["id"];
      this.getArticle(this.id);
    });
  }

  getArticle(id:string) {
    this.http.get<Article>('api/articles/'+ id).subscribe(
      (result) => {
        this.article = result;
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = this.article.articletitle;
}
