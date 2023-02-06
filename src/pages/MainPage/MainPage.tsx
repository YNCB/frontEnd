import problemList from '../Datas/ProblemData'
import { myFilterList, othersFilterList } from "../Datas/FilterData"
import Filter from "../../components/organisms/Filter"
import Box from '../../components/organisms/Box'
import BoxPageTitle from '../../components/atoms/BoxPageTitle'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/config'
import { getBoxList } from '../../apis/api/post'
import { addBox, setBox } from '../../store/slices/boxSlice'
import { setBoxFilter, updateLastPostId } from '../../store/slices/boxFilterSlice'

const MainPage = () => {
    const dispatch = useDispatch();
    const box = useSelector((state: RootState) => state.box);
    const boxFilter = useSelector((state : RootState) => state.boxFilter);
    const user = useSelector((state : RootState) => state.user);
    const [isFetching, setFetching] = useState(false);
    const filterList = [...othersFilterList];
    const accessToken = user.accessToken || '';
    
    const requestBoxList = useCallback( async () => {
        try {
            const response = await getBoxList(boxFilter, {accessToken});
            const {status, data} = response.data;
            console.log(status, data)
            console.log(response)
            
            if (status === "200") {
                dispatch(setBox(data));
                setFetching(false);
                data.count && dispatch(updateLastPostId(data.list[data.count - 1]['post_id']));
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilter, accessToken, dispatch])

    const requestBoxListByInfiniteScoll = useCallback( async () => {
        try {
            const response = await getBoxList(boxFilter, {accessToken});
            const {status, data} = response.data;
            console.log(status, data)
            console.log(response)
            
            if (status === "200") {
                dispatch(addBox(data));
                setFetching(false);
                data.count && dispatch(updateLastPostId(data.list[data.count - 1]['post_id']));
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilter])
    
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
        
        // 무한스크롤 해제
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (isFetching && box.hasNext) {
            requestBoxListByInfiniteScoll();
        }
        else if (!box.hasNext) setFetching(false);
    }, [isFetching, box.hasNext])

    return (
        <>
            <BoxPageTitle>Welcome to CODEBOX</BoxPageTitle>
            <Filter filterList={filterList}/>
            <Box/>
        </>
    )
}

export default MainPage