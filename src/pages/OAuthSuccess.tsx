import useProfile from '@/hooks/useProfile';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const { getProfile } = useProfile();

    useEffect(() => {
        getProfile.refetch().then(() => {
            navigate("/");
        }).catch(() => {
            alert("Đăng nhập thất bại. Vui lòng thử lại.")
            navigate("/signin");
        })
    }, []);

    return <div>Đang đăng nhập...</div>;
};
export default OAuthSuccess