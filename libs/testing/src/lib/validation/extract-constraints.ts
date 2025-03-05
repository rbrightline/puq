import type { ValidationError } from 'class-validator';

export function extractConstraints(errors?: ValidationError[]): string[] {
  const result: string[] = [];

  if (errors && errors.length > 0) {
    errors.forEach((e) => {
      if (e.constraints) result.push(...Object.keys(e.constraints));
      if (e.children && e.children.length > 0)
        result.push(...extractConstraints(e.children));
    });
  }

  return result;
}
