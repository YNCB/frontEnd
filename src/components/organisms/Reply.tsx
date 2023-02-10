import moment from "moment";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { deleteReply, postReply } from "../../apis/api/reply";
import { ReplyInterface } from "../../interfaces/boxDetailInterface"
import { RootState } from "../../store/config";
import * as S from './ReplyStyle'
import ButtonAtom from "../atoms/Button";

const Reply = ({replies, postId, requestDetailBox}: {replies: ReplyInterface[], postId: string, requestDetailBox: () => void}) => {
    console.log(replies);
    const user = useSelector((state: RootState) => state.user);
    const [isRereply, setRereply] = useState<boolean[]>(Array(replies.length).fill(false));
    const [showRereply, setShowRereply] = useState<boolean[]>(Array(replies.length).fill(false));
    const [replyInputs, setReplyInputs] = useState('')

    useEffect(() => {
        console.log(isRereply);
    }, [])

    const calcDateDiff = (replyDate: string) => {
        const now = moment();
        const reply = moment(replyDate);
        console.log(now, reply)
        console.log(now.diff(reply, 'days'))
        if (now.diff(reply, 'years') > 0) {
            return `${now.diff(reply, 'years')}년 전`
        }
        else if (now.diff(reply, 'months') > 0) {
            return `${now.diff(reply, 'months')}달 전`
        }
        else {
            return `${now.diff(reply, 'days')}일 전`
        }
    }
    
    const requestAddRereply = async () => {
        const body = {
            nickname: user.nickname,
            postId,
            replySaveForm: {
                content: 'asdzcx',
                parent_id: null,
                title: 'title'
            }
        }

        try {
            const response = await postReply(body);
            const {status} = response.data;

            if (status === '200') {
                requestDetailBox();
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const requestDeleteApply = async (replyId: string) => {
        const body = {
            nickname: user.nickname,
            postId,
            replyId
        }

        try {
            const response = await deleteReply(body);
            const {status} = response.data;

            if (status === '200') {
                requestDetailBox();
            }
        }
        catch (err) { 
            console.log(err)
        }
    }

    return (
        <S.DetailBoxRepliesBox>
            {
                replies.map((item: ReplyInterface, idx) => (
                    <div key={item.reply_id}>
                        <S.DetailBoxReplyContainer>
                            <S.ReplyInfo>
                                <span>{item.nickname}</span>
                                <span>{calcDateDiff(item.redate)}</span>
                            </S.ReplyInfo>
                            <S.ReplySetting>
                                {
                                user.nickname === item.nickname &&
                                (
                                <>
                                <button>수정</button>
                                <button onClick={() => {requestDeleteApply(String(item.reply_id))}}>삭제</button>
                                </>
                                )
                                }
                            </S.ReplySetting>
                        </S.DetailBoxReplyContainer>
                        <S.DetailBoxReplyContent>{item.content}</S.DetailBoxReplyContent>
                        {
                            item.children.length ?
                            (
                            <S.RereplyButton>
                                <span  onClick={()=>{
                                    let newShowRereply = [...showRereply];
                                    newShowRereply[idx] = !newShowRereply[idx];
                                    setShowRereply(newShowRereply)
                                }}>
                                + {item.children.length}개의 답글
                                </span>
                            </S.RereplyButton>
                            ) :
                            (
                            isRereply[idx] ?
                            (
                            <S.RereplyButton>
                                <span onClick={()=>{
                                    let newIsRereply = [...isRereply];
                                    newIsRereply[idx] = !newIsRereply[idx];
                                    setRereply(newIsRereply)
                                }}>
                                  - 숨기기
                                </span>
                            </S.RereplyButton>
                            )
                            :
                            (
                            <S.RereplyButton>
                                <span onClick={()=>{
                                    let newIsRereply = [...isRereply];
                                    newIsRereply[idx] = !newIsRereply[idx];
                                    setRereply(newIsRereply)
                                }}>
                                   + 답글 달기
                                </span>
                            </S.RereplyButton>
                            )
                        )
                        }
                        {
                            !!(item.children.length && showRereply[idx]) &&
                            (
                                <div></div>
                            )
                        }
                        {
                        isRereply[idx] && (
                            <S.RereplyContainer>
                                <textarea placeholder="답글을 작성하세요" onChange={()=>{}}>

                                </textarea>
                                <ButtonAtom color='black' handler={()=>{requestAddRereply()}} width='130px'>답글 작성</ButtonAtom>
                            </S.RereplyContainer>
                        )
                        }
                    </div>
                ))
            }
        </S.DetailBoxRepliesBox>
    )
}

export default Reply