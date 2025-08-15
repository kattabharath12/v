-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."forms_1099" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "taxYear" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forms_1099_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."form_1040_mappings" (
    "id" TEXT NOT NULL,
    "form1099Id" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "form_1040_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."forms_1099" ADD CONSTRAINT "forms_1099_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."form_1040_mappings" ADD CONSTRAINT "form_1040_mappings_form1099Id_fkey" FOREIGN KEY ("form1099Id") REFERENCES "public"."forms_1099"("id") ON DELETE CASCADE ON UPDATE CASCADE;
