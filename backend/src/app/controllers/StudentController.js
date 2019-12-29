import { Op } from 'sequelize';
import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { q, id, page } = req.query;
    const limit = 10;
    const offset = page * limit || 0;
    let students;

    if ((!q || q === '') && (!id || id === '')) {
      students = await Student.findAndCountAll({
        order: [['name', 'ASC']],
        limit,
        offset,
      });
    } else if (id) {
      students = await Student.findByPk(id, {
        order: [['name', 'ASC']],
      });
    } else {
      students = await Student.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${q}%`,
          },
        },
        order: [['name', 'ASC']],
        limit,
        offset,
      });
    }

    if (!students)
      return res.status(404).json({ error: 'Did not find any students' });

    students.maxPage =
      students.count > 10 ? Math.floor(students.count / limit) : 0;

    return res.status(200).json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const studentAlreadyExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentAlreadyExists)
      return res.status(400).json({ error: 'Student already exists' });

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const student = await Student.findByPk(req.body.id);

    if (!student)
      return res.status(400).json({ error: 'Student does not exist.' });

    if (req.body.email && student.email !== req.body.email) {
      const studentAlreadyExists = await Student.findOne({
        where: { email: req.body.email },
      });

      if (studentAlreadyExists)
        return res.status(400).json({ error: 'Student already exists' });
    }

    const updatedStudent = await student.update(req.body);

    return res.json(updatedStudent);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const student = await Student.findByPk(req.body.id);

    if (!student)
      return res.status(400).json({ error: 'Student does not exists' });

    await Student.destroy({
      where: { id: req.body.id },
    });

    return res.json(student);
  }

  async exists(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exist.' });
    }

    return res.status(200).json(student);
  }
}

export default new StudentController();
