import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

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
        className='round header-button'
        onClick={async () => {
          const res = await save(counts)
          if (res.success) {
            toast.success('Success!', {
              style: { background: '#73e2a7' },
            })
            setHasEdited(false)
          } else {
            toast.error('Something went wrong.', {
              style: { background: '#d52941' },
            })
          }
        }}
      >
        Save
      </button>
    </>
  )
}

export default SaveButton
