const AdoptionStatus = require('../models/status.model');

exports.updateStatusByPetId = async (req, res) => {
  try {
    const { petId } = req.params;
    const { status, notes } = req.body;

    const updated = await AdoptionStatus.findOneAndUpdate(
      { petId },
      { status, notes, updatedAt: Date.now() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};
