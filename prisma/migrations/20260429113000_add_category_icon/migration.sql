ALTER TABLE "Category"
ADD COLUMN "icon" TEXT;

UPDATE "Category"
SET "icon" = 'tag'
WHERE "icon" IS NULL;

ALTER TABLE "Category"
ALTER COLUMN "icon" SET NOT NULL;