const Sequelize = require('sequelize');
const { UUID, STRING, UUIDV4 } = Sequelize;
const connection = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/user_department_tdd',
  { logging: false }
);

const User = connection.define('user', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});
const Department = connection.define('department', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

User.belongsTo(Department);

const sync = async () => {
  await connection.sync({ force: true });
  const [it, sales, hr] = await Promise.all([
    Department.create({ name: 'it' }),
    Department.create({ name: 'sales' }),
    Department.create({ name: 'hr' })
  ]);
  const [moe, larry, curly] = await Promise.all([
    User.create({ name: 'moe', departmentId: it.id }),
    User.create({ name: 'larry', departmentId: sales.id }),
    User.create({ name: 'curly', departmentId: hr.id })
  ]);
  return {
    users: {
      moe,
      larry,
      curly
    },
    departments: {
      it,
      sales,
      hr
    }
  };
};
module.exports = {
  sync,
  models: {
    User,
    Department
  }
};
