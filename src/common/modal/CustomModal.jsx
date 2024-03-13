/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './CustomModal.css';
import Close from '../../assets/icons/Cross.svg';
import usePortal from '../../hooks/usePortal';
import { Portal } from 'react-portal';


export const CustomModal = (props) => {
    const target = usePortal();


    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!props.visible) return;
            const modalContent = document.querySelector('.response-modal-content');
            if (modalContent && !modalContent.contains(event.target) && props?.onClose) {
                props.onClose(); // Call the provided onClose function to close the modal
            }
        };

        window.addEventListener('click', handleOutsideClick);

        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [props]);


    if (!props?.visible) {
        return null;
    }

    return (
        <Portal node={target}>
            <div className="response-modal" style={{ display: "block" }}>
                {/* <!-- Modal content --> */}
                <div className="response-modal-content" style={{ maxWidth: props?.size === "xl" ? '1140px' : props?.size === "lg" ? '800px' : '500px', ...props?.style }}>
                    {props?.children}
                </div>
            </div>
        </Portal>
    )
};

export const CustomModalHeader = (props) => {
    return (
        <div className="response-modal-header"
            style={{
                background: props?.color === "warning" ? '#F9B115' :
                    props?.color === "danger" ? '#E55353' :
                        props?.color === "success" ? 'green' : '',

                color: props?.color ? '#fff' : '',
                width: '100%',
                ...props?.style
            }}>
            <div style={{ width: '100%', display: 'flex' }}>
                <div style={{ width: '95%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        {props?.children}
                    </div>
                </div>
                <div style={{ width: '5%', color: props?.color ? props?.color : 'black', display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ cursor: 'pointer' }} onClick={props?.onClose}>
                        <img src={Close} width='15' height='15' alt='closeModal' />
                    </span>
                </div>
            </div>
        </div>
    );
}

/* <!-- Modal Body --> */
export const CustomModalBody = (props) => {
    return (
        <div className="response-modal-body" style={{ ...props?.style }}>
            {props?.children}
        </div>
    )
}