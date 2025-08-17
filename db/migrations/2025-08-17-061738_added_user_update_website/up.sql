-- Your SQL goes here
ALTER TABLE "website" ADD COLUMN "user_id" TEXT NOT NULL;

ALTER TABLE "website_ticks" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "website" ADD CONSTRAINT "website_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "user"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
