import { instance, instanceWithAuth } from "../common"

interface getBoxListType {
   // params: {
        countView: number| null;
        language: string | null;
        lastLikeNum: number | null;
        lastPostId: number | null;
        lastReplyNum: number | null;
        orderKey: string | null;
        searchTitle: string | null;
    //}
}

interface headersType {
    accessToken: string
}

function getBoxList(data: getBoxListType, headers: headersType) {
    return instance.get(`/codebox`, {params: data, headers: {
        accessToken: headers.accessToken
    }})
}

export { getBoxList, }