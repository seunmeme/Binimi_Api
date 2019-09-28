require('dotenv').config();

module.exports ={
  development: {
    database: 'binimi',
    username: 'postgres',
    password: 'root',
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  test: {
    database: 'binimi-test',
    username: 'postgres',
    password: 'root',
    host: '127.0.0.1',
    dialect: 'postgres'
  },

  production: {
      use_env_variable: 'DATABASE_URL'
    },
}
