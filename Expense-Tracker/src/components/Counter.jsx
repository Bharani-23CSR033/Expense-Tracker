import React, { useEffect } from 'react'
import { useState } from 'react';

function Counter() {
    const [count1, setCount1] =useState(0);
    const [count2, setCount2] =useState(0);
    const increaseCount1 = () => {
        setCount1(count1 + 1);
    }
    const increaseCount2 = () => {
        setCount2(count2 + 1);
    }
    useEffect(() => {
        console.log("Changing", count1,count2);
    }, [count1, count2]);
    console.log("rendering");

  return (<div>
    <div>Counter</div>
    <h2>count1: {count1}</h2>
    <h2>count2: {count2}</h2>
    <button onClick= {increaseCount1}>Increase 1</button>
    <button onClick= {increaseCount2}>Increase 2</button> 
    </div>
  )
}

export default Counter