import { FilterQuery } from "mongoose";

export type Query = string | string[] | object;
export type Sort = Record<string, 1 | -1>;

export interface IQuery {
	pageNumber?: string;
	quantityPerPage?: string;
	sort?: Record<string, 1 | -1>;
	querySearch?: Query;
}

export interface IQueryFilter {
	pageNumber?: number;
	quantityPerPage?: number;
	sort: Sort & Record<string, 1 | -1>;
	querySearch?: Query;
}

export interface PaginationResult {
	total_pages: number;
	total_records: number;
}

export interface PaginationQuery {
	pageNumber: number;
	quantityPerPage: number;
}

export interface IQueryOptions {
	pagination?: PaginationQuery;
	sort: Record<string, 1 | -1>;
	query: FilterQuery<unknown>;
}
