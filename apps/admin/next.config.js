module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui-components", "yup", "react-hook-form", "resolvers"],
  images: {
    domains: ["img.freepik.com"]
  },
  webpack: (config) => {
    config.module.rules.push({
        test: /\.node/,
        use: 'raw-loader',
      });
  
      return config;
  }
};
