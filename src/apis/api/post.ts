import { instance, instanceWithAuth } from "../common"

interface getBoxListType {
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

function getBoxList(data: getBoxListType, headers: headersType) {
    if (headers.accessToken) {
        return instanceWithAuth.post(`/codebox/`, data);
    }
    return instance.post(`/codebox/`, data);
}

export { getBoxList, }