/**
 * Defines a function type for resolving file paths within a specific scope.
 * This type represents a utility function that takes one or more path segments
 * and returns a single resolved path string, typically used to normalize or
 * contextualize paths relative to a base directory or scope.
 *
 * @param paths - Variable number of path segments to resolve
 * @returns A resolved path string combining the provided segments
 *
 * @example
 * // Usage in a scoped resolver function
 * const resolver: ScopeResolver = (base, ...rest) => resolve(base, ...rest);
 * const path = resolver('/root', 'dir', 'file.txt');
 * // Returns: '/root/dir/file.txt'
 */
export type ScopeResolver = (...paths: string[]) => string;
