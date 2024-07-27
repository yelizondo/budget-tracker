//#region Imports
import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Transactions,
  Accounts,
  IncomeVsExpenseReport,
  IncomeReport,
  SpendingReport,
  Login,
  Signup,
  ProtectedLayout,
  UserManagement,
} from './pages';

import { useAuthContext } from './contexts/AuthContext/AuthContextProvider';
import { AuthContextDTO, LocalStorageSessionDTO, SpinnerContextDTO } from './library/DTOs';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AlertPopup, Spinner } from './components';
import { LocalStorageHandler } from './library/utils';
import { useSpinnerContext } from './contexts';
//#endregion

function App() {
  const [promt, setPrompt] = useState<boolean>(true);
  const context = useAuthContext();
  const spinnerContext = useSpinnerContext();
  const navigate = useNavigate();

  const { user, fetchUser } = context as AuthContextDTO;
  const { setShowSpinner } = spinnerContext as SpinnerContextDTO;

  const checkLocalStorage = () => {
    const localStorageSession: LocalStorageSessionDTO = LocalStorageHandler.getUserSession();

    if (!user.UserId && localStorageSession.user.UserId && localStorageSession.token) {
      fetchUser(localStorageSession)
      .then(result => {
        setShowSpinner(false)
        navigate('/');
      })
      .catch(error => {
        setShowSpinner(false);
      });
    }
  }

  useEffect(() => {
    checkLocalStorage();
  },[context]);

  useEffect(() => {
    setShowSpinner(false);
  });

  return <>
    <div className="flex" id='app'>
        <Spinner />
          <>
            <AlertPopup />
            <Routes>
              <Route path='/auth/login' element={<Login />} />
              <Route path='/auth/signup' element={<Signup />} />
              <Route path="/" element={<ProtectedLayout />}>
                <Route path='/' element={<Navigate replace to='/home'/>}/>
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/home" element={<Home />} />
                <Route path="/management/users" element={<UserManagement />} />
                <Route path="/reports/income" element={<IncomeReport />} />
                <Route path="/reports/incomevsexpense" element={<IncomeVsExpenseReport />} />
                <Route path="/reports/spending" element={<SpendingReport />} />
                <Route path='*' element={<Navigate replace to='/'/>}/>
              </Route>
            </Routes>
          </>
    </div>
  </>;
}

export default App;
