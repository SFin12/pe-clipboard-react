import { useState, useEffect } from "react"

export function useViewport() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  // Return the width so we can use it in our components
  return { screenWidth }
}

/**
 *
 * @param {new Date} date
 * @returns
 */
export function formatDate(date) {
  // Convert date to local date and format it to 'yyyy-mm-dd'
  const formattedLocalDate = new Date(new Date(date) - 333 * 60 * 60 * 24).toISOString().split("T")[0]
  return formattedLocalDate
}

export function sortArrayOfObjects(a, b) {
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  return 0
}

export function formatMileTime(seconds) {
  let minutes = ~~(seconds / 60)
  let extraSeconds = seconds % 60
  if (extraSeconds < 10) extraSeconds = "0" + extraSeconds
  const formattedTime = minutes + " : " + extraSeconds
  return formattedTime
}