/** @type {import('next').NextConfig} */
// const nextConfig = (config) => {
//   return config
// };



// export default nextConfig({
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//         use: [{loader: '@svgr/webpack', options: {icon: true}}]
//     })
//     return config
//   },
// });


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },
};

export default nextConfig;