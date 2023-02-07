export interface BoxFilterInterface {
    countView: number | null,
    lastLikeNum: number | null,
    lastPostId: number | null,
    lastReplyNum: number | null,
    searchTitle: string,
    language: string,
    orderKey: string,
    tags: string[],
    type: string
}