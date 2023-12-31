import { Form } from "./components/Form/Form";
import { Header } from "./components/Header/Header";
import { Resume } from "./components/Resume/Resume";
import MoonLoader from "react-spinners/MoonLoader";
import { GlobalStyle } from "./styles/global";
import { useState, useEffect } from "react";

export default function App() {

  const [loading, setLoading] = useState(false);
  
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);
  const [total, setTotal] = useState(0);
  
  const [transactionList, setTransactionList] = useState([]);

  function getResultsApi() {
    setLoading(true);
    fetch("https://controle-de-financas-backend.onrender.com/api/finances")
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);        
        return setTransactionList(response.amount)        
      });
  }

  
  
  useEffect((transaction) => {
    getResultsApi(transaction)
  },[]) 
  

  useEffect(() => {
    const amountOutcome = transactionList
      .filter((item) => item.outcome)
      .map((transaction) => transaction.value);

    const amountIncome = transactionList
      .filter((item) => !item.outcome)
      .map((transaction) => transaction.value);

    const outcomeTotal = amountOutcome
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const incomeTotal = amountIncome
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const amountTotal = Math.abs(incomeTotal - outcomeTotal).toFixed(2);

    setIncome(`R$ ${incomeTotal}`);
    setOutcome(`R$ ${outcomeTotal}`);

    setTotal(`${Number(incomeTotal) < Number(outcomeTotal) ? "-" : ""} R$ ${amountTotal}`);
  }, [transactionList]);


  function handleAdd(transaction) {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    };

    fetch("https://controle-de-financas-backend.onrender.com/api/finances", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        getResultsApi()
      })
      .catch((error) => {
        console.error("Erro ao adicionar a transação:", error);
      });
    }


  return loading ? (
    <>
      <Header />
      <Resume income={income} outcome={outcome} total={total} />
      <div className="loader">
      <MoonLoader color={"black"} loading={loading} size={80} />
      </div>
      <GlobalStyle />
    </>
  ) : (
    <>
      <Header />
      <Resume income={income} outcome={outcome} total={total} />
      <Form
        handleAdd={handleAdd}
        transactionList={transactionList}
        setTransactionList={setTransactionList}
      />
      <GlobalStyle />
    </>
  );
}

