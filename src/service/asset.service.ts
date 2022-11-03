import { User } from '@prisma/client';
import { count } from 'console';
import prisma from '../../prisma';

// Create Asset Service
export type CreateAssetInputType = {
  user_id: string;
};

export const CreateAsset = (input: CreateAssetInputType) =>
  prisma.asset.create({ data: input });

// Update Asset Service
export type UpdateAssetInputType = {
  user_id: string;
  btc?: number;
  etc?: number;
  bnb?: number;
  usdt?: number;
};
type UpdateAssetDataKeyType = keyof Omit<UpdateAssetInputType, 'user_id'>;
type UpdateAssetDataType = {
  [key in UpdateAssetDataKeyType]?: { increment: number };
};

export const UpdateAsset = ({
  user_id,
  ...restInput
}: UpdateAssetInputType) => {
  const keys = Object.keys(restInput) as UpdateAssetDataKeyType[];
  const updateData: UpdateAssetDataType = {};
  for (const key of keys) {
    updateData[key] = restInput[key]
      ? { increment: restInput[key] }
      : undefined;
  }

  return prisma.asset.upsert({
    where: { user_id },
    update: updateData,
    create: {
      user_id,
      ...restInput,
    },
  });
};

// Get Asset By Id Service
// export type GetAssetByIdInputType = {
//   id: string;
// };

// export const GetAssetById = ({ id }: GetAssetByIdInputType) =>
//   prisma.asset.findUnique({ where: { id } });

// Get Asset By UserId Service
export type GetAssetByUserIdInputType = {
  user_id: string;
};

export const GetAssetByUserId = ({ user_id }: GetAssetByUserIdInputType) =>
  prisma.asset.findUnique({ where: { user_id } });
