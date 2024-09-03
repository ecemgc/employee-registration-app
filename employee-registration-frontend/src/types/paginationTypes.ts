export interface Pagination {
    pageNumber: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    isLast: boolean;
}

export interface ResponsePage<T>{
    content: T[],
    pageNumber: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    isLast: boolean;
}

export interface RequestPage {
    page: number;
    size: number;
    sortBy: string;
    direction: "ASC" | "DESC";
  }
