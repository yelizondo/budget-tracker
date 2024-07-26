export type SidebarContextDTO = {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    expandedItem: number;
    setExpandedItem: (expandedItem: number) => void;
    expandedUserMenu: boolean;
    setExpandedUserMenu: (expandedUserMenu: boolean) => void;
    activeItem: number;
    setActiveItem: (item: number) => void;
};