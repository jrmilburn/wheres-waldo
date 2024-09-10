/*
  Warnings:

  - The primary key for the `Map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `mapId` on the `Character` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Map` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_mapId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "mapId",
ADD COLUMN     "mapId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Map" DROP CONSTRAINT "Map_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Map_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
