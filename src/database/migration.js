import Database from './database.js'

async function up() {
  const db = await Database.connect();

  const sql = `
    CREATE TABLE questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description VARCHAR(120) NOT NULL,
      response VARCHAR(120) NOT NULL
    )
  `;
  
  await db.run(sql);

  const altersql = `
    CREATE TABLE alternatives (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description VARCHAR(120) NOT NULL,
      question_id INTEGER NOT NULL,
      FOREIGN KEY (question_id) REFERENCES categories (id)

    )
  `;

  await db.run(altersql);

  const usersSql = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(80) UNIQUE NOT NULL,
      password VARCHAR(16) NOT NULL
    )
  `;

  db.run(usersSql);
}

  //  ALTER TABLE questions ADD CONSTRAINT fk_pessoa FOREIGN KEY(id) REFERENCES pessoa (id);


export default { up };