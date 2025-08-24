import { useCallback, useState } from "preact/hooks"
import type { QueryResult } from "@/types/query-result"

type UseQueryBaseResult<T> = {
  handleSuccess: (data: T) => void
  handleError: (error: Error) => void
  queryResult: QueryResult<T>
}

const createQueryResult = <T>(
  data: T | null,
  error: Error | null
): QueryResult<T> => {
  if (error === null) {
    if (data === null) {
      return { status: "loading" }
    }

    return { status: "success", data }
  }

  return { status: "error", error }
}

/** @package */
export const useQueryBase = <T>(): UseQueryBaseResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const handleSuccess = useCallback((data: T) => {
    setData(data)
    setError(null)
  }, [])

  const handleError = useCallback((error: Error) => {
    setData(null)
    setError(error)
  }, [])

  const queryResult = createQueryResult(data, error)

  return {
    handleSuccess,
    handleError,
    queryResult,
  }
}
