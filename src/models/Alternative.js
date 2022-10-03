import Database from '../database/database.js';

async function readAllbyQuestion(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      alternatives
    WHERE
      question_id = ?
  `;

  const questions = await db.all(sql, [id]);

  return questions;
}

async function create(alternative) {
  const db = await Database.connect();

  const {description, question_id} = alternative;
  console.log('alternative', alternative)

  const sql = `
    INSERT INTO
      alternatives (description, question_id)
    VALUES
      (?, ?)
  `;

  const {lastID} = await db.run(sql, [description, question_id]);

  return read(lastID);
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      alternatives
    WHERE
      id = ?
  `;

  const alternative = await db.get(sql, [id]);

  return alternative;
}

export default {readAllbyQuestion, create}
