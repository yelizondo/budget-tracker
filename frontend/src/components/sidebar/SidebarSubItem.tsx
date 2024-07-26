import React from "react";
import { NavLink } from 'react-router-dom';
import { useSidebarContext } from "../../contexts";
import { SidebarContextDTO, SidebarPageDTO } from "../../library/DTOs";

export const SidebarSubItem: React.FC<{page: SidebarPageDTO , route:string }> = ({
    page, 
    route
}) => {
    const context = useSidebarContext();
    const { activeItem, setActiveItem } = context as SidebarContextDTO;
    return (<>
    <NavLink 
        to={route}
        onClick={(e) => {
            setActiveItem(page.code);
        }}
    >
        <li className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${
                activeItem == page.code
                ? "bg-gradient-to-r from-gc-secondary-hover to-gc-white hover:to-gc-secondary-hover text-gc-gray"
                : "hover:bg-gc-secondary-hover text-gc-gray"
            }
        `}
        >
            <span>{page.name}</span>
        </li>
    </NavLink>
    </>);
}