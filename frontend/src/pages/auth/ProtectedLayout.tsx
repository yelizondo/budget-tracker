import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import { AuthContextDTO } from '../../library/DTOs';
import { ReactNode } from 'react';
import { SidebarContextProvider } from '../../contexts';
import { Sidebar, SidebarItem, SidebarSubItem } from '../../components';
import {
  Award, BanknoteIcon, BarChart4, CogIcon, ArrowLeftRight, HomeIcon, BookCopy, SlidersHorizontal
} from 'lucide-react';
import { SidebarPagesEnums } from '../../library/enums';

export const ProtectedLayout = () => {
  const authContext = useAuthContext();
  const { user } = authContext as AuthContextDTO;

  if (!user.UserId) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <>
      <SidebarContextProvider>
        <Sidebar>
          <SidebarItem icon={<HomeIcon size={20} />} page={SidebarPagesEnums.Home} route="home" />
          <SidebarItem icon={<BookCopy size={20} />} page={SidebarPagesEnums.Accounts}  route="accounts" />
          <SidebarItem icon={<ArrowLeftRight size={20} />} page={SidebarPagesEnums.Transactions}  route="transactions" />
          <SidebarItem icon={<BarChart4 size={20} />} page={SidebarPagesEnums.Reports} route="" >
            <SidebarSubItem page={SidebarPagesEnums.SpendingReport} route="reports/spending" />
            <SidebarSubItem page={SidebarPagesEnums.IncomeReport} route="reports/income" />
            <SidebarSubItem page={SidebarPagesEnums.IncomeVsExpenseReport} route="reports/incomevsexpense" />
          </SidebarItem>
          <SidebarItem icon={<SlidersHorizontal size={20} />} page={SidebarPagesEnums.Management} route="" >
            <SidebarSubItem page={SidebarPagesEnums.UserManagement} route="settings/users" />
          </SidebarItem>
          <SidebarItem icon={<CogIcon size={20} />} page={SidebarPagesEnums.Settings} route="" />
        </Sidebar>
      </SidebarContextProvider>
      <Outlet />
    </>
  );
}