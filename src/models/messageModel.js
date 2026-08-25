const pool = require("../db/pool");

async function createNewMessage(title, message, userId) {
    const result = await pool.query(
        `
          INSERT INTO messages
           (title, message, user_id)
           VALUES
           ($1, $2, $3)
           RETURNING title, message, user_id, created_at, updated_at;
        `,
        [title, message, userId]
    );

    return result.rows[0] || null;
}

async function getPublicMessages() {
    const result = await pool.query(
        ` 
          SELECT id, title, message
            FROM messages
           ORDER BY messages.created_at DESC;
        `
    );

    return result.rows || null;
}

async function getMemberMessages() {
    const result = await pool.query(
        ` 
          SELECT 
           messages.id AS id,
           messages.title AS title,
           messages.message AS message,
           messages.created_at AS created_at,
           users.username AS username
            FROM messages
            INNER JOIN users
            ON messages.user_id = users.id
           ORDER BY messages.created_at DESC;
        `
    );

    return result.rows || null;
}

async function getMessageById(messageId) {
    const result = await pool.query(
        `
        SELECT
          messages.id,
          messages.title,
          messages.message,
          messages.user_id,
          messages.created_at,
          messages.updated_at,
          users.username
          FROM messages
        INNER JOIN users
        ON messages.user_id = users.id
        WHERE messages.id = $1;
        `,
        [messageId]
    );

    return result.rows[0] || null;
}

async function updateMessage(messageId, title, message) {
    const result = await pool.query(
        `
          UPDATE messages
             SET title = $1,
                 message = $2,
                 updated_at = NOW()
           WHERE id = $3
           RETURNING id, title, message, user_id, created_at, updated_at;
        `,
        [title, message, messageId]
    );

    return result.rows[0] || null;
}

async function deleteMessage(messageId) {
    const result = await pool.query(
        `
          DELETE FROM messages
           WHERE id = $1
           RETURNING id;
        `,
        [messageId]
    );

    return result.rows[0] || null;
}

module.exports = {
    createNewMessage,
    getPublicMessages,
    getMemberMessages,
    getMessageById,
    updateMessage,
    deleteMessage
}