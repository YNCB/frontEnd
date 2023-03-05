import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { deleteFollow, getFollower, getFollowing, postFollow } from "../../apis/api/follow"
import { RootState } from "../../store/config"
import * as S from './BoxPageTitleStyle'

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
    }, [isMyBox])
    
    useEffect(() => {
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
            const response = await deleteFollow({userId: box.userId});
            const {status} = response.data;

            if (status === '200') setIsFollow(!isFollow);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <S.TItleContainer>
        {
            isMain ?
            (
            <S.MainTitle>{children}</S.MainTitle>
            ) :
            (
            <S.TitleWrapper>
                <S.UserNickname>
                    <h3>{nickname}</h3>
                    {
                        isMyBox || (
                        isFollow ? (
                            <button onClick={requestDeleteFollow} style={{ background: `#000000`, color: '#fff'}}>팔로잉</button>
                        ):
                        (
                            <button onClick={requestPostFollow}>팔로우</button>
                        )
                        )
                    }
                </S.UserNickname>
                <S.UserInfo>
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
                </S.UserInfo>
            </S.TitleWrapper>
            )
        }
        </S.TItleContainer>
    )
}

export default BoxPageTitle