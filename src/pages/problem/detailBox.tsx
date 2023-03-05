import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from './detailBoxStyle'
import { deleteMyBox, getDetailBox, postLike } from "../../apis/api/post";
import { RootState } from "../../store/config";
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { BoxDetailInterface } from "../../interfaces/boxDetailInterface";
import ButtonAtom from "../../components/atoms/Button";
import { postReply } from "../../apis/api/reply";
import Swal from "sweetalert2";
import Reply from "../../components/organisms/Reply";
import LikeList from "../../components/organisms/LikeList";

const DetailBox = () => {
    const user = useSelector((state: RootState) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const {nickname, postId} = location.state as {nickname: string, postId: string};
    const [isMyBox,] = useState(user.nickname === nickname);
    const [postInfo, setPostInfo] = useState<BoxDetailInterface>({
        title: "",
        nickname: "",
        redate: "",
        likeExisting: false,
        likeNum: null,
        countView: null,
        tags: [],
        type: "ALONE",
        language: "",
        level: null,
        problem_uri: '',
        context: "",
        replyNum: null,
        replies: [

        ],
        post_id: null,
    });
    const {title, redate, likeNum, likeExisting, countView, tags, type, language, level, problem_uri, context, replyNum, replies} = postInfo;
    const [replyInputs, setReplyInputs] = useState('')
    const [showLikeList, setShowLikeList] = useState(false);
     
    useEffect(() => {
        requestDetailBox();
    }, [])

    const requestDetailBox = useCallback( async () => {
        const token = user.accessToken ? true : false;
        try {
            const response = await getDetailBox({nickname, postId}, token);
            const {status, data} = response.data;
            
            if (status === '200') {
                setPostInfo(data);
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    const requestDeleteBox = async () => {
        try{
            const response = await deleteMyBox({nickname, postId})
            const {status} = response.data;

            if (status === '200') {
                Swal.fire({
                    title: '완료',
                    text: '게시글 삭제가 완료되었습니다.',
                    icon: 'success'
                })
                .then(()=>{
                    navigate('/userbox', {state: {nickname: user.nickname}})
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const requestLike = async () => {
        try {
            const response = await postLike({nickname: user.nickname, postId});
            const {status, data} = response.data;
            
            if (status === '200') {
                setPostInfo({
                    ...postInfo,
                    likeExisting: data.existing,
                    likeNum: data.num
                })
            } 
        }
        catch (err) {
            console.log(err)
        }
    }

    const requestAddReply = async () => {
        const body = {
            nickname: user.nickname,
            postId,
            replySaveForm: {
                content: replyInputs,
                parent_id: null,
            }
        }

        try {
            const response = await postReply(body);
            const {status} = response.data;

            if (status === '200') {
                requestDetailBox();
                setReplyInputs('');
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <S.DetailBoxContainer>
                <S.DetailBoxSection>
                    <S.DetailBoxHeaderContainer>
                        <S.DetailBoxTItle>{title}</S.DetailBoxTItle>
                        <S.DetailBoxHeaderInfoContainer>
                            <S.DetailBoxHeaderInfo>
                                <span>{nickname} | </span>
                                <span>{redate} | </span>
                                <span onClick={() => isMyBox && setShowLikeList(true)}>
                                    <img src="/assets/img/heart.svg" alt={'좋아요'}/>
                                    {likeNum}
                                </span>
                            </S.DetailBoxHeaderInfo>
                            <S.DetailBoxSetting>
                                {!!isMyBox && (
                                    <>
                                        <button onClick={()=>{navigate('/postBox', {state: {isEdit: true, postId: postId}})}}><span>수정</span></button>
                                        <button onClick={requestDeleteBox}><span>삭제</span></button>
                                    </>
                                )}
                            </S.DetailBoxSetting>
                        </S.DetailBoxHeaderInfoContainer>
                    </S.DetailBoxHeaderContainer>
                    <S.DetailBoxInfoContainer>
                        <S.DetailBoxInfoListContainer>
                            <S.DetailBoxInfoList>
                                <p>태그</p>
                                <S.DetailBoxTags>
                                    {tags.map((item,idx) => (
                                        <p key={idx}>#{item}</p>
                                    ))}
                                </S.DetailBoxTags>
                            </S.DetailBoxInfoList>
                            <S.DetailBoxInfoList>
                                <p>문제 분류</p>
                                <p>{type === 'ALONE' ? '혼자 푼 문제' : '보고 푼 문제'}</p>
                            </S.DetailBoxInfoList>
                            <S.DetailBoxInfoList>
                                <p>사용 언어</p>
                                <p>{language}</p>
                            </S.DetailBoxInfoList>
                            <S.DetailBoxInfoList>
                                <p>난이도</p>
                                <p>{level}</p>
                            </S.DetailBoxInfoList>
                            <S.DetailBoxInfoList>
                                <p>문제 링크</p>
                                <a href={`${problem_uri}`} target='_blank' rel="noreferrer">{problem_uri}</a>
                            </S.DetailBoxInfoList>
                        </S.DetailBoxInfoListContainer>
                    </S.DetailBoxInfoContainer>
                    <S.DetailBoxContentContainer>
                        <h3>풀이</h3>
                        {context && (
                        <Viewer initialValue={context && context}/>
                        )}
                    </S.DetailBoxContentContainer>
                    <S.DetailBoxLikesRepliesContainer>
                        <S.DetailBoxLikesContainer>
                            <S.DetailBoxLikes onClick={requestLike}>
                            {
                                likeExisting ?
                                <svg width="38" height="33" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0534 3.24444L10.411 3.5867L10.7568 3.23264C10.8899 3.09647 11.0177 2.96379 11.1419 2.83499C12.3287 1.60377 13.1748 0.726081 14.8984 0.530692C16.6971 0.329809 18.4321 1.1338 19.4859 2.438C20.53 3.73005 20.8924 5.49188 19.9925 7.25341L19.9924 7.25352C19.462 8.29243 18.3541 9.57013 17.0721 10.8711L17.072 10.8712C16.1897 11.767 15.2619 12.6382 14.4174 13.4313C13.9151 13.903 13.4422 14.3471 13.0258 14.7523C13.0258 14.7523 13.0258 14.7523 13.0258 14.7523L10.3956 17.3111L8.28668 15.3204C7.79962 14.8604 7.27445 14.3908 6.73368 13.9073C5.58809 12.883 4.37243 11.796 3.3005 10.6044C1.73044 8.85895 0.581875 7.00237 0.503069 5.00338C0.408 2.29452 2.57027 0.519937 5.16667 0.552219C6.33448 0.567774 7.13988 0.856367 7.84696 1.31273C8.46878 1.71406 9.01526 2.24225 9.67854 2.88332C9.79924 2.99998 9.92382 3.12039 10.0534 3.24444Z" fill="#ED1B24" stroke="black"/>
                                </svg>
                                :
                                <svg width="38" height="33" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0534 3.24444L10.411 3.5867L10.7568 3.23264C10.8899 3.09647 11.0177 2.96379 11.1419 2.83499C12.3287 1.60377 13.1748 0.726081 14.8984 0.530692C16.6971 0.329809 18.4321 1.1338 19.4859 2.438C20.53 3.73005 20.8924 5.49188 19.9925 7.25341L19.9924 7.25352C19.462 8.29243 18.3541 9.57013 17.0721 10.8711L17.072 10.8712C16.1897 11.767 15.2619 12.6382 14.4174 13.4313C13.9151 13.903 13.4422 14.3471 13.0258 14.7523C13.0258 14.7523 13.0258 14.7523 13.0258 14.7523L10.3956 17.3111L8.28668 15.3204C7.79962 14.8604 7.27445 14.3908 6.73368 13.9073C5.58809 12.883 4.37243 11.796 3.3005 10.6044C1.73044 8.85895 0.581875 7.00237 0.503069 5.00338C0.408 2.29452 2.57027 0.519937 5.16667 0.552219C6.33448 0.567774 7.13988 0.856367 7.84696 1.31273C8.46878 1.71406 9.01526 2.24225 9.67854 2.88332C9.79924 2.99998 9.92382 3.12039 10.0534 3.24444Z" fill="white" stroke="black"/>
                                </svg>
                            }
                            </S.DetailBoxLikes>
                        </S.DetailBoxLikesContainer>
                        <S.DetailBoxRepliesContainer>
                            <h5>{replyNum}개의 댓글</h5>
                            <S.DetailBoxReplyAddContainer>
                                <textarea placeholder="댓글을 작성하세요" onChange={(e) => setReplyInputs(e.target.value)} value={replyInputs}>

                                </textarea>
                                <ButtonAtom color='black' handler={()=>{requestAddReply()}} width='130px'>댓글 작성</ButtonAtom>
                            </S.DetailBoxReplyAddContainer>
                            {
                            replies && (
                            <Reply replies={replies} postId={postId} requestDetailBox={requestDetailBox} depth={1}/>
                            )
                            }
                        </S.DetailBoxRepliesContainer>
                    </S.DetailBoxLikesRepliesContainer>
                </S.DetailBoxSection>
            </S.DetailBoxContainer>
            {
                showLikeList && (
                    <LikeList setShowLikeList={setShowLikeList} postId={postId} nickname={nickname}/>
                )
            }
        </>
    )
}

export default DetailBox