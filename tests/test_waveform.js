/*
QUnit.test( "a basic test example", function( assert ) {
  var value = "hello";
  assert.equal( value, "hello", "We expect value to be hello" );
});
*/

// waveforms.sine
QUnit.test( "waveforms.sine should always return a number", function( assert ) {
  var sample = sine(0, 0, 0, step0, 0);
  assert.ok(sample != NaN, "This should be a number")
});
QUnit.test( "waveforms.sine should return zero on step0 start", function( assert ) {
  var sample = sine(0, 0, 0, step0, 0);
  assert.equal(sample, 0, "This should be zero")
});

// waveforms.square
QUnit.test( "waveforms.square should always return a number", function( assert ) {
  var sample = square(0, 0, 0, step0, 0);
  assert.ok(sample != NaN, "This should be a number")
});
QUnit.test( "waveforms.square should return zero on step0 start", function( assert ) {
  var sample = square(0, 0, 0, step0, 0);
  assert.equal(sample, 0, "This should be zero")
});

// waveforms.triangle
QUnit.test( "waveforms.triangle should always return a number", function( assert ) {
  var sample = triangle(0, 0, 0, step0, 0);
  assert.ok(sample != NaN, "This should be a number")
});
QUnit.test( "waveforms.triangle should return zero on step0 start", function( assert ) {
  var sample = triangle(0, 0, 0, step0, 0);
  assert.equal(sample, 0, "This should be zero")
});

// waveforms.sawtooth
QUnit.test( "waveforms.sawtooth should always return a number", function( assert ) {
  var sample = sawtooth(0, 0, 0, step0, 0);
  assert.ok(sample != NaN, "This should be a number")
});
QUnit.test( "waveforms.sawtooth should return zero on step0 start", function( assert ) {
  var sample = sawtooth(0, 0, 0, step0, 0);
  assert.equal(sample, 0, "This should be zero")
});

// waveforms.noise
QUnit.test( "waveforms.noise should always return a number", function( assert ) {
  var sample = noise(0, 0, 0, step0, 0);
  assert.ok(sample != NaN, "This should be a number")
});
