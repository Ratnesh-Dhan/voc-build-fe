import React, { useEffect } from 'react'

const Meaning = ({meaning, index}) => {
  useEffect(()=> {
  })
  return (
    <div className="mb-2px">{`${index+1} .${meaning}`}</div>
  )
}

export default Meaning;
