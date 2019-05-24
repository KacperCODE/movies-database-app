//TODO implement constructor?

export class SearchCriteria {
    limit: number;
    page: number;
    sortBy: string;
    sortDir: number;

    constructor(limit?, page?, sortBy?, sortDir?) {
        this.limit = limit || null; 
        this.page = page || null; 
        this.sortBy = sortBy || 'title'; 
        this.sortDir = sortDir || 1; 
    }
}