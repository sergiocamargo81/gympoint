class StudentSessionController {
  async index(req, res) {
    return res.json(req.student);
  }
}

export default new StudentSessionController();
