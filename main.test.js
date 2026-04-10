import { describe, it, expect } from 'vitest';
import { escapeHtml } from './utils.js';

describe('escapeHtml', () => {
  it('debería escapar caracteres HTML básicos', () => {
    expect(escapeHtml('<script>alert("XSS")</script>')).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
  });

  it('debería escapar ampersand', () => {
    expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('debería escapar comillas simples', () => {
    expect(escapeHtml("It's a test")).toBe('It&#039;s a test');
  });

  it('debería manejar texto sin caracteres especiales', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });

  it('debería escapar múltiples caracteres', () => {
    expect(escapeHtml('<a href="http://example.com?a=1&b=2">Link</a>')).toBe('&lt;a href=&quot;http://example.com?a=1&amp;b=2&quot;&gt;Link&lt;/a&gt;');
  });
});