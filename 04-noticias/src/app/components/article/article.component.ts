import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() index: number;
  @Input() article: Article;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
  ) { }

  ngOnInit() {}

  openArticle() {

    if ( this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create( this.article.url );
      browser.show();
      return;
    }

    window.open( this.article.url, '_blank');
  }

  async onOpenMenu() {

    const normalBts = [
      {
        text: 'Favorito',
        icon: 'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ]

    const share = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };
    
    if ( this.platform.is('capacitor') ) {
      // actionSheet.buttons.unshift(share);
      normalBts.unshift(share);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: normalBts
    });

    await actionSheet.present();
  }

  onShareArticle() {
    console.log('share article');
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    )
  }

  onToggleFavorite() {
    console.log('favorite');
    
  }

}
