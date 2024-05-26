const defaultConfig = {
  database: process.env.DB_DATABASE || 'db_gethub_bangkit',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
};

module.exports = {
  development: { ...defaultConfig },
  test: { ...defaultConfig },
  production: { ...defaultConfig },
};