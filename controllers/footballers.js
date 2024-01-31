const db = require('../db');
const express = require('express');

const app = express();

/**
 * @swagger
 * '/api/footballers/{id}':
 *  get:
 *     summary: Get a footballer by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Footballer ID
 *        schema:
 *             type: integer
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

exports.getFootballerById = async (req, res) => {
    const id = Number(req.params.id);
    const sql = 'SELECT * FROM footballers WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Server Error', error: err });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Not Found'});
            } else {
                res.status(200).json(result);
            }
        }
    });
};

/**
 * @swagger
 * '/api/footballers':
 *  get:
 *     summary: Get all footballers
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      500:
 *        description: Server Error
 */

exports.getAllFootballers = async (req, res) => {
    const sql = 'SELECT * FROM footballers';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Server Error', error: err });
        } else {
            res.status(200).json(result);
        }
    });
};

/**
 * @swagger
 * '/api/footballers':
 *  post:
 *      summary: Create a footballer
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -name
 *               -position
 *               -club
 *               -country
 *             properties:
 *                name:
 *                  type: string
 *                  default: Alisson Becker
 *                position:
 *                  type: string
 *                  default: GK
 *                club:
 *                  type: string
 *                  default: Liverpool FC
 *                country:
 *                  Type: string
 *                  default: Brazil
 *      responses:
 *          201:
 *              description: Created successfully
 *          500:
 *              description: Server Error
 */

exports.insertFootballer = async (req, res) => {
    const footballer = req.body;
    const sql = 'INSERT INTO footballers (name, position, club, country) VALUES (?, ?, ?, ?)';
    db.query(sql, [footballer.name, footballer.position, footballer.club, footballer.country], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Server Error', error: err });
        } else {
            res.status(201).json({ message: 'Created successfully' });
        }
    });
};


/**
 * @swagger
 * '/api/footballers/{id}':
 *  put:
 *    summary: Update a footballer by id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Footballer ID
 *        schema:
 *             type: integer
 *        required: true
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -id
 *             properties:
 *                name:
 *                  type: string
 *                  default: ''
 *                position:
 *                  type: string
 *                  default: ''
 *                club:
 *                  type: string
 *                  default: ''
 *                country:
 *                  Type: string
 *                  default: ''
 *    responses:
 *         200:
 *             description: Updated successfully
 *         404:
 *             description: Not Found
 *         500:
 *             description: Server Error
 */


exports.updateFootballer = async (req, res) => {
    const id = Number(req.params.id);
    const footballer = req.body;
    const sql1 = 'SELECT * FROM footballers WHERE id = ?';
    const sql2 = 'UPDATE footballers SET name = ?, position = ?, club = ?, country = ? WHERE id = ?';
    db.query(sql1, [id], (err, result) => {
        if (result.length === 0) {
            res.status(404).json({ message: 'Not Found' });
        } else {
            db.query(sql2, [footballer.name, footballer.position, footballer.club, footballer.country, id], (err, result) => {
                if (err) {
                    res.status(500).json({ message: 'Server Error', error: err });
                } else {
                    res.status(200).json({ message: 'Updated successfully.' });
                }
            });
        }
    });
};

/**
 * @swagger
 * '/api/footballers/{id}':
 *  delete:
 *     summary: Delete a footballer by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Footballer ID
 *        schema:
 *             type: integer
 *        required: true
 *     responses:
 *      200:
 *        description: Deleted successfully
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

exports.deleteFootballer = async (req, res) => {
    const id = Number(req.params.id);
    const sql1 = 'SELECT * FROM footballers WHERE id = ?';
    const sql2 = 'DELETE FROM footballers WHERE id = ?';
    db.query(sql1, [id], (err, result) => {
        if (result.length === 0) {
            res.status(404).json({ message: 'Not Found' });
        } else {
            db.query(sql2, [id], (err, result) => {
                if (err) {
                    res.status(500).json({ message: 'Server Error', error: err });
                } else {
                    res.status(200).json({ message: 'Deleted successfully' });
                }
            });
        }
    });
};

