const Event = require('../models/services/event'); 

// Récupérer tous les events
const getAllEvent = async (req, res) => {
  try {
    const events = await Event.find(); 
    res.status(200).json(events); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

// Récupérer un seul event
const getOneEvent = async (req, res) => {
  try {
    const eventId = req.params.id; 
    const foundEvent = await Event.findById(eventId); 
    if (!foundEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(foundEvent); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modifier un event
module.exports = {
  getAllEvent,
  getOneEvent,
};
