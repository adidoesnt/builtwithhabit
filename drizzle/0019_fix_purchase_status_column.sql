-- Custom SQL migration file, put your code below! --

-- First drop the default value
ALTER TABLE "purchases" 
ALTER COLUMN "status" DROP DEFAULT;

-- Then alter the column type
ALTER TABLE "purchases" 
ALTER COLUMN "status" TYPE purchase_status 
USING CASE 
    WHEN status = true THEN 'confirmed'::purchase_status
    WHEN status = false THEN 'unconfirmed'::purchase_status
    ELSE 'unconfirmed'::purchase_status
END;

-- Finally set the new default value
ALTER TABLE "purchases" 
ALTER COLUMN "status" SET DEFAULT 'unconfirmed'::purchase_status;
