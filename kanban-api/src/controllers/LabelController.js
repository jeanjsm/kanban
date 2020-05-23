const Label = require('../models/Label');

module.exports = {
  async index(request, response) {
    const labels = await Label.find();
    return response.json(labels);
  },
  
  async store(request, response) {
    const { name, color } = request.body;

    if (!color)
      return response.status(400).json({ error: 'No color selected' });
      
    const label = await Label.create({ name, color });

    return response.json(label);
  }
};