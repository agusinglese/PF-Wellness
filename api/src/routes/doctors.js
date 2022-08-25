const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();
const { Doctor, Patient, Prepaid_health, Work_days } = require("../db.js");
const { getAllDoctor } = require("../controllers/index");

// PRUEBA DE FUNCIONAMIENTO DE RUTA
router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const doctorsDb = await Doctor.findAll({
    include: [
      {
        model: Prepaid_health,
        throught: {
          attributes: [],
        },
      },
      {
        model: Work_days,
        throught: {
          attributes: [],
        },
      },
    ],
  });

<<<<<<< HEAD
    if (!doctorsDb.length) {
      await Doctor.bulkCreate(allDoctors);
    }
    if (name) {
      const nombre = await allDoctors.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      nombre.length
        ? res.status(200).send(nombre)
        : res.status(400).send("Not exist");
    } else {
      res.status(200).send(allDoctors);
    }
  } catch (error) {
    res
      .status(404)
      .send("Error en el catch de search Name and Last name", error);
=======
  if (name) {
    const nombre = await doctorsDb.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    nombre.length
      ? res.status(200).send(nombre)
      : res.status(400).send("Not exist");
  } else if (!doctorsDb.length) {
    res.status(400).send("No existe info en la Base de datos");
  } else {
    res.send(doctorsDb);
>>>>>>> 4dd15948ad51617c394d81d5c773e30385277f65
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
<<<<<<< HEAD
    // const doctor = await Doctor.findOne({
    //   where: { id },
    //   include: {
    //     model: Prepaid_health,
    //     throught: {
    //       attributes: [],
    //     },
    //   },
    // });
    const doctors = await getAllDoctor();
    const doctor = doctors.find((e) => e.id == id);
=======
    const doctor = await Doctor.findOne({
      where: { id },
      include: [
        {
          model: Prepaid_health,
          throught: {
            attributes: [],
          },
        },
        {
          model: Work_days,
          throught: {
            attributes: [],
          },
        },
      ],
    });
>>>>>>> 4dd15948ad51617c394d81d5c773e30385277f65

    if (id) {
      res.status(200).send(doctor);
    } else {
      res.status(400).send("the doctor is not enable");
    }
  } catch (error) {
    res.status(404).send("Error en el catch de doctorID", error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    name,
    medic_id,
    general_area,
    especialidades_id,
    phone,
    email,
    birthday,
    document,
    type_document,
    prepaid_health,
    hours_json,
    work_days,
    picture,
    description,
  } = req.body;

  const doctor = await Doctor.findOne({
    where: { email },
  });

  if (!doctor) {
    const newDoctor = await Doctor.create({
      name,
      medic_id,
      general_area,
      especialidades_id,
      phone,
      email,
      birthday,
      document,
      type_document,
      picture,
      description,
      hours_json,
    });

    const dataPrepaidHealth = await Prepaid_health.findAll({
      where: { name: prepaid_health },
    });

    const dataWorkDays = await Work_days.findAll({
      where: {
        id: work_days,
      },
    });

    await newDoctor.addPrepaid_health(dataPrepaidHealth);
    await newDoctor.addWork_days(dataWorkDays);

    res.status(200).send(newDoctor);
  } else {
    res.status(400).send("Ya existe un doctor con este email");
  }
});

module.exports = router;
