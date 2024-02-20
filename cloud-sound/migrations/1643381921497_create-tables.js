/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('tracks', {
    id: 'id',
    userid: 'bigint',
    name: {type: 'varchar(1000)', notNull: true},
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    deletedAt: {
      type: 'timestamp',
      default: null,
    },
    file: {type: 'varchar(255)', notNull: true},
  })
};
