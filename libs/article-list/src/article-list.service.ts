import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { ArticleListConfig } from '@angular-ngrx-nx/article-list/src/+state/article-list.interfaces';
import { ArticleData } from '@angular-ngrx-nx/article/src/+state/article.interfaces';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ArticleListService {
  constructor(private apiService: ApiService) {}

  query(config: ArticleListConfig): Observable<any> {
    return this.apiService.get(
      '/articles' + (config.type === 'FEED' ? '/feed' : ''),
      this.toHttpParams(config.filters)
    );
  }

  private toHttpParams(params) {
    return Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}