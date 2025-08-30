import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
const App = () => {
  const [balance, setbalance] = useState(0);
  const [addisplay, setaddisplay] = useState(false);
  const [amount, setamount] = useState("");
  const [desc, setdesc] = useState("");
  const [type, settype] = useState("");
  const [outamt, setoutamt] = useState([]);
  const [outdesc, setoutdesc] = useState([]);
  const [ttltype, setttltype] = useState([]);
  const [ttlincome, setttlincome] = useState("");
  const [ttlexpense, setttlexpense] = useState("");

  const AddClick = () => {
    setaddisplay((prev) => !prev);
  };
  useEffect(() => {
    const total = localStorage.getItem("total");
    const totalincome = localStorage.getItem("totalincome");
    const totalexpense = localStorage.getItem("totalexpense");
    const outamount = localStorage.getItem("outamount");
    const outdescr = localStorage.getItem("outdescr");
    const totaltype = localStorage.getItem("totaltype");
    if (total) {
      setbalance(total);
    }
    if (totalincome) {
      setttlincome(totalincome);
    }
    if (totalexpense) {
      setttlexpense(totalexpense);
    }
    if (outamount) {
      setoutamt(JSON.parse(outamount));
    }
    if (outdescr) {
      setoutdesc(JSON.parse(outdescr));
    }
    if (totaltype) {
      setttltype(JSON.parse(totaltype));
    }
  }, []);
  // "total", "totalincome","totalexpense","outamount","outdescr","totaltype",
  useEffect(() => {
    localStorage.setItem("total", balance);
    localStorage.setItem("totalincome", ttlincome);
    localStorage.setItem("totalexpense", ttlexpense);
    localStorage.setItem("outamount", JSON.stringify(outamt));
    localStorage.setItem("outdescr", JSON.stringify(outdesc));
    localStorage.setItem("totaltype", JSON.stringify(ttltype));
  }, [balance, ttlexpense, ttlincome, outamt, outdesc, ttltype]);

  const transaction = () => {
    if (type == "Income") {
      setbalance(Number(balance) + Number(amount));
      setttlincome(Number(ttlincome) + Number(amount));
    } else if (type == "Expense") {
      setbalance(Number(balance) - Number(amount));
      setttlexpense(Number(ttlexpense) + Number(amount));
    } else {
    }
    setaddisplay(false);
    setoutamt((prev) => [...prev, amount]);
    setoutdesc((prev) => [...prev, desc]);
    setttltype((prev) => [...prev, type]);
    setamount("");
    setdesc("");
  };
  return (
    <>
      <h1>Expense Treacker App</h1>
      <div className="info">
        <h2>
          <div className="balance">Balance: {balance} </div>
          <div className="btn">
            <button onClick={AddClick} className="add">
              {addisplay ? "Cancel" : "Add"}
            </button>
          </div>
        </h2>
        <div className="total">
          <h2 className="td">
            {" "}
            <span className="aa">Total Income: {ttlincome}</span>
            <span className="bb">Total expense: {ttlexpense}</span>{" "}
          </h2>
        </div>
        { addisplay && <div
          className="transaction"
        >
          <span className="in">
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
          </span>
          <span className="ino">
            <input
              type="radio"
              name="hey"
              id="income"
              onChange={(e) => settype(e.target.value)}
              value={"Income"}
            />
            <label htmlFor="income" id="income2">
              Income
            </label>
            <input
              type="radio"
              name="hey"
              id="expense"
              onChange={(e) => settype(e.target.value)}
              value={"Expense"}
            />
            <label htmlFor="expense" id="expense2">
              Expense
            </label>
            <button className="addtra" onClick={transaction}>
              Add Transaction
            </button>
          </span>
        </div>}
        <div className="out">
          <h3>Transactions:</h3>
          <div className="transactions-list">
            {outamt.map((amt, i) => (
              <div className="transaction-row" key={i}>
                <span className="amount">₹{amt}</span>
                <span className="desc">{outdesc[i]}</span>
                <span
                  className={`type ${
                    ttltype[i] === "Income" ? "green" : "red"
                  }`}
                >{ttltype[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* </div> */}
      </div>
    </>
  );
};

export default App;
