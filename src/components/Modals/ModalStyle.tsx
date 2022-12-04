import styled, { keyframes } from 'styled-components';

export interface ModalProps {
	onClose: () => void
}

export const ModalBlackBackground = styled.div`
    z-index: 999;
    background: rgba(77, 77, 77, 0.5);
    display: block;
    position: fixed;
    inset: 0px;
`

export const ModalContainer = styled.section`
    z-index: 1000;
    position: fixed;
    inset: 0px;
`

export const downModal = keyframes`
    0% {
        transform: translateY(-200%) translateX(-50%);
    }
    100% {
        transform: translateY(-50%) translateX(-50%);
    }
`

export const ModalBox = styled.article<{modal: number}>`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: relative;
    width: 850px;
    height: 580px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 8px;
    animation: ${downModal} .4s ease-out alternate forwards;
`

export const ModalHeader = styled.div`
    background: #d9d9d9;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    svg {
        cursor: pointer;
    }
`

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 172px;
    h1{
        margin-top: 50px;
        font-size: 32px;
        font-family: 'SpoqaM';
    }
`