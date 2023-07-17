/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    images: {
        domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', "via.placeholder.com", "upload.wikimedia.org"],
    },
};

module.exports = nextConfig;
