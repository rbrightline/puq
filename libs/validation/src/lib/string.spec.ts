describe('StringValidation', () => {
  it.each`
    value | options | errors
    ${{}} | ${{}}   | ${[]}
  `(
    'should validate $value with $options and throw $errors',
    ({ value, options, errors }) => {
      // Test
    }
  );
});
