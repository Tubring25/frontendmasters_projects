'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)
    console.log(answer)
    setResponse(answer)
    setLoading(false)
    setValue('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} disabled={loading} placeholder='Ask Anything' onChange={onChange} className='border border-black/20 px-4 py-2 mr-2 text-lg rounded-lg ' />
        <button type='submit' disabled={loading} className='bg-blue-400 px-4 py-2 rounded-lg text-lg text-white'>Ask </button>
      </form>
      {loading && <p className='text-lg'>Loading...</p>}
      {response && <p className='text-lg'>{response}</p>} 
    </div>
  )
}

export default Question