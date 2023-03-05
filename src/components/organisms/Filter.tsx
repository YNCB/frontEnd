import { useEffect, useState } from "react";
import * as S from "./FilterStyle"
import { FilterListInterface } from "../../interfaces/filterListInterface"
import { SearchBar } from "../molecules/Input";
import { BoxFilterInterface } from "../../interfaces/boxFilterInterface";

interface FilterProps {
    filterList: FilterListInterface[],
    boxFilters: BoxFilterInterface,
    setBoxFilters: React.Dispatch<React.SetStateAction<BoxFilterInterface>>,
    getBoxList: () => Promise<void>,
    isMyBox?: boolean,
    nickname?: string,
}

const Filter = ({filterList, boxFilters, setBoxFilters, getBoxList, isMyBox, nickname}: FilterProps) => {
    const [problemInputs, setproblemInputs] = useState({problemNumber: ''});
    const [isFilterChanged, setFilterChange] = useState(false);
    /** 필터 박스에 마우스 오버 */
    const [mouseHover, setmouseHover] = useState(Array(filterList.length).fill(-1));
    const [isFilterClicked, setFilterClicked] = useState(Array(filterList.length).fill(-1));
    const [isTagFilterClicked, setTagFilterClicked] = useState(Array(filterList[0].filtering.length).fill(false));

    useEffect(() => {
        setFilterClicked([...isFilterClicked].map(item => 1));
    }, [])

    useEffect(()=>{
        if (isFilterChanged) {
            getBoxList();
            setFilterChange(false);
        }
    },[boxFilters, isFilterChanged, getBoxList])

    useEffect(() => {
        setFilterChange(true);
    }, [nickname])

    useEffect(() => {
        if (isMyBox) {
            let newIsTagFilterClicked = Array(filterList[0].filtering.length).fill(false);
            newIsTagFilterClicked[0] = true;
            setTagFilterClicked(newIsTagFilterClicked);
        }
    }, [filterList[0].filtering])

    const handleFilter = (key: string, value: string | string[], id: number, idx: number) => {
        if (isFilterClicked[idx] !== id) {
            let tmp = [...isFilterClicked];
            tmp[idx] = id;
            setFilterClicked(tmp);
            setBoxFilters({
                ...boxFilters,
                lastPostId: null,
                countView: null,
                lastLikeNum: null,
                lastReplyNum: null,
                [key]: value
            })
            setFilterChange(true);
        }
    }

    const handleTagFilter = (key: string, value: string | string[], id: number, idx: number) => {
        if (value === '') {
            value = [] as string[]

            let newIsTagFilterClicked = Array(isTagFilterClicked.length).fill(false);
            newIsTagFilterClicked[0] = true;
            setTagFilterClicked(newIsTagFilterClicked);
        }
        else {
            if (isTagFilterClicked[idx]) {
                value = boxFilters.tags.filter((item, idx) => item !== value)
            }
            else {
                value = Array.from(new Set(boxFilters.tags.concat(value)))
            }

            let newIsTagFilterClicked = [...isTagFilterClicked];
            newIsTagFilterClicked[idx] = !newIsTagFilterClicked[idx];
            const activeCount = newIsTagFilterClicked.reduce((cnt, elem) => cnt + elem ,0);

            if (newIsTagFilterClicked[0]) {
                newIsTagFilterClicked[0] = false;
            }
            else if (activeCount === newIsTagFilterClicked.length - 1 || activeCount === 0) {
                newIsTagFilterClicked = newIsTagFilterClicked.map((item: boolean) => false);
                newIsTagFilterClicked[0] = true
                value = [] as string[];
            }

            setTagFilterClicked(newIsTagFilterClicked);
        }

        setBoxFilters({
            ...boxFilters,
            lastPostId: null,
            [key]: value
        })
        setFilterChange(true);
    }
    
    const handleSearchClick = () => {
        setBoxFilters({
            ...boxFilters,
            lastPostId: null,
            searchTitle: {...problemInputs}.problemNumber
        })
        setFilterChange(true);
    }

    return (
        <S.FilterContainer>
            {
            filterList.map((filter,filterIdx)=>(
                <S.FilterWrapper key={filter.id}>
                <h4>{filter.title}</h4>
                <S.FilterList>
                    {
                    filter.filtering.map((filteringItem, filteringIdx)=>(
                        <S.Filters
                            key = {filteringItem.id}
                            scale = { mouseHover[filterIdx] === filteringItem.id ? 'scale(1.05)' : 'scale(1.0)' }
                            opacity = { (filter.key === 'tags') ? (isTagFilterClicked[filteringIdx] ? '1' : '.3') : (isFilterClicked[filterIdx] === filteringItem.id ? '1' : '.3') }
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
                            onClick={() => {(filter.key === 'tags') ? handleTagFilter(filter.key, filteringItem.value, filteringItem.id, filteringIdx) : handleFilter(filter.key, filteringItem.value, filteringItem.id, filterIdx)}}
                        >
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
                placeHolder="제목을 입력하세요." 
                handleClick={handleSearchClick}    
            />
        </S.FilterContainer>
    );
};

export default Filter;