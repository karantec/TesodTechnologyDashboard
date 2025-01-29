/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import { MdCampaign } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { FaBookBookmark } from "react-icons/fa6";
import { VscFeedback } from "react-icons/vsc";
import { RiChatPrivateFill } from "react-icons/ri";
import { TbLetterMSmall } from "react-icons/tb";
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  {
    path: '/app/leads', // url
    icon: <MdCampaign className={iconClasses}/>, // icon component
    name: 'Campaign', // name that appear in Sidebar
  },
  {
    path: '/app/finanace', // url
    icon: <MdCampaign className={iconClasses}/>, // icon component
    name: 'Finance Accounting', // name that appear in Sidebar
  },
  {
    path: '/app/troubleshoot', // url
    icon: <MdCampaign className={iconClasses}/>, // icon component
    name: 'TroubleShooting', // name that appear in Sidebar
  },
  {
    path: '/app/callback', // url
    icon: <MdCampaign className={iconClasses}/>, // icon component
    name: 'Callback Request', // name that appear in Sidebar
  },
  {
    path: '/app/RequestDemo', // url
    icon: <VscGitPullRequestNewChanges className={iconClasses}/>, // icon component
    name: 'RequestDemo', // name that appear in Sidebar
  },
  {
    path: '/app/BookDemo', // url
    icon: <FaBookBookmark className={iconClasses}/>, // icon component
    name: 'BookDemo', // name that appear in Sidebar
  },
  {
    path: '/app/Feedback', // url
    icon: <VscFeedback className={iconClasses}/>, // icon component
    name: 'Feedback', // name that appear in Sidebar
  },
  {
    path: '/app/welcome', //url
    icon: <UserIcon className={submenuIconClasses}/>, // icon component
    name: 'Welcome', // name that appear in Sidebar
  },
      

  

  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Profile', // name that appear in Sidebar
    submenu : [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Login',
      },

      {
        path: '/app/Register', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Register', // name that appear in Sidebar
      },
    

      {
        path: '/app/ChangePassword', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'ChangePassword', // name that appear in Sidebar
      },
      {
        path: '/app/EditProfile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Edit Profile', // name that appear in Sidebar
      },
      {
      path: '/app/Manual', //url
      icon: <UserIcon className={submenuIconClasses}/>, // icon component
      name: 'Manual', // name that appear in Sidebar
    },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses}/>,
        name: 'Forgot Password',
      },
      {
        path: '/Verify-otp',
        icon: <KeyIcon className={submenuIconClasses}/>,
        name: 'OTP Verification',
      },
      {
        path: '/reset-password',
        icon: <DocumentIcon className={submenuIconClasses}/>,
        name: 'Reset Password',
      },
      {
        path: '/app/address',
        icon: <DocumentIcon className={submenuIconClasses}/>,
        name: 'Address',
      },

     
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/PrivacyPolicy', //url
        icon: <RiChatPrivateFill className={submenuIconClasses}/>, // icon component
        name: 'Privacy Policy', // name that appear in Sidebar
      },
      {
        path: '/app/termofservice',
        icon: <TbLetterMSmall className={submenuIconClasses}/>,
        name: 'Terms and Conditions',
      },
      {
        path: '/app/Faq',
        icon: <TbLetterMSmall className={submenuIconClasses}/>,
        name: 'FAQ',
      },
     
    ]
  },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
  //   name: 'Documentation', // name that appear in Sidebar
  //   submenu : [
  //     {
  //       path: '/app/getting-started', // url
  //       icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
  //       name: 'Getting Started', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/features',
  //       icon: <TableCellsIcon className={submenuIconClasses}/>, 
  //       name: 'Features',
  //     },
  //     {
  //       path: '/app/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
  //       name: 'Components',
  //     }
  //   ]
  // },
  
]

export default routes


