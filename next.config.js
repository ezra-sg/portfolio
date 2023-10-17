/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // because image optimization is not compatible with SSG
    },
}

module.exports = nextConfig
