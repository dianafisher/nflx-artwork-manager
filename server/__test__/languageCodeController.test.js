const languageCodeController = require('../languageCodeController');

test('en is English', () => {
  expect(languageCodeController.languageForCode('en')).toBe('English');
});

test('zh-Hans is Chinese Han (Simplified variant)', () => {
  expect(languageCodeController.languageForCode('zh-Hans'))
    .toBe('Chinese Han (Simplified variant)');
});

test('pt-BR is Portuguese Brazil', () => {
  expect(languageCodeController.languageForCode('pt-BR'))
    .toBe('Portuguese Brazil');
});

test('blank is Not Found', () => {
  expect(languageCodeController.languageForCode('')).toBe('Not Found');
});

test('en-XX is English', () => {
  expect(languageCodeController.languageForCode('en-XX')).toBe('English');
});

test('en-XXYY is English', () => {
  expect(languageCodeController.languageForCode('en-XXYY')).toBe('English');
});

test('xx-BR is Not Found', () => {
  expect(languageCodeController.languageForCode('xx-BR')).toBe('Not Found');
});

test('xx-Loma is Not Found', () => {
  expect(languageCodeController.languageForCode('xx-Loma')).toBe('Not Found');
});
