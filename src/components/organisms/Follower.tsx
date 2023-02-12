import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { getFollower, getFollowing } from "../../apis/api/follow";
import * as S from "./SmallModalStyle";

const Follower = ({showFollower, setShowFollower}: {showFollower: number, setShowFollower: React.Dispatch<React.SetStateAction<number>>}) => {
    const [userList, setUserList] = useState<{userId: number, nickname: string}[]>([]);

    useEffect(() => {
        requestGetFollow();
    }, [])

    const requestGetFollow = useCallback( async () => {
        try {
            const response = showFollower === 1 ? await getFollowing() : await getFollower();
            const {status, data} = response.data;
            console.log(response);
            if (status === '200') setUserList(data)
        }
        catch (err) {
            console.log(err);
        }
    }, [])
    
    return (
        <>
            <S.SmallModalBg/>
            <S.SmallModalContainer>
                <S.SmallModalWrapper>
                    <S.SmallModalHeader>
                        <span>{showFollower === 1 ? '팔로워' : '팔로잉'}</span>
                        <svg onClick={ () => {setShowFollower(0)} } stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" tabIndex={1} height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </S.SmallModalHeader>
                    <S.SmallModalContent>
                        <S.Lists>
                            {
                                userList.map((item, idx) => (
                                    showFollower === 1 ? (
                                        <li key={idx}>
                                            <span>{item.nickname}</span>
                                            <S.BlackBtn>언팔로우</S.BlackBtn>
                                        </li>
                                    ):(
                                        <li key={idx}>
                                            <span>{item.nickname}</span>
                                            <S.BlackBtn>언팔로우</S.BlackBtn>
                                        </li>
                                    )
                                ))
                            }
                        </S.Lists>
                    </S.SmallModalContent>
                </S.SmallModalWrapper>
            </S.SmallModalContainer>
        </>
    )
}

export default Follower