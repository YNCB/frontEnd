import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getBoxList } from "../../apis/api/post";
import { RootState } from '../../store/config';
import * as S from "./FilterStyle"
import { FilterListInterface } from "../../interfaces/filterListInterface"
import { setBox } from "../../store/slices/boxSlice";
import { SearchBar } from "../molecules/Input";
import { initBoxFilter, setBoxFilter, updateLastPostId } from "../../store/slices/boxFilterSlice";

const Filter = ({filterList}: FilterListInterface) => {
    const dispatch = useDispatch();
    const box = useSelector((state: RootState) => state.box);
    const boxFilter = useSelector((state: RootState) => state.boxFilter);
    const user = useSelector((state:RootState) => state.user);
    const accessToken = user.accessToken || '';
    const [problemInputs, setproblemInputs] = useState({problemNumber: ''});
    /** 필터 박스에 마우스 오버 */
    const [mouseHover, setmouseHover] = useState( Array(filterList.length).fill(-1) );
    const [isFilterChanged, setFilterChange] = useState(false);

    const requestBoxList = useCallback( async () => {
        try {
            const response = await getBoxList(boxFilter, {accessToken});
            const {status, data} = response.data;
            console.log(status, data)
            console.log(response)

            if (status === "200") {
                dispatch(setBox(data));
                data.count && dispatch(updateLastPostId(data.list[data.count - 1]['post_id']));
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilter, dispatch, accessToken])

    const handleFilter = (key: string, value: string) => {
        dispatch(setBoxFilter({key, value}));
        setFilterChange(true);
    }

    useEffect(()=>{
        if (isFilterChanged) {
            requestBoxList();
            setFilterChange(false);
        }
    },[boxFilter])

    return (
        <S.FilterContainer>
        {
            filterList.map((filter,filterIdx)=>(
                <S.FilterWrapper key={filter.id}>
                <h4>{filter.title}</h4>
                <S.FilterList>
                    {
                    filter.filtering.map((filteringItem,filteringIdx)=>(
                        <S.Filters
                            key = {filteringItem.id}
                            scale = { mouseHover[filterIdx] === filteringItem.id ? 'scale(1.05)' : 'scale(1.0)' }
                            onMouseOver={() => {
                                let tmp = [...mouseHover]
                                tmp[filterIdx] = filteringItem.id
                                setmouseHover(tmp);
                            }}
                            onMouseOut={() => {
                                let tmp = [...mouseHover]
                                tmp[filterIdx] = -1
                                setmouseHover(tmp);
                            }}
                            onClick={() => handleFilter(filter.key, filteringItem.value)}
                            >
                            <S.Span
                                scale = { mouseHover[filterIdx] === filteringItem.id ? 'scale(1.05)' : 'scale(1.0)' }>
                                {filteringItem.name}
                            </S.Span>
                        </S.Filters>
                    ))
                    }
                </S.FilterList>
                </S.FilterWrapper>
            )
            )
        }
        <SearchBar 
            inputs={problemInputs} 
            setInputs={setproblemInputs} 
            name="problemNumber" 
            type="text" 
            placeHolder="제목을 입력하세요." />
        </S.FilterContainer>
    );
};

export default Filter;