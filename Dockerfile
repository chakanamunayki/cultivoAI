FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start dev server with host binding for Docker
CMD ["pnpm", "dev", "--hostname", "0.0.0.0"]
