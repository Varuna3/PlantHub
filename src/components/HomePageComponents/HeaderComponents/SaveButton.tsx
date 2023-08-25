import { useState } from 'react'
import axios from 'axios'

interface props {
  counts: any[]
  setHasEdited: Function
}

const SaveButton: React.FC<props> = ({ counts, setHasEdited }) => {
  const [isSaved, setIsSaved] = useState(false)

  async function save(counts: any[]) {
    for (const key in counts) {
      const res = await axios.post('/api/count/update', {
        plantName: key,
        num: counts[key],
      })
    }
    return { success: true }
  }
  return (
    <>
      <button
        style={{
          backgroundColor: isSaved
            ? 'rgb(100, 255, 100)'
            : 'rgb(220, 220, 220)',
        }}
        onClick={async () => {
          const res = await save(counts)
          if (res.success) {
            setIsSaved(true)
          }
          setTimeout(() => {
            setIsSaved(false)
            setHasEdited(false)
          }, 1000)
        }}
      >
        Save
      </button>
    </>
  )
}

export default SaveButton