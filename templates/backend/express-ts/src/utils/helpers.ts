import puppeteer from 'puppeteer';
import { Brands, ProductBasicData, Stores } from '@goozt/shared/shared';
import type { ProductBasicDataInterface } from '@goozt/shared/shared';
import { v4 as uuidv4 } from 'uuid';

type PromiseProductBasicDataInterface = Promise<Array<Partial<ProductBasicDataInterface>>>

export const tryCatch = async (callback: any, msg: any) => {
  try {
    const result = await callback();
    return result;
  } catch (err: any) {
    return { errorMessage: err.message, err, msg };
  }
};

export const fetchWebsite = async (url: string, evaluateCallback: any, store: Stores) => {
  console.log('Crawling following url:');
  console.log(url);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  const allData = await evaluateCallback(page);

  await browser.close();

  const dataByBrands = allData.filter((val: any) =>
    Brands.some((brand: any) => val.title.toLowerCase().includes(brand.toLowerCase())))
    .map((val: any) => {
      const brand = Brands.find((b: any) => val.title.toLowerCase().includes(b.toLowerCase()));

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return getProductBasicData({
        ...val,
        [ProductBasicData.BRAND]: brand,
        [ProductBasicData.STORE]: store,
      });
    });

  return dataByBrands;
};

type FetchStore = (
  url: string,
  callback: (page: any) => PromiseProductBasicDataInterface,
) => Promise<Array<ProductBasicDataInterface>>

export const fetchStore: Record<Stores, FetchStore> = {
  [Stores.SECOND_HAND]: (url, callback) => tryCatch(
    () => fetchWebsite(url, callback, Stores.SECOND_HAND),
    `Error while fetching from ${Stores.SECOND_HAND}`,
  ),
  [Stores.SELLPY]: (url, callback) => tryCatch(
    () => fetchWebsite(url, callback, Stores.SELLPY),
    `Error while fetching from ${Stores.SELLPY}`,
  ),
};

const getProductBasicData = (params: any): ProductBasicDataInterface => ({
  [ProductBasicData.IMG]: params[ProductBasicData.IMG] || 'img',
  [ProductBasicData.TITLE]: params[ProductBasicData.TITLE] || 'title',
  [ProductBasicData.PRICE]: params[ProductBasicData.PRICE] || 0,
  [ProductBasicData.URL_TO_PRODUCT]: params[ProductBasicData.URL_TO_PRODUCT] || 'urlToProduct',
  [ProductBasicData.STORE]: params[ProductBasicData.STORE] || 'store',
  [ProductBasicData.BRAND]: params[ProductBasicData.BRAND] || 'brand',
  [ProductBasicData.ID]: params[ProductBasicData.ID] || 'id',
  [ProductBasicData.UUID]: uuidv4(),
  [ProductBasicData.ADDED_TO_PROD]: false,
  [ProductBasicData.DESCRIPTION]: params[ProductBasicData.DESCRIPTION] || 'no description',
});

export const secondHandDomCallback = async (
  page: any,
// eslint-disable-next-line no-return-await
): PromiseProductBasicDataInterface => {
  const res = await page.evaluate(() => {
    /** ***** SHOULD BE ABLE TO HAVE THIS WORK FROM DEVTOOLS CONSOLE BROWSER (Witin a function) ****** */
    const allProducts = document.querySelectorAll('#product-list-ul > li > div');
    const allProductsArr = Array.from(allProducts);

    const productsData = allProductsArr.map((product: any) => {
      const title = product.querySelector('h3').innerText;
      const price = Number(
        product.querySelector('.price-info').innerText.split(' ')[0]
          .trim().replace(/\s+/g, ''),
      );
      const urlToProduct = product.querySelector('a').href;
      const img = product.querySelector('img').src;

      return {
        img,
        title,
        price,
        urlToProduct,
        id: `${price}-${title}-${urlToProduct}`,
        description: title,
      };
    });

    return productsData;
    /** ***** SHOULD BE ABLE TO HAVE THIS WORK FROM DEVTOOLS CONSOLE BROWSER (Witin a function) ****** */
  });
  return res;
};

export const getSellpyProducts = async (
  page: any,
// eslint-disable-next-line no-return-await
): PromiseProductBasicDataInterface => {
  const res = await page.evaluate(() => {
    /** ***** SHOULD BE ABLE TO HAVE THIS WORK FROM DEVTOOLS CONSOLE BROWSER (Witin a function) ****** */
    const allProducts = document.querySelectorAll('article');
    const allProductsArr = Array.from(allProducts);

    if (allProductsArr.length > 0) {
      const productsData = allProductsArr.map((product: any) => {
        if (!product || product.innerHTML.includes('Skicka köpförfrågan')) return null;
        const title = product.querySelector('h2').innerText;
        const price = Number(
          product.querySelector('div:nth-child(3)')
            .innerText.split('SEK')[0].trim().replace(/\s+/g, ''),
        );
        const urlToProduct = product.querySelector('a').href;
        const img = product.querySelector('img') ? product.querySelector('img').src : '';
        const description = product.querySelector('div:nth-child(3) p:nth-child(2)').innerText;

        return {
          img,
          title,
          price,
          urlToProduct,
          id: `${price}-${title}-${urlToProduct}`,
          description,
        };
      }).filter((val) => val);

      return productsData;
    }

    return [];
    /** ***** SHOULD BE ABLE TO HAVE THIS WORK FROM DEVTOOLS CONSOLE BROWSER (Witin a function) ****** */
  });
  return res;
};

const shuffleArray = (array: any[]) => {
  const cloneArr = [...array];
  for (let i = cloneArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloneArr[i], cloneArr[j]] = [cloneArr[j], cloneArr[i]];
  }
  return cloneArr;
};

export const addBrandsQuerysSellpy = () =>
  shuffleArray(Brands).map((brand) => brand.replace(/ /g, '+')).join('&brand=');
