import React from 'react'

function TrimmedText({link,index}) {
    
    const trimText = (str)=>{    
        let maxLength = 30;  
        let truncatedStr =str && str.length>maxLength ? str.substring(0, maxLength) + "..." : str;  
          return truncatedStr;
    }  

    return (
    <div>
      <a className='text-blue-600 underline' href={link}>{index}.{trimText(link)}</a>
    </div>
  )
}

export default TrimmedText
