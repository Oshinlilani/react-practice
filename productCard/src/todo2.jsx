import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';

export default function Todo2() {

  const [number, setNumbers] = useState(10);
  const [count, setCount] = useState(0)

  const doubleNumber = useMemo(() => {
    console.log("running...")
    return number * 2;
  }, [number])
 
  return (
    <div>

      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase count</button>

      <h2>Double Number {doubleNumber}</h2>
      <button onClick={() => setNumbers(number + 1)}>Number</button>
     
    </div>
  );
}
