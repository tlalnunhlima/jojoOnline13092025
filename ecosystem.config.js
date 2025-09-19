module.exports = {
  apps: [
    {
      name: "jojoOnline",
      script: "server.js",
      // Prefer cluster mode only if your app is stateless and you want to use multiple cores
      exec_mode: "fork", // change to "cluster" if you want multi-instance
      instances: 1,      // or "max" with cluster mode
      watch: false,      // keep false in prod
      autorestart: true,
      max_restarts: 10,
      time: true,        // adds timestamp to pm2 logs
      env: {
        NODE_ENV: "development",
        PORT: process.env.PORT || 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3000
      },
      // Optional: tune node args
      node_args: [],
      // Optional: log paths (PM2 will create these if missing)
      error_file: "/home/ec2-user/.pm2/logs/jojoOnline-error.log",
      out_file: "/home/ec2-user/.pm2/logs/jojoOnline-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ],
  // (Optional) deploy section if you want pm2 to pull from git directly.
  // We’re using CodeDeploy, so usually not needed.
  // deploy: { ... }
};
