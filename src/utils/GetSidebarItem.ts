import { role } from "@/constant/Role";
import { adminSidebarItems } from "@/routes/AdminSidebar";
import { userSidebarItems } from "@/routes/UserSidebar";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole:TRole)=>{
    switch (userRole) {
        case role.superAdmin:
            
            return [...adminSidebarItems];
            case role.admin : 
            return [...adminSidebarItems]
            case role.user:
            return [...userSidebarItems]
    
        default:
          return [









          ]
    }

}