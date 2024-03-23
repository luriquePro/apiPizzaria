// TIPAGEM
type CorsOriginCallback = (error: null | Error, allow?: boolean) => void;

type StaticOrigin = string | boolean | RegExp | (string | boolean | RegExp)[];
type CustomOrigin = (requestOrigin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin | undefined) => void) => void;

export { CorsOriginCallback, StaticOrigin, CustomOrigin };
