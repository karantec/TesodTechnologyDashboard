// All components mapping with path for internal routes

import { lazy } from 'react'

import FinanceAccounting from '../features/leads copy'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))

const Contacts=lazy(()=>import('../pages/protected/Contact'))
const Partnership=lazy(()=>import('../pages/protected/Partnership'))
const Teams =lazy(()=>import('../pages/protected/Category'))
const Servicing=lazy(()=>import('../pages/protected/Service'))
const Carrier = lazy(() => import('../pages/protected/Carrier'))
const ServiceList=lazy(()=>import('../pages/protected/Order'));
const ViewTestimonial=lazy(()=>import('../pages/protected/Blog'));
const Blog=lazy(()=>import('../pages/protected/Blogs'))
const About=lazy(()=>import('../pages/protected/Gallery'));
const Callback=lazy(()=>import('../pages/protected/Callbacks'))
const Internships=lazy(()=>import('../pages/protected/Internship'));
const routes = [
  { // the url
  component: Dashboard, // view rendered
  },

  {
    path: '/croursel',
    component: Teams,
  },
 
  {
    path: '/team',
    component: Teams,
  },
  
  {
    path: '/About',
    component: About,
  },
  {
    path: '/Gallery',
    component: About,
  },
  {
    path: '/Blog',
    component:Blog,
  },
  {
    path: '/Callback',
    component:Callback,
  },
  {
    path: '/internship',
    component:Internships,
  },


  {
    path: '/Career',
    component: Carrier,
  },
  {
    path: '/Job',
    component: FinanceAccounting,
  },
  {
    path: '/Services',
    component: Servicing,
  },
  {
    
    path: '/Product',
    component: ServiceList,
  },
  {
    
    path: '/testimonial',
    component: ViewTestimonial
  },
  {
    
    path: '/Contact',
    component: Contacts
  },
  {
    
    path: '/Partnership',
    component: Partnership
  },

  
]

export default routes
