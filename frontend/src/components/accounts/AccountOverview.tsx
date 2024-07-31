import React, { useEffect, useState } from 'react';
import { Button, ContentCard } from '..';
import { ButtonStyleEnums, ReturnCodes } from '../../library/enums';
import { Pencil } from 'lucide-react';
import { AccountDTO, BudgetDTO, SpinnerContextDTO } from '../../library/DTOs';
import { useSpinnerContext } from '../../contexts';
import { AccountService } from '../../services';

export const AccountOverview: React.FC<{}> = ({}) => {
  const [accounts, setAccounts] = useState<AccountDTO[]>([]);
  const spinnerContext = useSpinnerContext();
  const { setShowSpinner } = spinnerContext as SpinnerContextDTO;

  const fetchAccounts = async () => {
    setShowSpinner(true);
    try {
      const budgetDTO: BudgetDTO = { BudgetId: 1 };
      const result = await AccountService.getBudgetAccounts(budgetDTO);
      if (result.result && result.code == ReturnCodes.Success) {
        setAccounts(result.result);
        setShowSpinner(false);
      }
    } catch (error) {
      setShowSpinner(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return <>
    <ContentCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium ml-7">Accounts</h2>
        <Button icon={<Pencil size={18} />} onClick={ () => {}} style={ButtonStyleEnums.Default}/>
      </div>
      <table className="min-w-full text-center text-sm">
        <thead className="text-gray-400">
          <tr className="">
            <th scope="col" className="px-6 py-4 font-normal">Name</th>
            <th scope="col" className="px-6 py-4 font-normal">Account Type</th>
            <th scope="col" className="px-6 py-4 font-normal">Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4">{account.Name}</td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-400">{account.AccountTypeId}</td>
              <td className="whitespace-nowrap px-6 py-4">{account.Balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContentCard>
  </>;
}