
import { useState } from 'react';


function App() {
  const expenses = [
    {
      "name" : "Mutfak Masrafı",
      "amount" : "300",
      "id" : 1
    },
    {
      "name" : "Kira Masrafı",
      "amount" : "3000",
      "id" : 2
    }
  ];
  const [income,setIncome] = useState(0);
  const [lastId,setLastId] = useState(2);
  const [totalExpense,setTotalExpense] = useState(3300);
  const [budgetStatus,setBudgetStatus] = useState(-3300);
  const [expenseForm,setExpenseForm] = useState({"name":"","amount":""});
  const [incomeForm,setIncomeForm] = useState("");
  const [expenseList,setExpenseList] = useState(expenses);
  
  const handleChangeExpense = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    setExpenseForm({
      ...expenseForm,
      "id": lastId + 1,
      [name]:val,
    });
  }
  const handleChangeIncome = (e) => {
    setIncomeForm(e.target.value);
  }
  
  const incomeSubmit = (e) => {
    e.preventDefault();
    if(incomeForm != ""){
      setIncome(Number(incomeForm));
      setBudgetStatus(Number(incomeForm) - totalExpense);
    }
  }


  const addExpense = (e) => {
    e.preventDefault();
    expenseList.push(expenseForm);
    setLastId((prev) =>  prev+ 1);
    
    setTotalExpense((prev) => prev + Number(expenseForm.amount));
    setBudgetStatus((prev) =>  prev - Number(expenseForm.amount));
  }

  const deleteExpense = (id) => {
    expenseList.forEach(item => {
      if(item.id === id){
        
        let index = expenseList.indexOf(item);
        expenseList.splice(index,1);
        let deletedAmount = item.amount;
        
        setTotalExpense((prev) => prev - Number(deletedAmount));
        setBudgetStatus((prev) =>  prev + Number(deletedAmount));
      }
    });
    
  }

  return (
    
    <div className="App">
      
        <div className='container'>
        <h2 className='mt-2'>Bütçe Hesaplama</h2>
        <hr/>
          <div className='row'>
          {/* <pre>{JSON.stringify(expenseList,null,2)}</pre> */ }
            <div className='col-md-6'>
              <h4>Gider Ekle</h4>
              <form className='form d-flex flex-column my-4' onSubmit={(e) => addExpense(e)}>
                  <input className='field mb-4 form-control' name='name' placeholder='Gider ismi' onChange={(e) => handleChangeExpense(e)} value={expenseForm.name}/>
                  <input className='field mb-4 form-control' type="number" name='amount' placeholder='Gider Miktarı' onChange={(e) => handleChangeExpense(e)} value={expenseForm.amount}/>
                  <button className='btn btn-success mx-2' type='submit'>Gider Ekle</button>
              </form>
            </div>
            <div className='col-md-6'>
              <h4>Geliri Düzenle</h4>
              <form className='form d-flex flex-column my-4' onSubmit={(e) => incomeSubmit(e)}>
                  <input className='field mb-4 form-control' name='income' placeholder='Gelir Miktarı' onChange={(e) => handleChangeIncome(e)} value={incomeForm}/>
                  <button className='btn btn-success mx-2' type='submit'>Geliri Düzenle</button>
              </form>
            </div>
          </div>
          <h3 className='my-5'>Giderler</h3>
          <hr/>
          <table className='table table-bordered'>
            <thead>
              <tr>
              <th>Gider İsmi</th>
              <th>Gider Miktari</th>
              <th>İşlemler</th>
              </tr>
              
            </thead>
            <tbody>
              
              {expenseList.map(expense => (
                  <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.amount} TL</td>
                  <td className='btns'>
                    <button className='btn btn-danger' onClick={() => deleteExpense(expense.id)}>Gideri Sil</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
          <hr/>
          <h3 className='my-5'>Toplam Gider : {totalExpense} TL</h3>
          <h3 className='my-5'>Toplam Gelir : {income} TL</h3>
          {budgetStatus <= 0 ? <h3 className='my-5 p-2  d-flex justify-content-between bg-danger text-white'>Durum: daha dikkatli harca !    <span>{budgetStatus} TL</span></h3> : <h3 className='my-5 p-2  d-flex justify-content-between bg-success text-white'>Durum: ekonomin artıda !    <span>{budgetStatus} TL</span></h3>}
          
        </div>
    </div>
  );
}

export default App;
