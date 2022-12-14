module.exports = {
  apps: [{
    name: "colyseus",
    script: "./index.js"
  }],
  env: {
    "NODE_ENV": "dev"
  },
  env_prod: {
    "NODE_ENV": "prod"
  }
}
