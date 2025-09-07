import { Outlet } from "react-router"
import CommonLayouts from "./layout/CommonLayouts"
import { generatedRoutes } from "./utils/GeneratedRoutes";
import { adminSidebarItems } from "./routes/AdminSidebar";


function App() {

console.log(generatedRoutes(adminSidebarItems));
  return (
    <>
   <CommonLayouts>
    <Outlet></Outlet>
   </CommonLayouts>
    </> 
  )
}

export default App
