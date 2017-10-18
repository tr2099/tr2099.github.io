/*!
 * 2099 Sweep Composer GUI
 * https://tr2099.github.io/
 * See LICENSE for copyright information.
 *
 */

var sweeper = new TR2099();

function more_steps() {
    var uid = 'wave' + uuidv4();
    $("#sweep-steps").append('<li>' +
        '<label><input type="text" name="' + uid + '-start" class="form-control"></label> ' +
        '<label><input type="text" name="' + uid + '-end" class="form-control"></label> ' +
        '<label><input type="text" name="' + uid + '-time" class="form-control"></label>' +
        '<div>' +
            '<label><input type="radio" name="' + uid + '" value="sine" checked="checked"> Sine</label> ' +
            '<label><input type="radio" name="' + uid + '" value="triangle"> Triangle</label> ' +
            '<label><input type="radio" name="' + uid + '" value="sawtooth"> Sawtooth</label> ' +
            '<label><input type="radio" name="' + uid + '" value="square"> Square</label> ' +
            '<label><input type="radio" name="' + uid + '" value="noise"> Noise</label>' +
        '</div>' +
        '<span onclick="$(this.parentNode).remove();" class="remove-step">x</span>' + 
    '</li>');
    $('input[name="' + uid + '-start"]').focus();
}

function validate_step(step, node_name) {
    return ( parseFloat(step.find('input[name="' + node_name + '-start"]').val()) > 0 &&
        parseFloat(step.find('input[name="' + node_name + '-end"]').val()) > 0 &&
        parseFloat(step.find('input[name="' + node_name + '-time"]').val()) > 0);
}

function load_dataURI_in_player(DataURI) { 
    wave_spec.load(DataURI);
    wave_spec.on('ready', function () {
        $('#sample-caption').text(
            Number((wave_spec.getDuration()).toFixed(4)) + ' seconds'
        );
        document.querySelector('#volume').value = 1;
    });
}

function download_dataURI(DataURI) { 
    saveAs(dataURItoBlob(DataURI), 'tr2099.wav');
    load_dataURI_in_player(DataURI);
}

function get_samples(player) {
    var bitDepth = bit_depth();
    var sampleRate = sample_rate();
    var ditherValue = dither_value();
    var attack = attack_value();
    var release = release_value();
    var rectify = rectification_value();
    var lpf = lpf_value();
    var sum = sum_value();
    var decimate = decimate_value();
    var this_node_name = '';
    var sequence = [];
    $( "#sweep-steps li" ).each(function( index ) {
		this_node_name = $('input[type=radio]', this).get(0).name;
        if (validate_step($(this), this_node_name)) {
            sequence.push({
                'start': parseFloat($(this).find('input[name="' + this_node_name + '-start"]').val()),
                'end': parseFloat($(this).find('input[name="' + this_node_name + '-end"]').val()),
                'time': parseFloat($(this).find('input[name="' + this_node_name + '-time"]').val()),
                'waveform': $('input[name=' + this_node_name + ']:checked').val()
            });
		}
	});
	if (sequence.length) {
        var fx = {
            "dither": ditherValue,
            "rectify": rectify,
            "lpf": lpf,
            "decimate": decimate
        }
        var DataURI = sweeper.sequenceToDataURI(
            sequence, bitDepth, sampleRate, sum, attack, release, fx);
        if (player) {
            load_dataURI_in_player(DataURI);
        }else {
            download_dataURI(DataURI);
        }
	}else {
		alert('Check the fields. Use only numbers greater than zero.');
	}
}

function sample_rate() {
    return parseInt($('input[name=sample-rate]:checked').val());
}
function bit_depth() {
    return $('input[name=bit-depth]:checked').val();
}
function dither_value() {
    return parseInt($('#dither').val());
}
function attack_value() {
    return parseInt($('#attack').val()) / 5;
}
function release_value() {
    return parseInt($('#release').val()) / 5;
}
function rectification_value() {
    return parseInt($('input[name=rectifier]:checked').val());
}
function lpf_value() {
    if ($('#use-lpf').is(':checked')) {
        return parseInt($('#lpf-value').val());
    }
    return 0;
}
function sum_value() {
    return parseInt($('input[name=sequence-sum]:checked').val());
}
function decimate_value() {
    return parseInt($('input[name=bit-crush]:checked').val());
}
function update_lpf_display() {
    if ($('#use-lpf').is(':checked')) {
        $('#lpf-value').removeAttr('disabled');
        
    }else {
        $("#lpf-value").attr('disabled','disabled');
    }
}

function uuidv4() {
  // Source: https://stackoverflow.com/a/2117523
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// http://en.wikipedia.org/wiki/Data_URI_scheme
function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
    else
        byteString = decodeURI(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
}

var wave_spec = WaveSurfer.create({
    container: '#wave-spec',
    waveColor: 'fuchsia',
    progressColor: 'orchid',
    backend: 'MediaElement',
    height: '240'
});

var volumeInput = document.querySelector('#volume');
var onChangeVolume = function (e) {
  wave_spec.setVolume(e.target.value);
};
volumeInput.addEventListener('input', onChangeVolume);
volumeInput.addEventListener('change', onChangeVolume);

update_lpf_display();
