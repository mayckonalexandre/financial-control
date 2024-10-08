module.exports = {
  apps: [
    {
      name: 'ecommerce',
      script: 'dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      max_restarts: '10',
      merge_logs: true,
      time: true,
    },
  ],
};
