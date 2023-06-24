export const urlRoot = `${
  process.env.NODE_ENV == 'production' ? 'https' : 'http'
}://${
  process.env.NEXT_PUBLIC_VERCEL_URL ??
  process.env.NEXT_PUBLIC_HOST ??
  'localhost:3000'
}`
