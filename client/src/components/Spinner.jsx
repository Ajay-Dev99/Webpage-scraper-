import React from 'react'
import { Spinner } from "flowbite-react";

function Spinner() {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="text-left">
        <Spinner aria-label="Left-aligned spinner example" />
      </div>
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
      <div className="text-right">
        <Spinner aria-label="Right-aligned spinner example" />
      </div>
    </div>
  )
}

export default Spinner
