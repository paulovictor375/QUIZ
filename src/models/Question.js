import Database from '../database/database.js';

async function readAll() {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      questions
  `;

  const question = await db.all(sql);

  return question;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      questions
    WHERE
      id = ?
  `;

  const question = await db.get(sql, [id]);

  return question;
}

async function create(question) {
  const db = await Database.connect();

  const {description, response} = question;

  const sql = `
    INSERT INTO
      questions (description, response)
    VALUES
      (?, ?)
  `;

  const {lastID} = await db.run(sql, [description, response]);

  return read(lastID);
}

export default { readAll, read, create };