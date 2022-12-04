import { useEffect, useState } from "react";
import * as S from "./FilterStyle"

interface FilterListProps {
    filterList: {
        id: number,
        title: string,
        filtering: {
            id: number,
            name: string,
        }[];
    }[]
}

const Filter = ({filterList}: FilterListProps) => {

    /** 필터 박스에 마우스 오버 */
    const [mouseHover, setmouseHover] = useState( Array(filterList.length).fill(-1) )

    return (
        <S.FilterContainer>
        {
            filterList.map((filterList,filterListIdx)=>(
                <S.FilterWrapper key={filterList.id}>
                <h4>{filterList.title}</h4>
                <S.FilterList>
                    {
                    filterList.filtering.map((filteringItem,filteringIdx)=>(
                        <S.Filters
                            key = {filteringItem.id}
                            scale = { mouseHover[filterListIdx] === filteringItem.id ? 'scale(1.05)' : 'scale(1.0)' }
                            onMouseOver={() => {
                                let tmp = [...mouseHover]
                                tmp[filterListIdx] = filteringItem.id
                                setmouseHover(tmp);
                            }}
                            onMouseOut={() => {
                                let tmp = [...mouseHover]
                                tmp[filterListIdx] = -1
                                setmouseHover(tmp);
                            }}
                            >
                            <S.Span 
                                scale = { mouseHover[filterListIdx] === filteringItem.id ? 'scale(1.05)' : 'scale(1.0)' }>
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
        </S.FilterContainer>
    );
};

export default Filter;