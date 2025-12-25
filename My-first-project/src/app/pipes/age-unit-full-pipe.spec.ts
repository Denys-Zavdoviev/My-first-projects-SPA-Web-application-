import { AgeUnitFullPipe } from './age-unit-full-pipe';
import { ageType } from '../shared/models/beasts.model';

fdescribe('AgeUnitFullPipe', () => {
  let pipe: AgeUnitFullPipe;

  beforeEach(() => {
    pipe = new AgeUnitFullPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform Years correctly', () => {
    expect(pipe.transform(ageType.Years, 1)).toBe('рік');
    expect(pipe.transform(ageType.Years, 2)).toBe('роки');
    expect(pipe.transform(ageType.Years, 5)).toBe('років');
    expect(pipe.transform(ageType.Years, 11)).toBe('років');
    expect(pipe.transform(ageType.Years, 21)).toBe('рік');
  });

  it('should transform Months correctly', () => {
    expect(pipe.transform(ageType.Months, 1)).toBe('місяць');
    expect(pipe.transform(ageType.Months, 3)).toBe('місяці');
    expect(pipe.transform(ageType.Months, 10)).toBe('місяців');
    expect(pipe.transform(ageType.Months, 14)).toBe('місяців');
  });

  it('should transform Days correctly', () => {
    expect(pipe.transform(ageType.Days, 1)).toBe('день');
    expect(pipe.transform(ageType.Days, 4)).toBe('дні');
    expect(pipe.transform(ageType.Days, 20)).toBe('днів');
    expect(pipe.transform(ageType.Days, 0)).toBe('днів');
  });

  it('should return empty string for unknown types', () => {
    expect(pipe.transform('unknown' as any, 5)).toBe('');
  });
});
