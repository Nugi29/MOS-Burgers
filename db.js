const storeData = {
    menuItems: [
        // Burgers
        {
            code: 'B1001',
            name: 'Classic Burger (Large)',
            category: 'Burgers',
            price: 750.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1002',
            name: 'Classic Burger (Regular)',
            category: 'Burgers',
            price: 1500.00,
            discount: 15,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1003',
            name: 'Turkey Burger',
            category: 'Burgers',
            price: 1600.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1004',
            name: 'Chicken Burger (Large)',
            category: 'Burgers',
            price: 1400.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1005',
            name: 'Chicken Burger (Regular)',
            category: 'Burgers',
            price: 800.00,
            discount: 20,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1006',
            name: 'Cheese Burger (Large)',
            category: 'Burgers',
            price: 1000.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1007',
            name: 'Cheese Burger (Regular)',
            category: 'Burgers',
            price: 600.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1008',
            name: 'Bacon Burger',
            category: 'Burgers',
            price: 650.00,
            discount: 15,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1009',
            name: 'Shawarma Burger',
            category: 'Burgers',
            price: 800.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1010',
            name: 'Olive Burger',
            category: 'Burgers',
            price: 1800.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1012',
            name: 'Double-Cheese Burger',
            category: 'Burgers',
            price: 1250.00,
            discount: 20,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1013',
            name: 'Crispy Chicken Burger (Regular)',
            category: 'Burgers',
            price: 1200.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1014',
            name: 'Crispy Chicken Burger (Large)',
            category: 'Burgers',
            price: 1600.00,
            discount: 10,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1015',
            name: 'Paneer Burger',
            category: 'Burgers',
            price: 900.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },

        // Submarines
        {
            code: 'B1016',
            name: 'Crispy Chicken Submarine (Large)',
            category: 'Submarines',
            price: 2000.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1017',
            name: 'Crispy Chicken Submarine (Regular)',
            category: 'Submarines',
            price: 1500.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1018',
            name: 'Chicken Submarine (Large)',
            category: 'Submarines',
            price: 1800.00,
            discount: 3,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1019',
            name: 'Chicken Submarine (Regular)',
            category: 'Submarines',
            price: 1400.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1020',
            name: 'Grinder Submarine',
            category: 'Submarines',
            price: 2300.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1021',
            name: 'Cheese Submarine',
            category: 'Submarines',
            price: 2200.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1022',
            name: 'Double Cheese n Chicken Submarine',
            category: 'Submarines',
            price: 1900.00,
            discount: 16,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1023',
            name: 'Special Horgie Submarine',
            category: 'Submarines',
            price: 2800.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1024',
            name: 'MOS Special Submarine',
            category: 'Submarines',
            price: 3000.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },

        // Fries
        {
            code: 'B1025',
            name: 'Steak Fries (Large)',
            category: 'Fries',
            price: 1200.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1026',
            name: 'Steak Fries (Medium)',
            category: 'Fries',
            price: 600.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1027',
            name: 'French Fries (Large)',
            category: 'Fries',
            price: 800.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1028',
            name: 'French Fries (Medium)',
            category: 'Fries',
            price: 650.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1029',
            name: 'French Fries (Small)',
            category: 'Fries',
            price: 450.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1030',
            name: 'Sweet Potato Fries (Large)',
            category: 'Fries',
            price: 600.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },

        // Pasta
        {
            code: 'B1031',
            name: 'Chicken n Cheese Pasta',
            category: 'Pasta',
            price: 1600.00,
            discount: 15,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1032',
            name: 'Chicken Penne Pasta',
            category: 'Pasta',
            price: 1700.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1033',
            name: 'Ground Turkey Pasta Bake',
            category: 'Pasta',
            price: 2900.00,
            discount: 10,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1034',
            name: 'Creamy Shrimp Pasta',
            category: 'Pasta',
            price: 2000.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1035',
            name: 'Lemon Butter Pasta',
            category: 'Pasta',
            price: 1950.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1036',
            name: 'Tagliatelle Pasta',
            category: 'Pasta',
            price: 2400.00,
            discount: 1,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1037',
            name: 'Baked Ravioli',
            category: 'Pasta',
            price: 2000.00,
            discount: 1,
            quantity: 100,
            expireDate: '2024-12-31'
        },

        // Chicken
        {
            code: 'B1038',
            name: 'Fried Chicken (Small)',
            category: 'Chicken',
            price: 1200.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1039',
            name: 'Fried Chicken (Regular)',
            category: 'Chicken',
            price: 2300.00,
            discount: 10,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1040',
            name: 'Fried Chicken (Large)',
            category: 'Chicken',
            price: 3100.00,
            discount: 5,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1041',
            name: 'Hot Wings (Large)',
            category: 'Chicken',
            price: 2400.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1042',
            name: 'Devilled Chicken (Large)',
            category: 'Chicken',
            price: 900.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },
        {
            code: 'B1043',
            name: 'BBQ Chicken (Regular)',
            category: 'Chicken',
            price: 2100.00,
            discount: 0,
            quantity: 100,
            expireDate: '2024-12-31'
        },

        // Beverages
        {
            code: 'B1044',
            name: 'Pepsi (330ml)',
            category: 'Beverages',
            price: 990.00,
            discount: 5,
            quantity: 100,
            expireDate: '2025-12-25'  // 365 days for beverages
        },
        {
            code: 'B1045',
            name: 'Coca-Cola (330ml)',
            category: 'Beverages',
            price: 1230.00,
            discount: 0,
            quantity: 100,
            expireDate: '2025-12-25'
        },
        {
            code: 'B1046',
            name: 'Sprite (330ml)',
            category: 'Beverages',
            price: 1500.00,
            discount: 3,
            quantity: 100,
            expireDate: '2025-12-25'
        },
        {
            code: 'B1047',
            name: 'Mirinda (330ml)',
            category: 'Beverages',
            price: 850.00,
            discount: 7,
            quantity: 100,
            expireDate: '2025-12-25'
        }
    ]
};





