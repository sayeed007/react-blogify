/* eslint-disable react/prop-types */

import { CustomModal, CustomModalBody } from '../modal/CustomModal';

const styles = {
    motherDiv: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    header: {
        fontWeight: '600',
        fontSize: '20px',
        color: '#2C3C51',
        marginBottom: '20px',
    },
    message: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#2C3C51',
        marginBottom: '10px',
    },
    buttonHolder: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: '25px'
    },
    back: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#EB5757',
        border: '2px solid #EB5757',
        borderRadius: '4px',
        cursor: 'pointer',
        padding: '5px 10px',
    },
    delete: {
        fontWeight: '600',
        fontSize: '16px',
        color: '#FFFFFF',
        background: '#EB5757',
        borderRadius: '4px',
        marginRight: '15px',
        cursor: 'pointer',
        padding: '5px 10px',
    },


};

const ConfirmDelete = (props) => {

    return (
        <CustomModal
            alignment="center"
            visible={props?.visible}
            closeOnBackdrop={false}
        >
            <CustomModalBody
                style={{ marginTop: '35%' }}
            >
                <div style={styles.motherDiv}>

                    <div style={styles.header}>
                        {props?.header}
                    </div>

                    <div style={styles.message}>
                        {props?.message}
                    </div>


                    {/* Buttons */}
                    <div style={styles.buttonHolder}>
                        {/* DELETE */}
                        <div style={styles.delete}
                            onClick={() => { props.deleteButtonAction() }}
                        >
                            Delete
                        </div>

                        {/* BACK */}
                        <div style={styles.back}
                            onClick={() => { props.handleCloseModal() }}
                        >
                            Back
                        </div>
                    </div>

                </div>
            </CustomModalBody>
        </CustomModal>
    )

}
export default ConfirmDelete