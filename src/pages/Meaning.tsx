import React from 'react'

const Meaning = ({meaning, index}) => {
  return (
    <div className="mb-2px">{`${index+1} .${meaning}`}</div>
  )
}

export default Meaning;