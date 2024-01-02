const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const GroupSchema = require('./schemas/Group.js');
const StudentSchema = require('./schemas/Student.js');
const MarkSchema = require('./schemas/Mark.js');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

app.use(function (req, res, next) {
  try {
    const date = new Date();
    console.log(`${req.method} ${req.url} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.toJSON().slice(0,10).replace(/-/g,'/')}`);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({});
  }
});

mongoose.connect('mongodb://127.0.0.1:27017/antitwo');

const Group = mongoose.model('group', GroupSchema);
const Student = mongoose.model('student', StudentSchema);
const Mark = mongoose.model('mark', MarkSchema);

const formatData = async (data, dataField, Model) => {
  try {
    let formattedData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < formattedData.length; i++) {
      let formattedDataItem = JSON.parse(JSON.stringify(data[i]));
      let newDataArray = [];
      for (let j = 0; j < formattedDataItem[dataField].length; j++) {
        const id = formattedDataItem[dataField][j];
        try {
          const mark = await Model.find({ _id: id });
          newDataArray.push(mark[0]);
        } catch (error) {
          console.log(error);
        }
      }
      formattedDataItem[dataField] = [];
      formattedDataItem[dataField] = newDataArray.map((item) => item);
      formattedData[i] = formattedDataItem;
    }
    return formattedData;
  } catch (error) {
    return [];
  }
};

app.get('/', (req, res) => {
  res.json('AntitwoAPI');
});

app.get('/groups', async (req, res) => {
  let groups = await Group.find().sort({name: 1});
  groups = await formatData(groups, 'students', Student);
  for (let i = 0; i < groups.length; i++) {
    let group = await groups[i];
    group.students = await formatData(group.students, 'marks', Mark);
    groups[i] = group;
  }
  res.json(groups);
});

app.get('/groups/:id', async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    let groups = await Group.find();
    groups = await formatData(groups, 'students', Student);
    for (let i = 0; i < groups.length; i++) {
      let group = await groups[i];
      group.students = await formatData(group.students, 'marks', Mark);
      groups[i] = group;
    }

    const group = groups.find((groupItem) => groupItem._id === req.params.id);

    res.json(group);
  } else {
    res.json([]);
  }
});

app.post('/groups/new', async (req, res) => {
  if (req.body.name && req.body.students) {
    let groupStudents = [];
    for (let i = 0; i < req.body.students.length; i++) {
      const student = new Student();
      student.name = req.body.students[i].name;
      student.marks = req.body.students[i].marks;
      groupStudents.push(student._id);
      await student.save();
    }
    await Group.create({ name: req.body.name, students: groupStudents });
    res.json({});
  } else {
    res.status(400).send({});
  }
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(await formatData(students, 'marks', Mark));
});

app.get('/students/:id', async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    let student = await Student.find({ _id: req.params.id });
    res.json(await formatData(student, 'marks', Mark));
  } else {
    res.json([]);
  }
});

app.post('/students/new', async (req, res) => {
  if (req.body.name && req.body.groupID) {
    const student = new Student();
    student.name = req.body.name;
    student.marks = req.body.marks;
    await student.save();
    const group = await Group.find({ _id: req.body.groupID });
    group[0].students.push(student._id);
    await group[0].save();
    res.json({});
  } else {
    res.status(400).send({});
  }
});

app.get('/marks', async (req, res) => {
  const marks = await Mark.find();
  res.json(marks);
});

app.get('/marks/:id', async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    const mark = await Mark.find({ _id: req.params.id });
    res.json(mark);
  } else {
    res.json([]);
  }
});

app.post('/marks/new', async (req, res) => {
  if (req.body.value && req.body.weight && req.body.date && req.body.studentID && req.body.groupID) {
    const {value, weight, date, studentID, groupID} = req.body;
    const mark = new Mark();
    mark.value = value;
    mark.weight = weight;
    mark.date = date;
    await mark.save();
    const student = await Student.find({ _id: studentID });
    student[0].marks.push(mark._id);
    await student[0].save();
    res.json({});
  } else {
    res.status(400).send({});
  }
});

app.listen(5000, () => {
  console.log('Server started at 5000');
});
