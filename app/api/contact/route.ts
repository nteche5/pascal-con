import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'
import { saveContactMessage } from '@/lib/contact-messages'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Try to save message to Supabase, but don't fail if it errors
    let storedMessage = null
    try {
      storedMessage = await saveContactMessage({
        name,
        email,
        phone: phone || null,
        subject,
        message,
      })
    } catch (dbError) {
      console.error('Error saving to database (continuing anyway):', dbError)
      // Continue with email sending even if database save fails
    }

    // Validate Gmail credentials
    const gmailUser = process.env.GMAIL_USER || 'pascalproperties4@gmail.com'
    const gmailPassword = process.env.GMAIL_APP_PASSWORD

    console.log('Email configuration check:', {
      gmailUser,
      hasPassword: !!gmailPassword,
      passwordLength: gmailPassword?.length || 0,
      timestamp: new Date().toISOString()
    })

    if (!gmailPassword) {
      console.error('GMAIL_APP_PASSWORD is not set in environment variables')
      // Still try to save to database even if email fails
      return NextResponse.json({
        success: storedMessage ? true : false,
        message: storedMessage 
          ? 'Your message has been received, but email notification failed. Please check environment variables.'
          : 'Failed to send message. Gmail credentials are not configured.',
        data: storedMessage,
      }, { status: storedMessage ? 200 : 500 })
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    })

    // Email content
    const mailOptions = {
      from: gmailUser,
      to: 'pascalproperties4@gmail.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4A9982; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #01030A; }
              .value { margin-top: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${phone}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    }

    // Send email
    let emailSent = false
    let emailError = null
    console.log('Attempting to send email...', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      timestamp: new Date().toISOString()
    })
    
    try {
      const emailResult = await transporter.sendMail(mailOptions)
      emailSent = true
      console.log('✅ Email sent successfully!', {
        messageId: emailResult.messageId,
        accepted: emailResult.accepted,
        rejected: emailResult.rejected,
        response: emailResult.response
      })
    } catch (err) {
      emailError = err
      console.error('❌ ERROR sending email:', {
        error: err instanceof Error ? err.message : String(err),
        errorName: err instanceof Error ? err.name : 'Unknown',
        code: (err as any)?.code,
        response: (err as any)?.response,
        responseCode: (err as any)?.responseCode,
        command: (err as any)?.command,
        stack: err instanceof Error ? err.stack : undefined
      })
      // Still return success if message was saved
    }

    // Return response based on whether email was sent
    const responseMessage = emailSent 
      ? 'Your message has been sent successfully!'
      : storedMessage 
        ? 'Your message has been received and saved. However, email notification failed. Please contact us directly.'
        : 'Failed to send message. Please try again later.'
    
    return NextResponse.json({
      success: storedMessage ? true : false,
      message: responseMessage,
      emailSent,
      data: storedMessage,
      ...(process.env.NODE_ENV === 'development' && emailError ? { 
        debug: { 
          emailError: emailError instanceof Error ? emailError.message : String(emailError) 
        } 
      } : {})
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

