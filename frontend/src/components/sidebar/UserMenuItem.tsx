import React, { ReactNode, useContext } from "react";
import { SidebarContext } from "../../contexts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SidebarContextDTO } from "../../library/DTOs";

export const UserMenuItem: React.FC<{ icon: ReactNode, text: string, action: () => void}> = ({ 
    icon, 
    text, 
    action
}) => {

    const context = useContext(SidebarContext);

    if (!context) {
      return <div>Loading...</div>;
    }
    const { expanded, expandedUserMenu } = context as SidebarContextDTO;

    return (
      <>
        <li className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            hover:bg-secondary text-gray-600
            ${!expandedUserMenu ? 'h-0 w-0':''}
        `}
        onClick={action}
        >
          {icon}
          <span
            className={`
              overflow-hidden transition-all
              ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            {text}
          </span>
        </li>
      </>
    );
}