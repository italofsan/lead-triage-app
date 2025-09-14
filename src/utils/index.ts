export const validateEmail = (email: string) => {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
}

export function simulateApi<T>(data: T, delay: number = 2000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}
