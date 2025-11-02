# Environment Variables Setup Guide

## Email Configuration

To enable the contact form to send emails, you need to:

1. **Create a `.env.local` file** in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. **Set your Gmail App Password**:
   - Open `.env.local`
   - Replace `your_app_password_here` with your actual Gmail app password
   - Remove any spaces from the password
   - Example: If your app password is "yuga hofa yyvl wcva", use "yugahofayyvlwcva"

3. **How to get a Gmail App Password**:
   - Go to your Google Account: https://myaccount.google.com/
   - Enable 2-Step Verification if not already enabled
   - Go to App Passwords: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app and "Other" as the device
   - Name it "PKSA Website Contact Form"
   - Copy the 16-character password (it will be shown in groups like "yuga hofa yyvl wcva")
   - Remove spaces and use it in `.env.local`

4. **Restart your development server** after setting up `.env.local`:
   ```bash
   npm run dev
   ```

## Security Notes

- Never commit `.env.local` to git (it's already in .gitignore)
- Keep your app password secure
- The app password grants full access to your Google Account

