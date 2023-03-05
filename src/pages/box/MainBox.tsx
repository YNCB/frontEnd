import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { othersFilterList } from "../../datas/FilterData"
import Filter from "../../components/organisms/Filter"
import Box from '../../components/organisms/Box'
import BoxPageTitle from '../../components/molecules/BoxPageTitle'
import { RootState } from '../../store/config'
import { addBox, initBox, setBox } from '../../store/slices/boxSlice'
import { getMainBoxList } from '../../apis/api/post'
import { BoxFilterInterface } from '../../interfaces/boxFilterInterface'

const MainBox = () => {
    const dispatch = useDispatch();
    const user = useSelector((state : RootState) => state.user);
    const box = useSelector((state: RootState) => state.box);
    const [isFetching, setFetching] = useState(false);
    const filterList = [...othersFilterList];
    const accessToken = user.accessToken || '';
    const initBoxFilters = {
        countView: null,
        lastLikeNum: null,
        lastPostId: null,
        lastReplyNum: null,
        searchTitle: "",
        language: "",
        orderKey: "latest",
        tags: [],
        type: ""
    }
    const [boxFilters, setBoxFilters] = useState<BoxFilterInterface>({
        ...initBoxFilters
    })

    const requestBoxList = useCallback( async () => {
        try {
            const response = await getMainBoxList(boxFilters, {accessToken});
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
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilters, accessToken, dispatch])

    const requestBoxListByInfiniteScoll = useCallback( async () => {
        try {
            const response = await getMainBoxList(boxFilters, {accessToken});
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
    }, [boxFilters, accessToken, dispatch])
    
    useEffect(() => {
        requestBoxList();

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
            <BoxPageTitle isMain={true}>Welcome to CODEBOX</BoxPageTitle>
            <Filter filterList={filterList} boxFilters={boxFilters} setBoxFilters={setBoxFilters} getBoxList={requestBoxList}/>
            <Box isMain={true}/>
        </>
    )
}

export default MainBox