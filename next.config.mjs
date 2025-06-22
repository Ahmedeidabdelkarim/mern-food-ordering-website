/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ahmed-food-ordering.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
