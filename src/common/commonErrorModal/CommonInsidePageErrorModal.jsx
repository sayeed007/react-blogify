/* eslint-disable react/prop-types */
import { useState } from 'react';
import './CommonErrorModalDesign.css';
import ErrorIcon from '../../assets/icons/ErrorIcon.svg';
import RetryGreenIcon from '../../assets/icons/RetryGreen.svg';
import RetryWhiteIcon from '../../assets/icons/RetryWhite.svg';

const CommonInsidePageErrorModal = (props) => {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <div className="row">
        <div
          className="modalBox success col-sm-12 col-md-12 col-lg-12 center animate"
          style={{ display: 'block' }}
        >
          <div
            className="insidePage-icon"
            style={{ background: '#Ff0000' }}
          >
            <img src={ErrorIcon} alt="OKIcon" width="25px" />
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '30px',
              color: '#333333',
            }}
          >
            Error!
          </div>

          <div
            style={{
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '30px',
              color: '#333333',
            }}
          >
            {props?.message}
          </div>

          <div
            className="flex justify-center"
            id="buttonHolder-div"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => props.actionOnErrorModal()}
          >
            <button className="flex items-center justify-center gap-2 text-sm font-normal leading-5 x text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
              {isHovered ? (
                <img src={RetryWhiteIcon} alt="OKIcon" className="w-[15px]" />
              ) : (
                <img src={RetryGreenIcon} alt="OKIcon" className="w-[15px]" />
              )}

              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonInsidePageErrorModal;
