export class SearchCriteria {
    startDate: number;
    endDate: number;
    rowLimit: number;
    constructor(rows: number) {
        this.rowLimit = rows;
    }
}