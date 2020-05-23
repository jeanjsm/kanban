const Attachment = require('../models/Attachment');
const Card = require('../models/Card');

module.exports = {

  async index(request, response) {
    const { card_id } = request.params;

    const card = await Card.findById(card_id);

    if (!card) 
      return response.status(400).json({ error: 'Card does not exists' });
    console.log(card);

    const attachments = await Attachment.find({ card: card_id });

    return response.json(attachments);
  },

  async upload(request, response) {
    const { card_id } = request.params;

    const card = await Card.findById(card_id);

    if (!card) 
      return response.status(400).json({ error: 'Card does not exists' });

    const { originalname: name, size, filename: key } = request.file;
    const attachment = await Attachment.create({
      name,
      size,
      card: card._id,
      key,
      url: '' 
    })
    return response.json(attachment);
  },

  async delete(request, response) {
    const attachment = await Attachment.findById(request.params.id);

    await attachment.remove();

    return response.send();
  }

}