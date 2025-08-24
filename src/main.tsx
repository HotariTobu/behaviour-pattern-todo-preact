import { render } from "preact"
import { Toaster } from "sonner"
import { App } from "@/app"
import "@/index.css"

const root = document.getElementById("app")
if (root === null) {
  throw new Error("Root element not found")
}

render(
  <>
    <App />
    <Toaster />
  </>,
  root
)
