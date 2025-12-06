# AutoFleet Rentals - MERN Stack Vehicle Rental Application

A complete full-stack vehicle rental web application built with MongoDB, Express.js, React, and Node.js.

## 🚀 Features

### User Features
- ✅ User Registration & Login (JWT Authentication)
- ✅ Profile Management
- ✅ Search & Filter Vehicles (by category, price, brand, model)
- ✅ View Vehicle Details
- ✅ Real-time Availability Check
- ✅ Booking System with Date Range Selection
- ✅ Payment Simulation (Dummy Checkout)
- ✅ Booking History & Status Tracking

### Admin Features
- ✅ Admin Login
- ✅ Dashboard with Key Statistics
- ✅ Add / Edit / Delete Vehicles
- ✅ Manage Categories (Car, Bike, Van, SUV, Luxury, etc.)
- ✅ View and Update Booking Statuses
- ✅ Manage Users
- ✅ Upload Vehicle Images (Cloudinary or Local Storage)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **npm** or **yarn**
- **Git**

## 🛠️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd "AutoFleet Rentals"
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/autofleet-rentals
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autofleet-rentals

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Cloudinary Configuration (Optional - for image uploads)
# If not provided, images will be stored locally
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
```

5. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB Installation

1. **Download MongoDB:**
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Download and install MongoDB Community Edition for your OS

2. **Start MongoDB:**
   - **Windows:** MongoDB should start automatically as a service
   - **Mac/Linux:** Run `mongod` in terminal

3. **Verify Installation:**
   ```bash
   mongosh
   ```
   If successful, you'll see the MongoDB shell prompt.

4. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/autofleet-rentals
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Account:**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster:**
   - Click "Create Cluster"
   - Choose free tier (M0)
   - Select your preferred region

3. **Configure Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password (save these!)

4. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)

5. **Get Connection String:**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

6. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autofleet-rentals
   ```
   Replace `username` and `password` with your database user credentials.

## ☁️ Cloudinary Setup (Optional)

If you want to use Cloudinary for image uploads:

1. **Create Account:**
   - Visit [Cloudinary](https://cloudinary.com/)
   - Sign up for a free account

2. **Get Credentials:**
   - Go to Dashboard
   - Copy your:
     - Cloud Name
     - API Key
     - API Secret

3. **Update `.env`:**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

**Note:** If Cloudinary is not configured, images will be stored locally in the `backend/uploads` folder.

## 👤 Creating Admin User

To create an admin user, you have two options:

### Option 1: Using MongoDB Shell

1. Start your backend server
2. Register a user through the frontend (Sign Up)
3. Open MongoDB shell:
   ```bash
   mongosh
   ```
4. Switch to your database:
   ```javascript
   use autofleet-rentals
   ```
5. Update user role:
   ```javascript
   db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "admin" } })
   ```

### Option 2: Using MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to your database
3. Navigate to `users` collection
4. Find your user document
5. Edit the `role` field from `"user"` to `"admin"`

## 📁 Project Structure

```
AutoFleet Rentals/
├── backend/
│   ├── config/
│   │   └── cloudinary.js       # Cloudinary & file upload config
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT & role-based auth
│   ├── models/
│   │   ├── User.js             # User model
│   │   ├── Vehicle.js           # Vehicle model
│   │   ├── Booking.js           # Booking model
│   │   └── Category.js          # Category model
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication routes
│   │   ├── vehicleRoutes.js    # Vehicle CRUD routes
│   │   ├── bookingRoutes.js    # Booking routes
│   │   ├── categoryRoutes.js   # Category routes
│   │   └── userRoutes.js       # User management routes
│   ├── utils/
│   │   └── generateToken.js    # JWT token generator
│   ├── uploads/                # Local image storage (if not using Cloudinary)
│   ├── server.js               # Express server entry point
│   ├── package.json
│   └── .env                    # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/
│   │   │   ├── user/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   ├── VehicleListings.jsx
│   │   │   │   ├── VehicleDetails.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── MyBookings.jsx
│   │   │   │   └── Checkout.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageVehicles.jsx
│   │   │       ├── ManageBookings.jsx
│   │   │       ├── ManageUsers.jsx
│   │   │       └── ManageCategories.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Vehicles
- `GET /api/vehicles` - Get all vehicles (with filters)
- `GET /api/vehicles/:id` - Get single vehicle
- `POST /api/vehicles` - Create vehicle (Admin only)
- `PUT /api/vehicles/:id` - Update vehicle (Admin only)
- `DELETE /api/vehicles/:id` - Delete vehicle (Admin only)

### Bookings
- `GET /api/bookings` - Get all bookings (User's or Admin's)
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking (Protected)
- `PUT /api/bookings/:id/status` - Update booking status (Admin only)
- `DELETE /api/bookings/:id` - Cancel/Delete booking

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Admin only)
- `PUT /api/users/profile` - Update own profile (Protected)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🚦 Running the Application

1. **Start MongoDB** (if using local installation)

2. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 🧪 Testing

### Test User Registration
1. Navigate to http://localhost:3000/signup
2. Create a new account
3. Login at http://localhost:3000/login

### Test Admin Access
1. Create a user account
2. Update user role to "admin" in MongoDB
3. Login with admin credentials
4. Access admin panel at http://localhost:3000/admin/dashboard

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Admin/User)
- Protected routes (frontend & backend)
- Input validation
- Error handling

## 📝 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - Token expiration time
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (optional)
- `CLOUDINARY_API_KEY` - Cloudinary API key (optional)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (optional)
- `NODE_ENV` - Environment (development/production)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings for MongoDB Atlas
- Verify credentials in `.env` file

### Image Upload Issues
- If using Cloudinary: Verify credentials in `.env`
- If using local storage: Ensure `backend/uploads` folder exists
- Check file permissions

### CORS Issues
- Backend CORS is configured to allow all origins in development
- For production, update CORS settings in `server.js`

### Port Already in Use
- Change `PORT` in backend `.env` file
- Update frontend proxy in `vite.config.js` if needed

## 📦 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2
3. Deploy to services like:
   - Heroku
   - DigitalOcean
   - AWS EC2
   - Railway

### Frontend Deployment
1. Build the application:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy `dist` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront

### Database
- Use MongoDB Atlas for production
- Ensure proper security settings
- Set up database backups

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using the MERN Stack

## 🙏 Acknowledgments

- MongoDB for database
- Express.js for backend framework
- React for frontend framework
- TailwindCSS for styling
- Cloudinary for image hosting

---

**Happy Coding! 🚀**

