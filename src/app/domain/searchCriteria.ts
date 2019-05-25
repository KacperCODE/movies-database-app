//TODO implement constructor?

export class SearchCriteria {
    limit: number;
    page: number;
    sortBy: string;
    sortDir: number;

    constructor(limit?, page?, sortBy?, sortDir?) {
        this.limit = limit || 5; 
        this.page = page || 1; 
        this.sortBy = sortBy || 'title'; 
        this.sortDir = sortDir && 1; 
    }
}