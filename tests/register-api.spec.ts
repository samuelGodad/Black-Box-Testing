import { test, expect, request } from '@playwright/test';

const baseURL = 'https://reqres.in/api';

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': 'reqres-free-v1'
};

const testCases = [
  {
    id: 'TC01',
    payload: { email: 'eve.holt@reqres.in', password: 'pistol' },
    expectedStatus: 200,
    description: 'Valid email and password'
  },
  {
    id: 'TC02',
    payload: { email: 'eve.holt@reqres.in' },
    expectedStatus: 400,
    description: 'Missing password'
  },
  {
    id: 'TC03',
    payload: { password: 'pistol' },
    expectedStatus: 400,
    description: 'Missing email'
  },
  {
    id: 'TC04',
    payload: { email: 'invalidemail.com', password: 'pistol' },
    expectedStatus: 400,
    description: 'Invalid email format'
  },
  {
    id: 'TC05',
    payload: {},
    expectedStatus: 400,
    description: 'Missing both email and password'
  }
];

test.describe('Equivalence Partitioning - Reqres Registration', () => {
  for (const tc of testCases) {
    test(`${tc.id} - ${tc.description}`, async ({ request }) => {
      const response = await request.post(`${baseURL}/register`, {
        headers,
        data: tc.payload
      });
      expect(response.status()).toBe(tc.expectedStatus);
    });
  }
});
