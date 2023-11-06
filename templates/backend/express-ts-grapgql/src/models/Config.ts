import { Collections } from '../mongodb/mongo-config';
import { getModelData } from '../utils/helpers';

export interface ConfigEntity {
  customerId: string,
  subjects: string[],
  categories: string[],
  keywords: string[],
}

class Config implements ConfigEntity {
  public static collection = Collections.CONFIG;

  customerId: string;

  subjects: string[];

  categories: string[];

  keywords: string[];

  constructor(payload: ConfigEntity) {
    this.customerId = payload.customerId;
    this.subjects = payload.subjects;
    this.categories = payload.categories;
    this.keywords = payload.keywords;
  }

  getData(allRequired = false): Partial<ConfigEntity> {
    const data: any = {
      customerId: this.customerId,
      subjects: this.subjects,
      categories: this.categories,
      keywords: this.keywords,
    };

    return getModelData<ConfigEntity>(allRequired, data);
  }
}

export default Config;
