
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model PlayerStats
 * 
 */
export type PlayerStats = $Result.DefaultSelection<Prisma.$PlayerStatsPayload>
/**
 * Model MatchHistory
 * 
 */
export type MatchHistory = $Result.DefaultSelection<Prisma.$MatchHistoryPayload>
/**
 * Model LeaderboardSnapshot
 * 
 */
export type LeaderboardSnapshot = $Result.DefaultSelection<Prisma.$LeaderboardSnapshotPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Players
 * const players = await prisma.player.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Players
   * const players = await prisma.player.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.playerStats`: Exposes CRUD operations for the **PlayerStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlayerStats
    * const playerStats = await prisma.playerStats.findMany()
    * ```
    */
  get playerStats(): Prisma.PlayerStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchHistory`: Exposes CRUD operations for the **MatchHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchHistories
    * const matchHistories = await prisma.matchHistory.findMany()
    * ```
    */
  get matchHistory(): Prisma.MatchHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaderboardSnapshot`: Exposes CRUD operations for the **LeaderboardSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaderboardSnapshots
    * const leaderboardSnapshots = await prisma.leaderboardSnapshot.findMany()
    * ```
    */
  get leaderboardSnapshot(): Prisma.LeaderboardSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.18.0
   * Query Engine version: 34b5a692b7bd79939a9a2c3ef97d816e749cda2f
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Player: 'Player',
    PlayerStats: 'PlayerStats',
    MatchHistory: 'MatchHistory',
    LeaderboardSnapshot: 'LeaderboardSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "player" | "playerStats" | "matchHistory" | "leaderboardSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      PlayerStats: {
        payload: Prisma.$PlayerStatsPayload<ExtArgs>
        fields: Prisma.PlayerStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>
          }
          findFirst: {
            args: Prisma.PlayerStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>
          }
          findMany: {
            args: Prisma.PlayerStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>[]
          }
          create: {
            args: Prisma.PlayerStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>
          }
          createMany: {
            args: Prisma.PlayerStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>[]
          }
          delete: {
            args: Prisma.PlayerStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>
          }
          update: {
            args: Prisma.PlayerStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>
          }
          deleteMany: {
            args: Prisma.PlayerStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>[]
          }
          upsert: {
            args: Prisma.PlayerStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerStatsPayload>
          }
          aggregate: {
            args: Prisma.PlayerStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayerStats>
          }
          groupBy: {
            args: Prisma.PlayerStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerStatsCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerStatsCountAggregateOutputType> | number
          }
        }
      }
      MatchHistory: {
        payload: Prisma.$MatchHistoryPayload<ExtArgs>
        fields: Prisma.MatchHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          findFirst: {
            args: Prisma.MatchHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          findMany: {
            args: Prisma.MatchHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>[]
          }
          create: {
            args: Prisma.MatchHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          createMany: {
            args: Prisma.MatchHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>[]
          }
          delete: {
            args: Prisma.MatchHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          update: {
            args: Prisma.MatchHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          deleteMany: {
            args: Prisma.MatchHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>[]
          }
          upsert: {
            args: Prisma.MatchHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchHistoryPayload>
          }
          aggregate: {
            args: Prisma.MatchHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchHistory>
          }
          groupBy: {
            args: Prisma.MatchHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<MatchHistoryCountAggregateOutputType> | number
          }
        }
      }
      LeaderboardSnapshot: {
        payload: Prisma.$LeaderboardSnapshotPayload<ExtArgs>
        fields: Prisma.LeaderboardSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaderboardSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaderboardSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          findFirst: {
            args: Prisma.LeaderboardSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaderboardSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          findMany: {
            args: Prisma.LeaderboardSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>[]
          }
          create: {
            args: Prisma.LeaderboardSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          createMany: {
            args: Prisma.LeaderboardSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaderboardSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>[]
          }
          delete: {
            args: Prisma.LeaderboardSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          update: {
            args: Prisma.LeaderboardSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.LeaderboardSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaderboardSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaderboardSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.LeaderboardSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardSnapshotPayload>
          }
          aggregate: {
            args: Prisma.LeaderboardSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaderboardSnapshot>
          }
          groupBy: {
            args: Prisma.LeaderboardSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaderboardSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaderboardSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<LeaderboardSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    player?: PlayerOmit
    playerStats?: PlayerStatsOmit
    matchHistory?: MatchHistoryOmit
    leaderboardSnapshot?: LeaderboardSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    matchesHistory: number
    leaderboardSnaps: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matchesHistory?: boolean | PlayerCountOutputTypeCountMatchesHistoryArgs
    leaderboardSnaps?: boolean | PlayerCountOutputTypeCountLeaderboardSnapsArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountMatchesHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchHistoryWhereInput
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountLeaderboardSnapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaderboardSnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    externalUserId: string | null
    username: string | null
    createdAt: Date | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    externalUserId: string | null
    username: string | null
    createdAt: Date | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    externalUserId: number
    username: number
    createdAt: number
    _all: number
  }


  export type PlayerMinAggregateInputType = {
    id?: true
    externalUserId?: true
    username?: true
    createdAt?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    externalUserId?: true
    username?: true
    createdAt?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    externalUserId?: true
    username?: true
    createdAt?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    externalUserId: string
    username: string
    createdAt: Date
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalUserId?: boolean
    username?: boolean
    createdAt?: boolean
    stats?: boolean | Player$statsArgs<ExtArgs>
    matchesHistory?: boolean | Player$matchesHistoryArgs<ExtArgs>
    leaderboardSnaps?: boolean | Player$leaderboardSnapsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalUserId?: boolean
    username?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalUserId?: boolean
    username?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    externalUserId?: boolean
    username?: boolean
    createdAt?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalUserId" | "username" | "createdAt", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stats?: boolean | Player$statsArgs<ExtArgs>
    matchesHistory?: boolean | Player$matchesHistoryArgs<ExtArgs>
    leaderboardSnaps?: boolean | Player$leaderboardSnapsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      stats: Prisma.$PlayerStatsPayload<ExtArgs> | null
      matchesHistory: Prisma.$MatchHistoryPayload<ExtArgs>[]
      leaderboardSnaps: Prisma.$LeaderboardSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalUserId: string
      username: string
      createdAt: Date
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stats<T extends Player$statsArgs<ExtArgs> = {}>(args?: Subset<T, Player$statsArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    matchesHistory<T extends Player$matchesHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Player$matchesHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leaderboardSnaps<T extends Player$leaderboardSnapsArgs<ExtArgs> = {}>(args?: Subset<T, Player$leaderboardSnapsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly externalUserId: FieldRef<"Player", 'String'>
    readonly username: FieldRef<"Player", 'String'>
    readonly createdAt: FieldRef<"Player", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.stats
   */
  export type Player$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    where?: PlayerStatsWhereInput
  }

  /**
   * Player.matchesHistory
   */
  export type Player$matchesHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    where?: MatchHistoryWhereInput
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    cursor?: MatchHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchHistoryScalarFieldEnum | MatchHistoryScalarFieldEnum[]
  }

  /**
   * Player.leaderboardSnaps
   */
  export type Player$leaderboardSnapsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    where?: LeaderboardSnapshotWhereInput
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    cursor?: LeaderboardSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model PlayerStats
   */

  export type AggregatePlayerStats = {
    _count: PlayerStatsCountAggregateOutputType | null
    _avg: PlayerStatsAvgAggregateOutputType | null
    _sum: PlayerStatsSumAggregateOutputType | null
    _min: PlayerStatsMinAggregateOutputType | null
    _max: PlayerStatsMaxAggregateOutputType | null
  }

  export type PlayerStatsAvgAggregateOutputType = {
    totalPoints: number | null
    gamesPlayed: number | null
    wins: number | null
    losses: number | null
  }

  export type PlayerStatsSumAggregateOutputType = {
    totalPoints: number | null
    gamesPlayed: number | null
    wins: number | null
    losses: number | null
  }

  export type PlayerStatsMinAggregateOutputType = {
    id: string | null
    playerId: string | null
    totalPoints: number | null
    gamesPlayed: number | null
    wins: number | null
    losses: number | null
    lastUpdate: Date | null
  }

  export type PlayerStatsMaxAggregateOutputType = {
    id: string | null
    playerId: string | null
    totalPoints: number | null
    gamesPlayed: number | null
    wins: number | null
    losses: number | null
    lastUpdate: Date | null
  }

  export type PlayerStatsCountAggregateOutputType = {
    id: number
    playerId: number
    totalPoints: number
    gamesPlayed: number
    wins: number
    losses: number
    lastUpdate: number
    _all: number
  }


  export type PlayerStatsAvgAggregateInputType = {
    totalPoints?: true
    gamesPlayed?: true
    wins?: true
    losses?: true
  }

  export type PlayerStatsSumAggregateInputType = {
    totalPoints?: true
    gamesPlayed?: true
    wins?: true
    losses?: true
  }

  export type PlayerStatsMinAggregateInputType = {
    id?: true
    playerId?: true
    totalPoints?: true
    gamesPlayed?: true
    wins?: true
    losses?: true
    lastUpdate?: true
  }

  export type PlayerStatsMaxAggregateInputType = {
    id?: true
    playerId?: true
    totalPoints?: true
    gamesPlayed?: true
    wins?: true
    losses?: true
    lastUpdate?: true
  }

  export type PlayerStatsCountAggregateInputType = {
    id?: true
    playerId?: true
    totalPoints?: true
    gamesPlayed?: true
    wins?: true
    losses?: true
    lastUpdate?: true
    _all?: true
  }

  export type PlayerStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayerStats to aggregate.
     */
    where?: PlayerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerStats to fetch.
     */
    orderBy?: PlayerStatsOrderByWithRelationInput | PlayerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlayerStats
    **/
    _count?: true | PlayerStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerStatsMaxAggregateInputType
  }

  export type GetPlayerStatsAggregateType<T extends PlayerStatsAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayerStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayerStats[P]>
      : GetScalarType<T[P], AggregatePlayerStats[P]>
  }




  export type PlayerStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerStatsWhereInput
    orderBy?: PlayerStatsOrderByWithAggregationInput | PlayerStatsOrderByWithAggregationInput[]
    by: PlayerStatsScalarFieldEnum[] | PlayerStatsScalarFieldEnum
    having?: PlayerStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerStatsCountAggregateInputType | true
    _avg?: PlayerStatsAvgAggregateInputType
    _sum?: PlayerStatsSumAggregateInputType
    _min?: PlayerStatsMinAggregateInputType
    _max?: PlayerStatsMaxAggregateInputType
  }

  export type PlayerStatsGroupByOutputType = {
    id: string
    playerId: string
    totalPoints: number
    gamesPlayed: number
    wins: number
    losses: number
    lastUpdate: Date
    _count: PlayerStatsCountAggregateOutputType | null
    _avg: PlayerStatsAvgAggregateOutputType | null
    _sum: PlayerStatsSumAggregateOutputType | null
    _min: PlayerStatsMinAggregateOutputType | null
    _max: PlayerStatsMaxAggregateOutputType | null
  }

  type GetPlayerStatsGroupByPayload<T extends PlayerStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerStatsGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerStatsGroupByOutputType[P]>
        }
      >
    >


  export type PlayerStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    totalPoints?: boolean
    gamesPlayed?: boolean
    wins?: boolean
    losses?: boolean
    lastUpdate?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerStats"]>

  export type PlayerStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    totalPoints?: boolean
    gamesPlayed?: boolean
    wins?: boolean
    losses?: boolean
    lastUpdate?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerStats"]>

  export type PlayerStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    totalPoints?: boolean
    gamesPlayed?: boolean
    wins?: boolean
    losses?: boolean
    lastUpdate?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playerStats"]>

  export type PlayerStatsSelectScalar = {
    id?: boolean
    playerId?: boolean
    totalPoints?: boolean
    gamesPlayed?: boolean
    wins?: boolean
    losses?: boolean
    lastUpdate?: boolean
  }

  export type PlayerStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playerId" | "totalPoints" | "gamesPlayed" | "wins" | "losses" | "lastUpdate", ExtArgs["result"]["playerStats"]>
  export type PlayerStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type PlayerStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type PlayerStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $PlayerStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlayerStats"
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      playerId: string
      totalPoints: number
      gamesPlayed: number
      wins: number
      losses: number
      lastUpdate: Date
    }, ExtArgs["result"]["playerStats"]>
    composites: {}
  }

  type PlayerStatsGetPayload<S extends boolean | null | undefined | PlayerStatsDefaultArgs> = $Result.GetResult<Prisma.$PlayerStatsPayload, S>

  type PlayerStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerStatsCountAggregateInputType | true
    }

  export interface PlayerStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlayerStats'], meta: { name: 'PlayerStats' } }
    /**
     * Find zero or one PlayerStats that matches the filter.
     * @param {PlayerStatsFindUniqueArgs} args - Arguments to find a PlayerStats
     * @example
     * // Get one PlayerStats
     * const playerStats = await prisma.playerStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerStatsFindUniqueArgs>(args: SelectSubset<T, PlayerStatsFindUniqueArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlayerStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerStatsFindUniqueOrThrowArgs} args - Arguments to find a PlayerStats
     * @example
     * // Get one PlayerStats
     * const playerStats = await prisma.playerStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlayerStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerStatsFindFirstArgs} args - Arguments to find a PlayerStats
     * @example
     * // Get one PlayerStats
     * const playerStats = await prisma.playerStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerStatsFindFirstArgs>(args?: SelectSubset<T, PlayerStatsFindFirstArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlayerStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerStatsFindFirstOrThrowArgs} args - Arguments to find a PlayerStats
     * @example
     * // Get one PlayerStats
     * const playerStats = await prisma.playerStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlayerStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlayerStats
     * const playerStats = await prisma.playerStats.findMany()
     * 
     * // Get first 10 PlayerStats
     * const playerStats = await prisma.playerStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerStatsWithIdOnly = await prisma.playerStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerStatsFindManyArgs>(args?: SelectSubset<T, PlayerStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlayerStats.
     * @param {PlayerStatsCreateArgs} args - Arguments to create a PlayerStats.
     * @example
     * // Create one PlayerStats
     * const PlayerStats = await prisma.playerStats.create({
     *   data: {
     *     // ... data to create a PlayerStats
     *   }
     * })
     * 
     */
    create<T extends PlayerStatsCreateArgs>(args: SelectSubset<T, PlayerStatsCreateArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlayerStats.
     * @param {PlayerStatsCreateManyArgs} args - Arguments to create many PlayerStats.
     * @example
     * // Create many PlayerStats
     * const playerStats = await prisma.playerStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerStatsCreateManyArgs>(args?: SelectSubset<T, PlayerStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlayerStats and returns the data saved in the database.
     * @param {PlayerStatsCreateManyAndReturnArgs} args - Arguments to create many PlayerStats.
     * @example
     * // Create many PlayerStats
     * const playerStats = await prisma.playerStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlayerStats and only return the `id`
     * const playerStatsWithIdOnly = await prisma.playerStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlayerStats.
     * @param {PlayerStatsDeleteArgs} args - Arguments to delete one PlayerStats.
     * @example
     * // Delete one PlayerStats
     * const PlayerStats = await prisma.playerStats.delete({
     *   where: {
     *     // ... filter to delete one PlayerStats
     *   }
     * })
     * 
     */
    delete<T extends PlayerStatsDeleteArgs>(args: SelectSubset<T, PlayerStatsDeleteArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlayerStats.
     * @param {PlayerStatsUpdateArgs} args - Arguments to update one PlayerStats.
     * @example
     * // Update one PlayerStats
     * const playerStats = await prisma.playerStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerStatsUpdateArgs>(args: SelectSubset<T, PlayerStatsUpdateArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlayerStats.
     * @param {PlayerStatsDeleteManyArgs} args - Arguments to filter PlayerStats to delete.
     * @example
     * // Delete a few PlayerStats
     * const { count } = await prisma.playerStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerStatsDeleteManyArgs>(args?: SelectSubset<T, PlayerStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlayerStats
     * const playerStats = await prisma.playerStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerStatsUpdateManyArgs>(args: SelectSubset<T, PlayerStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayerStats and returns the data updated in the database.
     * @param {PlayerStatsUpdateManyAndReturnArgs} args - Arguments to update many PlayerStats.
     * @example
     * // Update many PlayerStats
     * const playerStats = await prisma.playerStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlayerStats and only return the `id`
     * const playerStatsWithIdOnly = await prisma.playerStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlayerStats.
     * @param {PlayerStatsUpsertArgs} args - Arguments to update or create a PlayerStats.
     * @example
     * // Update or create a PlayerStats
     * const playerStats = await prisma.playerStats.upsert({
     *   create: {
     *     // ... data to create a PlayerStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlayerStats we want to update
     *   }
     * })
     */
    upsert<T extends PlayerStatsUpsertArgs>(args: SelectSubset<T, PlayerStatsUpsertArgs<ExtArgs>>): Prisma__PlayerStatsClient<$Result.GetResult<Prisma.$PlayerStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlayerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerStatsCountArgs} args - Arguments to filter PlayerStats to count.
     * @example
     * // Count the number of PlayerStats
     * const count = await prisma.playerStats.count({
     *   where: {
     *     // ... the filter for the PlayerStats we want to count
     *   }
     * })
    **/
    count<T extends PlayerStatsCountArgs>(
      args?: Subset<T, PlayerStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlayerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerStatsAggregateArgs>(args: Subset<T, PlayerStatsAggregateArgs>): Prisma.PrismaPromise<GetPlayerStatsAggregateType<T>>

    /**
     * Group by PlayerStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerStatsGroupByArgs['orderBy'] }
        : { orderBy?: PlayerStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlayerStats model
   */
  readonly fields: PlayerStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlayerStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlayerStats model
   */
  interface PlayerStatsFieldRefs {
    readonly id: FieldRef<"PlayerStats", 'String'>
    readonly playerId: FieldRef<"PlayerStats", 'String'>
    readonly totalPoints: FieldRef<"PlayerStats", 'Int'>
    readonly gamesPlayed: FieldRef<"PlayerStats", 'Int'>
    readonly wins: FieldRef<"PlayerStats", 'Int'>
    readonly losses: FieldRef<"PlayerStats", 'Int'>
    readonly lastUpdate: FieldRef<"PlayerStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlayerStats findUnique
   */
  export type PlayerStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerStats to fetch.
     */
    where: PlayerStatsWhereUniqueInput
  }

  /**
   * PlayerStats findUniqueOrThrow
   */
  export type PlayerStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerStats to fetch.
     */
    where: PlayerStatsWhereUniqueInput
  }

  /**
   * PlayerStats findFirst
   */
  export type PlayerStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerStats to fetch.
     */
    where?: PlayerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerStats to fetch.
     */
    orderBy?: PlayerStatsOrderByWithRelationInput | PlayerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayerStats.
     */
    cursor?: PlayerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayerStats.
     */
    distinct?: PlayerStatsScalarFieldEnum | PlayerStatsScalarFieldEnum[]
  }

  /**
   * PlayerStats findFirstOrThrow
   */
  export type PlayerStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerStats to fetch.
     */
    where?: PlayerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerStats to fetch.
     */
    orderBy?: PlayerStatsOrderByWithRelationInput | PlayerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlayerStats.
     */
    cursor?: PlayerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlayerStats.
     */
    distinct?: PlayerStatsScalarFieldEnum | PlayerStatsScalarFieldEnum[]
  }

  /**
   * PlayerStats findMany
   */
  export type PlayerStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * Filter, which PlayerStats to fetch.
     */
    where?: PlayerStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlayerStats to fetch.
     */
    orderBy?: PlayerStatsOrderByWithRelationInput | PlayerStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlayerStats.
     */
    cursor?: PlayerStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlayerStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlayerStats.
     */
    skip?: number
    distinct?: PlayerStatsScalarFieldEnum | PlayerStatsScalarFieldEnum[]
  }

  /**
   * PlayerStats create
   */
  export type PlayerStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a PlayerStats.
     */
    data: XOR<PlayerStatsCreateInput, PlayerStatsUncheckedCreateInput>
  }

  /**
   * PlayerStats createMany
   */
  export type PlayerStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlayerStats.
     */
    data: PlayerStatsCreateManyInput | PlayerStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlayerStats createManyAndReturn
   */
  export type PlayerStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * The data used to create many PlayerStats.
     */
    data: PlayerStatsCreateManyInput | PlayerStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlayerStats update
   */
  export type PlayerStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a PlayerStats.
     */
    data: XOR<PlayerStatsUpdateInput, PlayerStatsUncheckedUpdateInput>
    /**
     * Choose, which PlayerStats to update.
     */
    where: PlayerStatsWhereUniqueInput
  }

  /**
   * PlayerStats updateMany
   */
  export type PlayerStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlayerStats.
     */
    data: XOR<PlayerStatsUpdateManyMutationInput, PlayerStatsUncheckedUpdateManyInput>
    /**
     * Filter which PlayerStats to update
     */
    where?: PlayerStatsWhereInput
    /**
     * Limit how many PlayerStats to update.
     */
    limit?: number
  }

  /**
   * PlayerStats updateManyAndReturn
   */
  export type PlayerStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * The data used to update PlayerStats.
     */
    data: XOR<PlayerStatsUpdateManyMutationInput, PlayerStatsUncheckedUpdateManyInput>
    /**
     * Filter which PlayerStats to update
     */
    where?: PlayerStatsWhereInput
    /**
     * Limit how many PlayerStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PlayerStats upsert
   */
  export type PlayerStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the PlayerStats to update in case it exists.
     */
    where: PlayerStatsWhereUniqueInput
    /**
     * In case the PlayerStats found by the `where` argument doesn't exist, create a new PlayerStats with this data.
     */
    create: XOR<PlayerStatsCreateInput, PlayerStatsUncheckedCreateInput>
    /**
     * In case the PlayerStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerStatsUpdateInput, PlayerStatsUncheckedUpdateInput>
  }

  /**
   * PlayerStats delete
   */
  export type PlayerStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
    /**
     * Filter which PlayerStats to delete.
     */
    where: PlayerStatsWhereUniqueInput
  }

  /**
   * PlayerStats deleteMany
   */
  export type PlayerStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlayerStats to delete
     */
    where?: PlayerStatsWhereInput
    /**
     * Limit how many PlayerStats to delete.
     */
    limit?: number
  }

  /**
   * PlayerStats without action
   */
  export type PlayerStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerStats
     */
    select?: PlayerStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlayerStats
     */
    omit?: PlayerStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerStatsInclude<ExtArgs> | null
  }


  /**
   * Model MatchHistory
   */

  export type AggregateMatchHistory = {
    _count: MatchHistoryCountAggregateOutputType | null
    _avg: MatchHistoryAvgAggregateOutputType | null
    _sum: MatchHistorySumAggregateOutputType | null
    _min: MatchHistoryMinAggregateOutputType | null
    _max: MatchHistoryMaxAggregateOutputType | null
  }

  export type MatchHistoryAvgAggregateOutputType = {
    score: number | null
    position: number | null
  }

  export type MatchHistorySumAggregateOutputType = {
    score: number | null
    position: number | null
  }

  export type MatchHistoryMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    playerId: string | null
    score: number | null
    position: number | null
    playedAt: Date | null
  }

  export type MatchHistoryMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    playerId: string | null
    score: number | null
    position: number | null
    playedAt: Date | null
  }

  export type MatchHistoryCountAggregateOutputType = {
    id: number
    matchId: number
    playerId: number
    score: number
    position: number
    playedAt: number
    _all: number
  }


  export type MatchHistoryAvgAggregateInputType = {
    score?: true
    position?: true
  }

  export type MatchHistorySumAggregateInputType = {
    score?: true
    position?: true
  }

  export type MatchHistoryMinAggregateInputType = {
    id?: true
    matchId?: true
    playerId?: true
    score?: true
    position?: true
    playedAt?: true
  }

  export type MatchHistoryMaxAggregateInputType = {
    id?: true
    matchId?: true
    playerId?: true
    score?: true
    position?: true
    playedAt?: true
  }

  export type MatchHistoryCountAggregateInputType = {
    id?: true
    matchId?: true
    playerId?: true
    score?: true
    position?: true
    playedAt?: true
    _all?: true
  }

  export type MatchHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchHistory to aggregate.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchHistories
    **/
    _count?: true | MatchHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchHistoryMaxAggregateInputType
  }

  export type GetMatchHistoryAggregateType<T extends MatchHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchHistory[P]>
      : GetScalarType<T[P], AggregateMatchHistory[P]>
  }




  export type MatchHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchHistoryWhereInput
    orderBy?: MatchHistoryOrderByWithAggregationInput | MatchHistoryOrderByWithAggregationInput[]
    by: MatchHistoryScalarFieldEnum[] | MatchHistoryScalarFieldEnum
    having?: MatchHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchHistoryCountAggregateInputType | true
    _avg?: MatchHistoryAvgAggregateInputType
    _sum?: MatchHistorySumAggregateInputType
    _min?: MatchHistoryMinAggregateInputType
    _max?: MatchHistoryMaxAggregateInputType
  }

  export type MatchHistoryGroupByOutputType = {
    id: string
    matchId: string
    playerId: string
    score: number
    position: number
    playedAt: Date
    _count: MatchHistoryCountAggregateOutputType | null
    _avg: MatchHistoryAvgAggregateOutputType | null
    _sum: MatchHistorySumAggregateOutputType | null
    _min: MatchHistoryMinAggregateOutputType | null
    _max: MatchHistoryMaxAggregateOutputType | null
  }

  type GetMatchHistoryGroupByPayload<T extends MatchHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], MatchHistoryGroupByOutputType[P]>
        }
      >
    >


  export type MatchHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    playerId?: boolean
    score?: boolean
    position?: boolean
    playedAt?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchHistory"]>

  export type MatchHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    playerId?: boolean
    score?: boolean
    position?: boolean
    playedAt?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchHistory"]>

  export type MatchHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    playerId?: boolean
    score?: boolean
    position?: boolean
    playedAt?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchHistory"]>

  export type MatchHistorySelectScalar = {
    id?: boolean
    matchId?: boolean
    playerId?: boolean
    score?: boolean
    position?: boolean
    playedAt?: boolean
  }

  export type MatchHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "playerId" | "score" | "position" | "playedAt", ExtArgs["result"]["matchHistory"]>
  export type MatchHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type MatchHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type MatchHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $MatchHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchHistory"
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      playerId: string
      score: number
      position: number
      playedAt: Date
    }, ExtArgs["result"]["matchHistory"]>
    composites: {}
  }

  type MatchHistoryGetPayload<S extends boolean | null | undefined | MatchHistoryDefaultArgs> = $Result.GetResult<Prisma.$MatchHistoryPayload, S>

  type MatchHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchHistoryCountAggregateInputType | true
    }

  export interface MatchHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchHistory'], meta: { name: 'MatchHistory' } }
    /**
     * Find zero or one MatchHistory that matches the filter.
     * @param {MatchHistoryFindUniqueArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchHistoryFindUniqueArgs>(args: SelectSubset<T, MatchHistoryFindUniqueArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchHistoryFindUniqueOrThrowArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryFindFirstArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchHistoryFindFirstArgs>(args?: SelectSubset<T, MatchHistoryFindFirstArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryFindFirstOrThrowArgs} args - Arguments to find a MatchHistory
     * @example
     * // Get one MatchHistory
     * const matchHistory = await prisma.matchHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchHistories
     * const matchHistories = await prisma.matchHistory.findMany()
     * 
     * // Get first 10 MatchHistories
     * const matchHistories = await prisma.matchHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchHistoryWithIdOnly = await prisma.matchHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchHistoryFindManyArgs>(args?: SelectSubset<T, MatchHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchHistory.
     * @param {MatchHistoryCreateArgs} args - Arguments to create a MatchHistory.
     * @example
     * // Create one MatchHistory
     * const MatchHistory = await prisma.matchHistory.create({
     *   data: {
     *     // ... data to create a MatchHistory
     *   }
     * })
     * 
     */
    create<T extends MatchHistoryCreateArgs>(args: SelectSubset<T, MatchHistoryCreateArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchHistories.
     * @param {MatchHistoryCreateManyArgs} args - Arguments to create many MatchHistories.
     * @example
     * // Create many MatchHistories
     * const matchHistory = await prisma.matchHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchHistoryCreateManyArgs>(args?: SelectSubset<T, MatchHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchHistories and returns the data saved in the database.
     * @param {MatchHistoryCreateManyAndReturnArgs} args - Arguments to create many MatchHistories.
     * @example
     * // Create many MatchHistories
     * const matchHistory = await prisma.matchHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchHistories and only return the `id`
     * const matchHistoryWithIdOnly = await prisma.matchHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchHistory.
     * @param {MatchHistoryDeleteArgs} args - Arguments to delete one MatchHistory.
     * @example
     * // Delete one MatchHistory
     * const MatchHistory = await prisma.matchHistory.delete({
     *   where: {
     *     // ... filter to delete one MatchHistory
     *   }
     * })
     * 
     */
    delete<T extends MatchHistoryDeleteArgs>(args: SelectSubset<T, MatchHistoryDeleteArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchHistory.
     * @param {MatchHistoryUpdateArgs} args - Arguments to update one MatchHistory.
     * @example
     * // Update one MatchHistory
     * const matchHistory = await prisma.matchHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchHistoryUpdateArgs>(args: SelectSubset<T, MatchHistoryUpdateArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchHistories.
     * @param {MatchHistoryDeleteManyArgs} args - Arguments to filter MatchHistories to delete.
     * @example
     * // Delete a few MatchHistories
     * const { count } = await prisma.matchHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchHistoryDeleteManyArgs>(args?: SelectSubset<T, MatchHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchHistories
     * const matchHistory = await prisma.matchHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchHistoryUpdateManyArgs>(args: SelectSubset<T, MatchHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchHistories and returns the data updated in the database.
     * @param {MatchHistoryUpdateManyAndReturnArgs} args - Arguments to update many MatchHistories.
     * @example
     * // Update many MatchHistories
     * const matchHistory = await prisma.matchHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchHistories and only return the `id`
     * const matchHistoryWithIdOnly = await prisma.matchHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchHistory.
     * @param {MatchHistoryUpsertArgs} args - Arguments to update or create a MatchHistory.
     * @example
     * // Update or create a MatchHistory
     * const matchHistory = await prisma.matchHistory.upsert({
     *   create: {
     *     // ... data to create a MatchHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchHistory we want to update
     *   }
     * })
     */
    upsert<T extends MatchHistoryUpsertArgs>(args: SelectSubset<T, MatchHistoryUpsertArgs<ExtArgs>>): Prisma__MatchHistoryClient<$Result.GetResult<Prisma.$MatchHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryCountArgs} args - Arguments to filter MatchHistories to count.
     * @example
     * // Count the number of MatchHistories
     * const count = await prisma.matchHistory.count({
     *   where: {
     *     // ... the filter for the MatchHistories we want to count
     *   }
     * })
    **/
    count<T extends MatchHistoryCountArgs>(
      args?: Subset<T, MatchHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchHistoryAggregateArgs>(args: Subset<T, MatchHistoryAggregateArgs>): Prisma.PrismaPromise<GetMatchHistoryAggregateType<T>>

    /**
     * Group by MatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchHistoryGroupByArgs['orderBy'] }
        : { orderBy?: MatchHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchHistory model
   */
  readonly fields: MatchHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchHistory model
   */
  interface MatchHistoryFieldRefs {
    readonly id: FieldRef<"MatchHistory", 'String'>
    readonly matchId: FieldRef<"MatchHistory", 'String'>
    readonly playerId: FieldRef<"MatchHistory", 'String'>
    readonly score: FieldRef<"MatchHistory", 'Int'>
    readonly position: FieldRef<"MatchHistory", 'Int'>
    readonly playedAt: FieldRef<"MatchHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchHistory findUnique
   */
  export type MatchHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory findUniqueOrThrow
   */
  export type MatchHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory findFirst
   */
  export type MatchHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchHistories.
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchHistories.
     */
    distinct?: MatchHistoryScalarFieldEnum | MatchHistoryScalarFieldEnum[]
  }

  /**
   * MatchHistory findFirstOrThrow
   */
  export type MatchHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MatchHistory to fetch.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchHistories.
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchHistories.
     */
    distinct?: MatchHistoryScalarFieldEnum | MatchHistoryScalarFieldEnum[]
  }

  /**
   * MatchHistory findMany
   */
  export type MatchHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which MatchHistories to fetch.
     */
    where?: MatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchHistories to fetch.
     */
    orderBy?: MatchHistoryOrderByWithRelationInput | MatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchHistories.
     */
    cursor?: MatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchHistories.
     */
    skip?: number
    distinct?: MatchHistoryScalarFieldEnum | MatchHistoryScalarFieldEnum[]
  }

  /**
   * MatchHistory create
   */
  export type MatchHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchHistory.
     */
    data: XOR<MatchHistoryCreateInput, MatchHistoryUncheckedCreateInput>
  }

  /**
   * MatchHistory createMany
   */
  export type MatchHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchHistories.
     */
    data: MatchHistoryCreateManyInput | MatchHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchHistory createManyAndReturn
   */
  export type MatchHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many MatchHistories.
     */
    data: MatchHistoryCreateManyInput | MatchHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchHistory update
   */
  export type MatchHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchHistory.
     */
    data: XOR<MatchHistoryUpdateInput, MatchHistoryUncheckedUpdateInput>
    /**
     * Choose, which MatchHistory to update.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory updateMany
   */
  export type MatchHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchHistories.
     */
    data: XOR<MatchHistoryUpdateManyMutationInput, MatchHistoryUncheckedUpdateManyInput>
    /**
     * Filter which MatchHistories to update
     */
    where?: MatchHistoryWhereInput
    /**
     * Limit how many MatchHistories to update.
     */
    limit?: number
  }

  /**
   * MatchHistory updateManyAndReturn
   */
  export type MatchHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * The data used to update MatchHistories.
     */
    data: XOR<MatchHistoryUpdateManyMutationInput, MatchHistoryUncheckedUpdateManyInput>
    /**
     * Filter which MatchHistories to update
     */
    where?: MatchHistoryWhereInput
    /**
     * Limit how many MatchHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchHistory upsert
   */
  export type MatchHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchHistory to update in case it exists.
     */
    where: MatchHistoryWhereUniqueInput
    /**
     * In case the MatchHistory found by the `where` argument doesn't exist, create a new MatchHistory with this data.
     */
    create: XOR<MatchHistoryCreateInput, MatchHistoryUncheckedCreateInput>
    /**
     * In case the MatchHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchHistoryUpdateInput, MatchHistoryUncheckedUpdateInput>
  }

  /**
   * MatchHistory delete
   */
  export type MatchHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
    /**
     * Filter which MatchHistory to delete.
     */
    where: MatchHistoryWhereUniqueInput
  }

  /**
   * MatchHistory deleteMany
   */
  export type MatchHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchHistories to delete
     */
    where?: MatchHistoryWhereInput
    /**
     * Limit how many MatchHistories to delete.
     */
    limit?: number
  }

  /**
   * MatchHistory without action
   */
  export type MatchHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchHistory
     */
    select?: MatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchHistory
     */
    omit?: MatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchHistoryInclude<ExtArgs> | null
  }


  /**
   * Model LeaderboardSnapshot
   */

  export type AggregateLeaderboardSnapshot = {
    _count: LeaderboardSnapshotCountAggregateOutputType | null
    _avg: LeaderboardSnapshotAvgAggregateOutputType | null
    _sum: LeaderboardSnapshotSumAggregateOutputType | null
    _min: LeaderboardSnapshotMinAggregateOutputType | null
    _max: LeaderboardSnapshotMaxAggregateOutputType | null
  }

  export type LeaderboardSnapshotAvgAggregateOutputType = {
    rankPosition: number | null
    totalPoints: number | null
  }

  export type LeaderboardSnapshotSumAggregateOutputType = {
    rankPosition: number | null
    totalPoints: number | null
  }

  export type LeaderboardSnapshotMinAggregateOutputType = {
    id: string | null
    playerId: string | null
    rankPosition: number | null
    totalPoints: number | null
    snapshotDate: Date | null
  }

  export type LeaderboardSnapshotMaxAggregateOutputType = {
    id: string | null
    playerId: string | null
    rankPosition: number | null
    totalPoints: number | null
    snapshotDate: Date | null
  }

  export type LeaderboardSnapshotCountAggregateOutputType = {
    id: number
    playerId: number
    rankPosition: number
    totalPoints: number
    snapshotDate: number
    _all: number
  }


  export type LeaderboardSnapshotAvgAggregateInputType = {
    rankPosition?: true
    totalPoints?: true
  }

  export type LeaderboardSnapshotSumAggregateInputType = {
    rankPosition?: true
    totalPoints?: true
  }

  export type LeaderboardSnapshotMinAggregateInputType = {
    id?: true
    playerId?: true
    rankPosition?: true
    totalPoints?: true
    snapshotDate?: true
  }

  export type LeaderboardSnapshotMaxAggregateInputType = {
    id?: true
    playerId?: true
    rankPosition?: true
    totalPoints?: true
    snapshotDate?: true
  }

  export type LeaderboardSnapshotCountAggregateInputType = {
    id?: true
    playerId?: true
    rankPosition?: true
    totalPoints?: true
    snapshotDate?: true
    _all?: true
  }

  export type LeaderboardSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaderboardSnapshot to aggregate.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaderboardSnapshots
    **/
    _count?: true | LeaderboardSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaderboardSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaderboardSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaderboardSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaderboardSnapshotMaxAggregateInputType
  }

  export type GetLeaderboardSnapshotAggregateType<T extends LeaderboardSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaderboardSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaderboardSnapshot[P]>
      : GetScalarType<T[P], AggregateLeaderboardSnapshot[P]>
  }




  export type LeaderboardSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaderboardSnapshotWhereInput
    orderBy?: LeaderboardSnapshotOrderByWithAggregationInput | LeaderboardSnapshotOrderByWithAggregationInput[]
    by: LeaderboardSnapshotScalarFieldEnum[] | LeaderboardSnapshotScalarFieldEnum
    having?: LeaderboardSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaderboardSnapshotCountAggregateInputType | true
    _avg?: LeaderboardSnapshotAvgAggregateInputType
    _sum?: LeaderboardSnapshotSumAggregateInputType
    _min?: LeaderboardSnapshotMinAggregateInputType
    _max?: LeaderboardSnapshotMaxAggregateInputType
  }

  export type LeaderboardSnapshotGroupByOutputType = {
    id: string
    playerId: string
    rankPosition: number
    totalPoints: number
    snapshotDate: Date
    _count: LeaderboardSnapshotCountAggregateOutputType | null
    _avg: LeaderboardSnapshotAvgAggregateOutputType | null
    _sum: LeaderboardSnapshotSumAggregateOutputType | null
    _min: LeaderboardSnapshotMinAggregateOutputType | null
    _max: LeaderboardSnapshotMaxAggregateOutputType | null
  }

  type GetLeaderboardSnapshotGroupByPayload<T extends LeaderboardSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaderboardSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaderboardSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaderboardSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], LeaderboardSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type LeaderboardSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    rankPosition?: boolean
    totalPoints?: boolean
    snapshotDate?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaderboardSnapshot"]>

  export type LeaderboardSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    rankPosition?: boolean
    totalPoints?: boolean
    snapshotDate?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaderboardSnapshot"]>

  export type LeaderboardSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    rankPosition?: boolean
    totalPoints?: boolean
    snapshotDate?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaderboardSnapshot"]>

  export type LeaderboardSnapshotSelectScalar = {
    id?: boolean
    playerId?: boolean
    rankPosition?: boolean
    totalPoints?: boolean
    snapshotDate?: boolean
  }

  export type LeaderboardSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playerId" | "rankPosition" | "totalPoints" | "snapshotDate", ExtArgs["result"]["leaderboardSnapshot"]>
  export type LeaderboardSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type LeaderboardSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type LeaderboardSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $LeaderboardSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaderboardSnapshot"
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      playerId: string
      rankPosition: number
      totalPoints: number
      snapshotDate: Date
    }, ExtArgs["result"]["leaderboardSnapshot"]>
    composites: {}
  }

  type LeaderboardSnapshotGetPayload<S extends boolean | null | undefined | LeaderboardSnapshotDefaultArgs> = $Result.GetResult<Prisma.$LeaderboardSnapshotPayload, S>

  type LeaderboardSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaderboardSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaderboardSnapshotCountAggregateInputType | true
    }

  export interface LeaderboardSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaderboardSnapshot'], meta: { name: 'LeaderboardSnapshot' } }
    /**
     * Find zero or one LeaderboardSnapshot that matches the filter.
     * @param {LeaderboardSnapshotFindUniqueArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaderboardSnapshotFindUniqueArgs>(args: SelectSubset<T, LeaderboardSnapshotFindUniqueArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaderboardSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaderboardSnapshotFindUniqueOrThrowArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaderboardSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaderboardSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaderboardSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotFindFirstArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaderboardSnapshotFindFirstArgs>(args?: SelectSubset<T, LeaderboardSnapshotFindFirstArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaderboardSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotFindFirstOrThrowArgs} args - Arguments to find a LeaderboardSnapshot
     * @example
     * // Get one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaderboardSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaderboardSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaderboardSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaderboardSnapshots
     * const leaderboardSnapshots = await prisma.leaderboardSnapshot.findMany()
     * 
     * // Get first 10 LeaderboardSnapshots
     * const leaderboardSnapshots = await prisma.leaderboardSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaderboardSnapshotWithIdOnly = await prisma.leaderboardSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaderboardSnapshotFindManyArgs>(args?: SelectSubset<T, LeaderboardSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaderboardSnapshot.
     * @param {LeaderboardSnapshotCreateArgs} args - Arguments to create a LeaderboardSnapshot.
     * @example
     * // Create one LeaderboardSnapshot
     * const LeaderboardSnapshot = await prisma.leaderboardSnapshot.create({
     *   data: {
     *     // ... data to create a LeaderboardSnapshot
     *   }
     * })
     * 
     */
    create<T extends LeaderboardSnapshotCreateArgs>(args: SelectSubset<T, LeaderboardSnapshotCreateArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaderboardSnapshots.
     * @param {LeaderboardSnapshotCreateManyArgs} args - Arguments to create many LeaderboardSnapshots.
     * @example
     * // Create many LeaderboardSnapshots
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaderboardSnapshotCreateManyArgs>(args?: SelectSubset<T, LeaderboardSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaderboardSnapshots and returns the data saved in the database.
     * @param {LeaderboardSnapshotCreateManyAndReturnArgs} args - Arguments to create many LeaderboardSnapshots.
     * @example
     * // Create many LeaderboardSnapshots
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaderboardSnapshots and only return the `id`
     * const leaderboardSnapshotWithIdOnly = await prisma.leaderboardSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaderboardSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaderboardSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaderboardSnapshot.
     * @param {LeaderboardSnapshotDeleteArgs} args - Arguments to delete one LeaderboardSnapshot.
     * @example
     * // Delete one LeaderboardSnapshot
     * const LeaderboardSnapshot = await prisma.leaderboardSnapshot.delete({
     *   where: {
     *     // ... filter to delete one LeaderboardSnapshot
     *   }
     * })
     * 
     */
    delete<T extends LeaderboardSnapshotDeleteArgs>(args: SelectSubset<T, LeaderboardSnapshotDeleteArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaderboardSnapshot.
     * @param {LeaderboardSnapshotUpdateArgs} args - Arguments to update one LeaderboardSnapshot.
     * @example
     * // Update one LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaderboardSnapshotUpdateArgs>(args: SelectSubset<T, LeaderboardSnapshotUpdateArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaderboardSnapshots.
     * @param {LeaderboardSnapshotDeleteManyArgs} args - Arguments to filter LeaderboardSnapshots to delete.
     * @example
     * // Delete a few LeaderboardSnapshots
     * const { count } = await prisma.leaderboardSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaderboardSnapshotDeleteManyArgs>(args?: SelectSubset<T, LeaderboardSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaderboardSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaderboardSnapshots
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaderboardSnapshotUpdateManyArgs>(args: SelectSubset<T, LeaderboardSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaderboardSnapshots and returns the data updated in the database.
     * @param {LeaderboardSnapshotUpdateManyAndReturnArgs} args - Arguments to update many LeaderboardSnapshots.
     * @example
     * // Update many LeaderboardSnapshots
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaderboardSnapshots and only return the `id`
     * const leaderboardSnapshotWithIdOnly = await prisma.leaderboardSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeaderboardSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaderboardSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaderboardSnapshot.
     * @param {LeaderboardSnapshotUpsertArgs} args - Arguments to update or create a LeaderboardSnapshot.
     * @example
     * // Update or create a LeaderboardSnapshot
     * const leaderboardSnapshot = await prisma.leaderboardSnapshot.upsert({
     *   create: {
     *     // ... data to create a LeaderboardSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaderboardSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends LeaderboardSnapshotUpsertArgs>(args: SelectSubset<T, LeaderboardSnapshotUpsertArgs<ExtArgs>>): Prisma__LeaderboardSnapshotClient<$Result.GetResult<Prisma.$LeaderboardSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaderboardSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotCountArgs} args - Arguments to filter LeaderboardSnapshots to count.
     * @example
     * // Count the number of LeaderboardSnapshots
     * const count = await prisma.leaderboardSnapshot.count({
     *   where: {
     *     // ... the filter for the LeaderboardSnapshots we want to count
     *   }
     * })
    **/
    count<T extends LeaderboardSnapshotCountArgs>(
      args?: Subset<T, LeaderboardSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaderboardSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaderboardSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaderboardSnapshotAggregateArgs>(args: Subset<T, LeaderboardSnapshotAggregateArgs>): Prisma.PrismaPromise<GetLeaderboardSnapshotAggregateType<T>>

    /**
     * Group by LeaderboardSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaderboardSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaderboardSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: LeaderboardSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaderboardSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaderboardSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaderboardSnapshot model
   */
  readonly fields: LeaderboardSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaderboardSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaderboardSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeaderboardSnapshot model
   */
  interface LeaderboardSnapshotFieldRefs {
    readonly id: FieldRef<"LeaderboardSnapshot", 'String'>
    readonly playerId: FieldRef<"LeaderboardSnapshot", 'String'>
    readonly rankPosition: FieldRef<"LeaderboardSnapshot", 'Int'>
    readonly totalPoints: FieldRef<"LeaderboardSnapshot", 'Int'>
    readonly snapshotDate: FieldRef<"LeaderboardSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaderboardSnapshot findUnique
   */
  export type LeaderboardSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot findUniqueOrThrow
   */
  export type LeaderboardSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot findFirst
   */
  export type LeaderboardSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaderboardSnapshots.
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaderboardSnapshots.
     */
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * LeaderboardSnapshot findFirstOrThrow
   */
  export type LeaderboardSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshot to fetch.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaderboardSnapshots.
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaderboardSnapshots.
     */
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * LeaderboardSnapshot findMany
   */
  export type LeaderboardSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which LeaderboardSnapshots to fetch.
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardSnapshots to fetch.
     */
    orderBy?: LeaderboardSnapshotOrderByWithRelationInput | LeaderboardSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaderboardSnapshots.
     */
    cursor?: LeaderboardSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardSnapshots.
     */
    skip?: number
    distinct?: LeaderboardSnapshotScalarFieldEnum | LeaderboardSnapshotScalarFieldEnum[]
  }

  /**
   * LeaderboardSnapshot create
   */
  export type LeaderboardSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaderboardSnapshot.
     */
    data: XOR<LeaderboardSnapshotCreateInput, LeaderboardSnapshotUncheckedCreateInput>
  }

  /**
   * LeaderboardSnapshot createMany
   */
  export type LeaderboardSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaderboardSnapshots.
     */
    data: LeaderboardSnapshotCreateManyInput | LeaderboardSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaderboardSnapshot createManyAndReturn
   */
  export type LeaderboardSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many LeaderboardSnapshots.
     */
    data: LeaderboardSnapshotCreateManyInput | LeaderboardSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaderboardSnapshot update
   */
  export type LeaderboardSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaderboardSnapshot.
     */
    data: XOR<LeaderboardSnapshotUpdateInput, LeaderboardSnapshotUncheckedUpdateInput>
    /**
     * Choose, which LeaderboardSnapshot to update.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot updateMany
   */
  export type LeaderboardSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaderboardSnapshots.
     */
    data: XOR<LeaderboardSnapshotUpdateManyMutationInput, LeaderboardSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which LeaderboardSnapshots to update
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * Limit how many LeaderboardSnapshots to update.
     */
    limit?: number
  }

  /**
   * LeaderboardSnapshot updateManyAndReturn
   */
  export type LeaderboardSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update LeaderboardSnapshots.
     */
    data: XOR<LeaderboardSnapshotUpdateManyMutationInput, LeaderboardSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which LeaderboardSnapshots to update
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * Limit how many LeaderboardSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaderboardSnapshot upsert
   */
  export type LeaderboardSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaderboardSnapshot to update in case it exists.
     */
    where: LeaderboardSnapshotWhereUniqueInput
    /**
     * In case the LeaderboardSnapshot found by the `where` argument doesn't exist, create a new LeaderboardSnapshot with this data.
     */
    create: XOR<LeaderboardSnapshotCreateInput, LeaderboardSnapshotUncheckedCreateInput>
    /**
     * In case the LeaderboardSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaderboardSnapshotUpdateInput, LeaderboardSnapshotUncheckedUpdateInput>
  }

  /**
   * LeaderboardSnapshot delete
   */
  export type LeaderboardSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
    /**
     * Filter which LeaderboardSnapshot to delete.
     */
    where: LeaderboardSnapshotWhereUniqueInput
  }

  /**
   * LeaderboardSnapshot deleteMany
   */
  export type LeaderboardSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaderboardSnapshots to delete
     */
    where?: LeaderboardSnapshotWhereInput
    /**
     * Limit how many LeaderboardSnapshots to delete.
     */
    limit?: number
  }

  /**
   * LeaderboardSnapshot without action
   */
  export type LeaderboardSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardSnapshot
     */
    select?: LeaderboardSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardSnapshot
     */
    omit?: LeaderboardSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaderboardSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    externalUserId: 'externalUserId',
    username: 'username',
    createdAt: 'createdAt'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const PlayerStatsScalarFieldEnum: {
    id: 'id',
    playerId: 'playerId',
    totalPoints: 'totalPoints',
    gamesPlayed: 'gamesPlayed',
    wins: 'wins',
    losses: 'losses',
    lastUpdate: 'lastUpdate'
  };

  export type PlayerStatsScalarFieldEnum = (typeof PlayerStatsScalarFieldEnum)[keyof typeof PlayerStatsScalarFieldEnum]


  export const MatchHistoryScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    playerId: 'playerId',
    score: 'score',
    position: 'position',
    playedAt: 'playedAt'
  };

  export type MatchHistoryScalarFieldEnum = (typeof MatchHistoryScalarFieldEnum)[keyof typeof MatchHistoryScalarFieldEnum]


  export const LeaderboardSnapshotScalarFieldEnum: {
    id: 'id',
    playerId: 'playerId',
    rankPosition: 'rankPosition',
    totalPoints: 'totalPoints',
    snapshotDate: 'snapshotDate'
  };

  export type LeaderboardSnapshotScalarFieldEnum = (typeof LeaderboardSnapshotScalarFieldEnum)[keyof typeof LeaderboardSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    externalUserId?: StringFilter<"Player"> | string
    username?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    stats?: XOR<PlayerStatsNullableScalarRelationFilter, PlayerStatsWhereInput> | null
    matchesHistory?: MatchHistoryListRelationFilter
    leaderboardSnaps?: LeaderboardSnapshotListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    stats?: PlayerStatsOrderByWithRelationInput
    matchesHistory?: MatchHistoryOrderByRelationAggregateInput
    leaderboardSnaps?: LeaderboardSnapshotOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalUserId?: string
    username?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    createdAt?: DateTimeFilter<"Player"> | Date | string
    stats?: XOR<PlayerStatsNullableScalarRelationFilter, PlayerStatsWhereInput> | null
    matchesHistory?: MatchHistoryListRelationFilter
    leaderboardSnaps?: LeaderboardSnapshotListRelationFilter
  }, "id" | "externalUserId" | "username">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    externalUserId?: StringWithAggregatesFilter<"Player"> | string
    username?: StringWithAggregatesFilter<"Player"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
  }

  export type PlayerStatsWhereInput = {
    AND?: PlayerStatsWhereInput | PlayerStatsWhereInput[]
    OR?: PlayerStatsWhereInput[]
    NOT?: PlayerStatsWhereInput | PlayerStatsWhereInput[]
    id?: StringFilter<"PlayerStats"> | string
    playerId?: StringFilter<"PlayerStats"> | string
    totalPoints?: IntFilter<"PlayerStats"> | number
    gamesPlayed?: IntFilter<"PlayerStats"> | number
    wins?: IntFilter<"PlayerStats"> | number
    losses?: IntFilter<"PlayerStats"> | number
    lastUpdate?: DateTimeFilter<"PlayerStats"> | Date | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }

  export type PlayerStatsOrderByWithRelationInput = {
    id?: SortOrder
    playerId?: SortOrder
    totalPoints?: SortOrder
    gamesPlayed?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    lastUpdate?: SortOrder
    player?: PlayerOrderByWithRelationInput
  }

  export type PlayerStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    playerId?: string
    AND?: PlayerStatsWhereInput | PlayerStatsWhereInput[]
    OR?: PlayerStatsWhereInput[]
    NOT?: PlayerStatsWhereInput | PlayerStatsWhereInput[]
    totalPoints?: IntFilter<"PlayerStats"> | number
    gamesPlayed?: IntFilter<"PlayerStats"> | number
    wins?: IntFilter<"PlayerStats"> | number
    losses?: IntFilter<"PlayerStats"> | number
    lastUpdate?: DateTimeFilter<"PlayerStats"> | Date | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }, "id" | "playerId">

  export type PlayerStatsOrderByWithAggregationInput = {
    id?: SortOrder
    playerId?: SortOrder
    totalPoints?: SortOrder
    gamesPlayed?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    lastUpdate?: SortOrder
    _count?: PlayerStatsCountOrderByAggregateInput
    _avg?: PlayerStatsAvgOrderByAggregateInput
    _max?: PlayerStatsMaxOrderByAggregateInput
    _min?: PlayerStatsMinOrderByAggregateInput
    _sum?: PlayerStatsSumOrderByAggregateInput
  }

  export type PlayerStatsScalarWhereWithAggregatesInput = {
    AND?: PlayerStatsScalarWhereWithAggregatesInput | PlayerStatsScalarWhereWithAggregatesInput[]
    OR?: PlayerStatsScalarWhereWithAggregatesInput[]
    NOT?: PlayerStatsScalarWhereWithAggregatesInput | PlayerStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlayerStats"> | string
    playerId?: StringWithAggregatesFilter<"PlayerStats"> | string
    totalPoints?: IntWithAggregatesFilter<"PlayerStats"> | number
    gamesPlayed?: IntWithAggregatesFilter<"PlayerStats"> | number
    wins?: IntWithAggregatesFilter<"PlayerStats"> | number
    losses?: IntWithAggregatesFilter<"PlayerStats"> | number
    lastUpdate?: DateTimeWithAggregatesFilter<"PlayerStats"> | Date | string
  }

  export type MatchHistoryWhereInput = {
    AND?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    OR?: MatchHistoryWhereInput[]
    NOT?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    id?: StringFilter<"MatchHistory"> | string
    matchId?: StringFilter<"MatchHistory"> | string
    playerId?: StringFilter<"MatchHistory"> | string
    score?: IntFilter<"MatchHistory"> | number
    position?: IntFilter<"MatchHistory"> | number
    playedAt?: DateTimeFilter<"MatchHistory"> | Date | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }

  export type MatchHistoryOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    playerId?: SortOrder
    score?: SortOrder
    position?: SortOrder
    playedAt?: SortOrder
    player?: PlayerOrderByWithRelationInput
  }

  export type MatchHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    OR?: MatchHistoryWhereInput[]
    NOT?: MatchHistoryWhereInput | MatchHistoryWhereInput[]
    matchId?: StringFilter<"MatchHistory"> | string
    playerId?: StringFilter<"MatchHistory"> | string
    score?: IntFilter<"MatchHistory"> | number
    position?: IntFilter<"MatchHistory"> | number
    playedAt?: DateTimeFilter<"MatchHistory"> | Date | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }, "id">

  export type MatchHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    playerId?: SortOrder
    score?: SortOrder
    position?: SortOrder
    playedAt?: SortOrder
    _count?: MatchHistoryCountOrderByAggregateInput
    _avg?: MatchHistoryAvgOrderByAggregateInput
    _max?: MatchHistoryMaxOrderByAggregateInput
    _min?: MatchHistoryMinOrderByAggregateInput
    _sum?: MatchHistorySumOrderByAggregateInput
  }

  export type MatchHistoryScalarWhereWithAggregatesInput = {
    AND?: MatchHistoryScalarWhereWithAggregatesInput | MatchHistoryScalarWhereWithAggregatesInput[]
    OR?: MatchHistoryScalarWhereWithAggregatesInput[]
    NOT?: MatchHistoryScalarWhereWithAggregatesInput | MatchHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchHistory"> | string
    matchId?: StringWithAggregatesFilter<"MatchHistory"> | string
    playerId?: StringWithAggregatesFilter<"MatchHistory"> | string
    score?: IntWithAggregatesFilter<"MatchHistory"> | number
    position?: IntWithAggregatesFilter<"MatchHistory"> | number
    playedAt?: DateTimeWithAggregatesFilter<"MatchHistory"> | Date | string
  }

  export type LeaderboardSnapshotWhereInput = {
    AND?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    OR?: LeaderboardSnapshotWhereInput[]
    NOT?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    id?: StringFilter<"LeaderboardSnapshot"> | string
    playerId?: StringFilter<"LeaderboardSnapshot"> | string
    rankPosition?: IntFilter<"LeaderboardSnapshot"> | number
    totalPoints?: IntFilter<"LeaderboardSnapshot"> | number
    snapshotDate?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }

  export type LeaderboardSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    playerId?: SortOrder
    rankPosition?: SortOrder
    totalPoints?: SortOrder
    snapshotDate?: SortOrder
    player?: PlayerOrderByWithRelationInput
  }

  export type LeaderboardSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    OR?: LeaderboardSnapshotWhereInput[]
    NOT?: LeaderboardSnapshotWhereInput | LeaderboardSnapshotWhereInput[]
    playerId?: StringFilter<"LeaderboardSnapshot"> | string
    rankPosition?: IntFilter<"LeaderboardSnapshot"> | number
    totalPoints?: IntFilter<"LeaderboardSnapshot"> | number
    snapshotDate?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }, "id">

  export type LeaderboardSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    playerId?: SortOrder
    rankPosition?: SortOrder
    totalPoints?: SortOrder
    snapshotDate?: SortOrder
    _count?: LeaderboardSnapshotCountOrderByAggregateInput
    _avg?: LeaderboardSnapshotAvgOrderByAggregateInput
    _max?: LeaderboardSnapshotMaxOrderByAggregateInput
    _min?: LeaderboardSnapshotMinOrderByAggregateInput
    _sum?: LeaderboardSnapshotSumOrderByAggregateInput
  }

  export type LeaderboardSnapshotScalarWhereWithAggregatesInput = {
    AND?: LeaderboardSnapshotScalarWhereWithAggregatesInput | LeaderboardSnapshotScalarWhereWithAggregatesInput[]
    OR?: LeaderboardSnapshotScalarWhereWithAggregatesInput[]
    NOT?: LeaderboardSnapshotScalarWhereWithAggregatesInput | LeaderboardSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaderboardSnapshot"> | string
    playerId?: StringWithAggregatesFilter<"LeaderboardSnapshot"> | string
    rankPosition?: IntWithAggregatesFilter<"LeaderboardSnapshot"> | number
    totalPoints?: IntWithAggregatesFilter<"LeaderboardSnapshot"> | number
    snapshotDate?: DateTimeWithAggregatesFilter<"LeaderboardSnapshot"> | Date | string
  }

  export type PlayerCreateInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    stats?: PlayerStatsCreateNestedOneWithoutPlayerInput
    matchesHistory?: MatchHistoryCreateNestedManyWithoutPlayerInput
    leaderboardSnaps?: LeaderboardSnapshotCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    stats?: PlayerStatsUncheckedCreateNestedOneWithoutPlayerInput
    matchesHistory?: MatchHistoryUncheckedCreateNestedManyWithoutPlayerInput
    leaderboardSnaps?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerStatsUpdateOneWithoutPlayerNestedInput
    matchesHistory?: MatchHistoryUpdateManyWithoutPlayerNestedInput
    leaderboardSnaps?: LeaderboardSnapshotUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerStatsUncheckedUpdateOneWithoutPlayerNestedInput
    matchesHistory?: MatchHistoryUncheckedUpdateManyWithoutPlayerNestedInput
    leaderboardSnaps?: LeaderboardSnapshotUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateManyInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerStatsCreateInput = {
    id?: string
    totalPoints?: number
    gamesPlayed?: number
    wins?: number
    losses?: number
    lastUpdate?: Date | string
    player: PlayerCreateNestedOneWithoutStatsInput
  }

  export type PlayerStatsUncheckedCreateInput = {
    id?: string
    playerId: string
    totalPoints?: number
    gamesPlayed?: number
    wins?: number
    losses?: number
    lastUpdate?: Date | string
  }

  export type PlayerStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PlayerUpdateOneRequiredWithoutStatsNestedInput
  }

  export type PlayerStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerStatsCreateManyInput = {
    id?: string
    playerId: string
    totalPoints?: number
    gamesPlayed?: number
    wins?: number
    losses?: number
    lastUpdate?: Date | string
  }

  export type PlayerStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryCreateInput = {
    id?: string
    matchId: string
    score: number
    position: number
    playedAt?: Date | string
    player: PlayerCreateNestedOneWithoutMatchesHistoryInput
  }

  export type MatchHistoryUncheckedCreateInput = {
    id?: string
    matchId: string
    playerId: string
    score: number
    position: number
    playedAt?: Date | string
  }

  export type MatchHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PlayerUpdateOneRequiredWithoutMatchesHistoryNestedInput
  }

  export type MatchHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryCreateManyInput = {
    id?: string
    matchId: string
    playerId: string
    score: number
    position: number
    playedAt?: Date | string
  }

  export type MatchHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotCreateInput = {
    id?: string
    rankPosition: number
    totalPoints: number
    snapshotDate?: Date | string
    player: PlayerCreateNestedOneWithoutLeaderboardSnapsInput
  }

  export type LeaderboardSnapshotUncheckedCreateInput = {
    id?: string
    playerId: string
    rankPosition: number
    totalPoints: number
    snapshotDate?: Date | string
  }

  export type LeaderboardSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rankPosition?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PlayerUpdateOneRequiredWithoutLeaderboardSnapsNestedInput
  }

  export type LeaderboardSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    rankPosition?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotCreateManyInput = {
    id?: string
    playerId: string
    rankPosition: number
    totalPoints: number
    snapshotDate?: Date | string
  }

  export type LeaderboardSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rankPosition?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    rankPosition?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlayerStatsNullableScalarRelationFilter = {
    is?: PlayerStatsWhereInput | null
    isNot?: PlayerStatsWhereInput | null
  }

  export type MatchHistoryListRelationFilter = {
    every?: MatchHistoryWhereInput
    some?: MatchHistoryWhereInput
    none?: MatchHistoryWhereInput
  }

  export type LeaderboardSnapshotListRelationFilter = {
    every?: LeaderboardSnapshotWhereInput
    some?: LeaderboardSnapshotWhereInput
    none?: LeaderboardSnapshotWhereInput
  }

  export type MatchHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaderboardSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PlayerScalarRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type PlayerStatsCountOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    totalPoints?: SortOrder
    gamesPlayed?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    lastUpdate?: SortOrder
  }

  export type PlayerStatsAvgOrderByAggregateInput = {
    totalPoints?: SortOrder
    gamesPlayed?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
  }

  export type PlayerStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    totalPoints?: SortOrder
    gamesPlayed?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    lastUpdate?: SortOrder
  }

  export type PlayerStatsMinOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    totalPoints?: SortOrder
    gamesPlayed?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    lastUpdate?: SortOrder
  }

  export type PlayerStatsSumOrderByAggregateInput = {
    totalPoints?: SortOrder
    gamesPlayed?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MatchHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    playerId?: SortOrder
    score?: SortOrder
    position?: SortOrder
    playedAt?: SortOrder
  }

  export type MatchHistoryAvgOrderByAggregateInput = {
    score?: SortOrder
    position?: SortOrder
  }

  export type MatchHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    playerId?: SortOrder
    score?: SortOrder
    position?: SortOrder
    playedAt?: SortOrder
  }

  export type MatchHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    playerId?: SortOrder
    score?: SortOrder
    position?: SortOrder
    playedAt?: SortOrder
  }

  export type MatchHistorySumOrderByAggregateInput = {
    score?: SortOrder
    position?: SortOrder
  }

  export type LeaderboardSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    rankPosition?: SortOrder
    totalPoints?: SortOrder
    snapshotDate?: SortOrder
  }

  export type LeaderboardSnapshotAvgOrderByAggregateInput = {
    rankPosition?: SortOrder
    totalPoints?: SortOrder
  }

  export type LeaderboardSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    rankPosition?: SortOrder
    totalPoints?: SortOrder
    snapshotDate?: SortOrder
  }

  export type LeaderboardSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    rankPosition?: SortOrder
    totalPoints?: SortOrder
    snapshotDate?: SortOrder
  }

  export type LeaderboardSnapshotSumOrderByAggregateInput = {
    rankPosition?: SortOrder
    totalPoints?: SortOrder
  }

  export type PlayerStatsCreateNestedOneWithoutPlayerInput = {
    create?: XOR<PlayerStatsCreateWithoutPlayerInput, PlayerStatsUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: PlayerStatsCreateOrConnectWithoutPlayerInput
    connect?: PlayerStatsWhereUniqueInput
  }

  export type MatchHistoryCreateNestedManyWithoutPlayerInput = {
    create?: XOR<MatchHistoryCreateWithoutPlayerInput, MatchHistoryUncheckedCreateWithoutPlayerInput> | MatchHistoryCreateWithoutPlayerInput[] | MatchHistoryUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MatchHistoryCreateOrConnectWithoutPlayerInput | MatchHistoryCreateOrConnectWithoutPlayerInput[]
    createMany?: MatchHistoryCreateManyPlayerInputEnvelope
    connect?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
  }

  export type LeaderboardSnapshotCreateNestedManyWithoutPlayerInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutPlayerInput, LeaderboardSnapshotUncheckedCreateWithoutPlayerInput> | LeaderboardSnapshotCreateWithoutPlayerInput[] | LeaderboardSnapshotUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutPlayerInput | LeaderboardSnapshotCreateOrConnectWithoutPlayerInput[]
    createMany?: LeaderboardSnapshotCreateManyPlayerInputEnvelope
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
  }

  export type PlayerStatsUncheckedCreateNestedOneWithoutPlayerInput = {
    create?: XOR<PlayerStatsCreateWithoutPlayerInput, PlayerStatsUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: PlayerStatsCreateOrConnectWithoutPlayerInput
    connect?: PlayerStatsWhereUniqueInput
  }

  export type MatchHistoryUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<MatchHistoryCreateWithoutPlayerInput, MatchHistoryUncheckedCreateWithoutPlayerInput> | MatchHistoryCreateWithoutPlayerInput[] | MatchHistoryUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MatchHistoryCreateOrConnectWithoutPlayerInput | MatchHistoryCreateOrConnectWithoutPlayerInput[]
    createMany?: MatchHistoryCreateManyPlayerInputEnvelope
    connect?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
  }

  export type LeaderboardSnapshotUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutPlayerInput, LeaderboardSnapshotUncheckedCreateWithoutPlayerInput> | LeaderboardSnapshotCreateWithoutPlayerInput[] | LeaderboardSnapshotUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutPlayerInput | LeaderboardSnapshotCreateOrConnectWithoutPlayerInput[]
    createMany?: LeaderboardSnapshotCreateManyPlayerInputEnvelope
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlayerStatsUpdateOneWithoutPlayerNestedInput = {
    create?: XOR<PlayerStatsCreateWithoutPlayerInput, PlayerStatsUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: PlayerStatsCreateOrConnectWithoutPlayerInput
    upsert?: PlayerStatsUpsertWithoutPlayerInput
    disconnect?: PlayerStatsWhereInput | boolean
    delete?: PlayerStatsWhereInput | boolean
    connect?: PlayerStatsWhereUniqueInput
    update?: XOR<XOR<PlayerStatsUpdateToOneWithWhereWithoutPlayerInput, PlayerStatsUpdateWithoutPlayerInput>, PlayerStatsUncheckedUpdateWithoutPlayerInput>
  }

  export type MatchHistoryUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<MatchHistoryCreateWithoutPlayerInput, MatchHistoryUncheckedCreateWithoutPlayerInput> | MatchHistoryCreateWithoutPlayerInput[] | MatchHistoryUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MatchHistoryCreateOrConnectWithoutPlayerInput | MatchHistoryCreateOrConnectWithoutPlayerInput[]
    upsert?: MatchHistoryUpsertWithWhereUniqueWithoutPlayerInput | MatchHistoryUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: MatchHistoryCreateManyPlayerInputEnvelope
    set?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    disconnect?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    delete?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    connect?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    update?: MatchHistoryUpdateWithWhereUniqueWithoutPlayerInput | MatchHistoryUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: MatchHistoryUpdateManyWithWhereWithoutPlayerInput | MatchHistoryUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: MatchHistoryScalarWhereInput | MatchHistoryScalarWhereInput[]
  }

  export type LeaderboardSnapshotUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutPlayerInput, LeaderboardSnapshotUncheckedCreateWithoutPlayerInput> | LeaderboardSnapshotCreateWithoutPlayerInput[] | LeaderboardSnapshotUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutPlayerInput | LeaderboardSnapshotCreateOrConnectWithoutPlayerInput[]
    upsert?: LeaderboardSnapshotUpsertWithWhereUniqueWithoutPlayerInput | LeaderboardSnapshotUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: LeaderboardSnapshotCreateManyPlayerInputEnvelope
    set?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    disconnect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    delete?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    update?: LeaderboardSnapshotUpdateWithWhereUniqueWithoutPlayerInput | LeaderboardSnapshotUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: LeaderboardSnapshotUpdateManyWithWhereWithoutPlayerInput | LeaderboardSnapshotUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
  }

  export type PlayerStatsUncheckedUpdateOneWithoutPlayerNestedInput = {
    create?: XOR<PlayerStatsCreateWithoutPlayerInput, PlayerStatsUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: PlayerStatsCreateOrConnectWithoutPlayerInput
    upsert?: PlayerStatsUpsertWithoutPlayerInput
    disconnect?: PlayerStatsWhereInput | boolean
    delete?: PlayerStatsWhereInput | boolean
    connect?: PlayerStatsWhereUniqueInput
    update?: XOR<XOR<PlayerStatsUpdateToOneWithWhereWithoutPlayerInput, PlayerStatsUpdateWithoutPlayerInput>, PlayerStatsUncheckedUpdateWithoutPlayerInput>
  }

  export type MatchHistoryUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<MatchHistoryCreateWithoutPlayerInput, MatchHistoryUncheckedCreateWithoutPlayerInput> | MatchHistoryCreateWithoutPlayerInput[] | MatchHistoryUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: MatchHistoryCreateOrConnectWithoutPlayerInput | MatchHistoryCreateOrConnectWithoutPlayerInput[]
    upsert?: MatchHistoryUpsertWithWhereUniqueWithoutPlayerInput | MatchHistoryUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: MatchHistoryCreateManyPlayerInputEnvelope
    set?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    disconnect?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    delete?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    connect?: MatchHistoryWhereUniqueInput | MatchHistoryWhereUniqueInput[]
    update?: MatchHistoryUpdateWithWhereUniqueWithoutPlayerInput | MatchHistoryUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: MatchHistoryUpdateManyWithWhereWithoutPlayerInput | MatchHistoryUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: MatchHistoryScalarWhereInput | MatchHistoryScalarWhereInput[]
  }

  export type LeaderboardSnapshotUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<LeaderboardSnapshotCreateWithoutPlayerInput, LeaderboardSnapshotUncheckedCreateWithoutPlayerInput> | LeaderboardSnapshotCreateWithoutPlayerInput[] | LeaderboardSnapshotUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: LeaderboardSnapshotCreateOrConnectWithoutPlayerInput | LeaderboardSnapshotCreateOrConnectWithoutPlayerInput[]
    upsert?: LeaderboardSnapshotUpsertWithWhereUniqueWithoutPlayerInput | LeaderboardSnapshotUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: LeaderboardSnapshotCreateManyPlayerInputEnvelope
    set?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    disconnect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    delete?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    connect?: LeaderboardSnapshotWhereUniqueInput | LeaderboardSnapshotWhereUniqueInput[]
    update?: LeaderboardSnapshotUpdateWithWhereUniqueWithoutPlayerInput | LeaderboardSnapshotUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: LeaderboardSnapshotUpdateManyWithWhereWithoutPlayerInput | LeaderboardSnapshotUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
  }

  export type PlayerCreateNestedOneWithoutStatsInput = {
    create?: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutStatsInput
    connect?: PlayerWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlayerUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutStatsInput
    upsert?: PlayerUpsertWithoutStatsInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutStatsInput, PlayerUpdateWithoutStatsInput>, PlayerUncheckedUpdateWithoutStatsInput>
  }

  export type PlayerCreateNestedOneWithoutMatchesHistoryInput = {
    create?: XOR<PlayerCreateWithoutMatchesHistoryInput, PlayerUncheckedCreateWithoutMatchesHistoryInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutMatchesHistoryInput
    connect?: PlayerWhereUniqueInput
  }

  export type PlayerUpdateOneRequiredWithoutMatchesHistoryNestedInput = {
    create?: XOR<PlayerCreateWithoutMatchesHistoryInput, PlayerUncheckedCreateWithoutMatchesHistoryInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutMatchesHistoryInput
    upsert?: PlayerUpsertWithoutMatchesHistoryInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutMatchesHistoryInput, PlayerUpdateWithoutMatchesHistoryInput>, PlayerUncheckedUpdateWithoutMatchesHistoryInput>
  }

  export type PlayerCreateNestedOneWithoutLeaderboardSnapsInput = {
    create?: XOR<PlayerCreateWithoutLeaderboardSnapsInput, PlayerUncheckedCreateWithoutLeaderboardSnapsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutLeaderboardSnapsInput
    connect?: PlayerWhereUniqueInput
  }

  export type PlayerUpdateOneRequiredWithoutLeaderboardSnapsNestedInput = {
    create?: XOR<PlayerCreateWithoutLeaderboardSnapsInput, PlayerUncheckedCreateWithoutLeaderboardSnapsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutLeaderboardSnapsInput
    upsert?: PlayerUpsertWithoutLeaderboardSnapsInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutLeaderboardSnapsInput, PlayerUpdateWithoutLeaderboardSnapsInput>, PlayerUncheckedUpdateWithoutLeaderboardSnapsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PlayerStatsCreateWithoutPlayerInput = {
    id?: string
    totalPoints?: number
    gamesPlayed?: number
    wins?: number
    losses?: number
    lastUpdate?: Date | string
  }

  export type PlayerStatsUncheckedCreateWithoutPlayerInput = {
    id?: string
    totalPoints?: number
    gamesPlayed?: number
    wins?: number
    losses?: number
    lastUpdate?: Date | string
  }

  export type PlayerStatsCreateOrConnectWithoutPlayerInput = {
    where: PlayerStatsWhereUniqueInput
    create: XOR<PlayerStatsCreateWithoutPlayerInput, PlayerStatsUncheckedCreateWithoutPlayerInput>
  }

  export type MatchHistoryCreateWithoutPlayerInput = {
    id?: string
    matchId: string
    score: number
    position: number
    playedAt?: Date | string
  }

  export type MatchHistoryUncheckedCreateWithoutPlayerInput = {
    id?: string
    matchId: string
    score: number
    position: number
    playedAt?: Date | string
  }

  export type MatchHistoryCreateOrConnectWithoutPlayerInput = {
    where: MatchHistoryWhereUniqueInput
    create: XOR<MatchHistoryCreateWithoutPlayerInput, MatchHistoryUncheckedCreateWithoutPlayerInput>
  }

  export type MatchHistoryCreateManyPlayerInputEnvelope = {
    data: MatchHistoryCreateManyPlayerInput | MatchHistoryCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type LeaderboardSnapshotCreateWithoutPlayerInput = {
    id?: string
    rankPosition: number
    totalPoints: number
    snapshotDate?: Date | string
  }

  export type LeaderboardSnapshotUncheckedCreateWithoutPlayerInput = {
    id?: string
    rankPosition: number
    totalPoints: number
    snapshotDate?: Date | string
  }

  export type LeaderboardSnapshotCreateOrConnectWithoutPlayerInput = {
    where: LeaderboardSnapshotWhereUniqueInput
    create: XOR<LeaderboardSnapshotCreateWithoutPlayerInput, LeaderboardSnapshotUncheckedCreateWithoutPlayerInput>
  }

  export type LeaderboardSnapshotCreateManyPlayerInputEnvelope = {
    data: LeaderboardSnapshotCreateManyPlayerInput | LeaderboardSnapshotCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type PlayerStatsUpsertWithoutPlayerInput = {
    update: XOR<PlayerStatsUpdateWithoutPlayerInput, PlayerStatsUncheckedUpdateWithoutPlayerInput>
    create: XOR<PlayerStatsCreateWithoutPlayerInput, PlayerStatsUncheckedCreateWithoutPlayerInput>
    where?: PlayerStatsWhereInput
  }

  export type PlayerStatsUpdateToOneWithWhereWithoutPlayerInput = {
    where?: PlayerStatsWhereInput
    data: XOR<PlayerStatsUpdateWithoutPlayerInput, PlayerStatsUncheckedUpdateWithoutPlayerInput>
  }

  export type PlayerStatsUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerStatsUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalPoints?: IntFieldUpdateOperationsInput | number
    gamesPlayed?: IntFieldUpdateOperationsInput | number
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryUpsertWithWhereUniqueWithoutPlayerInput = {
    where: MatchHistoryWhereUniqueInput
    update: XOR<MatchHistoryUpdateWithoutPlayerInput, MatchHistoryUncheckedUpdateWithoutPlayerInput>
    create: XOR<MatchHistoryCreateWithoutPlayerInput, MatchHistoryUncheckedCreateWithoutPlayerInput>
  }

  export type MatchHistoryUpdateWithWhereUniqueWithoutPlayerInput = {
    where: MatchHistoryWhereUniqueInput
    data: XOR<MatchHistoryUpdateWithoutPlayerInput, MatchHistoryUncheckedUpdateWithoutPlayerInput>
  }

  export type MatchHistoryUpdateManyWithWhereWithoutPlayerInput = {
    where: MatchHistoryScalarWhereInput
    data: XOR<MatchHistoryUpdateManyMutationInput, MatchHistoryUncheckedUpdateManyWithoutPlayerInput>
  }

  export type MatchHistoryScalarWhereInput = {
    AND?: MatchHistoryScalarWhereInput | MatchHistoryScalarWhereInput[]
    OR?: MatchHistoryScalarWhereInput[]
    NOT?: MatchHistoryScalarWhereInput | MatchHistoryScalarWhereInput[]
    id?: StringFilter<"MatchHistory"> | string
    matchId?: StringFilter<"MatchHistory"> | string
    playerId?: StringFilter<"MatchHistory"> | string
    score?: IntFilter<"MatchHistory"> | number
    position?: IntFilter<"MatchHistory"> | number
    playedAt?: DateTimeFilter<"MatchHistory"> | Date | string
  }

  export type LeaderboardSnapshotUpsertWithWhereUniqueWithoutPlayerInput = {
    where: LeaderboardSnapshotWhereUniqueInput
    update: XOR<LeaderboardSnapshotUpdateWithoutPlayerInput, LeaderboardSnapshotUncheckedUpdateWithoutPlayerInput>
    create: XOR<LeaderboardSnapshotCreateWithoutPlayerInput, LeaderboardSnapshotUncheckedCreateWithoutPlayerInput>
  }

  export type LeaderboardSnapshotUpdateWithWhereUniqueWithoutPlayerInput = {
    where: LeaderboardSnapshotWhereUniqueInput
    data: XOR<LeaderboardSnapshotUpdateWithoutPlayerInput, LeaderboardSnapshotUncheckedUpdateWithoutPlayerInput>
  }

  export type LeaderboardSnapshotUpdateManyWithWhereWithoutPlayerInput = {
    where: LeaderboardSnapshotScalarWhereInput
    data: XOR<LeaderboardSnapshotUpdateManyMutationInput, LeaderboardSnapshotUncheckedUpdateManyWithoutPlayerInput>
  }

  export type LeaderboardSnapshotScalarWhereInput = {
    AND?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
    OR?: LeaderboardSnapshotScalarWhereInput[]
    NOT?: LeaderboardSnapshotScalarWhereInput | LeaderboardSnapshotScalarWhereInput[]
    id?: StringFilter<"LeaderboardSnapshot"> | string
    playerId?: StringFilter<"LeaderboardSnapshot"> | string
    rankPosition?: IntFilter<"LeaderboardSnapshot"> | number
    totalPoints?: IntFilter<"LeaderboardSnapshot"> | number
    snapshotDate?: DateTimeFilter<"LeaderboardSnapshot"> | Date | string
  }

  export type PlayerCreateWithoutStatsInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    matchesHistory?: MatchHistoryCreateNestedManyWithoutPlayerInput
    leaderboardSnaps?: LeaderboardSnapshotCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateWithoutStatsInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    matchesHistory?: MatchHistoryUncheckedCreateNestedManyWithoutPlayerInput
    leaderboardSnaps?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerCreateOrConnectWithoutStatsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
  }

  export type PlayerUpsertWithoutStatsInput = {
    update: XOR<PlayerUpdateWithoutStatsInput, PlayerUncheckedUpdateWithoutStatsInput>
    create: XOR<PlayerCreateWithoutStatsInput, PlayerUncheckedCreateWithoutStatsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutStatsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutStatsInput, PlayerUncheckedUpdateWithoutStatsInput>
  }

  export type PlayerUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchesHistory?: MatchHistoryUpdateManyWithoutPlayerNestedInput
    leaderboardSnaps?: LeaderboardSnapshotUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchesHistory?: MatchHistoryUncheckedUpdateManyWithoutPlayerNestedInput
    leaderboardSnaps?: LeaderboardSnapshotUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateWithoutMatchesHistoryInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    stats?: PlayerStatsCreateNestedOneWithoutPlayerInput
    leaderboardSnaps?: LeaderboardSnapshotCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateWithoutMatchesHistoryInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    stats?: PlayerStatsUncheckedCreateNestedOneWithoutPlayerInput
    leaderboardSnaps?: LeaderboardSnapshotUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerCreateOrConnectWithoutMatchesHistoryInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutMatchesHistoryInput, PlayerUncheckedCreateWithoutMatchesHistoryInput>
  }

  export type PlayerUpsertWithoutMatchesHistoryInput = {
    update: XOR<PlayerUpdateWithoutMatchesHistoryInput, PlayerUncheckedUpdateWithoutMatchesHistoryInput>
    create: XOR<PlayerCreateWithoutMatchesHistoryInput, PlayerUncheckedCreateWithoutMatchesHistoryInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutMatchesHistoryInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutMatchesHistoryInput, PlayerUncheckedUpdateWithoutMatchesHistoryInput>
  }

  export type PlayerUpdateWithoutMatchesHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerStatsUpdateOneWithoutPlayerNestedInput
    leaderboardSnaps?: LeaderboardSnapshotUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateWithoutMatchesHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerStatsUncheckedUpdateOneWithoutPlayerNestedInput
    leaderboardSnaps?: LeaderboardSnapshotUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateWithoutLeaderboardSnapsInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    stats?: PlayerStatsCreateNestedOneWithoutPlayerInput
    matchesHistory?: MatchHistoryCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateWithoutLeaderboardSnapsInput = {
    id?: string
    externalUserId: string
    username: string
    createdAt?: Date | string
    stats?: PlayerStatsUncheckedCreateNestedOneWithoutPlayerInput
    matchesHistory?: MatchHistoryUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerCreateOrConnectWithoutLeaderboardSnapsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutLeaderboardSnapsInput, PlayerUncheckedCreateWithoutLeaderboardSnapsInput>
  }

  export type PlayerUpsertWithoutLeaderboardSnapsInput = {
    update: XOR<PlayerUpdateWithoutLeaderboardSnapsInput, PlayerUncheckedUpdateWithoutLeaderboardSnapsInput>
    create: XOR<PlayerCreateWithoutLeaderboardSnapsInput, PlayerUncheckedCreateWithoutLeaderboardSnapsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutLeaderboardSnapsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutLeaderboardSnapsInput, PlayerUncheckedUpdateWithoutLeaderboardSnapsInput>
  }

  export type PlayerUpdateWithoutLeaderboardSnapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerStatsUpdateOneWithoutPlayerNestedInput
    matchesHistory?: MatchHistoryUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateWithoutLeaderboardSnapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: PlayerStatsUncheckedUpdateOneWithoutPlayerNestedInput
    matchesHistory?: MatchHistoryUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type MatchHistoryCreateManyPlayerInput = {
    id?: string
    matchId: string
    score: number
    position: number
    playedAt?: Date | string
  }

  export type LeaderboardSnapshotCreateManyPlayerInput = {
    id?: string
    rankPosition: number
    totalPoints: number
    snapshotDate?: Date | string
  }

  export type MatchHistoryUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchHistoryUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    position?: IntFieldUpdateOperationsInput | number
    playedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rankPosition?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rankPosition?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardSnapshotUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rankPosition?: IntFieldUpdateOperationsInput | number
    totalPoints?: IntFieldUpdateOperationsInput | number
    snapshotDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}