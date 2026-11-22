import * as migration_20261121_194413_initial from './20261121_194413_initial';
import * as migration_20261121_203956_blob_storage_fields from './20261121_203956_blob_storage_fields';
import * as migration_20261122_000643_autosave from './20261122_000643_autosave';
import * as migration_20261122_013451_in_office from './20261122_013451_in_office';

export const migrations = [
  {
    up: migration_20261121_194413_initial.up,
    down: migration_20261121_194413_initial.down,
    name: '20261121_194413_initial',
  },
  {
    up: migration_20261121_203956_blob_storage_fields.up,
    down: migration_20261121_203956_blob_storage_fields.down,
    name: '20261121_203956_blob_storage_fields',
  },
  {
    up: migration_20261122_000643_autosave.up,
    down: migration_20261122_000643_autosave.down,
    name: '20261122_000643_autosave',
  },
  {
    up: migration_20261122_013451_in_office.up,
    down: migration_20261122_013451_in_office.down,
    name: '20261122_013451_in_office'
  },
];
