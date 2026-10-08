export function validateAccountInput({ email = '', password = '', role }, { signup = false, recovery = false, reset = false } = {}) {
  const errors = {}
  if (!reset && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.'
  if (signup && !email.trim().toLowerCase().endsWith('@example.test')) errors.email = 'Use a fictional address ending in @example.test.'
  if (!recovery && !password) errors.password = 'Enter a password.'
  if (signup && !['customer', 'designer'].includes(role)) errors.role = 'Choose customer or designer.'
  return errors
}
