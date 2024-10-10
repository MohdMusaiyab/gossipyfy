-- CreateTable
CREATE TABLE "_UserToFollow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToFollow_AB_unique" ON "_UserToFollow"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToFollow_B_index" ON "_UserToFollow"("B");

-- AddForeignKey
ALTER TABLE "_UserToFollow" ADD CONSTRAINT "_UserToFollow_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToFollow" ADD CONSTRAINT "_UserToFollow_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
