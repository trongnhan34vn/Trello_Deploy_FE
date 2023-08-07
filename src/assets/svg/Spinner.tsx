import React from 'react'
import '../css/spinner.css'

export default function Spinner() {
  return (
    <div>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
