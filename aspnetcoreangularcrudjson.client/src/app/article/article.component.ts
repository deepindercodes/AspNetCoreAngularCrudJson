import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public articles: Article[] = [];
  public domarticleimage?: string = "";
  @ViewChild('closebuttonAdd') closebuttonAdd: any;
  @ViewChild('closebuttonEdit') closebuttonEdit: any;
  public editarticle: Article = {
    id: '',
    articletitle: '',
    articleauthor: '',
    articlebody: '',
    articleimage: '',
    createdonutc: '',
    modifiedonutc: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getArticles();

    //https://www.itsolutionstuff.com/post/angular-ngmodel-example-ngmodel-directive-in-angular-9-8example.html
  }

  getArticles() {
    this.http.get<Article[]>('api/articles').subscribe(
      (result) => {
        this.articles = result;
        this.domarticleimage = "";
      },
      (error) => {
        console.error(error);
      }
    );
  }

  readFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.domarticleimage = e.target?.result?.toString();
      }
      fileReader.readAsDataURL(fileList[0]);
    }
  }

  clearAddForm() {
    (<HTMLFormElement>document.getElementById("myForm")).reset();
    this.domarticleimage = "";
  }

  onSubmit(myForm: NgForm) {
    
    let hiddentImage = document.getElementById('articleimage') as HTMLInputElement;
    if (myForm.valid) {
      let newArticle: Article = {
        id: '',
        articletitle: myForm.value.articletitle,
        articleauthor: myForm.value.articleauthor,
        articlebody: myForm.value.articlebody,
        articleimage: hiddentImage.value,
        createdonutc: '',
        modifiedonutc: ''

      }
      //console.log(newArticle);

      this.http.post<Article>('api/articles', newArticle).subscribe(data => {
        this.getArticles();
      },
        (error) => {
          //console.error(error);
          //this.closebuttonAdd.closebuttonEdit.click();
          this.getArticles();
        })

      this.closebuttonAdd.nativeElement.click();

      
    }
    else {
      alert('Missing Values');
    }
  }

  getEdit(id: string) {
    this.editarticle = {
      id: '',
      articletitle: '',
      articleauthor: '',
      articlebody: '',
      articleimage: '',
      createdonutc: '',
      modifiedonutc: ''

    }
    this.domarticleimage = "";
    this.http.get<Article>('api/articles/' + id).subscribe(
      (result) => {
        this.editarticle = result;
        this.domarticleimage = this.editarticle.articleimage;
      },
      (error) => {
        //console.error(error);
        this.closebuttonAdd.closebuttonEdit.click();
        alert('Error fetching article');
      }
    );
  }

  onSubmitEdit(myForm: NgForm) {

    let hiddentImage = document.getElementById('articleimage') as HTMLInputElement;
    if (myForm.valid) {
      let editArticle: Article = {
        id: myForm.value.id,
        articletitle: myForm.value.articletitle,
        articleauthor: myForm.value.articleauthor,
        articlebody: myForm.value.articlebody,
        articleimage: hiddentImage.value,
        createdonutc: '',
        modifiedonutc: ''

      }
      //console.log(newArticle);

      this.http.put<Article>('api/articles/' + myForm.value.id, editArticle).subscribe(data => {
        this.getArticles();
      },
        (error) => {
          //console.error(error);
          //this.closebuttonAdd.closebuttonEdit.click();
          this.getArticles();
        })

      this.closebuttonEdit.nativeElement.click();

      
    }
    else {
      //alert('Missing Values');
    }
  }

  confirmDelete(id: string) {
    this.domarticleimage = "";
    let objConfirm = confirm('Are you sure you want to delete this article?');
    if (objConfirm) {
      this.http.delete<Article>('api/articles/' + id).subscribe(
        (result) => {
          this.getArticles();
      },
      (error) => {
        //console.error(error);
        //alert('Error delete article');
        this.getArticles();
      }
    );
    }
  }

  title = 'CRUD';
}
