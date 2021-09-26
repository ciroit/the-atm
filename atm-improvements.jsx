const ATMDeposit = ({ onChange, isDeposit, isValid, amount }) => {
  const choice = ['Deposit', 'Cash Back'];

  const showForm  = isDeposit != "";


  console.log(`ATM isDeposit: ${isDeposit} | isValid: ${isValid}`);

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>       
        <div>
          <input id="number-input" value={amount} type="number" width="200" onChange={onChange}></input>
          <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} ></input>
        </div>      
    </label>
  );
};

const History = ({movements}) => {

  return (
    <> 
      <br/>
      <h2>History : </h2>
      <ul>
        {movements.map(movement => {
          return <li>{`${movement}`}</li>
        })}
      </ul>
    </>

  );

}

const Account = () => {
  const [amount, setAmount] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(false);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [movements, setMovements] = React.useState([]);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {

    let amountTemp = Number(event.target.value);

    console.log(`handleChange ${amountTemp}`);

    if(amountTemp <= 0){
      setValidTransaction(false)
      return;
    }

    if(atmMode == "Cash Back" && amountTemp > totalState)
    {
      setValidTransaction(false);
    }
    else
    {
      setValidTransaction(true);
    }

    setAmount(amountTemp);
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + amount : totalState - amount;
    setTotalState(newTotal);
    setValidTransaction(false);

    debugger;

    let movement = `${isDeposit ? 'Deposit | +' : 'Cashback | -'}${amount}`;

    setMovements([...movements, movement]);
    setAmount(0);
    
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    
    let isDeposit = event.target.value == "Deposit";

    setAtmMode(event.target.value);
    setIsDeposit(isDeposit);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {
        (atmMode!="") &&
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction} amount={amount}></ATMDeposit>        
      }
      <History movements = {movements} ></History>
    </form>
  );
};

// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));