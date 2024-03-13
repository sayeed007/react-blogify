import { Routes, Route } from 'react-router-dom';
import './App.css';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';

import PrivateRoutes from './routes/PrivateRoutes';
import SingleBlogDetails from './components/blogs/SingleBlogDetails';
import OthersProfile from './pages/OthersProfile';
import CreateNewBlog from './components/blogs/CreateNewBlog';
import UpdateExistingBlog from './components/blogs/UpdateExistingBlog';
import VisitorsRoutes from './routes/VisitorsRoutes';
import VisitorsHomePage from './pages/VisitorsHomePage';
import NotFoundPageV2 from './pages/NotFoundPage2';


function App() {

  return (
    <>

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<ProfilePage />} path="/my-profile" />
          <Route element={<SingleBlogDetails />} path="/single-blog/:blogId" />

          <Route element={<CreateNewBlog />} path="/create-new-blog" />
          <Route element={<UpdateExistingBlog />} path="/edit-blog/:blogId" />
          <Route element={<OthersProfile />} path="profile/:userId" />


        </Route>

        <Route element={<VisitorsRoutes />}>
          <Route element={<VisitorsHomePage />} path="/blogs" exact />
          <Route element={<SingleBlogDetails />} path="/read-single-blog/:blogId" />
          <Route element={<OthersProfile />} path="user-profile/:userId" />
        </Route>

        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<NotFoundPageV2 />} path="*" />
      </Routes>
    </>
  )
}

export default App
