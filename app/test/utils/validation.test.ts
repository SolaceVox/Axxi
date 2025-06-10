import { describe, it, expect } from 'vitest';
import { 
  validateFormData, 
  emailSchema, 
  passwordSchema, 
  userRegistrationSchema 
} from '~/utils/validation';

describe('Validation Utils', () => {
  describe('emailSchema', () => {
    it('should validate correct email addresses', () => {
      expect(emailSchema.parse('test@example.com')).toBe('test@example.com');
      expect(emailSchema.parse('user.name+tag@domain.co.uk')).toBe('user.name+tag@domain.co.uk');
    });

    it('should reject invalid email addresses', () => {
      expect(() => emailSchema.parse('invalid-email')).toThrow();
      expect(() => emailSchema.parse('test@')).toThrow();
      expect(() => emailSchema.parse('@example.com')).toThrow();
    });
  });

  describe('passwordSchema', () => {
    it('should validate strong passwords', () => {
      const strongPassword = 'StrongP@ssw0rd';
      expect(passwordSchema.parse(strongPassword)).toBe(strongPassword);
    });

    it('should reject weak passwords', () => {
      expect(() => passwordSchema.parse('weak')).toThrow();
      expect(() => passwordSchema.parse('nouppercaseorspecial123')).toThrow();
      expect(() => passwordSchema.parse('NOLOWERCASEORSPECIAL123')).toThrow();
      expect(() => passwordSchema.parse('NoNumbersOrSpecial')).toThrow();
    });
  });

  describe('validateFormData', () => {
    it('should validate form data successfully', () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'john@example.com');
      formData.append('password', 'StrongP@ssw0rd');
      formData.append('confirmPassword', 'StrongP@ssw0rd');

      const result = validateFormData(userRegistrationSchema, formData);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongP@ssw0rd',
        confirmPassword: 'StrongP@ssw0rd',
      });
    });

    it('should return errors for invalid form data', () => {
      const formData = new FormData();
      formData.append('name', '');
      formData.append('email', 'invalid-email');
      formData.append('password', 'weak');
      formData.append('confirmPassword', 'different');

      const result = validateFormData(userRegistrationSchema, formData);
      
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(Object.keys(result.errors!)).toContain('name');
      expect(Object.keys(result.errors!)).toContain('email');
      expect(Object.keys(result.errors!)).toContain('password');
    });
  });
});