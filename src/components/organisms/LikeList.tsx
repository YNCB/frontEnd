import React, { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLikeList } from "../../apis/api/like"
import * as S from "./SmallModalStyle"

interface LikeListProps {
    setShowLikeList: React.Dispatch<React.SetStateAction<boolean>>,
    postId: string,
    nickname: string
}

const LikeList = ({setShowLikeList, postId, nickname}: LikeListProps) => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState<string[]>([]);

    useEffect(() => {
        requestLikeUsers();
    }, [])

    const requestLikeUsers = useCallback( async () => {
        try {
            const response = await getLikeList({nickname, postId});
            const {status, data} = response.data;

            if (status === '200') {
                setUserList(data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    const moveUserPageHandler = (nickname: string) => {
        navigate('/userbox', {state: {nickname: nickname}});
        setShowLikeList(false);
    }

    return (
        <>
            <S.SmallModalBg/>
            <S.SmallModalContainer>
                <S.SmallModalWrapper>
                    <S.SmallModalHeader>
                        <span>좋아요</span>
                        <svg onClick={ () => {setShowLikeList(false)} } stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" tabIndex={1} height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </S.SmallModalHeader>
                    <S.SmallModalContent>
                        <S.Lists>
                        {
                        userList.length ?
                        (
                            userList.map((item, idx) => (
                            <li key={idx}>
                                <span>{item}</span>
                                <S.WhiteBtn onClick={() => moveUserPageHandler(item)}>이동</S.WhiteBtn>
                            </li>

                            ))
                        )
                        :
                        (
                            <S.NoData>
                                <h3>좋아요가 없는데요?</h3>
                            </S.NoData>
                        )
                        }
                        </S.Lists>
                    </S.SmallModalContent>
                </S.SmallModalWrapper>
            </S.SmallModalContainer>
        </>
    )
}

export default LikeList