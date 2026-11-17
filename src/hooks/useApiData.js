import { useEffect, useState } from "react"
import { API_BASE_URL } from "../utils/contentHelpers"

// Fetches several endpoints in parallel. Returns their JSON in the same order.
const useApiData = (paths) => {
  const [state, setState] = useState({ data: null, isLoading: true, hasError: false })
  const [retryCount, setRetryCount] = useState(0)

  const pathKey = paths.join(",")

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const responses = await Promise.all(
          pathKey.split(",").map((path) =>
            fetch(`${API_BASE_URL}/${path}`, { signal: controller.signal })
          )
        )

        if (responses.some((response) => !response.ok)) {
          throw new Error("Failed to fetch content")
        }

        const data = await Promise.all(responses.map((response) => response.json()))
        setState({ data, isLoading: false, hasError: false })
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Content Error:", error)
          setState({ data: null, isLoading: false, hasError: true })
        }
      }
    }

    load()

    return () => controller.abort()
  }, [pathKey, retryCount])

  const reload = () => {
    setState({ data: null, isLoading: true, hasError: false })
    setRetryCount((previous) => previous + 1)
  }

  return { ...state, reload }
}

export default useApiData
