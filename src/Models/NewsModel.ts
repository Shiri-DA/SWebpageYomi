export type NewsModel = {
    id?: number | null,
    headline: string,
    creationDate: string | null | Date,
    url: string,
    reviewed?: boolean
}