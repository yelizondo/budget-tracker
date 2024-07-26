import React, { ReactNode, useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../contexts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SidebarContextDTO, SidebarPageDTO } from "../../library/DTOs";

export const SidebarItem: React.FC<{ children?: ReactNode, icon: ReactNode, page: SidebarPageDTO, alert?:boolean, route:string }> = ({ 
    children,
    icon, 
    page, 
    alert = false,
    route
}) => {

    const context = useContext(SidebarContext);
    if (!context) {
      return <div>Loading...</div>;
    }

    const { expanded, expandedItem, setExpandedItem, activeItem, setActiveItem } = context as SidebarContextDTO;

    return (
      <>
        <NavLink
          to={route}
          onClick={(e) => {
            setActiveItem(page.code);
            if (children) {
              e.preventDefault();
            }
          }}
        >
          <li
            className={`
              relative flex items-center py-2 px-3 my-1
              font-medium rounded-md cursor-pointer
              transition-colors group
              ${
                  activeItem == page.code 
                  ? "bg-gradient-to-r from-gc-secondary-hover to-gc-white text-gc-gray hover:to-gc-secondary-hover"
                  : "hover:bg-gc-secondary-hover text-gc-gray"
              }
            `}
            onClick={() => 
              setExpandedItem(page.code !== expandedItem ? page.code : 0)
            }
          >
              {icon}
              <span
                  className={`
                    overflow-hidden transition-all
                    ${expanded ? "w-52 ml-3" : "w-0"}
                  `}
              >
                {page.name}
              </span>
              { children && expanded && (<button
                onClick={() => setExpandedItem(page.code !== expandedItem ? page.code : 0) }
                className={`
                  p-1.5 rounded-lg bg-gc-white hover:bg-gc-secondary-hover
                  `}
              >
                { expandedItem !== page.code ? <ChevronDown size={13}/> : <ChevronUp size={13}/> }
              </button>)}

              {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-gc-white ${
                expanded ? "" : "top-2"
              }`} />}

              { !expanded && <div className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-gc-white text-gc-primary text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
              `}>{page.name}</div>}

          </li>
        </NavLink>
        {children && <div className={`
              overflow-hidden transition-all
              ${ expanded ? "" : "w-0" }
              ${ expandedItem == page.code ? "":"h-0"}
        `}>
          <ul className="flex-1 px-8">
            {children}
          </ul>
        </div>}
      </>
    );
}