export class SearchCriteria {
    startDate: object;
    endDate: object;
    rowLimit: number;
    constructor(rows: number) {
        this.rowLimit = rows;
    }
}