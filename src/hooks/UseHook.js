//hieu ung tang so tu dong
export function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    const startTime = performance.now()
    function updateNumber(currentTime) {
      const elapsedTime = currentTime - startTime
      if (elapsedTime > duration) {
        callback(finalNumber)
      } else {
        const rate = elapsedTime / duration
        const currentNumber = Math.round(rate * finalNumber)
        callback(currentNumber)
        requestAnimationFrame(updateNumber)
      }
    }
    requestAnimationFrame(updateNumber)
}