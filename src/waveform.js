/*!
 * 2099 Sweep Composer GUI
 * https://tr2099.github.io/
 * See LICENSE for copyright information.
 *
 */

function noise(t, delta, phase, step, phi0) {
    return Math.random() * (1 - (-1)) + (-1);
}

function sine(t, delta, phase, step, phi0) {
    phase = 2 *
        Math.PI * t * (step.start + (step.end - step.start) * delta / 2);
    return Math.sin(phase + phi0);
}

function triangle(t, delta, phase, step, phi0) {
    phase = 2 * Math.PI * t * (
        step.start + (step.end - step.start) * delta / 2);
    return (2 / Math.PI) * Math.asin(Math.sin(phase + phi0));
}

function sawtooth(t, delta, phase, step, phi0) {
    phase = 2 * Math.PI * t *
        (step.start + (step.end - step.start) * (delta / 2)) / 2;
    return (2 / Math.PI) * Math.atan(Math.tan(phase + phi0));
}

function square(t, delta, phase, step, phi0) {
    phase = 2 * Math.PI * t * (
        step.start + (step.end - step.start) * delta / 2);
    return Math.sign(Math.sin(phase + phi0));
}
