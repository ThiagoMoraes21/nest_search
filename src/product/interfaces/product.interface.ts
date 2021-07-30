export type ProductQuery = string | {};

export type ProductSortOptions =
    | -1 
    | 1 
    | 'asc'
    | 'desc'
    | 'ascending' 
    | 'descending';

export interface ProductSearchOptions {
    sort?: ProductSortOptions,
    page?: number,
    limit?: number
}   
    
