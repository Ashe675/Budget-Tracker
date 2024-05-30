import { useEffect, useMemo } from 'react';
import BudgetForm from './components/BudgetForm';
import { useBudget } from './hooks/useBudget';
import BudgetTracker from './components/BudgetTracker';
import ExpenseModal from './components/ExpenseModal';
import ExpenseList from './components/ExpenseList';
import FilterByCategory from './components/FilterByCategory';

function App() {
  // const context = useContext(BudgetContext)
  const {state } = useBudget()

  useEffect(()=>{
    localStorage.setItem('budget', state.budget.toLocaleString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state.budget, state.expenses])
 
  const isValidBudget = useMemo(()=> state.budget > 0, [state.budget])

  return (
    <>
      <header className=" bg-blue-600 py-8 max-h72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker/> :  <BudgetForm/>}
      </div>
      {isValidBudget && (
        <main className='max-w-3xl mx-auto py-10'>
          <FilterByCategory/>
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}
      
    </>
  )
}

export default App