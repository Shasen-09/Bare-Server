const items = require('../models/itemModel')

const addItem = async (req, res) => {
  const { label } = req.body;
  if (!label) {
    const err = new Error('Label is required');
    err.status = 400;
    throw err;
  }
  const item = await items.create({ label })
  res.json(item)

}

const getItem = async (req, res) => {
  const item = await items.find();
  if (!item.length) {
    const err = new Error('No items found');
    err.status = 404;
    throw err;
  }

  res.json(item)
}

module.exports = { addItem, getItem }