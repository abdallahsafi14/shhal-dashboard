/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.shihal.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
