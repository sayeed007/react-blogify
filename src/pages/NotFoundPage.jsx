import { Link } from 'react-router-dom';
import '../styles/NotFoundDesign.css';

const NotFoundPage = () => {



  return (
    <>

      <div className="container">
        <input type="checkbox" id="switch" />
        <div className="ellipse"></div>
        <div className="ray"></div>
        <div className="head"></div>
        <div className="neck"></div>
        <div className="body">
          <label htmlFor="switch"></label>
        </div>
      </div>
      <div className="container">
        <div className="msg msg_1">
          <div>404</div>
          <Link
            className='text-lg font-bold underline'
            to='/'>Home</Link>
        </div>
        <div className="msg msg_2">
          <div>Page Not Found</div>
          <Link
            className='text-lg font-bold  underline'
            to='/'>
            Home
          </Link>
        </div>



      </div>

    </>
  );
};

export default NotFoundPage;
