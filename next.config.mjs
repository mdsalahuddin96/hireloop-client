/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  experimental:{
    serverComponentsExternalPackages:['@better-auth/kysely-adapter'],
  }
};

export default nextConfig;
