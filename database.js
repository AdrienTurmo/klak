/* eslint-disable */



const Pool = require('pg').Pool;

const client = new Pool({

});

// client.connect();

const reviver = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
};

const toto = (truc) =>
  client.query('SELECT * from bipou where id = 1').then((response) => {
    console.log(response.rows, truc);
  });

const getArmy = (armyid) => {
  console.log('armyid', armyid);
  client.query(`SELECT content from armies_test where id = '${armyid}'`).then((data) => {
    console.log('DABABASE', data);

    const armyData = JSON.parse(data.rows[0].content, reviver);
    console.log('armyData', armyData);
    const unitIds = armyData.units.map((value) => `'${value}'`).reduce((a, b) => a + ',' + b);

    return client.query(`SELECT content from units_test where id in (${unitIds})`).then((data2) => {
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
  toto,
  getArmy,
};
