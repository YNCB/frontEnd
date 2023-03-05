import { instanceWithAuth } from "../common";

interface PostReplyInterface {
    nickname: string,
    postId: string,
    replySaveForm: {
        content: string,
        parent_id: number | null,
    }
}

interface DeleteAndEditReplyInterface {
    nickname: string,
    postId: string,
    replyId: string
}

interface PutEditReplyInterface extends DeleteAndEditReplyInterface {
    body: {
        content: string,
    }
}

function postReply (body: PostReplyInterface) {
    return instanceWithAuth.post(`/codebox/${body.nickname}/${body.postId}/reply/add`, body.replySaveForm)
}

function getEditReply (path: DeleteAndEditReplyInterface) {
    return instanceWithAuth.get(`/codebox/${path.nickname}/${path.postId}/reply/${path.replyId}`)
}

function putEditReply (path: PutEditReplyInterface) {
    return instanceWithAuth.put(`/codebox/${path.nickname}/${path.postId}/reply/${path.replyId}`, path.body)
}

function deleteReply (path: DeleteAndEditReplyInterface) {
    return instanceWithAuth.delete(`/codebox/${path.nickname}/${path.postId}/reply/${path.replyId}`)
}

export { postReply, getEditReply, putEditReply, deleteReply }