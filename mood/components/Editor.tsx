'use client'

import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from 'react-autosave'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)
  const { subject, summary, mood, negative, color } =  analysis
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False'},
  ]

  useAutosave({
    data: value,
    onSave: async (_text) => {
      if (_text === entry.content) return
      setIsLoading(true)

      const {data} = await updateEntry(entry.id, { content: _text })
      
      console.log('updated', data)
      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  return <div className="w-full h-full grid grid-cols-3  ">
    <div className="col-span-2">
      {isLoading && <div>loading....</div>}
      <textarea className="w-full h-full p-8 text-xl" value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
    <div className="border-l border-black/10">
      <div className="px-6 py-10" style={{ backgroundColor: color }}>
        <h2 className="text-2xl">Analysis</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((data) => (
            <li key={data.name}>
              <div className="px-2 py-4 flex justify-between items-center border-b border-t border-black/10">
                <span className="text-lg">{data.name}</span>
                <span>{data.value}</span>
              </div>
            </li>
          )
          )}
        </ul>
      </div>
    </div>
  </div>
}

export default Editor