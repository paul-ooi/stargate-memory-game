var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var now = audioContext.currentTime;

// Reference https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth
function playTone(freq, time = null, delay = 0) {
    let masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    masterGainNode.gain.value = 0.6;

    let type = "triangle"; // sine | square | sawtooth | triangle

    let osc = audioContext.createOscillator();
    osc.connect(masterGainNode);
    osc.type = type;
    osc.frequency.value = freq;

    delay = delay * 1000;
    setTimeout(function() {
        osc.start();

        if (time != null) {
            let duration = time * 1000;
            setTimeout(function() {
                osc.stop();
            }, duration);
        }
    }, delay);

    return osc;
}

let note = {
    A1  : 27.5,
    A1s : 29.135235094880619,
    B1  : 30.867706328507756,
    C1  : 32.703195662574829,
    C1s : 34.647828872109012,
    D1  : 36.708095989675945,
    D1s : 38.890872965260113,
    E1  : 41.203444614108741,
    F1  : 43.653528929125485,
    F1s : 46.249302838954299,
    G1  : 48.999429497718661,
    G1s : 51.913087197493142,
    A2  : 55.0,
    C5  : 523.2511306011972,
    D5  : 587.3295358348151,
    E5  : 659.2551138257398,
    F5  : 698.4564628660078,
    G5  : 783.9908719634985,
    A5  : 880,
    B5  : 987.7666025122483,
    C6  : 1046.5022612023945
};

playTone(note.C5, 1, 0);
playTone(note.D5, 1, 1);
playTone(note.E5, 1, 2);
playTone(note.F5, 1, 3);
playTone(note.G5, 1, 4);
playTone(note.A5, 1, 5);
playTone(note.B5, 1, 6);
playTone(note.C6, 1, 7);
// playTone(880, 1, now + 2);
// playTone(980, 0.5, now + 1);
