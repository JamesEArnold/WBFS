import * as migration_20261121_194413_initial from './20261121_194413_initial';
import * as migration_20261121_203956_blob_storage_fields from './20261121_203956_blob_storage_fields';

export const migrations = [
  {
    up: migration_20261121_194413_initial.up,
    down: migration_20261121_194413_initial.down,
    name: '20261121_194413_initial',
  },
  {
    up: migration_20261121_203956_blob_storage_fields.up,
    down: migration_20261121_203956_blob_storage_fields.down,
    name: '20261121_203956_blob_storage_fields'
  },
];
