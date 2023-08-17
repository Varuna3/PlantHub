import { useState } from 'react'
import axios from 'axios'

const SaveButton = ({ counts }) => {
  const [isSaved, setIsSaved] = useState(false)

  async function save(counts) {
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
        style={{ backgroundColor: isSaved ? 'green' : 'white' }}
        onClick={async () => {
          const res = await save(counts)
          if (res.success) {
            setIsSaved(true)
          }
          setTimeout(() => {
            setIsSaved(false)
          }, 1000)
        }}
      >
        Save
      </button>
    </>
  )
}

export default SaveButton
