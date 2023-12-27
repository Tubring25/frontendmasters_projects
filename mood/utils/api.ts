const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createEntry = async () => {
  const res = await fetch(createUrl("/api/journal"), {
    method: "POST",
    body: JSON.stringify({ content: "" })
  })

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const updateEntry = async (id, updates) => {
  const res = await fetch(
    new Request(createUrl(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Something went wrong on API server!')
  }
}