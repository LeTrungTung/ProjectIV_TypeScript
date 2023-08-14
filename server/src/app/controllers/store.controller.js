// const Store = require('../models/store.model');
const sql = require('../../libs/database/db');

const mysql = require('mysql2/promise');

const uploadStore = async (req, res, next) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    console.log('req.protocol', req.protocol);
    console.log('req.get', req.get('host'));
    console.log('files', req.files);
    const files = req.files;
    let imageArr = [];
    const fileData = files.map((file) => ({
      nameImage: url + '/public/' + file.filename,
    }));
    //handle test
    fileData.map((data) => {
      imageArr.push(data.nameImage);
    });

    const [result] = await sql.query('INSERT INTO Store (nameImage) VALUES (?)', [imageArr.join(',')]);
    const insertedId = result.insertId;

    sql.end();

    res.status(200).json({
      message: 'ok',
      userCreate: {
        id: insertedId,
        dataImage: imageArr,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

const getUpload = async (req, res, next) => {
  try {
    const [results] = await sql.query('SELECT * FROM Store');
    const data = results.map((result) => ({
      id: result.id,
      dataImage: result.nameImage.split(','),
    }));

    sql.end();

    res.status(200).json({
      message: 'ok',
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadStore,
  getUpload,
};
