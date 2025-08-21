import { Outlet } from "react-router"
import CommonLayouts from "./layout/CommonLayouts"


function App() {


  return (
    <>
   <CommonLayouts>
    <Outlet></Outlet>
   </CommonLayouts>
    </> 
  )
}

export default App
