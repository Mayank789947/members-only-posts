const pool = require("../db/pool");

async function getUserByEmail(email) {
    const result = await pool.query(
        `
          SELECT id,
          first_name,
          last_name,
          email,
          password_hash,
          username,
          membership_status,
          is_admin
           FROM users
           WHERE email = $1;
        `,
        [email]
    );

    return result.rows[0] || null;
}

async function createUser(first_name, last_name, email, username,  password_hash) {
    const result = await pool.query(
        `
         INSERT INTO users
         (first_name, last_name, email, username, password_hash)
         VALUES
         ($1, $2, $3, $4, $5)
         RETURNING id, email;
        `,
        [first_name, last_name, email, username, password_hash]
    );

    return result.rows[0] || null;
}

async function getUserById(userId) {
    const result = await pool.query(
        `
         SELECT id,
          first_name,
          last_name,
          email,
          username,
          membership_status,
          is_admin
            FROM users
            WHERE id = $1;
        `,
        [userId]
    );

    return result.rows[0] || null;
}

async function updateMembershipStatus(status, userId) {
    const result = await pool.query(
        `
           UPDATE users
            SET membership_status = $1
             WHERE id = $2
             RETURNING membership_status;
        `,
        [status, userId]
    );

    return result.rows[0] || null;
}

async function deleteUser(userId) {
    const result = await pool.query(
        `
          DELETE FROM users
           WHERE id = $1
           RETURNING id;
        `,
        [userId]
    );

    return result.rows[0] || null;
}

module.exports = {
    getUserByEmail,
    createUser,
    getUserById,
    updateMembershipStatus,
    deleteUser
}