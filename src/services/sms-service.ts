'use server';
/**
 * @fileOverview A service for sending SMS messages via Twilio.
 * 
 * - sendSms - A function that sends an SMS to a given phone number.
 */
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromPhoneNumber) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn("Twilio credentials are not set in .env file. SMS sending will be disabled.");
  } else {
    throw new Error("Twilio credentials are not set in .env file. Cannot send SMS.");
  }
}

const client = (accountSid && authToken) ? twilio(accountSid, authToken) : null;

/**
 * Sends an SMS message to a specified phone number.
 * @param to The recipient's phone number in E.164 format (e.g., +1234567890).
 * @param body The text of the message to send.
 * @returns A promise that resolves when the message is sent.
 */
export async function sendSms(to: string, body: string): Promise<void> {
  if (!client) {
    console.log(`SMS (simulated) to ${to}: ${body}`);
    return; // Silently fail if Twilio is not configured
  }
  
  try {
    const message = await client.messages.create({
      body,
      from: fromPhoneNumber,
      to,
    });
    console.log(`SMS sent successfully to ${to}. SID: ${message.sid}`);
  } catch (error) {
    console.error('Error sending SMS via Twilio:', error);
    // Re-throw the error to be handled by the caller
    throw new Error('Failed to send SMS.');
  }
}
