//mentorController.js
const mentorController = {
    create: async (req, res) => {
      try {
        const { name } = req.body;
        const [result] = await db.query('INSERT INTO mentor (name) VALUES (?)', [name]);
        res.status(201).json({ id: result.insertId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    getAll: async (req, res) => {
      try {
        const [mentors] = await db.query('SELECT * FROM mentor ORDER BY name');
        res.json(mentors);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    update: async (req, res) => {
      try {
        const { name } = req.body;
        await db.query('UPDATE mentor SET name = ? WHERE mentor_id = ?', [name, req.params.id]);
        res.json({ message: 'Mentor updated' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    delete: async (req, res) => {
      try {
        await db.query('DELETE FROM mentor WHERE mentor_id = ?', [req.params.id]);
        res.json({ message: 'Mentor deleted' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  };