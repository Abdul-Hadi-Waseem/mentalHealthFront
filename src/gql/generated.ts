import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type ActionsUsersLoginModel = GenericGraphQlResponse & {
  __typename?: "ActionsUsersLoginModel";
  data: Scalars["JSON"];
  error: Scalars["String"];
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type ActionsUsersModel = GenericGraphQlResponse & {
  __typename?: "ActionsUsersModel";
  data: Scalars["String"];
  error: Scalars["String"];
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type ContactUsArgs = {
  email: Scalars["String"];
  message: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
};

export type CreateUserDto = {
  address?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  dob?: InputMaybe<Scalars["String"]>;
  email: Scalars["String"];
  gender?: InputMaybe<Scalars["Int"]>;
  institute_name?: InputMaybe<Scalars["String"]>;
  level?: InputMaybe<Scalars["Int"]>;
  name: Scalars["String"];
  password: Scalars["String"];
  phone: Scalars["String"];
  state?: InputMaybe<Scalars["String"]>;
  zip_code?: InputMaybe<Scalars["String"]>;
};

export type GenericGraphQlResponse = {
  error: Scalars["String"];
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type LoginDto = {
  email: Scalars["String"];
  level: Scalars["Int"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  actionsUsersRegistration: ActionsUsersModel;
  contactUs: Scalars["String"];
  instituteRegistration: ActionsUsersModel;
  programform: SuccessJsonResponse;
};

export type MutationActionsUsersRegistrationArgs = {
  rawData: CreateUserDto;
};

export type MutationContactUsArgs = {
  rawData: ContactUsArgs;
};

export type MutationInstituteRegistrationArgs = {
  rawData: CreateUserDto;
};

export type MutationProgramformArgs = {
  argsData: ProgramDataArgs;
};

export type ProgramDataArgs = {
  formId: Scalars["Float"];
  metadata: Scalars["JSON"];
};

export type Query = {
  __typename?: "Query";
  dictionary: SuccessJsonResponse;
  login: ActionsUsersLoginModel;
  main: SuccessResponse;
};

export type QueryLoginArgs = {
  rawData: LoginDto;
};

export type SuccessJsonResponse = GenericGraphQlResponse & {
  __typename?: "SuccessJSONResponse";
  data: Scalars["JSON"];
  error: Scalars["String"];
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type SuccessResponse = GenericGraphQlResponse & {
  __typename?: "SuccessResponse";
  data: Scalars["String"];
  error: Scalars["String"];
  message: Scalars["String"];
  success: Scalars["Boolean"];
};

export type ContactUsMutationVariables = Exact<{
  Data: ContactUsArgs;
}>;

export type ContactUsMutation = { __typename?: "Mutation"; contactUs: string };

export type DoctorRegistrationMutationVariables = Exact<{
  Data: CreateUserDto;
}>;

export type DoctorRegistrationMutation = {
  __typename?: "Mutation";
  actionsUsersRegistration: {
    __typename?: "ActionsUsersModel";
    success: boolean;
    error: string;
    message: string;
    data: string;
  };
};

export type PatientRegistrationMutationVariables = Exact<{
  Data: CreateUserDto;
}>;

export type PatientRegistrationMutation = {
  __typename?: "Mutation";
  actionsUsersRegistration: {
    __typename?: "ActionsUsersModel";
    success: boolean;
    error: string;
    message: string;
    data: string;
  };
};

export type ProgramdataMutationVariables = Exact<{
  Data: ProgramDataArgs;
}>;

export type ProgramdataMutation = {
  __typename?: "Mutation";
  programform: {
    __typename?: "SuccessJSONResponse";
    success: boolean;
    error: string;
    message: string;
    data: any;
  };
};

export type ActionLoginQueryVariables = Exact<{
  Data: LoginDto;
}>;

export type ActionLoginQuery = {
  __typename?: "Query";
  login: {
    __typename?: "ActionsUsersLoginModel";
    success: boolean;
    error: string;
    message: string;
    data: any;
  };
};

export type ActionsUsersRegistrationMutationVariables = Exact<{
  Data: CreateUserDto;
}>;

export type ActionsUsersRegistrationMutation = {
  __typename?: "Mutation";
  actionsUsersRegistration: {
    __typename?: "ActionsUsersModel";
    data: string;
    success: boolean;
    error: string;
  };
};

export const ContactUsDocument = gql`
  mutation contactUs($Data: ContactUsArgs!) {
    contactUs(rawData: $Data)
  }
`;

export function useContactUsMutation() {
  return Urql.useMutation<ContactUsMutation, ContactUsMutationVariables>(
    ContactUsDocument
  );
}
export const DoctorRegistrationDocument = gql`
  mutation doctorRegistration($Data: CreateUserDto!) {
    actionsUsersRegistration(rawData: $Data) {
      success
      error
      message
      data
    }
  }
`;

export function useDoctorRegistrationMutation() {
  return Urql.useMutation<
    DoctorRegistrationMutation,
    DoctorRegistrationMutationVariables
  >(DoctorRegistrationDocument);
}
export const PatientRegistrationDocument = gql`
  mutation patientRegistration($Data: CreateUserDto!) {
    actionsUsersRegistration(rawData: $Data) {
      success
      error
      message
      data
    }
  }
`;

export function usePatientRegistrationMutation() {
  return Urql.useMutation<
    PatientRegistrationMutation,
    PatientRegistrationMutationVariables
  >(PatientRegistrationDocument);
}
export const ProgramdataDocument = gql`
  mutation programdata($Data: ProgramDataArgs!) {
    programform(argsData: $Data) {
      success
      error
      message
      data
    }
  }
`;

export function useProgramdataMutation() {
  return Urql.useMutation<ProgramdataMutation, ProgramdataMutationVariables>(
    ProgramdataDocument
  );
}
export const ActionLoginDocument = gql`
  query ActionLogin($Data: LoginDto!) {
    login(rawData: $Data) {
      success
      error
      message
      data
    }
  }
`;

export function useActionLoginQuery(
  options: Omit<Urql.UseQueryArgs<ActionLoginQueryVariables>, "query">
) {
  return Urql.useQuery<ActionLoginQuery, ActionLoginQueryVariables>({
    query: ActionLoginDocument,
    ...options,
  });
}
export const ActionsUsersRegistrationDocument = gql`
  mutation ActionsUsersRegistration($Data: CreateUserDto!) {
    actionsUsersRegistration(rawData: $Data) {
      data
      success
      error
    }
  }
`;

export function useActionsUsersRegistrationMutation() {
  return Urql.useMutation<
    ActionsUsersRegistrationMutation,
    ActionsUsersRegistrationMutationVariables
  >(ActionsUsersRegistrationDocument);
}
