// @ts-nocheck
import {
  GraphQLResolveInfo,
  SelectionSetNode,
  FieldNode,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from 'graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { gql } from '@graphql-mesh/utils'

import type { GetMeshOptions } from '@graphql-mesh/runtime'
import type { YamlConfig } from '@graphql-mesh/types'
import { PubSub } from '@graphql-mesh/utils'
import { DefaultLogger } from '@graphql-mesh/utils'
import MeshCache from '@graphql-mesh/cache-localforage'
import { fetch as fetchFn } from '@whatwg-node/fetch'

import { MeshResolvedSource } from '@graphql-mesh/runtime'
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types'
import GraphqlHandler from '@graphql-mesh/graphql'
import BareMerger from '@graphql-mesh/merger-bare'
import { printWithCache } from '@graphql-mesh/utils'
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http'
import {
  getMesh,
  ExecuteMeshFn,
  SubscribeMeshFn,
  MeshContext as BaseMeshContext,
  MeshInstance
} from '@graphql-mesh/runtime'
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store'
import { path as pathModule } from '@graphql-mesh/cross-helpers'
import { ImportFn } from '@graphql-mesh/types'
import type { AwidTypes } from './sources/awid/types'
import * as importedModule$0 from './sources/awid/introspectionSchema'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
  Int8: any
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc'

export type Query = {
  ratingUpdated?: Maybe<RatingUpdated>
  ratingUpdateds: Array<RatingUpdated>
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
}

export type QueryratingUpdatedArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryratingUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RatingUpdated_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<RatingUpdated_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type Query_metaArgs = {
  block?: InputMaybe<Block_height>
}

export type RatingUpdated = {
  id: Scalars['Bytes']
  userAddress: Scalars['Bytes']
  attester: Scalars['Bytes']
  newRating: Scalars['BigInt']
  blockNumber: Scalars['BigInt']
  blockTimestamp: Scalars['BigInt']
  transactionHash: Scalars['Bytes']
}

export type RatingUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']>
  id_not?: InputMaybe<Scalars['Bytes']>
  id_gt?: InputMaybe<Scalars['Bytes']>
  id_lt?: InputMaybe<Scalars['Bytes']>
  id_gte?: InputMaybe<Scalars['Bytes']>
  id_lte?: InputMaybe<Scalars['Bytes']>
  id_in?: InputMaybe<Array<Scalars['Bytes']>>
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id_contains?: InputMaybe<Scalars['Bytes']>
  id_not_contains?: InputMaybe<Scalars['Bytes']>
  userAddress?: InputMaybe<Scalars['Bytes']>
  userAddress_not?: InputMaybe<Scalars['Bytes']>
  userAddress_gt?: InputMaybe<Scalars['Bytes']>
  userAddress_lt?: InputMaybe<Scalars['Bytes']>
  userAddress_gte?: InputMaybe<Scalars['Bytes']>
  userAddress_lte?: InputMaybe<Scalars['Bytes']>
  userAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  userAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  userAddress_contains?: InputMaybe<Scalars['Bytes']>
  userAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  attester?: InputMaybe<Scalars['Bytes']>
  attester_not?: InputMaybe<Scalars['Bytes']>
  attester_gt?: InputMaybe<Scalars['Bytes']>
  attester_lt?: InputMaybe<Scalars['Bytes']>
  attester_gte?: InputMaybe<Scalars['Bytes']>
  attester_lte?: InputMaybe<Scalars['Bytes']>
  attester_in?: InputMaybe<Array<Scalars['Bytes']>>
  attester_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  attester_contains?: InputMaybe<Scalars['Bytes']>
  attester_not_contains?: InputMaybe<Scalars['Bytes']>
  newRating?: InputMaybe<Scalars['BigInt']>
  newRating_not?: InputMaybe<Scalars['BigInt']>
  newRating_gt?: InputMaybe<Scalars['BigInt']>
  newRating_lt?: InputMaybe<Scalars['BigInt']>
  newRating_gte?: InputMaybe<Scalars['BigInt']>
  newRating_lte?: InputMaybe<Scalars['BigInt']>
  newRating_in?: InputMaybe<Array<Scalars['BigInt']>>
  newRating_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockTimestamp?: InputMaybe<Scalars['BigInt']>
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  transactionHash?: InputMaybe<Scalars['Bytes']>
  transactionHash_not?: InputMaybe<Scalars['Bytes']>
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<RatingUpdated_filter>>>
  or?: InputMaybe<Array<InputMaybe<RatingUpdated_filter>>>
}

export type RatingUpdated_orderBy =
  | 'id'
  | 'userAddress'
  | 'attester'
  | 'newRating'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash'

export type Subscription = {
  ratingUpdated?: Maybe<RatingUpdated>
  ratingUpdateds: Array<RatingUpdated>
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
}

export type SubscriptionratingUpdatedArgs = {
  id: Scalars['ID']
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionratingUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RatingUpdated_orderBy>
  orderDirection?: InputMaybe<OrderDirection>
  where?: InputMaybe<RatingUpdated_filter>
  block?: InputMaybe<Block_height>
  subgraphError?: _SubgraphErrorPolicy_
}

export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>
}

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny'

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode)
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>
  BlockChangedFilter: BlockChangedFilter
  Block_height: Block_height
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Int8: ResolverTypeWrapper<Scalars['Int8']>
  OrderDirection: OrderDirection
  Query: ResolverTypeWrapper<{}>
  RatingUpdated: ResolverTypeWrapper<RatingUpdated>
  RatingUpdated_filter: RatingUpdated_filter
  RatingUpdated_orderBy: RatingUpdated_orderBy
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  _Block_: ResolverTypeWrapper<_Block_>
  _Meta_: ResolverTypeWrapper<_Meta_>
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']
  BigInt: Scalars['BigInt']
  BlockChangedFilter: BlockChangedFilter
  Block_height: Block_height
  Boolean: Scalars['Boolean']
  Bytes: Scalars['Bytes']
  Float: Scalars['Float']
  ID: Scalars['ID']
  Int: Scalars['Int']
  Int8: Scalars['Int8']
  Query: {}
  RatingUpdated: RatingUpdated
  RatingUpdated_filter: RatingUpdated_filter
  String: Scalars['String']
  Subscription: {}
  _Block_: _Block_
  _Meta_: _Meta_
}>

export type entityDirectiveArgs = {}

export type entityDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = entityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']
}

export type subgraphIdDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = subgraphIdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type derivedFromDirectiveArgs = {
  field: Scalars['String']
}

export type derivedFromDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = derivedFromDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal'
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt'
}

export interface BytesScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes'
}

export interface Int8ScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8'
}

export type QueryResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  ratingUpdated?: Resolver<
    Maybe<ResolversTypes['RatingUpdated']>,
    ParentType,
    ContextType,
    RequireFields<QueryratingUpdatedArgs, 'id' | 'subgraphError'>
  >
  ratingUpdateds?: Resolver<
    Array<ResolversTypes['RatingUpdated']>,
    ParentType,
    ContextType,
    RequireFields<QueryratingUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>
  >
  _meta?: Resolver<
    Maybe<ResolversTypes['_Meta_']>,
    ParentType,
    ContextType,
    Partial<Query_metaArgs>
  >
}>

export type RatingUpdatedResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['RatingUpdated'] = ResolversParentTypes['RatingUpdated']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>
  userAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>
  attester?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>
  newRating?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SubscriptionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  ratingUpdated?: SubscriptionResolver<
    Maybe<ResolversTypes['RatingUpdated']>,
    'ratingUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionratingUpdatedArgs, 'id' | 'subgraphError'>
  >
  ratingUpdateds?: SubscriptionResolver<
    Array<ResolversTypes['RatingUpdated']>,
    'ratingUpdateds',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionratingUpdatedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >
  _meta?: SubscriptionResolver<
    Maybe<ResolversTypes['_Meta_']>,
    '_meta',
    ParentType,
    ContextType,
    Partial<Subscription_metaArgs>
  >
}>

export type _Block_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']
> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type _Meta_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']
> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  hasIndexingErrors?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType
  BigInt?: GraphQLScalarType
  Bytes?: GraphQLScalarType
  Int8?: GraphQLScalarType
  Query?: QueryResolvers<ContextType>
  RatingUpdated?: RatingUpdatedResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  _Block_?: _Block_Resolvers<ContextType>
  _Meta_?: _Meta_Resolvers<ContextType>
}>

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>
}>

export type MeshContext = AwidTypes.Context & BaseMeshContext

import { fileURLToPath } from '@graphql-mesh/utils'
const baseDir = pathModule.join(
  pathModule.dirname(fileURLToPath(import.meta.url)),
  '..'
)

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (
    pathModule.isAbsolute(moduleId)
      ? pathModule.relative(baseDir, moduleId)
      : moduleId
  )
    .split('\\')
    .join('/')
    .replace(baseDir + '/', '')
  switch (relativeModuleId) {
    case '.graphclient/sources/awid/introspectionSchema':
      return Promise.resolve(importedModule$0) as T

    default:
      return Promise.reject(
        new Error(`Cannot find module '${relativeModuleId}'.`)
      )
  }
}

const rootStore = new MeshStore(
  '.graphclient',
  new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: 'ts'
  }),
  {
    readonly: true,
    validate: false
  }
)

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
  const pubsub = new PubSub()
  const sourcesStore = rootStore.child('sources')
  const logger = new DefaultLogger('GraphClient')
  const cache = new (MeshCache as any)({
    ...({} as any),
    importFn,
    store: rootStore.child('cache'),
    pubsub,
    logger
  } as any)

  const sources: MeshResolvedSource[] = []
  const transforms: MeshTransform[] = []
  const additionalEnvelopPlugins: MeshPlugin<any>[] = []
  const awidTransforms = []
  const additionalTypeDefs = [] as any[]
  const awidHandler = new GraphqlHandler({
    name: 'awid',
    config: {
      endpoint:
        'https://api.studio.thegraph.com/query/48920/rating_graph/v0.0.1'
    },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child('awid'),
    logger: logger.child('awid'),
    importFn
  })
  sources[0] = {
    name: 'awid',
    handler: awidHandler,
    transforms: awidTransforms
  }
  const additionalResolvers = [] as any[]
  const merger = new (BareMerger as any)({
    cache,
    pubsub,
    logger: logger.child('bareMerger'),
    store: rootStore.child('bareMerger')
  })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
        {
          document: GetRatingQueryDocument,
          get rawSDL() {
            return printWithCache(GetRatingQueryDocument)
          },
          location: 'GetRatingQueryDocument.graphql'
        }
      ]
    },
    fetchFn
  }
}

export function createBuiltMeshHTTPHandler<
  TServerContext = {}
>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined
  })
}

let meshInstance$: Promise<MeshInstance> | undefined

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions()
      .then((meshOptions) => getMesh(meshOptions))
      .then((mesh) => {
        const id = mesh.pubsub.subscribe('destroy', () => {
          meshInstance$ = undefined
          mesh.pubsub.unsubscribe(id)
        })
        return mesh
      })
  }
  return meshInstance$
}

export const execute: ExecuteMeshFn = (...args) =>
  getBuiltGraphClient().then(({ execute }) => execute(...args))

export const subscribe: SubscribeMeshFn = (...args) =>
  getBuiltGraphClient().then(({ subscribe }) => subscribe(...args))
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(
  globalContext?: TGlobalContext
) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) =>
    sdkRequesterFactory(globalContext)
  )
  return getSdk<TOperationContext, TGlobalContext>((...args) =>
    sdkRequester$.then((sdkRequester) => sdkRequester(...args))
  )
}
export type GetRatingQueryQueryVariables = Exact<{
  userAddress?: InputMaybe<Scalars['Bytes']>
  attester?: InputMaybe<Scalars['Bytes']>
}>

export type GetRatingQueryQuery = {
  ratingUpdateds: Array<
    Pick<
      RatingUpdated,
      'userAddress' | 'attester' | 'newRating' | 'blockTimestamp'
    >
  >
}

export const GetRatingQueryDocument = gql`
  query GetRatingQuery($userAddress: Bytes, $attester: Bytes) {
    ratingUpdateds(
      where: { userAddress: $userAddress, attester: $attester }
      first: 20
    ) {
      userAddress
      attester
      newRating
      blockTimestamp
    }
  }
` as unknown as DocumentNode<GetRatingQueryQuery, GetRatingQueryQueryVariables>

export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetRatingQuery(
      variables?: GetRatingQueryQueryVariables,
      options?: C
    ): Promise<GetRatingQueryQuery> {
      return requester<GetRatingQueryQuery, GetRatingQueryQueryVariables>(
        GetRatingQueryDocument,
        variables,
        options
      ) as Promise<GetRatingQueryQuery>
    }
  }
}
export type Sdk = ReturnType<typeof getSdk>
