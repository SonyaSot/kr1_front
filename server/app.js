const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;
const path = require('path');

// ============================================
// MIDDLEWARE
// ============================================

// Парсинг JSON
app.use(express.json());
// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, '../client/public')));

// CORS (Практика 4) - разрешаем запросы с фронтенда
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Логирование запросов
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}][${req.method}] ${res.statusCode} ${req.path}`);
    });
    next();
});

// ============================================
// ДАННЫЕ (10 товаров - Практика 4)
// ============================================

let products = [
    { 
        id: nanoid(6), 
        name: 'Ноутбук', 
        category: 'Электроника', 
        price: 50000, 
        stock: 5, 
        description: 'Мощный ноутбук для работы и игр',
        image: '/images/laptop.jpg'
    },
    { 
        id: nanoid(6), 
        name: 'Смартфон', 
        category: 'Электроника', 
        price: 30000, 
        stock: 10, 
        description: 'Современный смартфон с отличной камерой',
        image: '/images/phone.png'
    },
    { 
        id: nanoid(6), 
        name: 'Наушники', 
        category: 'Аксессуары', 
        price: 5000, 
        stock: 20, 
        description: 'Беспроводные наушники с шумоподавлением',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    { 
        id: nanoid(6), 
        name: 'Клавиатура', 
        category: 'Аксессуары', 
        price: 3000, 
        stock: 15, 
        description: 'Механическая клавиатура с RGB подсветкой',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop'
    },
    { 
        id: nanoid(6), 
        name: 'Мышь', 
        category: 'Аксессуары', 
        price: 1500, 
        stock: 25, 
        description: 'Эргономичная игровая мышь',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop'
    },
    { 
        id: nanoid(6), 
        name: 'Монитор', 
        category: 'Электроника', 
        price: 15000, 
        stock: 8, 
        description: '27 дюймов, 4K разрешение, IPS матрица',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop'
    },
    { 
        id: nanoid(6), 
        name: 'Веб-камера', 
        category: 'Аксессуары', 
        price: 4000, 
        stock: 12, 
        description: 'HD качество, встроенный микрофон',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop'
    },
    { 
        id: nanoid(6), 
        name: 'Коврик', 
        category: 'Аксессуары', 
        price: 500, 
        stock: 50, 
        description: 'Игровой коврик большого размера',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&h=300&fit=crop'
    },
    { 
        id: nanoid(6), 
        name: 'Кабель USB', 
        category: 'Аксессуары', 
        price: 300, 
        stock: 100, 
        description: 'Длина 2 метра, быстрая зарядка',
        image: 'https://images.unsplash.com/photo-1616353329437-84274480123c?w=400&h=300&fit=crop'
    },
    { 
        id: nanoid(6), 
        name: 'Зарядное устройство', 
        category: 'Аксессуары', 
        price: 1000, 
        stock: 30, 
        description: 'Быстрая зарядка, несколько портов',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=300&fit=crop'
    }
];

// ============================================
// SWAGGER CONFIGURATION (Практика 5)
// ============================================

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Интернет-магазина',
            version: '1.0.0',
            description: 'CRUD операции для товаров интернет-магазина',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер',
            },
        ],
    },
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// SCHEMA (Практика 5)
// ============================================

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Уникальный идентификатор товара
 *           example: "abc123"
 *         name:
 *           type: string
 *           description: Название товара
 *           example: "Ноутбук"
 *         category:
 *           type: string
 *           description: Категория товара
 *           example: "Электроника"
 *         price:
 *           type: integer
 *           description: Стоимость товара в рублях
 *           example: 50000
 *         stock:
 *           type: integer
 *           description: Количество на складе
 *           example: 5
 *         description:
 *           type: string
 *           description: Описание товара
 *           example: "Мощный ноутбук"
 */

// ============================================
// ROUTES (Практики 2, 4, 5)
// ============================================

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить все товары
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список всех товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/api/products', (req, res) => {
    res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка валидации
 */
app.post('/api/products', (req, res) => {
    const { name, price, category, stock, description } = req.body;
    
    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Поля name и price обязательны' });
    }
    
    const newProduct = {
        id: nanoid(6),
        name,
        price: Number(price),
        category: category || 'General',
        stock: stock || 0,
        description: description || ''
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Товар обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.patch('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    const { name, price, category, stock, description } = req.body;
    
    if (name) product.name = name;
    if (price !== undefined) product.price = Number(price);
    if (category) product.category = category;
    if (stock !== undefined) product.stock = Number(stock);
    if (description) product.description = description;
    
    res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 */
app.delete('/api/products/:id', (req, res) => {
    const exists = products.some(p => p.id === req.params.id);
    
    if (!exists) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    products = products.filter(p => p.id !== req.params.id);
    res.status(204).send();
});

// ============================================
// ЗАПУСК СЕРВЕРА
// ============================================

app.listen(port, () => {
    console.log(` Сервер запущен: http://localhost:${port}`);
    console.log(` Swagger документация: http://localhost:${port}/api-docs`);
    console.log(` API endpoint: http://localhost:${port}/api/products`);
});