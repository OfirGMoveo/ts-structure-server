
const ENTRY_SCRIPT_PATH = './dist/index.js';
const PATH_TO_SCRIPT_CLONE = '/home/ubuntu/ts-structure-server/';

const KEY = '~/pem-keys/demo_app.pem';
const HOSTS = ['ec2-3-16-186-126.us-east-2.compute.amazonaws.com', 'ec2-18-224-0-237.us-east-2.compute.amazonaws.com'];
const REPO = 'git@github.com:OfirGMoveo/ts-structure-server.git';


module.exports = {
    apps : [{
      name: 'API01',
      script: ENTRY_SCRIPT_PATH,
      args: 'one two',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      }
    },
    {
      name: 'API02',
      script: ENTRY_SCRIPT_PATH,
      args: 'one two',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
      }
    }],
  
    deploy : {
      production : {
        key : KEY,
        user : 'ubuntu',
        host : HOSTS,
        ref  : 'origin/master',
        repo : REPO,
        path : PATH_TO_SCRIPT_CLONE,
        "post-deploy" : './install-build-del-source.sh && pm2 reload ecosystem.config.js  --env production',
        "pre-deploy-local" : "echo 'Deploying code to servers'",
        env : {
          "NODE_ENV": "production"
        }
      }
      
    }
  };
  