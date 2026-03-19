const analyticsService = require("../services/analytics.service");

exports.getInstagramData = async (req, res) => {
  const data = await analyticsService.getInstagramMetrics();
  res.json(data);
};

exports.getFacebookData = async (req, res) => {
  const data = await analyticsService.getFacebookMetrics();
  res.json(data);
};