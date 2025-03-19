// All components mapping with path for internal routes

import { lazy } from 'react'
import FeedbackForm from '../features/Feedback'
import FAQPage from '../features/settings/FAQ'
import FinanceAccounting from '../features/leads copy'
import TroubleShoot from '../features/leads copy 2'
import CallBackRequest from '../features/leads copy 3'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const ViewProducts=lazy(()=>import('../pages/protected/View'))
const RequestDemo = lazy(() => import('../pages/protected/RequestDemo'))
const BookDemo=lazy(()=>import('../pages/protected/BookDemo'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const Registration = lazy(() => import('../pages/protected/ProfileSettings'))
const Manual=lazy(()=>import('../pages/protected/ManuSetting'))
const Address=lazy(()=>import ('../pages/Address'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const PrivacyPolicy=lazy(()=>import('../pages/PrivacyPolicy'))
const TermofServie=lazy(()=>import('../pages/TermofService'))
const EditProfile=lazy(()=>import('../pages/protected/EditProfile'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'));
const Teams =lazy(()=>import('../pages/protected/Category'))
const Feedback = lazy(() => import('../pages/protected/Feedback'))
const Carrier = lazy(() => import('../pages/protected/Carrier'))
const ServiceList=lazy(()=>import('../pages/protected/Order'));
const ViewTestimonial=lazy(()=>import('../pages/protected/Blog'));
const ChangePassword=lazy(()=>import('../pages/protected/ChangePassword'))
const About=lazy(()=>import('../pages/protected/About'));

const routes = [
  { // the url
  component: Dashboard, // view rendered
  },
  // {
  //   path: '/welcome', // the url
  //   component: Welcome, // view rendered
  // },
  // {
  //   path: '/leads',
  //   component: Leads,
  // },
  {
    path: '/team',
    component: Teams,
  },
  // {
  //   path: '/About',
  //   component: About,
  // },
  // {

  //   path: '/View',
  //   component: ViewProducts,
  // },
  {
    path: '/Career',
    component: Carrier,
  },
  {
    path: '/Job',
    component: FinanceAccounting,
  },
  {
    
    path: '/Service',
    component: ServiceList,
  },
  {
    
    path: '/testimonial',
    component: ViewTestimonial
  },
  // {
  //   path: '/troubleshoot',
  //   component: TroubleShoot,
  // },
  // {
  //   path: '/callback',
  //   component: CallBackRequest,
  // },
  // {
  //   path: '/RequestDemo',
  //   component: RequestDemo,
  // },
  // {
  //   path: '/BookDemo',
  //   component: BookDemo,
  // },
  // {
  //   path: '/Feedback',
  //   component: Feedback,
  // },
  // {
  //   path: '/settings-team',
  //   component: Team,
  // },
  // {
  //   path: '/calendar',
  //   component: Calendar,
  // },
  // {
  //   path: '/transactions',
  //   component: Transactions,
  // },
  // {
  //   path: '/Register',
  //   component: Registration,
  // },
  // {
  //   path: '/Manual',
  //   component: Manual,
  // },
  // {
  //   path: '/EditProfile',
  //   component: EditProfile,
  // },
  // {
  //   path:'/ChangePassword',
  //   component:ChangePassword,
  // },

  // {
  //   path: '/Address',
  //   component: Address,
  // },
  // {
  //   path: '/settings-billing',
  //   component: Bills,
  // },
  // {
  //   path: '/getting-started',
  //   component: GettingStarted,
  // },
  // {
  //   path: '/PrivacyPolicy',
  //   component: PrivacyPolicy,
  // },
  // {
  //   path: '/Faq',
  //   component: FAQPage,
  // },
  // {
  //   path: '/termofservice',
  //   component:TermofServie ,
  // },
  // {
  //   path: '/features',
  //   component: DocFeatures,
  // },
  // {
  //   path: '/components',
  //   component: DocComponents,
  // },
  // {
  //   path: '/integration',
  //   component: Integration,
  // },
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes
