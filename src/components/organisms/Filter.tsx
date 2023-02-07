import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainBoxList } from "../../apis/api/post";
import { RootState } from '../../store/config';
import * as S from "./FilterStyle"
import { FilterListInterface } from "../../interfaces/filterListInterface"
import { initBox, setBox } from "../../store/slices/boxSlice";
import { SearchBar } from "../molecules/Input";
import { BoxFilterInterface } from "../../interfaces/boxFilterInterface";

interface FilterProps {
    filterList: FilterListInterface[],
    boxFilters: BoxFilterInterface,
    setBoxFilters: React.Dispatch<React.SetStateAction<BoxFilterInterface>>,
    getBoxList: () => Promise<void>
}

const Filter = ({filterList, boxFilters, setBoxFilters, getBoxList}: FilterProps) => {
    const dispatch = useDispatch();
    const box = useSelector((state: RootState) => state.box);
    const user = useSelector((state:RootState) => state.user);
    const accessToken = user.accessToken || '';
    const [problemInputs, setproblemInputs] = useState({problemNumber: ''});
    const [isFilterChanged, setFilterChange] = useState(false);
    /** 필터 박스에 마우스 오버 */
    const [mouseHover, setmouseHover] = useState(Array(filterList.length).fill(-1));
    const [isFilterClicked, setFilterClicked] = useState(Array(filterList.length).fill(-1));

    const requestBoxList = useCallback( async () => {
        try {
            const response = await getMainBoxList(boxFilters, {accessToken});
            const {status, data} = response.data;
            console.log(status, data)
            console.log(response)

            if (status === "200") {
                dispatch(setBox(data));
                setBoxFilters({
                    ...boxFilters,
                    lastPostId: data.count ? data.list[data.count - 1]['post_id'] : null
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [boxFilters, dispatch, accessToken, setBoxFilters])

    const handleFilter = (key: string, value: string, id: number, idx: number) => {
        if (isFilterClicked[idx] !== id) {
            let tmp = [...isFilterClicked];
            tmp[idx] = id;
            setFilterClicked(tmp);
            setBoxFilters({
                ...boxFilters,
                lastPostId: null,
                [key]: value
            })
            setFilterChange(true);
        }
    }

    useEffect(()=>{
        if (isFilterChanged) {
            getBoxList();
            setFilterChange(false);
        }
    },[boxFilters, isFilterChanged, getBoxList])

    useEffect(() => {
        setFilterClicked([...isFilterClicked].map(item => 1));
    }, [])

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
                            opacity = { isFilterClicked[filterIdx] === filteringItem.id ? '1' : '.3' }
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
                            onClick={() => handleFilter(filter.key, filteringItem.value, filteringItem.id, filterIdx)
                        }>
                            <S.Span
                                scale = { mouseHover[filterIdx] === filteringItem.id ? 'scale(1.05)' : 'scale(1.0)' }
                                >
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