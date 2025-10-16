# Compliers Bot - Interactive Chat Widget

## Overview
The Compliers Bot is a responsive, floating chatbot widget that provides an interactive way for users to engage with The Compliers' services. It features a conversational interface that guides users through pre-defined prompt chains and collects contact information.

## Features

### 1. Floating Widget
- **Minimized State**: Displays as an oval water-bubble blue button in the bottom-right corner
- **Maximized State**: Opens into a full chat interface with smooth animations
- **Pulsing Animation**: The floating button has a subtle pulse animation to attract attention

### 2. Conversation Flow
The bot implements a structured conversation flow:

1. **Initial Greeting**: On opening, the input is pre-filled with "Hey Compliers!"
2. **Welcome Response**: Bot replies "Hi, how can I help you this time?"
3. **Category Selection**: User chooses from four options:
   - Trademark Assistance
   - Contract Support
   - Data Privacy Compliance
   - Other Query
4. **Information Collection**: Bot collects:
   - Name
   - Email
   - Phone number
5. **Final Action**: User chooses one of three options:
   - **Connect Now on WhatsApp**: Opens WhatsApp with pre-filled context message
   - **Get a Response from The Compliers**: Shows "We will get back within 90 minutes"
   - **Exit this Conversation**: Shows exit message with contact email

### 3. Email Integration
- Uses EmailJS to send conversation data to the site owner
- Captures all user selections and contact information
- Failed email sends are handled gracefully without disrupting UX

### 4. Responsive Design
- **Desktop**: Fixed width chat window (380px) in bottom-right corner
- **Mobile**: Full-screen chat interface for better usability
- **Tablet**: Optimized dimensions for mid-sized screens

### 5. Accessibility Features
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management for smooth interaction
- Reduced motion support for accessibility preferences

### 6. UX Enhancements
- Smooth transitions and animations
- Auto-scroll to latest messages
- Auto-focus on input field
- Disabled send button when input is empty
- Message bubbles with different styles for bot and user

## Configuration

### Environment Variables
Add these to your `.env.local` file:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# WhatsApp Number (format: country code + number, no + or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=919540101740
```

### EmailJS Setup
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{to_email}}`
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{category}}`
   - `{{message}}`
4. Copy your Service ID, Template ID, and Public Key to the environment variables

## File Structure

```
components/
  └── CompliersBot.tsx          # Main chatbot component
styles/
  └── compliers-bot.css          # Chatbot styling
```

## Integration

The chatbot is automatically integrated into both layout files:
- `components/Layout.tsx` (for pages router)
- `app/layout.tsx` (for app router)

No additional setup is required - the bot appears on all pages.

## Styling

The chatbot uses the site's color scheme:
- Primary Blue: `#0077cc`
- Dark Blue: `#0b3a7a`
- Gradient: `linear-gradient(135deg, #0077cc 0%, #0b3a7a 100%)`

The design includes:
- Rounded corners for a modern look
- Box shadows for depth
- Smooth transitions for all interactions
- Mobile-first responsive design

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Future Enhancements

Potential improvements for future versions:
- Multi-language support
- Chat history persistence
- AI-powered responses
- File upload capability
- Real-time chat with support team
- Analytics integration

## Troubleshooting

### EmailJS not sending emails
- Check that all environment variables are set correctly
- Verify your EmailJS service is active
- Check browser console for specific error messages
- Ensure your EmailJS template has the correct variable names

### WhatsApp link not working
- Verify the `NEXT_PUBLIC_WHATSAPP_NUMBER` is in the correct format
- Test the generated WhatsApp URL in browser console

### Bot not appearing
- Check browser console for JavaScript errors
- Verify the component is imported in Layout files
- Clear browser cache and rebuild the project

## License

This component is part of The Compliers project and follows the same license.
