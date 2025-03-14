import type { ClassDecoratorParam, MethodDecoratorParam } from '@puq/type';
import { SaveOne } from './write/save-one.js';
import { DeleteOneById } from './delete/delete-one-by-id.js';
import { UpdateOneById } from './write/update-one-by-id.js';
import { FindOneById } from './read/find-one-by-id.js';
import { FindAll } from './read/find-all.js';
import { Count } from './read/count.js';
import { Increment } from './write/increment.js';
import { Decrement } from './write/decrement.js';
import { AddRelation } from './relation/add-relation.js';
import { RemoveRelation } from './relation/remove-relation.js';
import { SetRelation } from './relation/set-relation.js';
import { UnsetRelation } from './relation/unset-relation.js';
import { RestoreOneById } from './delete/restore-one-by-id.js';
import { Action } from './write/action.js';
import { ActionId } from './write/action-id.js';
import { Controller } from '../controller/decorator/controller.js';

export class Rest {
  static Controller(): ClassDecorator {
    return (...args: ClassDecoratorParam) => {
      Controller()(...args);
    };
  }

  static FindAll(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      FindAll()(...args);
    };
  }

  static FindOneById(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      FindOneById()(...args);
    };
  }

  static SaveOne(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      SaveOne()(...args);
    };
  }

  static DeleteOneById(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      DeleteOneById()(...args);
    };
  }

  static RestoreOneById(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      RestoreOneById()(...args);
    };
  }

  static UpdateOneById(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      UpdateOneById()(...args);
    };
  }

  static Count(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      Count()(...args);
    };
  }

  static Increment(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      Increment()(...args);
    };
  }

  static Decrement(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      Decrement()(...args);
    };
  }

  static AddRelation(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      AddRelation()(...args);
    };
  }

  static RemoveRelation(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      RemoveRelation()(...args);
    };
  }

  static SetRelation(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      SetRelation()(...args);
    };
  }

  static UnsetRelation(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      UnsetRelation()(...args);
    };
  }

  static Action(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      Action()(...args);
    };
  }

  static ActionId(): MethodDecorator {
    return (...args: MethodDecoratorParam) => {
      ActionId()(...args);
    };
  }
}
