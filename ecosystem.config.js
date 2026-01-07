module.exports = {
  apps: [
    {
      name: 'clinica-podologica',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/clinica-podologica',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
      },
      // Logs
      error_file: '/var/log/pm2/clinica-error.log',
      out_file: '/var/log/pm2/clinica-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Restart policy
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',

      // Watch (disabled in production)
      watch: false,
      ignore_watch: ['node_modules', '.git', 'logs'],

      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
};
