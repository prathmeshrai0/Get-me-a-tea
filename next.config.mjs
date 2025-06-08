/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['avatars.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "c10.patreonusercontent.com"
            },
            {
                protocol: "https",
                hostname: "t3.ftcdn.net"
            }
        ]
    }
};

export default nextConfig;
