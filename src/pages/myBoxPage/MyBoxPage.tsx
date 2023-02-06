import problemList from "../Datas/ProblemData"
import { myFilterList, othersFilterList } from "../Datas/FilterData"
import Filter from "../../components/organisms/Filter"
import Box from "../../components/organisms/Box"
import BoxPageTitle from "../../components/atoms/BoxPageTitle"

const MyBoxPage = () => {

    // myFilterList, othersFilterList 분기 코드 필요 (지금 이 코드는 임시)
    const filterList = [...myFilterList]

    return (
        <>
            <BoxPageTitle>Welcome to Your CODEBOX</BoxPageTitle>
            <Filter filterList={filterList}/>
            <Box/>
        </>
    )
}

export default MyBoxPage