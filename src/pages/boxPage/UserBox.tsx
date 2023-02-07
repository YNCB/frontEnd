import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { myFilterList, othersFilterList } from "../../datas/FilterData"
import Filter from "../../components/organisms/Filter"
import Box from "../../components/organisms/Box"
import BoxPageTitle from "../../components/atoms/BoxPageTitle"
import { RootState } from "../../store/config"
import { getUserBoxList } from "../../apis/api/post"
import { addBox, initBox, setBox } from "../../store/slices/boxSlice"
import { BoxFilterInterface } from "../../interfaces/boxFilterInterface"

const UserBox = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {nickname} = location.state as {nickname: string};
    const user = useSelector((state : RootState) => state.user);
    const box = useSelector((state: RootState) => state.box);
    const [isMyBox,] = useState(user.nickname === nickname);
    const [isFetching, setFetching] = useState(false);
    const filterList = user.nickname === nickname ? [...myFilterList] : [...othersFilterList];
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
            const response = await getUserBoxList(nickname, boxFilters, isMyBox);
            const {status, data} = response.data;
            console.log(status, data)
            console.log(response)
            
            if (status === "200") {
                dispatch(setBox(data));
                setFetching(false);
                setBoxFilters({
                    ...boxFilters,
                    lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilters, dispatch, isMyBox, nickname])

    const requestBoxListByInfiniteScoll = useCallback( async () => {
        try {
            const response = await getUserBoxList(nickname, boxFilters, isMyBox);
            const {status, data} = response.data;
            console.log(status, data)
            console.log(response)
            
            if (status === "200") {
                dispatch(addBox(data));
                setFetching(false);
                setBoxFilters({
                    ...boxFilters,
                    lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                })
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
    
    return (
        <>
            <BoxPageTitle>{user.nickname === nickname ? `Welcome to Your CODEBOX` : `Welcome to ${nickname}'s CODEBOX`}</BoxPageTitle>
            <Filter filterList={filterList} boxFilters={boxFilters} setBoxFilters={setBoxFilters} getBoxList={requestUserBoxList}/>
            <Box isMain={false}/>
        </>
    )
}

export default UserBox