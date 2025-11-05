# Vercel Environment Variables Setup Guide

## Step-by-Step Instructions

1. Go to https://vercel.com/dashboard
2. Select your project: **pascal-con**
3. Go to **Settings** → **Environment Variables**
4. For EACH variable below:
   - Click **Add New**
   - Enter the **exact variable name** (copy exactly, no extra spaces)
   - Enter the **value** (copy exactly)
   - Select **Production**, **Preview**, and **Development** checkboxes
   - Click **Save**

---

## Required Environment Variables

### 1. Supabase URL
**Variable Name:** `SUPABASE_URL`
**Value:** `https://uuhcamtwrmdmgyvaoomb.supabase.co`

### 2. Supabase Service Role Key
**Variable Name:** `SUPABASE_SERVICE_ROLE_KEY`
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGNhbXR3cm1kbWd5dmFvb21iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjA1MTEyMSwiZXhwIjoyMDc3NjI3MTIxfQ.cnx_z-NlTeYgbSH3iGRJ3f8abpiJ0-BSAXhAxNN7lag`

### 3. Supabase Anon Key
**Variable Name:** `SUPABASE_ANON_KEY`
**Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGNhbXR3cm1kbWd5dmFvb21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNTExMjEsImV4cCI6MjA3NzYyNzEyMX0.iVQIxT533zuaJhSXq7Q825PQTFqt19QyNsvpXkd4Ylk`

### 4. Gmail User
**Variable Name:** `GMAIL_USER`
**Value:** `pascalproperties4@gmail.com`

### 5. Gmail App Password
**Variable Name:** `GMAIL_APP_PASSWORD`
**Value:** `xxxplcxukqwtidbs`

### 6. Admin Email
**Variable Name:** `ADMIN_EMAIL`
**Value:** (Enter your admin email address)

### 7. Admin Password
**Variable Name:** `ADMIN_PASSWORD`
**Value:** (Enter your admin password)

### 8. Supabase Projects Bucket (Optional)
**Variable Name:** `SUPABASE_PROJECTS_BUCKET`
**Value:** `project-files`

---

## Important Notes:

- Variable names must ONLY contain: letters (a-z, A-Z), numbers (0-9), and underscores (_)
- Variable names CANNOT start with a number
- NO spaces, hyphens (-), or special characters in variable names
- Copy the variable names EXACTLY as shown above
- Values can contain any characters (URLs, keys, etc.)

## After Adding All Variables:

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for the build to complete
5. Check your site - it should now match your local development!

