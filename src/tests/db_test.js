var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'vtb-new'
    }
});
let s = knex.select().table('information').then(x => {
    console.log(x[0].id);
})
