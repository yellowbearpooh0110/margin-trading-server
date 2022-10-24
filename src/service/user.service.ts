import prisma from '../../prisma';

// Create User Service
export type CreateUserInputType = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export const CreateUser = (input: CreateUserInputType) =>
  prisma.user.create({ data: { ...input, asset: { create: {} } } });

// Update User Service
export type UpdateUserInputType = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

export const UpdateUser = ({ id, ...restInput }: UpdateUserInputType) =>
  prisma.user.update({ where: { id }, data: restInput });

// Get User By Id Service
export type GetUserByIdInputType = {
  id: string;
};

export const GetUserById = ({ id }: GetUserByIdInputType) =>
  prisma.user.findUnique({ where: { id } });

// Get User By Email Service
export type GetUserByEmailInputType = {
  email: string;
};

export const GetUserByEmail = ({ email }: GetUserByEmailInputType) =>
  prisma.user.findUnique({ where: { email } });
