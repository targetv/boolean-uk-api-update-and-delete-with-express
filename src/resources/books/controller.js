const db = require("../../utils/database");

function createOne(req, res) {
  const createOne = `
    INSERT INTO books
      (name, type, author, topic, publicationdate)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  db.query(createOne, Object.values(req.body))
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function getAll(req, res) {
  const getAll = `
    SELECT *
    FROM books;
  `;

  db.query(getAll)
    .then((result) => res.json({ data: result.rows }))
    .catch(console.error);
}

function getOneById(req, res) {
  const idToGet = req.params.id;

  const getOneById = `
    SELECT *
    FROM books
    WHERE id = $1;
  `;

  db.query(getOneById, [idToGet])
    .then((result) => res.json({ data: result.rows[0] }))
    .catch(console.error);
}

function updateOne(req, res) {
  const id = Number(req.params.id);

  const newItem = req.body;

  const { title, type, author, topic, publicationdate } = newItem;

  const sql = `
    UPDATE books
    SET title = $1,   
    type = $2 ,
    author = $3,
    topic = $4
    WHERE id = $5
    RETURNING *;
  `;
  //   db.query(sql, [title, type, author, topic, publicationdate, id])
  //     .then((result) => {
  //       const updatedObject = result.rows[0];
  //       res.json(updatedObject);
  //     })
  //     .catch(console.error(result));
  // }
  db.query(sql, [title, type, author, topic, id])
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.error(error));
}

module.exports = {
  createOne,
  getAll,
  getOneById,
  updateOne,
};
