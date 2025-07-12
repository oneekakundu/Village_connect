import { API_URL } from '../config/environment';

// API Configuration
const BASE_URL = API_URL;

// API Service class
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = BASE_URL;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Request failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || 'Request failed';
        } catch {
          errorMessage = errorText || 'Request failed';
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // User endpoints
  async getUserProfile(token: string) {
    return this.request('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateUserProfile(token: string, profileData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  }

  // Listing/Village endpoints
  async getVillages(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/listings${queryString}`);
  }

  async getVillageById(id: string) {
    return this.request(`/listings/${id}`);
  }

  async createVillageListing(token: string, listingData: any) {
    return this.request('/listings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(listingData),
    });
  }

  // Booking endpoints
  async createBooking(token: string, bookingData: any) {
    return this.request('/bookings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });
  }

  async getUserBookings(token: string) {
    return this.request('/bookings/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getHostBookings(token: string) {
    return this.request('/bookings/host', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // SMS endpoints
  async sendSMS(phoneNumber: string, message: string) {
    return this.request('/sms/send', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, message }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export the BASE_URL for use in other files
export { BASE_URL }; 