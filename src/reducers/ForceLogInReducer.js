import { actions } from "../actions";

const initialState = {
    isWarningModalVisible: false,
    message: ''
};

const forceLogInReducer = (state, action) => {
    switch (action.type) {
        case actions.forceLogIn.DATA_TOGGLING: {
            return {
                ...state,
                isWarningModalVisible: action.data.isWarningModalVisible,
                message: action.data.message,
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, forceLogInReducer };
