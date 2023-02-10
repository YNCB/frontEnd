import { instance, instanceWithAuth } from "../common";

interface PostReplyInterface {
    nickname: string,
    postId: string,
    replySaveForm: {
        content: string,
        parent_id: number | null,
        title: string
    }
}

interface DeleteReplyInterface {
    nickname: string,
    postId: string,
    replyId: string
}

function postReply (body: PostReplyInterface) {
    return instanceWithAuth.post(`/codebox/${body.nickname}/${body.postId}/reply/add`, body.replySaveForm)
}

function deleteReply (path: DeleteReplyInterface) {
    return instanceWithAuth.delete(`/codebox/${path.nickname}/${path.postId}/reply/${path.replyId}`)
}

export { postReply, deleteReply }