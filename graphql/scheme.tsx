import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type About = {
  __typename?: 'About';
  birth: Scalars['String'];
  comments?: Maybe<Array<AboutComment>>;
  img?: Maybe<MediaMetadata>;
  info: Scalars['String'];
  metadata?: Maybe<Array<AboutMetadata>>;
  name: Scalars['String'];
};

export type AboutComment = {
  __typename?: 'AboutComment';
  comment: Scalars['String'];
  date: Scalars['String'];
};

export type AboutMetadata = {
  __typename?: 'AboutMetadata';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type Common = {
  __typename?: 'Common';
  headerTitle: Scalars['String'];
  title: Scalars['String'];
};

export type Contact = {
  __typename?: 'Contact';
  email: Scalars['String'];
  img?: Maybe<MediaMetadata>;
};

export type CreateDramasInput = {
  actors?: InputMaybe<Array<Scalars['String']>>;
  director?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<MediaMetadataInput>;
  scenes?: InputMaybe<Array<MediaMetadataInput>>;
  schedule?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  year: Scalars['Int'];
};

export type CreateMoviesInput = {
  actors?: InputMaybe<Array<Scalars['String']>>;
  awards?: InputMaybe<Array<Scalars['String']>>;
  director: Scalars['String'];
  img?: InputMaybe<MediaMetadataInput>;
  scenes?: InputMaybe<Array<MediaMetadataInput>>;
  title: Scalars['String'];
  video?: InputMaybe<MediaMetadataInput>;
  year: Scalars['Int'];
};

export type CreateTheatersInput = {
  img?: InputMaybe<MediaMetadataInput>;
  scenes?: InputMaybe<Array<MediaMetadataInput>>;
  schedule?: InputMaybe<Scalars['String']>;
  theater?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  year: Scalars['Int'];
};

export type Dramas = {
  __typename?: 'Dramas';
  actors?: Maybe<Array<Scalars['String']>>;
  director?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  img?: Maybe<MediaMetadata>;
  scenes?: Maybe<Array<MediaMetadata>>;
  schedule?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  year: Scalars['Int'];
};

export type Footer = {
  __typename?: 'Footer';
  sns?: Maybe<Array<Sns>>;
};

export type MediaMetadata = {
  __typename?: 'MediaMetadata';
  filename?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type MediaMetadataInput = {
  filename?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type Movies = {
  __typename?: 'Movies';
  actors?: Maybe<Array<Scalars['String']>>;
  awards?: Maybe<Array<Scalars['String']>>;
  director: Scalars['String'];
  id: Scalars['String'];
  img?: Maybe<MediaMetadata>;
  scenes?: Maybe<Array<MediaMetadata>>;
  title: Scalars['String'];
  video?: Maybe<MediaMetadata>;
  year: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Dramas_create: Dramas;
  Dramas_remove: Dramas;
  Dramas_update: Dramas;
  Movies_create: Movies;
  Movies_remove: Movies;
  Movies_update: Movies;
  Theaters_create: Theaters;
  Theaters_remove: Theaters;
  Theaters_update: Theaters;
  auth: Scalars['Boolean'];
  postComment: Scalars['Boolean'];
};


export type MutationDramas_CreateArgs = {
  createDramasInput: CreateDramasInput;
};


export type MutationDramas_RemoveArgs = {
  id: Scalars['Int'];
};


export type MutationDramas_UpdateArgs = {
  updateDramasInput: UpdateDramasInput;
};


export type MutationMovies_CreateArgs = {
  createMoviesInput: CreateMoviesInput;
};


export type MutationMovies_RemoveArgs = {
  id: Scalars['Int'];
};


export type MutationMovies_UpdateArgs = {
  updateMoviesInput: UpdateMoviesInput;
};


export type MutationTheaters_CreateArgs = {
  createTheatersInput: CreateTheatersInput;
};


export type MutationTheaters_RemoveArgs = {
  id: Scalars['Int'];
};


export type MutationTheaters_UpdateArgs = {
  updateTheatersInput: UpdateTheatersInput;
};


export type MutationAuthArgs = {
  password: Scalars['String'];
};


export type MutationPostCommentArgs = {
  comment: Scalars['String'];
  date: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAbout: About;
  getCommon: Common;
  getContact: Contact;
  getDramas?: Maybe<Array<Dramas>>;
  getFooter: Footer;
  getHome?: Maybe<Array<MediaMetadata>>;
  getMovies?: Maybe<Array<Movies>>;
  getTheaters?: Maybe<Array<Theaters>>;
};

export type Secret = {
  __typename?: 'Secret';
  password: Scalars['String'];
};

export type Sns = {
  __typename?: 'Sns';
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Theaters = {
  __typename?: 'Theaters';
  id: Scalars['String'];
  img?: Maybe<MediaMetadata>;
  scenes?: Maybe<Array<MediaMetadata>>;
  schedule?: Maybe<Scalars['String']>;
  theater?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  year: Scalars['Int'];
};

export type UpdateDramasInput = {
  actors?: InputMaybe<Array<Scalars['String']>>;
  director?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  img?: InputMaybe<MediaMetadataInput>;
  scenes?: InputMaybe<Array<MediaMetadataInput>>;
  schedule?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  year: Scalars['Int'];
};

export type UpdateMoviesInput = {
  actors?: InputMaybe<Array<Scalars['String']>>;
  awards?: InputMaybe<Array<Scalars['String']>>;
  director: Scalars['String'];
  id: Scalars['String'];
  img?: InputMaybe<MediaMetadataInput>;
  scenes?: InputMaybe<Array<MediaMetadataInput>>;
  title: Scalars['String'];
  video?: InputMaybe<MediaMetadataInput>;
  year: Scalars['Int'];
};

export type UpdateTheatersInput = {
  id: Scalars['String'];
  img?: InputMaybe<MediaMetadataInput>;
  scenes?: InputMaybe<Array<MediaMetadataInput>>;
  schedule?: InputMaybe<Scalars['String']>;
  theater?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  year: Scalars['Int'];
};

export type MediaMetadataFragment = { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null };

export type PostCommentMutationVariables = Exact<{
  comment: Scalars['String'];
  date: Scalars['String'];
}>;


export type PostCommentMutation = { __typename?: 'Mutation', postComment: boolean };

export type AboutQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutQuery = { __typename?: 'Query', about: { __typename?: 'About', name: string, birth: string, info: string, metadata?: Array<{ __typename?: 'AboutMetadata', label: string, value: string }> | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null } };

export type CommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type CommentsQuery = { __typename?: 'Query', comments: { __typename?: 'About', comments?: Array<{ __typename?: 'AboutComment', comment: string, date: string }> | null } };

export type CommonQueryVariables = Exact<{ [key: string]: never; }>;


export type CommonQuery = { __typename?: 'Query', common: { __typename?: 'Common', title: string, headerTitle: string } };

export type ContactQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactQuery = { __typename?: 'Query', contact: { __typename?: 'Contact', email: string, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null } };

export type DramasQueryVariables = Exact<{ [key: string]: never; }>;


export type DramasQuery = { __typename?: 'Query', dramas?: Array<{ __typename?: 'Dramas', id: string, title: string, year: number, director?: string | null, actors?: Array<string> | null, schedule?: string | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null }> | null };

export type FooterQueryVariables = Exact<{ [key: string]: never; }>;


export type FooterQuery = { __typename?: 'Query', footer: { __typename?: 'Footer', sns?: Array<{ __typename?: 'Sns', name: string, url: string }> | null } };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', home?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null };

export type MoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type MoviesQuery = { __typename?: 'Query', movies?: Array<{ __typename?: 'Movies', id: string, title: string, year: number, director: string, actors?: Array<string> | null, awards?: Array<string> | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, video?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null }> | null };

export type TheatersQueryVariables = Exact<{ [key: string]: never; }>;


export type TheatersQuery = { __typename?: 'Query', theaters?: Array<{ __typename?: 'Theaters', id: string, title: string, theater?: string | null, year: number, schedule?: string | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null }> | null };

export const MediaMetadataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MediaMetadata"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MediaMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<MediaMetadataFragment, unknown>;
export const PostCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<PostCommentMutation, PostCommentMutationVariables>;
export const AboutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"About"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"about"},"name":{"kind":"Name","value":"getAbout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<AboutQuery, AboutQueryVariables>;
export const CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"comments"},"name":{"kind":"Name","value":"getAbout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const CommonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Common"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"common"},"name":{"kind":"Name","value":"getCommon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"headerTitle"}}]}}]}}]} as unknown as DocumentNode<CommonQuery, CommonQueryVariables>;
export const ContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"contact"},"name":{"kind":"Name","value":"getContact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<ContactQuery, ContactQueryVariables>;
export const DramasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Dramas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"dramas"},"name":{"kind":"Name","value":"getDramas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<DramasQuery, DramasQueryVariables>;
export const FooterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Footer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"footer"},"name":{"kind":"Name","value":"getFooter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<FooterQuery, FooterQueryVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"home"},"name":{"kind":"Name","value":"getHome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const MoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"movies"},"name":{"kind":"Name","value":"getMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"awards"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;
export const TheatersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Theaters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"theaters"},"name":{"kind":"Name","value":"getTheaters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"theater"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<TheatersQuery, TheatersQueryVariables>;