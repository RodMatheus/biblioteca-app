import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { BooksProvider } from '../../providers/books/books';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { DataForSearchPage } from '../data-for-search/data-for-search';
import { BookRegisterPage } from '../book-register/book-register';

/**
 * Generated class for the BookSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-search',
  templateUrl: 'book-search.html',
  providers: [
    AngularFireAuth,
    BooksProvider
  ]
})
export class BookSearchPage {

  public list_books = new Array<any>();
  loading:Loading
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public serviceAuth:AuthProvider,
    public authFB:AngularFireAuth,
    public booksProvider: BooksProvider,
    public ldCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.loading = this.ldCtrl.create({
      content: 'Search...',
      dismissOnPageChange:true
    });
    this.loading.present();
    let _isbn:number = this.navParams.get('isbn');
    let _title:string = this.navParams.get('title');
    let _author:string = this.navParams.get('author')
    //let search = !!isbn ? isbn : !!title ? title : !!autor ? autor : '';
    let search = {
      isbn: _isbn,
      title: _title,
      author: _author
    }
    
    this.booksProvider.getLivro(search)
        .subscribe(data=>{
          const items = data.json();
            !!items ? this.list_books = items.items :'';
            console.log(items)
        },erro=>{
          console.log("Erro na busca",erro);
        })
    }

    public livro = {};
    public redirectToRegister(book:any):any{
      this.livro = book;
      console.log(this.livro);
      console.log(book);
      this.navCtrl.push(BookRegisterPage,this.livro);
    }
    public addToWishList(book:any):any{
      //redirecionar à lista de desejos 
    }
    public buscaAuthor(author:string){
      this.navCtrl.push(BookSearchPage, {"author":author});
    }

}
