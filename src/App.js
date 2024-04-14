import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loader from './Components/Loader';
import NotFound from './Components/404Page';
import Profile from './AdminDashboard/Profile';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import Posts from './AdminDashboard/Posts';
import Settings from './AdminDashboard/Settings';
import AdminEditProfile from './AdminDashboard/Components/EditProfile';
import Category from './AdminDashboard/Category';
import Users from './AdminDashboard/Faqs';
import AdminDonationHistory from './AdminDashboard/DonationHistory';
import ScholarshipDistributionAutomatic from './AdminDashboard/ScholarshipDistributionAutomatic';
import User from './AdminDashboard/User';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ForgotPassword from './Pages/ForgotPassword';
import AdminForgotPassword from './Pages/AdminForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import VerifyOtp from './Pages/VerifyOtp';
import BonusPenalty from './AdminDashboard/BonusPenalty';
import MasterDocument from './AdminDashboard/MasterDocument';
import CreateQuiz from './AdminDashboard/CreateQuiz';
import MasterScholarshipScheme from './AdminDashboard/MasterScholarshipScheme';
import Class from './AdminDashboard/Class';
import EditDonar from './AdminDashboard/EditDonar';
import SubAdmin from './AdminDashboard/SubAdmin';
import EditPermission from './AdminDashboard/EditPermission';
import Quiz from './AdminDashboard/Quiz';
import Winner from './AdminDashboard/Winner';
import PaymentPage from './AdminDashboard/PaymentPage';
import Correct from './AdminDashboard/Correct';
import AllDeposit from './AdminDashboard/AllDeposit';
import AllWithdraw from './AdminDashboard/AllWithdraw';
import Setting from './AdminDashboard/Setting';
import Faqs from './AdminDashboard/Faqs';
import SendNotification from './AdminDashboard/SendNotification';
import Slides from './AdminDashboard/Slides';
import AddSlide from './AdminDashboard/Components/AddSlide';
import SocialMedia from './AdminDashboard/SocialMedia';
import AddSocialLink from './AdminDashboard/Components/AddSocialLink';
import AddFaq from './AdminDashboard/Components/AddFaq';
import AllTransaction from './AdminDashboard/AllTransaction';
import AllExam from './AdminDashboard/AllExam';
import UserExam from './AdminDashboard/UserExam';
import KycManagment from './AdminDashboard/KycManagment';
import KycImages from './AdminDashboard/KycImages';

const Home = lazy(() => import('../src/Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const Articles = lazy(() => import('./Pages/Articles'));
const Doctors = lazy(() => import('./Pages/Doctors'));
const Login = lazy(() => import('./Pages/Login'));
const AdminLogin = lazy(() => import('./Pages/AdminLogin'));
const SingleMember = lazy(() => import('./Components/Members/SingleMember'));
const SinglePageArticles = lazy(() => import('./Components/Articles/SinglePageArticles/SinglePageArticls'));

const Pricing = lazy(() => import('./Pages/Pricing'));
const Register = lazy(() => import('./Pages/Register'));
const FreeRegister = lazy(() => import('./Pages/FreeRegister'));
const Layout2 = lazy(() => import('./Layout/Layout2'));
const Layout = lazy(() => import('./Layout/Layout'));

const App = () => {

  const userData = {
    role: localStorage.getItem('type') || ''
  }
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/*" element={<Layout userData={userData} />}>
            {/* <Route path="" element={<Home />} /> */}
            {/* <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="articles" element={<Articles />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="login" element={<Login />} /> */}
            <Route path="" element={<AdminLogin />} />
            {/* <Route path="register" element={<Register />} />
            <Route path="register-as-a-user" element={<FreeRegister />} />
            <Route path="pricing" element={<Pricing />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
            {/* <Route path="singlePageArticles" element={<SinglePageArticles />} />
            <Route path="singleMember" element={<SingleMember />} />
          <Route path="privacyPolicy" element={<PrivacyPolicy />} /> */}
          <Route path="verify-otp" element={<VerifyOtp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="admin-forgot-password" element={<AdminForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Route>




          {/* {
            userData && userData.role === "admin" ? */}
          <Route exact path={`/admin/*`} element={<Layout2 userData={userData} />}>
            <Route exact path="dashboard" element={<AdminDashboard />} />
            <Route exact path="profile" element={<Profile />} />
            <Route exact path='profile/edit' element={<AdminEditProfile />} />
            <Route exact path="quiz" element={<Quiz />} />
            <Route exact path="winners" element={<Winner />} />
            <Route exact path="all-users" element={<User />} />
            <Route path="kyc-management" element={<KycManagment />} />
            <Route path="kyc-images" element={<KycImages />} />
            <Route exact path="bonus-penalty" element={<BonusPenalty />} />
            <Route exact path="create-quiz" element={<CreateQuiz />} />
            <Route exact path="edit-donar" element={<EditDonar />} />
            <Route exact path="correct" element={<Correct />} />
            <Route exact path="all-deposit" element={<AllDeposit />} />
            <Route exact path="all-withdraw" element={<AllWithdraw />} />
            <Route exact path="setting" element={<Setting />} />
            <Route exact path="faqs" element={<Faqs />} />
            <Route exact path="send-notification" element={<SendNotification />} />
            <Route exact path="edit-permission" element={<EditPermission />} />
            <Route exact path="master-scholarship-scheme" element={<MasterScholarshipScheme />} />
            <Route exact path="slide" element={<Slides />} />
            <Route exact path="add-slide" element={<AddSlide />} />
            <Route exact path="social-link" element={<SocialMedia />} />
            <Route exact path="add-social-link" element={<AddSocialLink />} />
            <Route exact path="add-faq" element={<AddFaq />} />
            <Route exact path="edit-faq" element={<AddFaq />} />
            <Route exact path="transactions-list" element={<AllTransaction />} />
            <Route exact path="exams-list" element={<AllExam />} />
            <Route exact path="joined-user-list" element={<UserExam />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* : userData && userData.role === "user" ? */}
          {/* <Route exact path={`/user/*`} element={<Layout2 userData={userData} />}>
            <Route exact path='dashboard' element={<Dashboard />} />
            <Route exact path='documents-required' element={<DocumentRequired />} />
            <Route exact path='scholarship-history' element={<ScholarshipHistory />} />

            <Route exact path='scholarship-list' element={<ScholarshipPage />} />
            <Route exact path='scholarship-distribution-preferences' element={<ScholarshipDistributionPrefernce />} />
            <Route exact path='scholarship-distribution-details' element={<ScholarshipDistributionDetail />} />
            <Route exact path='donation-history' element={<DonationHistory />} />
            <Route exact path='profile' element={<Profilepage />} />
            <Route exact path='profile/edit' element={<EditProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route> */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
