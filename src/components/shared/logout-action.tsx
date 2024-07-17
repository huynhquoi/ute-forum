'use client'

import { destroyCookie } from "nookies";

type LogoutActionProps = {
    children: React.ReactNode
}

const LogoutAction = ({children}: LogoutActionProps) => {
    const handleLogout = () => {
        // Xóa tất cả cookie liên quan đến đăng nhập
        destroyCookie(null, 'auth_token');
        destroyCookie(null, 'refresh_token');
        destroyCookie(null, 'user');
        destroyCookie(null, 'user_role');
        destroyCookie(null, 'userId');
    
        // Tải lại trang
        window.location.reload();
      };
    return (
        <>
            <div className="" onClick={handleLogout}>
                {children}
            </div>
        </>
    )
}

export default LogoutAction