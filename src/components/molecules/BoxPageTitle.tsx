import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { deleteFollow, getFollower, getFollowing, postFollow } from "../../apis/api/follow"
import { RootState } from "../../store/config"
import { setBox } from "../../store/slices/boxSlice"

const TItleContainer = styled.div`
max-width: 1190px;
margin: 60px auto 0;
display: flex;
justify-content: center;
`

const MainTitle = styled.h3`
    font-size: 40px;
    text-align: center;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const UserNickname = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;

    & > h3 {
        font-size: 36px;
    }
    & > button {
        width: 80px;
        height: 28px;
        background: #D9D9D9;
        border-radius: 5px;
        font-size: 16px;
        font-family: 'SpoqaR';
    }
`

const UserInfo = styled.ul`
    margin-top: 15px;
    display: flex;
    gap: 30px;

    & > li > span: nth-of-type(2) {
        font-family: 'SpoqaM';
        margin-left: 10px;
    }
    & > li > button {
        font-family: 'SpoqaM';
        margin-left: 10px;
    }
`

interface BoxPageTitleProps {
    children: React.ReactNode,
    isMain: boolean,
    nickname?: string,
    isMyBox?: boolean,
    showFollower?: number,
    setShowFollower?: React.Dispatch<React.SetStateAction<number>>
}

const BoxPageTitle = ({children, isMain, nickname, isMyBox, showFollower, setShowFollower}: BoxPageTitleProps) => {
    const box = useSelector((state: RootState) => state.box);
    const [isFollow, setIsFollow] = useState(box.isFollow);
    const [followerList, setFollowerList] = useState([]);
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        isMyBox && (
            (async () => {
                try {
                    const followingResponse = await getFollower();
                    const followerResponse = await getFollowing();
                    setFollowerList(followerResponse.data.data)
                    setFollowingList(followingResponse.data.data)
                }
                catch (err) {
                    console.log(err);
                }
            })()
        )
    }, [])
    
    useEffect(() => {
        // (async () => {
        //     const response = await getFollower();
        //     console.log(response);
        //     const response2 = await getFollowing();
        //     console.log(response2);
        // })();
        setIsFollow(box.isFollow);
    }, [box.isFollow])

    const requestPostFollow = async () => {
        try {
            const response = await postFollow({userId: box.userId});
            const {status} = response.data;

            if (status === '200') setIsFollow(!isFollow);
        }
        catch (err) {
            console.log(err)
        }
    }

    const requestDeleteFollow = async () => {
        try {
            const response = await deleteFollow({followId: box.userId});
            const {status} = response.data;

            if (status === '200') setIsFollow(!isFollow);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <TItleContainer>
        {
            isMain ?
            (
            <MainTitle>{children}</MainTitle>
            ) :
            (
            <TitleWrapper>
                <UserNickname>
                    <h3>{nickname}</h3>
                    {
                        isMyBox || (
                        isFollow ? (
                            <button onClick={requestDeleteFollow}>팔로잉</button>
                        ):
                        (
                            <button onClick={requestPostFollow}>팔로우</button>
                        )
                        )
                    }
                </UserNickname>
                <UserInfo>
                    {
                        isMyBox && (
                        <>
                        <li>
                            <span>팔로워</span>
                        {
                            isMyBox &&
                            <button onClick={()=>setShowFollower && setShowFollower(1)}>{followerList.length}</button>
                        }
                        </li>
                        <li>
                            <span>팔로잉</span>
                        {
                            isMyBox &&
                            <button onClick={()=>setShowFollower && setShowFollower(2)}>{followingList.length}</button>
                        }
                        </li>
                        </>
                        )
                    }
                </UserInfo>
            </TitleWrapper>
            )
        }
        </TItleContainer>
    )
}

export default BoxPageTitle