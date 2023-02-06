export interface FilterListInterface {
    filterList: {
        id: number,
        title: string,
        key: string,
        filtering: {
            id: number,
            name: string,
            value: string,
        }[];
    }[]
}