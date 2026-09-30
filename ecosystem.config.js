module.exports = {
  apps: [
    {
      name: "aerovy-web",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "./apps/web",
      env: {
        NODE_ENV: "production",
        PORT: 3130,
      },
      max_memory_restart: "512M",
      error_file: "/var/log/pm2/aerovy-web-error.log",
      out_file: "/var/log/pm2/aerovy-web-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
