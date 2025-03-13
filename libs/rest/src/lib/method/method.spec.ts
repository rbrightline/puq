import { DeleteOneById } from './delete/delete-by-id.js';
import { Count } from './read/count.js';
import { FindAll } from './read/find-all.js';
import { FindOneById } from './read/find-one-by-id.js';
import { AddRelation } from './relation/add-relation.js';
import { RemoveRelation } from './relation/remove-relation.js';
import { SetRelation } from './relation/set-relation.js';
import { UnsetRelation } from './relation/unset-relation.js';
import { Decrement } from './write/decrement.js';
import { Increment } from './write/increment.js';
import { SaveOne } from './write/save-one.js';
import { UpdateOneById } from './write/update-one-by-id.js';

describe('Methods', () => {
  it('should work', () => {
    FindAll();
    FindOneById();
    DeleteOneById();
    UpdateOneById();
    AddRelation();
    RemoveRelation();
    SetRelation();
    UnsetRelation();
    Increment();
    Decrement();
    Count();
    SaveOne();
  });
});
