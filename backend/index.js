// 📦 Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 🔐 Load .env variables
dotenv.config();
// 🚀 Initialize Express App
const app = express();
// 🛡️ Middlewares
app.use(cors());                 // To allow frontend communication
app.use(express.json());         // To parse incoming JSON requests

// 📂 Import All Routes
const authRoutes = require('./routes/auth');          // Signup/Login
const companyRoutes = require('./routes/company');    // Company CRUD
const tenderRoutes = require('./routes/tender');      // Tender CRUD
const exploreRoutes = require('./routes/explore');    // Tender explore + proposals

// 🔗 Use Routes
app.use('/api/auth', authRoutes);         // All auth endpoints
app.use('/api/company', companyRoutes);   // Company-related APIs
app.use('/api/tenders', tenderRoutes);    // Tender create/edit/delete/list
app.use('/api/explore', exploreRoutes);   // View other tenders + submit proposals

// 🟢 Start the Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
