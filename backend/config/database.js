module.exports = {
  username: process.env.POSTGRE_USERNAME || 'postgres',
  password: process.env.POSTGRE_PASSWORD || 'postgres',
  database: process.env.POSTGRE_DATABASE || 'to_do',
  host: process.env.POSTGRE_HOST || 'localhost',
  port: process.env.POSTGRE_PORT || 5432,
  dialect: 'postgresql',
  logging: false,
  seederStorage: 'sequelize',
};
