-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Minx" INTEGER NOT NULL,
    "Maxx" INTEGER NOT NULL,
    "Miny" INTEGER NOT NULL,
    "Maxy" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
