# JobBoard - Job Posting Platform

A full-stack job posting platform built with Next.js, MongoDB, and Clerk authentication.

## Features

- **User Authentication**: Secure authentication with Clerk (Sign Up/Login/OAuth)
- **Role-based Access**: Job Seeker and Recruiter roles
- **Job Listings**: Browse, search, and filter jobs
- **Job Details**: Detailed job information with application functionality
- **Applications**: Job seekers can apply to jobs
- **Recruiter Dashboard**: Post, edit, and manage job listings
- **Job Seeker Dashboard**: View applications and manage profile
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **UI/UX**: Tailwind CSS, Lucide Icons, Framer Motion
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Clerk account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # Next.js
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Setup Instructions

1. **MongoDB Setup**:
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Add it to your `.env.local` file

2. **Clerk Setup**:
   - Create a Clerk account at [clerk.dev](https://clerk.dev)
   - Create a new application
   - Get your publishable key and secret key
   - Add them to your `.env.local` file

3. **First Run**:
   - The application will automatically create the necessary database collections
   - Sign up for an account to test the functionality

## Project Structure

```
src/
├── app/
│   ├── api/               # API routes
│   │   ├── jobs/          # Job-related endpoints
│   │   ├── users/         # User management
│   │   └── applications/  # Application management
│   ├── jobs/              # Job listing and detail pages
│   ├── dashboard/         # User dashboard
│   ├── layout.js          # Root layout with Clerk provider
│   └── page.js            # Homepage
├── components/            # Reusable UI components
│   ├── Navbar.js          # Navigation component
│   ├── JobCard.js         # Job listing card
│   └── JobFilters.js      # Job search filters
├── models/                # Database models
│   ├── User.js            # User model
│   ├── Job.js             # Job model
│   └── Application.js     # Application model
└── lib/
    └── mongodb.js         # Database connection
```

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs with filtering
- `POST /api/jobs` - Create new job (recruiters only)
- `GET /api/jobs/[id]` - Get specific job details
- `PUT /api/jobs/[id]` - Update job (owner only)
- `DELETE /api/jobs/[id]` - Delete job (owner only)

### Users
- `GET /api/users` - Get current user profile
- `POST /api/users` - Create user profile
- `PUT /api/users` - Update user profile

### Applications
- `GET /api/applications` - Get user's applications
- `POST /api/applications` - Submit job application

## Database Schema

### User Model
- Authentication info (Clerk ID, email, name)
- Role (job_seeker/recruiter)
- Profile information
- Company information (for recruiters)
- Saved jobs

### Job Model
- Job details (title, description, location, type, level)
- Company information
- Salary range
- Requirements and benefits
- Application settings
- Status and view count

### Application Model
- Job and applicant references
- Application status
- Cover letter and resume
- Application timestamp

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
