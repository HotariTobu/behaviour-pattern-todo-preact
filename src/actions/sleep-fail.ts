import { sleep } from "@/sleep"

const FAIL_RATE = 0.1
const SLEEP_TIME = 1000

export const sleepFail = async () => {
  await sleep(Math.random() * SLEEP_TIME)

  if (Math.random() < FAIL_RATE) {
    throw new Error("Something went wrong")
  }
}
