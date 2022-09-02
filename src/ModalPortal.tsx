import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface Props {
    children: ReactNode;
}

const ModalPortal  = ({children} : Props) => {
    const modal = document.getElementById('modal') as HTMLElement;
    return ReactDOM.createPortal(children, modal);
}

export default ModalPortal