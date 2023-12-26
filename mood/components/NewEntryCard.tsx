"use client";

import { createEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard: React.FC = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createEntry()
    router.push(`/journal/${data.id}`)
  }
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntryCard