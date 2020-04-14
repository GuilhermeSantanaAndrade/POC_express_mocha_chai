exports.up = function (knex) {
  return knex.schema.createTable("customers", (table) => {
    table.increments();
    table.timestamps(true, true);
    table.string("guid").notNullable();
    table.string("name").notNullable();
    table.date("birthday");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("cel").notNullable();
    table.string("whatsapp");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
