import * as migration_20261121_194413_initial from './20261121_194413_initial';
import * as migration_20261121_203956_blob_storage_fields from './20261121_203956_blob_storage_fields';
import * as migration_20261122_000643_autosave from './20261122_000643_autosave';
import * as migration_20261122_013451_in_office from './20261122_013451_in_office';
import * as migration_20261122_013722_donate from './20261122_013722_donate';
import * as migration_20261122_013938_about from './20261122_013938_about';
import * as migration_20261122_014231_home from './20261122_014231_home';

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
    name: '20261122_013451_in_office',
  },
  {
    up: migration_20261122_013722_donate.up,
    down: migration_20261122_013722_donate.down,
    name: '20261122_013722_donate',
  },
  {
    up: migration_20261122_013938_about.up,
    down: migration_20261122_013938_about.down,
    name: '20261122_013938_about',
  },
  {
    up: migration_20261122_014231_home.up,
    down: migration_20261122_014231_home.down,
    name: '20261122_014231_home'
  },
];
