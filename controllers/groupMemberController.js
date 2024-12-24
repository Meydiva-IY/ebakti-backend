const db = require('../config/db');

const groupMemberController = {
  add: async (req, res) => {
    try {
      const { group_id, user_id } = req.body;
      await db.query('INSERT INTO group_member (group_id, user_id) VALUES (?, ?)', [group_id, user_id]);
      res.status(201).json({ message: 'Member added' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getByGroup: async (req, res) => {
    try {
      const [members] = await db.query(
        `SELECT u.* FROM user u
         JOIN group_member gm ON u.user_id = gm.user_id
         WHERE gm.group_id = ?`,
        [req.params.groupId]
      );
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  remove: async (req, res) => {
    try {
      await db.query(
        'DELETE FROM group_member WHERE group_id = ? AND user_id = ?',
        [req.params.groupId, req.params.userId]
      );
      res.json({ message: 'Member removed' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { groupMemberController }; // Ensure this line is present