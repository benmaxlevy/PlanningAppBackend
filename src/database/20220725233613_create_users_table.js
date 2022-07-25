/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.datetime("createdAt").notNullable();
        table.text("firstName").notNullable();
        table.text("lastName").notNullable();
        table.text("email").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = (knex) => knex.schema.dropTable("users");
