import { Dexie } from "dexie"
import { useEffect } from "preact/hooks"
import { useQueryBase } from "@/hooks/use-query-base/use-query-base"

export const useLiveQuery = <T>(queryFunc: () => Promise<T> | T) => {
  const { handleSuccess, handleError, queryResult } = useQueryBase<T>()

  useEffect(() => {
    const handleUnknownError = (error: unknown) => {
      if (error instanceof Error) {
        handleError(error)
      } else {
        handleError(new Error(String(error)))
      }
    }

    const observable = Dexie.liveQuery(queryFunc)
    const subscription = observable.subscribe(handleSuccess, handleUnknownError)
    return () => subscription.unsubscribe()
  }, [queryFunc])

  return queryResult
}
