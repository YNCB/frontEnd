import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { myFilterList, othersFilterList } from "../../datas/FilterData"
import Filter from "../../components/organisms/Filter"
import Box from "../../components/organisms/Box"
import BoxPageTitle from "../../components/molecules/BoxPageTitle"
import { RootState } from "../../store/config"
import { getUserBoxList } from "../../apis/api/post"
import { addBox, initBox, setBox } from "../../store/slices/boxSlice"
import { BoxFilterInterface } from "../../interfaces/boxFilterInterface"
import { BoxInterface } from "../../interfaces/boxInterface"
import Follower from "../../components/organisms/Follower"

const UserBox = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {nickname} = location.state as {nickname: string};
    const user = useSelector((state : RootState) => state.user);
    const box = useSelector((state: RootState) => state.box);
    const [isMyBox, setIsMyBox] = useState(user.nickname === nickname);
    const [isFetching, setFetching] = useState(false);
    const [filterList, setFilterList] = useState(user.nickname === nickname ? [...myFilterList] : [...othersFilterList]);
    const [showFollower, setShowFollower] = useState(0);
    const initBoxFilters = {
        countView: null,
        lastLikeNum: null,
        lastPostId: null,
        lastReplyNum: null,
        searchTitle: "",
        language: "",
        orderKey: "latest",
        tags: [] as string[],
        type: ""
    }
    const [boxFilters, setBoxFilters] = useState<BoxFilterInterface>({
        ...initBoxFilters
    })

    const requestUserBoxList = useCallback( async () => {
        try {
            const response = await getUserBoxList(nickname, boxFilters, user.accessToken || '');
            const {status, data} = response.data;
            
            if (status === "200") {
                dispatch(setBox(data));
                setFetching(false);
                if (boxFilters.orderKey === 'countView') {
                    setBoxFilters({
                        ...boxFilters,
                        countView: data.count ? data.list[data.count - 1]['countView'] : null,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }
                else if (boxFilters.orderKey === 'likeNum') {
                    setBoxFilters({
                        ...boxFilters,
                        lastLikeNum: data.count ? data.list[data.count - 1]['likeNum'] : null,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }
                else if (boxFilters.orderKey === 'replyNum') {
                    setBoxFilters({
                        ...boxFilters,
                        lastReplyNum: data.count ? data.list[data.count - 1]['replyNum'] : null,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }
                else {
                    setBoxFilters({
                        ...boxFilters,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }

                if (isMyBox && filterList[0].filtering.length === 1) {
                    const tags: string[] = Array.from(new Set(data.list.reduce((init: string[], item: BoxInterface) => init.concat(item.tags) ,[])))
                    const newTags = tags.map((item, idx: number) => {
                        return {
                            id: idx+2,
                            name: item,
                            value: item
                        }
                    });
                    filterList[0].filtering = filterList[0].filtering.concat(newTags);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilters, dispatch, isMyBox, nickname])

    const requestBoxListByInfiniteScoll = useCallback( async () => {
        try {
            const response = await getUserBoxList(nickname, boxFilters, user.accessToken || '');
            const {status, data} = response.data;
            
            if (status === "200") {
                dispatch(addBox(data));
                setFetching(false);
                if (boxFilters.orderKey === 'countView') {
                    setBoxFilters({
                        ...boxFilters,
                        countView: data.count ? data.list[data.count - 1]['countView'] : null,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }
                else if (boxFilters.orderKey === 'likeNum') {
                    setBoxFilters({
                        ...boxFilters,
                        lastLikeNum: data.count ? data.list[data.count - 1]['likeNum'] : null,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }
                else if (boxFilters.orderKey === 'replyNum') {
                    setBoxFilters({
                        ...boxFilters,
                        lastReplyNum: data.count ? data.list[data.count - 1]['replyNum'] : null,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }
                else {
                    setBoxFilters({
                        ...boxFilters,
                        lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                    })
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilters, dispatch, isMyBox, nickname])

    useEffect(() => {
        requestUserBoxList();

        // 무한스크롤 설정
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement;
            if (offsetHeight <= window.innerHeight + scrollTop) {
                setFetching(true);
            }
        }
        window.addEventListener('scroll', handleScroll);
        
        // 무한스크롤 해제 및 필터, 박스 초기화
        return () => {
            setBoxFilters({...initBoxFilters});
            dispatch(initBox());
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        if (isFetching && box.hasNext) {
            requestBoxListByInfiniteScoll();
        }
        else if (!box.hasNext) setFetching(false);
    }, [isFetching, box.hasNext, requestBoxListByInfiniteScoll])

    useEffect(() => {
        setFilterList(user.nickname === nickname ? [...myFilterList] : [...othersFilterList]);
        setIsMyBox(user.nickname === nickname);
        setBoxFilters({...initBoxFilters});
    }, [nickname])
    
    return (
        <>
            <BoxPageTitle isMain={false} nickname={nickname} isMyBox={isMyBox} showFollower={showFollower} setShowFollower={setShowFollower}>{user.nickname === nickname ? `Welcome to Your CODEBOX` : `Welcome to ${nickname}'s CODEBOX`}</BoxPageTitle>
            <Filter filterList={filterList} boxFilters={boxFilters} setBoxFilters={setBoxFilters} getBoxList={requestUserBoxList} isMyBox={isMyBox} nickname={nickname}/>
            <Box isMain={false} nickname={nickname}/>
            {
                !!showFollower &&
                <Follower showFollower={showFollower} setShowFollower={setShowFollower}></Follower>
            }
        </>
    )
}

export default UserBox