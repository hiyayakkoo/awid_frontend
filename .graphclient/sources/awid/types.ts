// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types'
import { MeshContext } from '@graphql-mesh/runtime'

export namespace AwidTypes {
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

  export type QuerySdk = {
    /** null **/
    ratingUpdated: InContextSdkMethod<
      Query['ratingUpdated'],
      QueryratingUpdatedArgs,
      MeshContext
    >
    /** null **/
    ratingUpdateds: InContextSdkMethod<
      Query['ratingUpdateds'],
      QueryratingUpdatedsArgs,
      MeshContext
    >
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  }

  export type MutationSdk = {}

  export type SubscriptionSdk = {
    /** null **/
    ratingUpdated: InContextSdkMethod<
      Subscription['ratingUpdated'],
      SubscriptionratingUpdatedArgs,
      MeshContext
    >
    /** null **/
    ratingUpdateds: InContextSdkMethod<
      Subscription['ratingUpdateds'],
      SubscriptionratingUpdatedsArgs,
      MeshContext
    >
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<
      Subscription['_meta'],
      Subscription_metaArgs,
      MeshContext
    >
  }

  export type Context = {
    ['awid']: {
      Query: QuerySdk
      Mutation: MutationSdk
      Subscription: SubscriptionSdk
    }
  }
}
