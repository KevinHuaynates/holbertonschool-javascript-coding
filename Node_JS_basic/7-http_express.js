app.get('/students', (req, res) => {
  const database = req.query.database;
  if (!database) {
    return res.status(500).send('Database file not provided');
  }

  countStudents(database)
    .then(() => {
      const data = fs.readFileSync(database, 'utf8');
      res.status(200).send(`This is the list of our students\n${data}`);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});
