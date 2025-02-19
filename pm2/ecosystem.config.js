module.exports = {
  apps: [
    {
      name: 'sample-prod',
      script: 'bash',
      args: "-c 'sample sample'",
      autorestart: true,
      watch: false,
      env: {
        PORT: 3000,
      },
    },
    {
      name: 'sample-dev',
      script: 'bash',
      args: "-c 'sample sample'",
      autorestart: true,
      watch: false,
      env: {
        PORT: 3001,
      },
    },
  ],
};
