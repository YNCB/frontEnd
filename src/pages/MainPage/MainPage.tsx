import problemList from '../Datas/ProblemData'
import { myFilterList, othersFilterList } from "../Datas/FilterData"
import Filter from "../../components/organisms/Filter"
import Box from '../../components/organisms/Box'
import BoxPageTitle from '../../components/atoms/BoxPageTitle'
import { useEffect } from 'react'

const MainPage = () => {

    // myFilterList, othersFilterList 분기 코드 필요 (지금 이 코드는 임시)
    const filterList = [...othersFilterList]

    useEffect(()=>{
        
    },[])

    return (
        <>
            <BoxPageTitle>Welcome to CODEBOX</BoxPageTitle>
            <Filter filterList={filterList}/>
            <Box problemList={problemList}/>
        </>
    )
}

export default MainPage