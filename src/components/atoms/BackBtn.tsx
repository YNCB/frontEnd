import styled from "styled-components"

interface BackBtnProps {
    size: string,
    position?: string,
    top?: string,
    left?: string,
    handler: any
}

type BackButtonType = {
    arrowSize: string,
    arrowPosition?: string,
    arrowTop?: string,
    arrowLeft?: string
}

const BackButton = styled.button<BackButtonType>`
    size: ${(props) => props.arrowSize};
    position: ${(props) => props.arrowPosition || "relative"};
    top: ${(props) => props.arrowTop || "0"};
    left: ${(props) => props.arrowLeft || "0"};
`

const BackBtn = ({size, position, top, left, handler}: BackBtnProps) => {
    
    return (
        <>
            <BackButton onClick={ () => handler() } arrowSize={size} arrowPosition={position} arrowTop={top} arrowLeft={left}>
                <svg style={{color: 'rgb(217, 217, 217)', width: size, height: size}} xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-a</title>
                    <polyline points="244 400 100 256 244 112" style={{fill:'none', stroke:'#000', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'48px'}}></polyline>
                    <line x1="120" y1="256" x2="412" y2="256" style={{fill:'none', stroke:'#000', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'48px'}}></line>
                </svg>
            </BackButton>
        </>
    )
}




export default BackBtn