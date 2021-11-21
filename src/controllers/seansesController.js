import Seanse from "../models/seanse";
import Movie from "../models/movie";

export default {
  async findOne(req, res, next) {
    const seanse = await Seanse.findOne({ _id: req.params.id });
    if (!seanse) return next();
    return res.status(200).send({ data: seanse });
  },

  async findAll(req, res) {
    const movies = await Seanse.find().sort({ title: "desc" });
    return res.status(200).send({ data: movies });
  },

  async create(req, res) {
    const seanse = await new Seanse({
      date: req.body.date,
      hour: req.body.hour,
      movie: req.body.movie,
      bookings: req.body.bookings,
    }).save();

    const movie = await Movie.findOne({ _id: req.params.id });

    return res
      .status(201)
      .send({ data: seanse, message: `Seanse was created` });
  },

  async update(req, res, next) {
    const seanse = await Seanse.findOne({ _id: req.params.id });
    if (!seanse) return next();

    seanse.bookings = req.body.bookings;

    await seanse.save();

    return res
      .status(200)
      .send({ data: seanse, message: `Seanse was updated` });
  },

  async remove(req, res, next) {
    const seanse = await Seanse.findOne({ _id: req.params.id });
    if (!seanse) return next();
    await seanse.remove();

    return res.status(200).send({ message: `Seanse was removed` });
  },
};
