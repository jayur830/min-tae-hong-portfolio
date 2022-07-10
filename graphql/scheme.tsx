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
  id: Scalars['String'];
};

export type AboutCommentInput = {
  comment: Scalars['String'];
  date: Scalars['String'];
};

export type AboutMetadata = {
  __typename?: 'AboutMetadata';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type AboutMetadataInput = {
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
  AboutComment_create: AboutComment;
  AboutComment_remove: Scalars['String'];
  AboutImg_update: MediaMetadata;
  AboutMetadata_update: UpdatedAboutMetadata;
  ContactEmail_update: Scalars['String'];
  ContactImg_update: MediaMetadata;
  Dramas_create: Dramas;
  Dramas_remove: Scalars['String'];
  Dramas_removeByYear: Scalars['Int'];
  Dramas_update: Dramas;
  Movies_create: Movies;
  Movies_remove: Scalars['String'];
  Movies_removeByYear: Scalars['Int'];
  Movies_update: Movies;
  Theaters_create: Theaters;
  Theaters_remove: Scalars['String'];
  Theaters_removeByYear: Scalars['Int'];
  Theaters_update: Theaters;
  login: Scalars['Boolean'];
};


export type MutationAboutComment_CreateArgs = {
  input: AboutCommentInput;
};


export type MutationAboutComment_RemoveArgs = {
  id: Scalars['String'];
};


export type MutationAboutImg_UpdateArgs = {
  input: MediaMetadataInput;
};


export type MutationAboutMetadata_UpdateArgs = {
  input: UpdateAboutMetadataInput;
};


export type MutationContactEmail_UpdateArgs = {
  email: Scalars['String'];
};


export type MutationContactImg_UpdateArgs = {
  input: MediaMetadataInput;
};


export type MutationDramas_CreateArgs = {
  createDramasInput: CreateDramasInput;
};


export type MutationDramas_RemoveArgs = {
  id: Scalars['String'];
};


export type MutationDramas_RemoveByYearArgs = {
  year: Scalars['Int'];
};


export type MutationDramas_UpdateArgs = {
  updateDramasInput: UpdateDramasInput;
};


export type MutationMovies_CreateArgs = {
  createMoviesInput: CreateMoviesInput;
};


export type MutationMovies_RemoveArgs = {
  id: Scalars['String'];
};


export type MutationMovies_RemoveByYearArgs = {
  year: Scalars['Int'];
};


export type MutationMovies_UpdateArgs = {
  updateMoviesInput: UpdateMoviesInput;
};


export type MutationTheaters_CreateArgs = {
  createTheatersInput: CreateTheatersInput;
};


export type MutationTheaters_RemoveArgs = {
  id: Scalars['String'];
};


export type MutationTheaters_RemoveByYearArgs = {
  year: Scalars['Int'];
};


export type MutationTheaters_UpdateArgs = {
  updateTheatersInput: UpdateTheatersInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
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

export type UpdateAboutMetadataInput = {
  metadata?: InputMaybe<Array<AboutMetadataInput>>;
  name: Scalars['String'];
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

export type UpdatedAboutMetadata = {
  __typename?: 'UpdatedAboutMetadata';
  metadata?: Maybe<Array<AboutMetadata>>;
  name: Scalars['String'];
};

export type MediaMetadataFragment = { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null };

export type CreateAboutCommentMutationVariables = Exact<{
  input: AboutCommentInput;
}>;


export type CreateAboutCommentMutation = { __typename?: 'Mutation', created: { __typename?: 'AboutComment', id: string, comment: string, date: string } };

export type CreateDramasMutationVariables = Exact<{
  createDramasInput: CreateDramasInput;
}>;


export type CreateDramasMutation = { __typename?: 'Mutation', created: { __typename?: 'Dramas', id: string, title: string, year: number, director?: string | null, actors?: Array<string> | null, schedule?: string | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null } };

export type CreateMoviesMutationVariables = Exact<{
  createMoviesInput: CreateMoviesInput;
}>;


export type CreateMoviesMutation = { __typename?: 'Mutation', created: { __typename?: 'Movies', id: string, title: string, year: number, director: string, actors?: Array<string> | null, awards?: Array<string> | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, video?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null } };

export type CreateTheatersMutationVariables = Exact<{
  createTheatersInput: CreateTheatersInput;
}>;


export type CreateTheatersMutation = { __typename?: 'Mutation', created: { __typename?: 'Theaters', id: string, title: string, theater?: string | null, year: number, schedule?: string | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', auth: boolean };

export type RemoveAboutCommentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveAboutCommentMutation = { __typename?: 'Mutation', removed: string };

export type RemoveByYearDramasMutationVariables = Exact<{
  year: Scalars['Int'];
}>;


export type RemoveByYearDramasMutation = { __typename?: 'Mutation', removed: number };

export type RemoveByYearMoviesMutationVariables = Exact<{
  year: Scalars['Int'];
}>;


export type RemoveByYearMoviesMutation = { __typename?: 'Mutation', removed: number };

export type RemoveByYearTheatersMutationVariables = Exact<{
  year: Scalars['Int'];
}>;


export type RemoveByYearTheatersMutation = { __typename?: 'Mutation', removed: number };

export type RemoveDramasMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveDramasMutation = { __typename?: 'Mutation', removed: string };

export type RemoveMoviesMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveMoviesMutation = { __typename?: 'Mutation', removed: string };

export type RemoveTheatersMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveTheatersMutation = { __typename?: 'Mutation', removed: string };

export type UpdateAboutImgMutationVariables = Exact<{
  input: MediaMetadataInput;
}>;


export type UpdateAboutImgMutation = { __typename?: 'Mutation', updated: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } };

export type UpdateAboutMetadataMutationVariables = Exact<{
  input: UpdateAboutMetadataInput;
}>;


export type UpdateAboutMetadataMutation = { __typename?: 'Mutation', updated: { __typename?: 'UpdatedAboutMetadata', name: string, metadata?: Array<{ __typename?: 'AboutMetadata', label: string, value: string }> | null } };

export type UpdateContactEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UpdateContactEmailMutation = { __typename?: 'Mutation', updated: string };

export type UpdateContactImgMutationVariables = Exact<{
  input: MediaMetadataInput;
}>;


export type UpdateContactImgMutation = { __typename?: 'Mutation', updated: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } };

export type UpdateDramasMutationVariables = Exact<{
  updateDramasInput: UpdateDramasInput;
}>;


export type UpdateDramasMutation = { __typename?: 'Mutation', updated: { __typename?: 'Dramas', id: string, title: string, year: number, director?: string | null, actors?: Array<string> | null, schedule?: string | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null } };

export type UpdateMoviesMutationVariables = Exact<{
  updateMoviesInput: UpdateMoviesInput;
}>;


export type UpdateMoviesMutation = { __typename?: 'Mutation', updated: { __typename?: 'Movies', id: string, title: string, year: number, director: string, actors?: Array<string> | null, awards?: Array<string> | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, video?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null } };

export type UpdateTheatersMutationVariables = Exact<{
  updateTheatersInput: UpdateTheatersInput;
}>;


export type UpdateTheatersMutation = { __typename?: 'Mutation', updated: { __typename?: 'Theaters', id: string, title: string, theater?: string | null, year: number, schedule?: string | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null, scenes?: Array<{ __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null }> | null } };

export type AboutQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutQuery = { __typename?: 'Query', about: { __typename?: 'About', name: string, birth: string, info: string, metadata?: Array<{ __typename?: 'AboutMetadata', label: string, value: string }> | null, img?: { __typename?: 'MediaMetadata', filename?: string | null, width?: number | null, height?: number | null } | null } };

export type CommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type CommentsQuery = { __typename?: 'Query', comments: { __typename?: 'About', comments?: Array<{ __typename?: 'AboutComment', id: string, comment: string, date: string }> | null } };

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
export const CreateAboutCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAboutComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AboutCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"created"},"name":{"kind":"Name","value":"AboutComment_create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<CreateAboutCommentMutation, CreateAboutCommentMutationVariables>;
export const CreateDramasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDramas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createDramasInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDramasInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"created"},"name":{"kind":"Name","value":"Dramas_create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createDramasInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createDramasInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<CreateDramasMutation, CreateDramasMutationVariables>;
export const CreateMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createMoviesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMoviesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"created"},"name":{"kind":"Name","value":"Movies_create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createMoviesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createMoviesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"awards"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<CreateMoviesMutation, CreateMoviesMutationVariables>;
export const CreateTheatersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTheaters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTheatersInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTheatersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"created"},"name":{"kind":"Name","value":"Theaters_create"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTheatersInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTheatersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"theater"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<CreateTheatersMutation, CreateTheatersMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"auth"},"name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RemoveAboutCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAboutComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"removed"},"name":{"kind":"Name","value":"AboutComment_remove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveAboutCommentMutation, RemoveAboutCommentMutationVariables>;
export const RemoveByYearDramasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveByYearDramas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"removed"},"name":{"kind":"Name","value":"Dramas_removeByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}]}}]} as unknown as DocumentNode<RemoveByYearDramasMutation, RemoveByYearDramasMutationVariables>;
export const RemoveByYearMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveByYearMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"removed"},"name":{"kind":"Name","value":"Movies_removeByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}]}}]} as unknown as DocumentNode<RemoveByYearMoviesMutation, RemoveByYearMoviesMutationVariables>;
export const RemoveByYearTheatersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveByYearTheaters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"removed"},"name":{"kind":"Name","value":"Theaters_removeByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}]}}]} as unknown as DocumentNode<RemoveByYearTheatersMutation, RemoveByYearTheatersMutationVariables>;
export const RemoveDramasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveDramas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"removed"},"name":{"kind":"Name","value":"Dramas_remove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveDramasMutation, RemoveDramasMutationVariables>;
export const RemoveMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"removed"},"name":{"kind":"Name","value":"Movies_remove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveMoviesMutation, RemoveMoviesMutationVariables>;
export const RemoveTheatersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTheaters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"removed"},"name":{"kind":"Name","value":"Theaters_remove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveTheatersMutation, RemoveTheatersMutationVariables>;
export const UpdateAboutImgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAboutImg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updated"},"name":{"kind":"Name","value":"AboutImg_update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<UpdateAboutImgMutation, UpdateAboutImgMutationVariables>;
export const UpdateAboutMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAboutMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAboutMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updated"},"name":{"kind":"Name","value":"AboutMetadata_update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAboutMetadataMutation, UpdateAboutMetadataMutationVariables>;
export const UpdateContactEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateContactEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updated"},"name":{"kind":"Name","value":"ContactEmail_update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<UpdateContactEmailMutation, UpdateContactEmailMutationVariables>;
export const UpdateContactImgDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateContactImg"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updated"},"name":{"kind":"Name","value":"ContactImg_update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<UpdateContactImgMutation, UpdateContactImgMutationVariables>;
export const UpdateDramasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDramas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateDramasInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDramasInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updated"},"name":{"kind":"Name","value":"Dramas_update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateDramasInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateDramasInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<UpdateDramasMutation, UpdateDramasMutationVariables>;
export const UpdateMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateMoviesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMoviesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updated"},"name":{"kind":"Name","value":"Movies_update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateMoviesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateMoviesInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"awards"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<UpdateMoviesMutation, UpdateMoviesMutationVariables>;
export const UpdateTheatersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTheaters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTheatersInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTheatersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"updated"},"name":{"kind":"Name","value":"Theaters_update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateTheatersInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTheatersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"theater"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<UpdateTheatersMutation, UpdateTheatersMutationVariables>;
export const AboutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"About"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"about"},"name":{"kind":"Name","value":"getAbout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birth"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<AboutQuery, AboutQueryVariables>;
export const CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"comments"},"name":{"kind":"Name","value":"getAbout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const CommonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Common"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"common"},"name":{"kind":"Name","value":"getCommon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"headerTitle"}}]}}]}}]} as unknown as DocumentNode<CommonQuery, CommonQueryVariables>;
export const ContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"contact"},"name":{"kind":"Name","value":"getContact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<ContactQuery, ContactQueryVariables>;
export const DramasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Dramas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"dramas"},"name":{"kind":"Name","value":"getDramas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<DramasQuery, DramasQueryVariables>;
export const FooterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Footer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"footer"},"name":{"kind":"Name","value":"getFooter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<FooterQuery, FooterQueryVariables>;
export const HomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"home"},"name":{"kind":"Name","value":"getHome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<HomeQuery, HomeQueryVariables>;
export const MoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Movies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"movies"},"name":{"kind":"Name","value":"getMovies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"actors"}},{"kind":"Field","name":{"kind":"Name","value":"awards"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<MoviesQuery, MoviesQueryVariables>;
export const TheatersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Theaters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"theaters"},"name":{"kind":"Name","value":"getTheaters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"theater"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"img"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scenes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MediaMetadata"}}]}}]}}]}},...MediaMetadataFragmentDoc.definitions]} as unknown as DocumentNode<TheatersQuery, TheatersQueryVariables>;