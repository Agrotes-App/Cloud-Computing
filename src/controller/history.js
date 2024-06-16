const prisma = require("../prisma");

const getAllHistories = async (req, res) => {
  try {
    const userId = req.user.userId;

    const histories = await prisma.history.findMany({
      where: { userId },
      include: {
        diseases: true,
      },
    });

    res.json(histories);
  } catch (error) {
    console.error("Error fetching histories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Ambil history berdasarkan ID
const getHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const history = await prisma.history.findUnique({
      where: { id },
      include: {
        diseases: true,
      },
    });

    // Pastikan history milik user yang sedang login
    if (!history || history.userId !== userId) {
      return res.status(404).json({
        error: "History not found or you do not have access to this history",
      });
    }

    res.json(history);
  } catch (error) {
    console.error("Error fetching history by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Tambah history baru
const createHistory = async (req, res) => {
  try {
    const userId = req.user.userId; // Dapatkan userId dari token (misalnya dari middleware authentication)
    const { diseasesId, save } = req.body;

    if (save) {
      const newHistory = await prisma.history.create({
        data: {
          userId,
          diseasesId,
        },
      });

      res.status(201).json({
        message: "History created successfully",
        newHistory,
      });
    } else {
      await prisma.diseases.delete({
        where: { id: diseasesId },
      });

      res.status(200).json({
        message: "Disease deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error creating or deleting history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllHistories,
  getHistoryById,
  createHistory,
};
