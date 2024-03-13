import { Outlet } from "react-router-dom";
import VisitorsHeader from "../components/common/VisitorsHeader";
import ForceLogInProvider from "../providers/ForceLogInProvider";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";


const VisitorsRoutes = () => {
    const { setAuth } = useAuth();


    useEffect(() => {
        setAuth({});
        localStorage.clear();
    }, [])




    return (
        <>
            <ForceLogInProvider>
                <VisitorsHeader />
                <main className="mx-auto max-w-[1280px] py-8">
                    <div className="container">
                        <Outlet />
                    </div>
                </main>
            </ForceLogInProvider>
        </>
    );
};

export default VisitorsRoutes;
