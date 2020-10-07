const assert = require("assert");
const Greetings = require("../greetings");
//const greetings = require('./greetings');
const pg = require("pg");
let greetings = Greetings()
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greetings_test';
const pool = new Pool({
    connectionString
});

beforeEach(async function () {
    await pool.query("delete from greeting");
});

describe("The Greeted function", function () {
    it("should be able to find a name Linda and insert if the name is not there and increment the counter", async function () {
        let greetings = Greetings(pool)
         await greetings.greeted("linda")
        
        assert.deepEqual([{name: "linda"}], await greetings.getGreetedNames("linda"));

    });
});

    describe("The LanguageChecked function", function() {

   
    it("Should be able to greet in Isixhosa", async function () {
        let greetings = Greetings(pool);
         await greetings.languageChecked('Xhosa', 'Linda');
         //let language = await greetings.languageChecked('Xhosa', 'linda');

       
        assert.equal('Molo, Linda', await greetings.languageChecked('Xhosa', 'Linda'));

    });
    it("Should be able to greet in English", async function () {
        let greetings = Greetings(pool);
         await greetings.languageChecked('English', 'Linda');
         

       
        assert.equal('Hellow, Linda', await greetings.languageChecked('English', 'Linda'));

    });

    it("Should be able to greet in Afrikaans", async function () {
        let greetings = Greetings(pool);
         await greetings.languageChecked('Hallo', 'linda');
         
       
        assert.equal('Hallo, linda', await greetings.languageChecked('Afrikaans', 'linda'));

    });
});

    describe("The getCounter function", function() {
    it("Should be able to count 2 names entered", async function () {
        let greetings = Greetings(pool);
    await greetings.greeted('Siwe');
    await greetings.greeted('Lisa');

    assert.equal(2, await greetings.getCounter());
    });

        it("Should be able to count 4 names entered", async function () {
            let greetings = Greetings(pool);
        await greetings.greeted('Sibo');
        await greetings.greeted('Sinazo');
        await greetings.greeted('mzi');
        await greetings.greeted('Bonolo');

    
        assert.equal(4, await greetings.getCounter());
        });
    
});

describe("The getGreetedNames function", function() {
    it("should be able to return all the greeted names as an object", async function() {
        let greetings = Greetings(pool);
        await greetings.greeted('Sibo');
        await greetings.greeted('Sinazo');
        await greetings.greeted('Mzi');
        await greetings.greeted('Bonolo');
        assert.deepEqual([{name: 'Sibo'}, {name: 'Sinazo'}, {name: 'Mzi'}, {name: 'Bonolo'}], await greetings.getGreetedNames());

    });
})

after(function() {
    pool.end();
});










