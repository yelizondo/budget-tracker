import React, { ReactNode, useContext, useState} from "react";
import { SidebarContext } from './SidebarContext';
import { SidebarContextDTO } from "../../library/DTOs";
import { SidebarPagesEnums } from "../../library/enums";

export const SidebarContextProvider: React.FC<{ children: ReactNode}> = ({ children }) => {

    const [expanded, setExpandedCustom] = useState<boolean>(true);
    const [activeItem, setActiveItem] = useState<number>(1);
    const [expandedItem, setExpandedItemCustom] = useState<number>(0);
    const [expandedUserMenu, setExpandedUserMenuCustom] = useState<boolean>(false);

    const setExpanded = (expanded: boolean): void => {
        setExpandedCustom(expanded);
        setExpandedItemCustom(0);
        setExpandedUserMenuCustom(false);
    };

    const setExpandedItem = (expandedItem: number): void => {
        if (expanded) {
            setExpandedItemCustom(expandedItem);
        }
    };

    const setExpandedUserMenu = (expandedUserMenu: boolean): void => {
        if (expanded) {
            setExpandedUserMenuCustom(expandedUserMenu);
        }
    }

    const contextValues: SidebarContextDTO = {
        expanded,
        setExpanded,
        expandedItem,
        setExpandedItem,
        expandedUserMenu,
        setExpandedUserMenu,
        activeItem,
        setActiveItem
    };

    return (
        <SidebarContext.Provider value={contextValues}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => useContext(SidebarContext);