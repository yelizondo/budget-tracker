import React, { ReactNode, useContext } from "react";
import { SidebarContext } from "../../contexts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SidebarContextDTO } from "../../library/DTOs";

export const UserMenu: React.FC<{ children?: ReactNode }> = ({ 
    children,
}) => {

    const context = useContext(SidebarContext);
    if (!context) {
      return <div>Loading...</div>;
    }
    const { expanded, expandedItem, setExpandedItem, expandedUserMenu } = context as SidebarContextDTO;

    return (
      <ul className="flex-1 px-6 ">
        { expanded && expandedUserMenu ? children : <></> }
      </ul>
    );
}