import { segments } from '../src/index.js';

describe('segments: should split the paths into segments', () => {
  beforeAll(async () => {
    // Setup
  });

  afterAll(async () => {
    // Teardonw
  });

  it('should split paths into segments', async () => {
    // Test
    expect(segments('some\\other//other')).toEqual(['some', 'other', 'other']);
    expect(segments('.\\other///other')).toEqual(['other', 'other']);
    expect(segments('.\\other//other')).toEqual(['other', 'other']);
    expect(segments('.\\other/other')).toEqual(['other', 'other']);
    expect(segments('.\\other/other')).toEqual(['other', 'other']);
    expect(segments('.\\other\\other')).toEqual(['other', 'other']);
  });
});
