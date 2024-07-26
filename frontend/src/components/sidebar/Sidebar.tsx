import React, { ReactNode, useEffect, useState } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { useAlertPopupContext, useAuthContext, useSidebarContext } from "../../contexts";
import { AlertPopupContextDTO, AuthContextDTO, ButtonDTO, SidebarContextDTO } from "../../library/DTOs";
import { Key } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { UserMenuItem } from "./UserMenuItem";
import { ButtonStyleEnums } from "../../library/enums";

export const Sidebar: React.FC<{children: ReactNode }> = ({ children }) => {
  const sidebarContext = useSidebarContext();
  const generalContext = useAuthContext();
  const alertPopupContext = useAlertPopupContext();

  if (!sidebarContext && !generalContext && !alertPopupContext) {
    return <div>Loading...</div>;
  }

  const { expanded, setExpanded, setExpandedUserMenu, expandedUserMenu } = sidebarContext as SidebarContextDTO;
  const { user, logout } = generalContext  as AuthContextDTO;
  const { showAlertPopup } = alertPopupContext as AlertPopupContextDTO;

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gc-white border-r shadow-sm">
        <div className={`p-4 pb-2 ${ expanded ? 'pl-6' : 'pl-0'} flex justify-between items-center`}>
          <img
            src="https://img.logoipsum.com/280.svg"
            alt="logo"
            className={`
              overflow-hidden transition-all text-gc-primary
              ${ expanded ? "w-26" : "w-0" }
            `}
          />
          <button
            onClick={() => setExpanded(!expanded) }
            className="p-1.5 rounded-lg bg-gc-white hover:bg-gc-secondary-hover"
          >
            { expanded ? <ChevronFirst /> : <ChevronLast /> }
          </button> 
        </div>
        <ul className="flex-1 px-3">{ children }</ul>
        <div className="border-t flex p-3">
          <img
            src={`https://ui-avatars.com/api/?background=98c1d9&color=293241&bold=true&name=${user.Name}`}
            className="w-10 h-10 rounded-md"
          alt="" />
          <div className={`
            flex  justify-between items-center
            overflow-hidden transition-all
            ${expanded ? "w-52 ml-3": "w-0"}
          `}>
            <div className="leading-4">
              <h4 className="font-semibold">{user.Name}</h4>
              <span className="text-sx gc-gray">{user.Email}</span>
            </div>
            <button
              onClick={() => setExpandedUserMenu(!expandedUserMenu)}
              className="p-1.5 rounded-lg bg-gc-white hover:bg-gc-secondary-hover hover:text-gc-grey"
            >
            <MoreVertical size={20} />
            </button>
          </div>
        </div>
        <div>
          <UserMenu>
            <UserMenuItem icon={<Key size={20} />} text="Cerrar Sesión" action={
              () => showAlertPopup('Confirmación', '¿Está seguro que desea cerrar sesión?', [
                {
                  title: 'Cerrar Sesión',
                  onClick: logout,
                  style: ButtonStyleEnums.Alert
                } as ButtonDTO
              ])
            } />
          </UserMenu>
        </div>
      </nav>
    </aside>
  );
}