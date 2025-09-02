import { EvenNumbersPipe } from './even-numbers.pipe';

describe('EvenNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new EvenNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
