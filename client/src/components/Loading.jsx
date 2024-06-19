import React from 'react'
import { Spinner } from "flowbite-react";

function Loading() {
   return (
    <div className='h-screen flex justify-center items-center'>
        <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
   )

}

export default Loading
