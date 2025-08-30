import { useState } from 'react';
import { useEffect } from 'react';
const Hey = () => {
  const [name, setName] = useState("");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("array");
    if (saved) {
      console.log("Loaded from storage:", saved);
      setArr(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    console.log("Saving to storage:", arr);
    localStorage.setItem("array", JSON.stringify(arr));
  }, [arr]);

  const addData = () => {
    if (name.trim() !== "") {
      setArr((prev) => [...prev, name]); 
      setName("");
    }
  };
  const deleteItem = (index)=>{
   setArr(prev => [prev.filter((_,i)=>i !== index)])
  }
  return (
    <>
      <div style={{ padding: 20 }}>
      <h2>LocalStorage Array Test</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addData}>Add</button>

      <ul>
        {arr.map((item, i) => (
          <li key={i}>{item}
      <button onClick={()=>deleteItem(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Hey
