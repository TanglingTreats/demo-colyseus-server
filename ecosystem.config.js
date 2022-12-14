module.exports = {
  apps: [
    {
      name: "colyseus",
      script: "./lib/index.js",
      env: {
        name: "colyseus-dev",
        "NODE_ENV": "development",
        "PORT": 2568
      },
      env_prod: {
        name: "colyseus-server",
        "NODE_ENV": "production",
        "PORT": 2567
      }
    }
  ]
}
