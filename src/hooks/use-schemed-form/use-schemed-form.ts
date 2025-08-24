import { zodResolver } from "@hookform/resolvers/zod"
import { type DefaultValues, useForm } from "react-hook-form"
import type { z } from "zod"

export const useSchemedForm = <T extends z.ZodObject>(params: {
  formSchema: T
  defaultValues: DefaultValues<z.input<T>>
  onSubmit: (values: z.output<T>, reset: () => void) => void
}) => {
  const form = useForm<z.input<T>, never, z.output<T>>({
    resolver: zodResolver(params.formSchema),
    defaultValues: params.defaultValues,
  })

  const handleSubmit = form.handleSubmit((values) => {
    params.onSubmit(values, form.reset)
  })

  return {
    register: form.register,
    handleSubmit,
  }
}
