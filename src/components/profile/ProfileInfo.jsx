import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import Bio from "./Bio";
import ProfileImage from "./ProfileImage";


const ProfileInfo = () => {
    const { auth } = useAuth();

    const { state } = useProfile();
    const user = state?.user ?? auth?.user;

    return (
        <div className="flex flex-col items-center py-8 text-center">
            <ProfileImage />

            {/*  name , email  */}
            <div>
                <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
                    {user?.firstName} {user?.lastName}
                </h3>
                <p className="leading-[231%] lg:text-lg">
                    {user?.email}
                </p>
            </div>

            <Bio />
            <div className="w-3/4 border-b border-[#3F3F3F] py-3 lg:py-4"></div>
        </div>
    );
};

export default ProfileInfo;
