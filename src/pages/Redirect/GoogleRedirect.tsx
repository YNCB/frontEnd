import React, { useEffect } from "react"


const GoogleRedirect = () => {

    useEffect(() => {
        alert('asd')
        const params = new URL(document.location.toString()).searchParams;
        console.log(params)


    }, [])

    return (
        <></>
    )
}

export default GoogleRedirect