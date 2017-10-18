import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { CallBooksProvider } from '../../providers/call-books/call-books';

/**
 * Generated class for the BooksNoReadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-books-no-read',
  templateUrl: 'books-no-read.html',
  providers:[CallBooksProvider]
})
export class BooksNoReadPage extends CallBooksProvider {

  user:Observable<firebase.User>
  books = this.books;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth
  ) {
    super(navCtrl, navParams, db, authFB)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BooksNoReadPage');
  }

}