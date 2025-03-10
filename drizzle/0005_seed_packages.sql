-- Custom SQL migration file, put your code below! --
INSERT INTO
    packages (
        name,
        sessions,
        expiry_in_days,
        description,
        price,
        discount
    )
VALUES
    (
        'Discover',
        1,
        30,
        'Perfect for a trial session.',
        '75.00',
        '10.00'
    ),
    (
        'Build',
        5,
        30,
        'Helpful for finding your rhythm.',
        '350.00',
        '50.00'
    ),
    (
        'Transform',
        10,
        30,
        'For those looking for a complete transformation.',
        '600.00',
        '100.00'
    );