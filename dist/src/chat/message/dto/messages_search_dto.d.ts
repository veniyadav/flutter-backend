export declare class MessagesSearchDto {
    lastId?: string;
    text?: string;
    limit?: number;
    from?: string;
    to?: string;
    isAsc?: string;
    filter?: string;
    getLimit(): number;
    getFilter(): {};
}
