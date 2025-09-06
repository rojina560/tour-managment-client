
import App from '@/App'
import AdminLayout from '@/layout/AdminLayout'
import DashBoardLayout from '@/layout/DashBoardLayout'
import About from '@/pages/About'
import Analytics from '@/pages/admin/Analytics'

import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import Verify from '@/pages/verify'

import {createBrowserRouter} from 'react-router'
export const  router = createBrowserRouter([{
   Component:App,
   path:'/',
   children:[
    {
      Component:About,
      path:"about"
    },
    {
      Component:DashBoardLayout,
      path: '/admin',
      children:[{
        Component: Analytics,
        path:'analytics'

      }]
    },
    {
      Component:DashBoardLayout,
      path: '/user',
      children:[
        {
          Component:Analytics,
          path:'bookings'
        }
      ]
    },
    {
      Component:Login,
      path:'login'
    },
    {
      Component:Registration,
      path:'register'
    },
    {
      Component:Verify,
      path:'verify'
    }
   ]
},{
    Component:AdminLayout,
    path:'/admin',
    children:[{
        Component: Analytics,
        path:"analytics"
    }]
}])