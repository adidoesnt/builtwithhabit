-- Custom SQL migration file, put your code below! --
UPDATE packages
SET
    long_description = 'A one-time session designed to explore your goals, introduce foundational movements, and assess where you''re at physically. Great for beginners or anyone wanting to dip their toes into personalised training.'
WHERE
    id = 1;

UPDATE packages
SET
    long_description = 'A short-term plan to build consistency, learn proper form, and develop a routine that suits your lifestyle. We focus on mobility, strength, and conditioning - all tailored to your body and preferences.'
WHERE
    id = 2;

UPDATE packages
SET
    long_description = 'A comprehensive program designed to create sustainable change. This package dives deeper into progressive overload, movement patterns, aerobic capacity, and muscle development - with check-ins and nutritional guidance to support your goals.'
WHERE
    id = 3;