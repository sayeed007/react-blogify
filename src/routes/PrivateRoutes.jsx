import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";
import ForceLogInProvider from "../providers/ForceLogInProvider";

const PrivateRoutes = () => {
    const { auth } = useAuth();

    return (
        <>
            {auth.authToken ?
                (
                    <>
                        <ForceLogInProvider>
                            <PostProvider>
                                <ProfileProvider>
                                    <Header />
                                    <main className="mx-auto max-w-[1280px] py-8">
                                        <div className="container">
                                            <Outlet />
                                        </div>
                                    </main>
                                </ProfileProvider>
                            </PostProvider>
                        </ForceLogInProvider>
                    </>
                )
                :
                (
                    <Navigate to={
                        "/blogs"
                    } />
                )}
        </>
    );
};

export default PrivateRoutes;
