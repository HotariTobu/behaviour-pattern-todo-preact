import { useRef } from "preact/hooks"
import type { MutateResult } from "@/types/mutate-result"

type UseMutateResult<P extends unknown[], R> = [
  () => boolean,
  (...params: P) => Promise<MutateResult<R>>,
]

export const useWeakMutate = <P extends unknown[], R>(
  func: (...params: P) => R | Promise<R>
): UseMutateResult<P, R> => {
  const processingRef = useRef(false)

  const getProcessing = () => processingRef.current

  const mutate = async (...params: P): Promise<MutateResult<R>> => {
    processingRef.current = true
    try {
      const result = await func(...params)
      return {
        success: true,
        data: result,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      }
    } finally {
      processingRef.current = false
    }
  }

  return [getProcessing, mutate]
}
