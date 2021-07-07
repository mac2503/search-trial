const asyncHandler = require('../middleware/async');
const Search = require('../models/Search');

// @desc      Add item
// @route     POST /search_engine/addItem
// @access    Public
exports.addItem = asyncHandler(async (req, res, next) => {
  const {title, url} = req.body;
  // Add item
  const item = await Search.create({
    title,
    url
  });
  res.status(200).json({success: true});
});