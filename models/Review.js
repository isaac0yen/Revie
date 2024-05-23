const { db } = require('../config/db');

class Review {
    static async create(user_id, landlord, environment, amenities, images, videos) {
        const [result] = await db.execute('INSERT INTO reviews (user_id, landlord, environment, amenities, images, videos) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, landlord, environment, amenities, JSON.stringify(images), JSON.stringify(videos)]);
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM reviews');
        return rows;
    }

    static async incrementHelpfulCount(id) {
        const [result] = await db.execute('UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    static async sortBy(criteria) {
        let order = 'helpful_count';
        if (criteria === 'recent') {
            order = 'created_at';
        }
        const [rows] = await db.execute(`SELECT * FROM reviews ORDER BY ${order} DESC`);
        return rows;
    }
}

module.exports = Review;
