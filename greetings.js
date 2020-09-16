module.exports = function greetings() {

  const pg = require("pg");
  const Pool = pg.Pool;
  const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greetings';
  const pool = new Pool({
    connectionString
  });

  


  async function greeted(name) {
    var nameG = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    if (nameG) {
      const greetedNames = await pool.query(`SELECT name FROM greeting WHERE name = $1`, [nameG])
      if (greetedNames.rowCount === 0) {
        const INSERT_QUERY = await pool.query(`INSERT INTO greeting (name, counter) values ($1, 1)`, [nameG]);
      } else {
        var UPDATE_QUERY = await pool.query(`UPDATE greeting SET counter = counter+1 WHERE name = $1`, [nameG]);
      }

    }

  }

  async function nameGreeted(name) {
    var greetList = await pool.query(`SELECT name FROM greeting`);
    return 'Hello, ' + name + ' has been greeted ' + greetList.rowCount + ' times!'
  }




  async function languageChecked(lang, userName) {
    await greeted(userName)
    // console.log(await getGreetedNames());

    if (lang === "Xhosa") {
      return "Molo, " + userName

    }

    if (lang === "English") {
      return "Hellow, " + userName

    }

    if (lang === "Afrikaans") {
      return "Hallo, " + userName
    }

  }



  async function getCounter() {
    var countedNames = await pool.query('SELECT * FROM greeting')
    return countedNames.rowCount;
  }

  async function getGreetedNames() {
    var names = await pool.query('SELECT name FROM greeting')
    return names.rows;
  }

  function regExpression(name) {
    var namesReg = /^[A-Za-z]+$/;
    var newInstanc = new RegExp(namesReg);
    var regexTest = newInstanc.test(name);
    if (regexTest) {
      var nameFixed = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      return nameFixed;
    }


    return "";
  }
  async function clear() {
    var clearNames = await pool.query('DELETE FROM greeting');
  }


  return {
    greeted,
    nameGreeted,
    getCounter,
    getGreetedNames,
    languageChecked,
    clear,
    regExpression,


  };
}