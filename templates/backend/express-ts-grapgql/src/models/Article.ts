import { Collections } from '../mongodb/mongo-config';
import { getModelData } from '../utils/helpers';

export interface ArticleEntity {
  customerId: string,
  title: string,
  content: string,
  created: number,
}

class Article implements ArticleEntity {
  public static collection = Collections.ARTICLES;

  customerId: string;

  title: string;

  content: string;

  created: number;

  constructor(payload: ArticleEntity) {
    this.customerId = payload.customerId;
    this.title = payload.title;
    this.content = payload.content;
    this.created = payload.created;
  }

  getData(allRequired = false): Partial<ArticleEntity> {
    const data: any = {
      customerId: this.customerId,
      title: this.title,
      content: this.content,
      created: this.created,
    };

    return getModelData<ArticleEntity>(allRequired, data);
  }
}

export default Article;
