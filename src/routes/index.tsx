
import App from '@/App'
import AdminLayout from '@/layout/AdminLayout'
import About from '@/pages/About'
import Analytics from '@/pages/Analytics'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import Verify from '@/pages/Verify'
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