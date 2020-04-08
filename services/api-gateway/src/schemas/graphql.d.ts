/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CatalogItem {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
}

export interface IMutation {
  createCatalogItem(): CatalogItem | Promise<CatalogItem>;
  applyProductDiscount(): CatalogItem | Promise<CatalogItem>;
}

export interface IQuery {
  getCatalogItems(): CatalogItem[] | Promise<CatalogItem[]>;
}
