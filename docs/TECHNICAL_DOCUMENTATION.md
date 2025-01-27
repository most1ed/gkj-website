# Dokumentasi Teknis Aplikasi GKJ

## Arsitektur Aplikasi

### Frontend
- **Framework**: Next.js + React
- **State Management**: React Context + Hooks
- **UI Framework**: Tailwind CSS + Shadcn/ui
- **Animasi**: Framer Motion
- **Form Handling**: React Hook Form + Zod

### Backend
- **Framework**: Node.js + Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Cache**: Redis
- **Search**: Elasticsearch

### Authentication & Authorization
- **JWT** untuk token management
- **bcrypt** untuk password hashing
- **2FA** menggunakan TOTP
- **Role-based access control**

## Struktur Database

### Users & Authentication
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role_id INTEGER REFERENCES roles(id),
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  no_anggota VARCHAR(50) UNIQUE,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  description TEXT,
  permissions JSONB
);

-- User profiles
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  full_name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  birth_date DATE,
  baptism_date DATE,
  sidi_date DATE,
  family_card_id INTEGER REFERENCES family_cards(id)
);
```

### Church Data
```sql
-- Family cards
CREATE TABLE family_cards (
  id SERIAL PRIMARY KEY,
  number VARCHAR(50) UNIQUE,
  head_of_family VARCHAR(255),
  address TEXT,
  rt VARCHAR(10),
  rw VARCHAR(10),
  kelurahan VARCHAR(100),
  kecamatan VARCHAR(100),
  city VARCHAR(100),
  postal_code VARCHAR(10)
);

-- Church events
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  location VARCHAR(255),
  max_participants INTEGER,
  registration_deadline TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);

-- Event registrations
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50),
  registration_date TIMESTAMP DEFAULT NOW()
);
```

### Content Management
```sql
-- Pages
CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  content TEXT,
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);

-- Posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  content TEXT,
  excerpt TEXT,
  featured_image VARCHAR(255),
  category_id INTEGER REFERENCES categories(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_by INTEGER REFERENCES users(id)
);

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  slug VARCHAR(100) UNIQUE,
  description TEXT
);
```

### Church Services
```sql
-- Service schedules
CREATE TABLE service_schedules (
  id SERIAL PRIMARY KEY,
  service_type VARCHAR(100),
  date DATE,
  time TIME,
  max_capacity INTEGER,
  registration_required BOOLEAN DEFAULT false
);

-- Service registrations
CREATE TABLE service_registrations (
  id SERIAL PRIMARY KEY,
  schedule_id INTEGER REFERENCES service_schedules(id),
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50),
  qr_code VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Financial
```sql
-- Offerings
CREATE TABLE offerings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2),
  type VARCHAR(100),
  payment_method VARCHAR(100),
  transaction_id VARCHAR(255),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50),
  amount DECIMAL(10,2),
  description TEXT,
  category VARCHAR(100),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Users & Profiles
```
GET /api/users
GET /api/users/:id
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id

GET /api/profiles
GET /api/profiles/:id
PUT /api/profiles/:id
```

### Church Services
```
GET /api/services
GET /api/services/:id
POST /api/services
PUT /api/services/:id
DELETE /api/services/:id

POST /api/services/:id/register
GET /api/services/:id/registrations
```

### Content Management
```
GET /api/pages
GET /api/pages/:slug
POST /api/pages
PUT /api/pages/:id
DELETE /api/pages/:id

GET /api/posts
GET /api/posts/:slug
POST /api/posts
PUT /api/posts/:id
DELETE /api/posts/:id
```

### Financial
```
GET /api/offerings
POST /api/offerings
GET /api/offerings/:id

GET /api/transactions
POST /api/transactions
GET /api/transactions/:id
```

## Security Implementation

### Authentication
```typescript
// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '1d',
  refreshExpiresIn: '7d'
};

// Password Hashing
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Token Generation
const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
  
  const refreshToken = jwt.sign(
    { id: user.id },
    jwtConfig.secret,
    { expiresIn: jwtConfig.refreshExpiresIn }
  );
  
  return { accessToken, refreshToken };
};
```

### Authorization
```typescript
// Role-based Middleware
const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: insufficient permissions'
      });
    }
    next();
  };
};

// Permission Check
const hasPermission = (user: User, permission: string): boolean => {
  const userRole = roles.find(r => r.id === user.roleId);
  return userRole?.permissions.includes(permission) || false;
};
```

## Caching Strategy

### Redis Implementation
```typescript
// Redis Client Setup
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
});

// Cache Middleware
const cacheMiddleware = (duration: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    const cached = await redis.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body: any) => {
      redis.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
```

## File Upload

### S3 Integration
```typescript
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

const uploadFile = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };
  
  return s3.upload(params).promise();
};
```

## Notification System

### Email Service
```typescript
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to: string, subject: string, html: string) => {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html
  });
};
```

### Push Notifications
```typescript
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:example@gkj.org',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const sendPushNotification = async (subscription: PushSubscription, payload: any) => {
  return webpush.sendNotification(subscription, JSON.stringify(payload));
};
```

## Testing Strategy

### Unit Tests
```typescript
describe('Authentication Service', () => {
  it('should hash password correctly', async () => {
    const password = 'testPassword123';
    const hashedPassword = await hashPassword(password);
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
  });
  
  it('should generate valid JWT tokens', () => {
    const user = { id: 1, role: 'warga' };
    const tokens = generateTokens(user);
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
  });
});
```

### Integration Tests
```typescript
describe('User API', () => {
  it('should create new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
```

## Deployment Configuration

### Docker Setup
```dockerfile
# Frontend
FROM node:16-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Backend
FROM node:16-alpine AS backend
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["npm", "start"]
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name gkj-grogol.org;

    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Environment Variables
```env
# Application
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://gkj-grogol.org

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/gkj
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d

# AWS
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
AWS_REGION=ap-southeast-1
AWS_BUCKET_NAME=gkj-storage

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@gkj-grogol.org
SMTP_PASS=your-smtp-password

# Push Notifications
VAPID_PUBLIC_KEY=your-public-key
VAPID_PRIVATE_KEY=your-private-key
```
