import React, { useState } from 'react'

let i = 0;
export default function Home() {
  const [list, setList] = useState([]);
  
  const add = () => {
    console.log(list)
    setList(list => 
      list.concat(
        <button 
          key={i} 
          onClick={add}>
          {i++}
        </button>
      )
    );
    
  };
  // const add = () => {
  //   console.log(list)
  //   setList(
  //     list.concat(
  //       <button 
  //         key={i} 
  //         onClick={add}>
  //         {i++}
  //       </button>
  //     )
  //   );
    
  // };
  return (
    <>
		{console.log(list)}
		<button onClick={add}>Add</button>
		{list.map(val => val)}

    </>

  )
}
