import { GradeFormatterPipe } from './grade-formatter.pipe';

describe('GradeFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new GradeFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
