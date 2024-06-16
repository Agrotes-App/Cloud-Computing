const prisma = require("../prisma");

const getAllDiseases = async (req, res) => {
  try {
    const diseases = await prisma.diseases.findMany();
    res.json(diseases);
  } catch (error) {
    console.error("Error fetching diseases:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getDiseaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const disease = await prisma.diseases.findUnique({
      where: { id },
    });
    if (!disease) {
      res.status(404).json({ error: "Disease not found" });
      return;
    }
    res.json(disease);
  } catch (error) {
    console.error("Error fetching disease by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createDisease = async (req, res) => {
  try {
    const {
      photo,
      diseaseName,
      otherNames,
      plantNames,
      description,
      causes,
      prevention,
    } = req.body;
    const newDisease = await prisma.diseases.create({
      data: {
        photo,
        diseaseName,
        otherNames,
        plantNames,
        description,
        causes,
        prevention,
      },
    });
    res.status(201).json({
      message: "Disease created successfully",
      newDisease,
    });
  } catch (error) {
    console.error("Error creating disease:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateDisease = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      photo,
      diseaseName,
      otherNames,
      plantNames,
      description,
      causes,
      prevention,
    } = req.body;
    const updatedDisease = await prisma.diseases.update({
      where: { id },
      data: {
        photo,
        diseaseName,
        otherNames,
        plantNames,
        description,
        causes,
        prevention,
      },
    });
    res.json(updatedDisease);
  } catch (error) {
    console.error("Error updating disease:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteDisease = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.diseases.delete({
      where: { id },
    });
    res.json({ message: "Disease deleted successfully" });
  } catch (error) {
    console.error("Error deleting disease:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDiseases,
  getDiseaseById,
  createDisease,
  updateDisease,
  deleteDisease,
};
