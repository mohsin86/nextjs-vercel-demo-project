import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.development.local' })

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})