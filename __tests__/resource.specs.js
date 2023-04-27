// TODO : real tests
function helloWorld() {
    return 'Hello World';
}

test('helloWorld function should return Hello World', () => {
    expect(helloWorld()).toBe('Hello World');
}
);