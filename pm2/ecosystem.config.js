module.exports = {
  apps: [
    {
      name: 'Sample',
      script: 'bash',
      args: "-c 'sample sample'",
      autorestart: true,
      watch: false,
    },
  ],
};
