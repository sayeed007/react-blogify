/* eslint-disable react/prop-types */
import './Loader.css';


const InsidePageLoader = (props) => {
    return (
        <div style={{ minHeight: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='loaderHolder'>
                <div id="loaderMother">
                    <div className='loaderText'>
                        {props?.loaderMessage ? props?.loaderMessage : 'Please Wait'}
                    </div>
                    <div className="loader">
                        <div className="loader1"></div>&nbsp;&nbsp;
                        <div className="loader2"></div>&nbsp;&nbsp;
                        <div className="loader3"></div>&nbsp;&nbsp;
                        <div className="loader4"></div>&nbsp;&nbsp;
                        <div className="loader5"></div>&nbsp;&nbsp;
                        <div className="loader6"></div>&nbsp;&nbsp;
                        <div className="loader7"></div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default InsidePageLoader