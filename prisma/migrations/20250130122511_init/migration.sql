-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageUrl" TEXT,
    "userId" TEXT NOT NULL,
    "editorState" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
