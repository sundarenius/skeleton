import type Article from '../models/Article';

export interface ArticleRepository {
  getOne(): Promise<Article | null>;
  create(): Promise<void>;
}
