const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];

  const showForm  = isDeposit != "";


  console.log(`ATM isDeposit: ${isDeposit} | isValid: ${isValid}`);

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>       
        <div>
          <input id="number-input" type="number" width="200" onChange={onChange}></input>
          <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid} ></input>
        </div>      
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(false);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {

    debugger;
    let amount = Number(event.target.value);

    console.log(`handleChange ${amount}`);

    if(amount <= 0){
      setValidTransaction(false)
      return;
    }

    if(atmMode == "Cash Back" && amount > totalState)
    {
      setValidTransaction(false);
    }
    else
    {
      setValidTransaction(true);
    }

    setDeposit(amount);
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
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
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction} ></ATMDeposit>
      }
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
