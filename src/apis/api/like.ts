import { instanceWithAuth } from "../common";

interface GetLikeListInterface {
    nickname: string,
    postId: string
}

function getLikeList(path: GetLikeListInterface) {
    return instanceWithAuth.get(`/codebox/${path.nickname}/${path.postId}/like`);
}

export { getLikeList,  }