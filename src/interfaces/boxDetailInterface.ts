export interface BoxDetailInterface {
    title: string,
    nickname: string,
    redate: string,
    likeExisting: boolean,
    likeNum: number | null,
    countView: number | null,
    tags: [],
    type: string,
    language: string,
    level: number | null,
    context: string,
    replyNum: number | null,
    replies: [],
    post_id: number | null,
}

export interface ReplyInterface {
    children: string[],
    content: string,
    nickname: string,
    redate: string,
    reply_id: number,
    title: string
}