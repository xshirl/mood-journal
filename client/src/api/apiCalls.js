import api from "./apiConfig"

export const getJournals = async () => {
  try {
    const response = await api.get(`/journals`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getJournal = async (id) => {
  try {
    const response = await api.get(`/journals/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createJournal = async (payload) => {
  try {
    const response = await api.post("/journals", payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateJournal = async (id, payload) => {
  try {
    const response = await api.put(`/journals/${id}`, payload)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteJournal = async (id) => {
  try {
    const response = await api.delete(`/journals/${id}`)
  } catch (error) {
    throw error
  }
}


