const createUrl = (path: string) => {
  return window.location.origin + path
}

export const createEntry = async () => {
  const res = await fetch(createUrl("/api/journal"), {
    method: "POST",
    body: JSON.stringify({ content: "Hello World" })
  })

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const updateEntry = async (id, content) => {
  try {
    const res = await fetch(createUrl(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify(content)
    })
  
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
  } catch (error) {
    
  }
}