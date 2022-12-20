import styled from "styled-components"


interface SearchButtonProps {
    handler() : void
}

const SearchButtonWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #B4B4B4;
    cursor: pointer;
`

const SearchBtn = styled.button`
    width: 20px;
    height: 20px;
    background: url(/assets/img/searchBtn.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`

const SearchButton = ({handler}: SearchButtonProps) => {

    return (
        <SearchButtonWrapper onClick={() => handler()}>
            <SearchBtn></SearchBtn>
        </SearchButtonWrapper>
    )
}

export default SearchButton