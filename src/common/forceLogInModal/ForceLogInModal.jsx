import { CustomModal, CustomModalBody, CustomModalHeader } from '../modal/CustomModal';
import { useForceLogIn } from "../../hooks/useForceLogIn.jsx";
import { actions } from "../../actions";
import { Link } from 'react-router-dom';


const ForceLogInModal = () => {
    const { state, dispatch } = useForceLogIn();

    return (
        <CustomModal
            alignment="center"
            visible={state?.isWarningModalVisible}
        >
            <CustomModalHeader
                onClose={() => dispatch({
                    type: actions.forceLogIn.DATA_TOGGLING,
                    data: {
                        isWarningModalVisible: false,
                        message: ''
                    },
                })}>
                <div className="font-semibold text-2xl text-gray-800 mb-4">
                    Warning
                </div>
            </CustomModalHeader>




            <CustomModalBody
                className="mt-24"
            >
                <div className="flex flex-col items-center justify-center p-5">

                    <div className="font-semibold text-lg text-gray-800 mb-6">
                        {state?.message}
                    </div>

                    <div className="flex w-full justify-between mb-6">

                        <div className="w-[48%] text-left text-black">
                            <div className="mb-2">
                                Already have an Account?
                            </div>

                            <div className="my-2">
                                <Link
                                    className="hover:underline bg-indigo-600 text-white px-3 py-2 rounded"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>

                        <div className="w-[4%] flex justify-center">
                            <div className='h-full w-[1px] border border-dashed border-black'></div>
                        </div>

                        <div className="w-[48%] text-right text-black">
                            <div className="mb-2">
                                Don’t have an account?
                            </div>

                            <div className="my-2">
                                <Link
                                    className="hover:underline bg-indigo-600 text-white px-3 py-2 rounded"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="font-semibold text-lg text-gray-800 mb-4">
                        Or
                    </div>

                    <div
                        className="cursor-pointer font-medium text-blue-600 underline"
                        onClick={() => {
                            dispatch({
                                type: actions.forceLogIn.DATA_TOGGLING,
                                data: {
                                    isWarningModalVisible: false,
                                    message: ''
                                },
                            });
                        }}
                    >
                        Continue reading blog
                    </div>

                </div>
            </CustomModalBody>
        </CustomModal>
    );
};

export default ForceLogInModal;
