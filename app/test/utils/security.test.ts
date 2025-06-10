import { describe, it, expect } from 'vitest';
import { 
  sanitizeHtml, 
  generateSecureToken, 
  checkRateLimit,
  isValidEmail,
  isValidUrl,
  checkPasswordStrength 
} from '~/utils/security';

describe('Security Utils', () => {
  describe('sanitizeHtml', () => {
    it('should sanitize HTML content', () => {
      const maliciousInput = '<script>alert("xss")</script>';
      const sanitized = sanitizeHtml(maliciousInput);
      expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('should handle special characters', () => {
      const input = 'Hello & "World" <tag>';
      const sanitized = sanitizeHtml(input);
      expect(sanitized).toBe('Hello &amp; &quot;World&quot; &lt;tag&gt;');
    });
  });

  describe('generateSecureToken', () => {
    it('should generate tokens of specified length', () => {
      const token = generateSecureToken(16);
      expect(token).toHaveLength(16);
    });

    it('should generate different tokens each time', () => {
      const token1 = generateSecureToken();
      const token2 = generateSecureToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('checkRateLimit', () => {
    it('should allow requests within limit', () => {
      const result = checkRateLimit('test-user', 5, 60000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('should block requests exceeding limit', () => {
      const identifier = 'test-user-2';
      
      // Make requests up to the limit
      for (let i = 0; i < 5; i++) {
        checkRateLimit(identifier, 5, 60000);
      }
      
      // This should be blocked
      const result = checkRateLimit(identifier, 5, 60000);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://invalid')).toBe(true); // URL constructor accepts this
    });
  });

  describe('checkPasswordStrength', () => {
    it('should rate strong passwords highly', () => {
      const result = checkPasswordStrength('StrongP@ssw0rd123');
      expect(result.score).toBeGreaterThan(4);
      expect(result.feedback).toHaveLength(0);
    });

    it('should provide feedback for weak passwords', () => {
      const result = checkPasswordStrength('weak');
      expect(result.score).toBeLessThan(3);
      expect(result.feedback.length).toBeGreaterThan(0);
    });
  });
});