/**
 * Resolver function type
 */
export type ScopeResolver = (...paths: string[]) => string | never;
