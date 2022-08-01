/* eslint-disable */
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

const reviver = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
};

const getArmy = (armyid) => {
  return client
    .query(
      `SELECT content
                from armies_test
                where id = '${armyid}'`,
    )
    .then((data) => {
      const armyData = JSON.parse(data.rows[0].content, reviver);
      const unitIds = armyData.units.map((value) => `'${value}'`).reduce((a, b) => a + ',' + b);

      return client
        .query(
          `SELECT content
                         from units_test
                         where id in (${unitIds})`,
        )
        .then((data2) => {
          const unitsData = data2.rows.map((toto) => JSON.parse(toto.content, reviver));
          console.log('unitsData', unitsData);

          return {
            ...armyData,
            units: unitsData,
          };
        });
    });
};

module.exports = {
  getArmy,
};
