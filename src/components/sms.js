import axios from 'axios';

const BASE_URL = 'https://api.textbee.dev/api/v1';
const API_KEY = '0389b2d2-8b99-4be4-b4fd-440c554d4a22';
const DEVICE_ID = '680e336f60ed7610f718cfc6';

export const sendSMS = async (recipient, message) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/gateway/devices/${DEVICE_ID}/send-sms`,
      {
        recipients: Array.isArray(recipient) ? recipient : [recipient],
        message: message,
      },
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};