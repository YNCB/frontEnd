import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/config"
import { changeModal } from "../store/slices/modalSlice";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (!user.authenticated) {
            navigate('/');
            dispatch(changeModal(1));
        }
    }, [navigate, user.authenticated, dispatch])
}

export default useAuth