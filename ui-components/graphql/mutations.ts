/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $condition: ModelEmployeeConditionInput
    $input: CreateEmployeeInput!
  ) {
    createEmployee(condition: $condition, input: $input) {
      createdAt
      hiringDate
      id
      name
      role
      surname
      updatedAt
      __typename
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $condition: ModelEmployeeConditionInput
    $input: DeleteEmployeeInput!
  ) {
    deleteEmployee(condition: $condition, input: $input) {
      createdAt
      hiringDate
      id
      name
      role
      surname
      updatedAt
      __typename
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $condition: ModelEmployeeConditionInput
    $input: UpdateEmployeeInput!
  ) {
    updateEmployee(condition: $condition, input: $input) {
      createdAt
      hiringDate
      id
      name
      role
      surname
      updatedAt
      __typename
    }
  }
`;
