import { instance, instanceWithAuth } from "../common"

interface getBoxListInterface {
    countView: number| null;
    language: string| null;
    lastLikeNum: number | null;
    lastPostId: number | null;
    lastReplyNum: number | null;
    orderKey: string;
    searchTitle: string|null;
    tags: string[];
    type: string;
}

interface headersType {
    accessToken: string
}

function getMainBoxList(data: getBoxListInterface, headers: headersType) {
    if (headers.accessToken) {
        return instanceWithAuth.post(`/codebox/`, data);
    }
    return instance.post(`/codebox/`, data);
}

function getUserBoxList(nickname: string, data: getBoxListInterface, isMyBox: boolean) {
    return isMyBox ? instanceWithAuth.post(`/codebox/${nickname}`, data) : instance.post(`/codebox/${nickname}`, data);
}

export { getMainBoxList, getUserBoxList }