import moment from "moment";
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { deleteReply, getEditReply, postReply, putEditReply } from "../../apis/api/reply";
import { ReplyInterface } from "../../interfaces/boxDetailInterface"
import { RootState } from "../../store/config";
import * as S from './ReplyStyle'
import ButtonAtom from "../atoms/Button";
import Swal from "sweetalert2";

const Reply = ({replies, postId, requestDetailBox, depth}: {replies: ReplyInterface[], postId: string, requestDetailBox: () => void, depth: number}) => {
    const user = useSelector((state: RootState) => state.user);
    const [isRereply, setRereply] = useState<boolean[]>(Array(replies.length).fill(false));
    const [showRereplies, setShowRereplies] = useState<boolean[]>(Array(replies.length).fill(false));
    const [editReplies, setEditReplies] = useState<boolean[]>(Array(replies.length).fill(false));
    const [editReplyInputs, setEditReplyInputs] = useState('');
    const [RereplyInputs, setRereplyInputs] = useState('')

    const calcDateDiff = (replyDate: string) => {
        const now = moment();
        const reply = moment(replyDate);
        
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
    
    const requestAddRereply = async (parent_id: number, idx: number) => {
        const body = {
            nickname: user.nickname,
            postId,
            replySaveForm: {
                content: RereplyInputs,
                parent_id,
            }
        }

        try {
            const response = await postReply(body);
            const {status} = response.data;

            if (status === '200') {
                requestDetailBox();
                let newRereply = [...isRereply];
                newRereply[idx] = !newRereply[idx];
                setRereply(newRereply);
                setRereplyInputs('');
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const requestGetEditReply = async (idx: number, replyId: number) => {
        let newEditReplies = [...editReplies];
        newEditReplies[idx] = !newEditReplies[idx];
        setEditReplies(newEditReplies);

        const path = {
            nickname: user.nickname,
            postId,
            replyId: String(replyId)
        }
        try {
            const response = await getEditReply(path);
            const {status, data} = response.data;
			
            if (status === '200') {
                setEditReplyInputs(data.content);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const requestPutEditReply = async (replyId: string, idx: number) => {
        const path = {
            nickname: user.nickname,
            postId,
            replyId: String(replyId),
			body: {
				content: editReplyInputs
			}
        }

		try {
            const response = await putEditReply(path);
            const {status} = response.data;
            
            if (status === '200') {
                requestDetailBox();
                let newEditReplies = [...editReplies];
                newEditReplies[idx] = !newEditReplies[idx];
                setEditReplies(newEditReplies);
            }
		}
		catch (err) {
            console.log(err);
		}
    }

    const checkDeleteReply = (replyId: string) => {
        Swal.fire({
            title: '댓글 삭제',
            text: '댓글을 정말로 삭제하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: '네',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isDismissed) {
                return
            }
            else if (result.isConfirmed) {
                requestDeleteReply(replyId);
            }
        })
    }

    const requestDeleteReply = async (replyId: string) => {
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

                Swal.fire({
                    title: '완료',
                    text: '댓글이 삭제되었습니다.',
                    icon: 'success',
                })
            }
        }
        catch (err) { 
            console.log(err)
        }
    }
    
    const showHandler = (idx: number, show: boolean[], setShow: React.Dispatch<React.SetStateAction<boolean[]>>) => {
        let newShow = Array(replies.length).fill(false);
        newShow[idx] = !show[idx];
        setShow(newShow);
        setEditReplyInputs('');
        setRereplyInputs('');
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
							{/* 유저 닉네임 === 댓글 닉네임 => 댓글 수정,삭제 버튼 */}
							{
							user.nickname === item.nickname &&
							(
							<>
							<button onClick={() => {requestGetEditReply(idx, item.reply_id)}}>수정</button>
							<button onClick={() => {checkDeleteReply(String(item.reply_id))}}>삭제</button>
							</>
							)
							}
                            </S.ReplySetting>
                            </S.DetailBoxReplyContainer>
                            {/* 댓글 수정 버튼 클릭 => 댓글 수정 컴포넌트 */}
                            {
                            editReplies[idx] ?
                            <S.RereplyContainer>
                                <textarea onChange={(e)=>{setEditReplyInputs(e.target.value)}} value={editReplyInputs}/>
                                <S.RereplyButtonWrapper>
                                    <ButtonAtom color='black' handler={()=>{requestPutEditReply(String(item.reply_id), idx)}} width='100px'>댓글 수정</ButtonAtom>
                                    <ButtonAtom color='white' handler={()=>{showHandler(idx, editReplies, setEditReplies)}} width='100px'>취소</ButtonAtom>
                                </S.RereplyButtonWrapper>
                            </S.RereplyContainer>
                            :
                            <S.DetailBoxReplyContent>{item.content}</S.DetailBoxReplyContent>
                            }
                            {/* 
							대댓글 있음 => 답글보기 버튼 
							대댓글 없음 => 답글작성 버튼(단, isRereply가 true일 때)
							*/}
                            {
                            depth <= 2 && (
                                item.children.length ?
                                (
                                <S.RereplyButton>
                                    <span  onClick={()=>{showHandler(idx, showRereplies, setShowRereplies)}}>
                                    + {item.children.length}개의 답글
                                    </span>
                                </S.RereplyButton>
                                ) :
                                (
                                    isRereply[idx] ?
                                    (
                                    <S.RereplyButton>
                                        <span onClick={()=>{showHandler(idx, isRereply, setRereply)}}>
                                        - 숨기기
                                        </span>
                                    </S.RereplyButton>
                                    )
                                    :
                                    (
                                    <S.RereplyButton>
                                        <span onClick={()=>{showHandler(idx, isRereply, setRereply)}}>
                                        + 답글 달기
                                        </span>
                                    </S.RereplyButton>
                                    )
                                )
                            )
                            }
                            {/* 답글보기 버튼 클릭 => 답글 리스트 컴포넌트 */}
                            {
                            !!(item.children.length && showRereplies[idx]) &&
                            (
                                <S.RereplyBox>
                                    <Reply replies={item.children} postId={postId} requestDetailBox={requestDetailBox} depth={depth+1}></Reply>
                                    {
                                        depth <= 2 && (
                                            <S.Rereplybutton onClick={() => {showHandler(idx, isRereply, setRereply)}}>답글 작성</S.Rereplybutton>
                                        )
                                    }
                                </S.RereplyBox>
                            )
                            }
                            {/* 답글작성 버튼 클릭 => 답글 작성 컴포넌트 */}
                            {
                            isRereply[idx] && (
                                <S.RereplyBox>
                                    <S.RereplyContainer>
                                        <textarea placeholder="답글을 작성하세요" onChange={(e)=>{setRereplyInputs(e.target.value)}} value={RereplyInputs}/>
                                        <S.RereplyButtonWrapper>
                                            <ButtonAtom color='black' handler={()=>{requestAddRereply(item.reply_id, idx)}} width='130px'>답글 작성</ButtonAtom>
                                            <ButtonAtom color='white' handler={()=>{showHandler(idx, isRereply, setRereply)}} width='130px'>취소</ButtonAtom>
                                        </S.RereplyButtonWrapper>
                                    </S.RereplyContainer>
                                </S.RereplyBox>
                            )
                            }
                    </div>
                ))
            }
        </S.DetailBoxRepliesBox>
    )
}

export default Reply