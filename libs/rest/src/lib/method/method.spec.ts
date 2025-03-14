import { DeleteOneById } from './delete/delete-one-by-id.js';
import { Rest } from './method.js';
import { Count } from './read/count.js';
import { Find } from './read/find-all.js';
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
    Find();
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

    Rest.Action();
    Rest.ActionId();
    Rest.AddRelation();
    Rest.Count();
    Rest.Decrement();
    Rest.DeleteOneById();
    Rest.FindAll();
    Rest.FindOneById();
    Rest.Increment();
    Rest.RemoveRelation();
    Rest.RestoreOneById();
    Rest.SaveOne();
  });
});
