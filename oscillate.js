let Xmax = 23
let Ymax = 23
let img = {}
let chr = ['░', '▒', '▓', '█', '▓', '▒']
shiftUp = '\u001b[' + Xmax + 'A'
colorYellow = '\u001b[33m'
colorRed = '\u001b[31m'
colorGreen = '\u001b[32m'
colorBlue = '\u001b[34m'
colorMagenta = '\u001b[35m'
colorCyan = '\u001b[36m'
colorReset = '\u001b[39m'
colors = [colorMagenta, colorBlue, colorCyan, colorGreen, colorYellow, colorRed, colorReset]
function calculate(x, y) {
    return Math.sin(x) * Math.sin(y)
}

function calculate(x, y, d) {
    return d * (Math.sin(x) * Math.sin(y))
}

function msleep(n) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

c = 0
for (d = 0; d > -1; d++) {
    for (x = 0; x < Xmax; x++) {
        img[x] = new Array(Ymax);
        for (y = 0; y < Ymax; y++) {
            img[x][y] = calculate(x, y, Math.sin(d/10));
        }
    }
    prev = Math.abs(Math.sin(((d - 1)/10)))
    next = Math.abs(Math.sin(((d + 1)/10)))
    curr = Math.abs(Math.sin(d/10))
    if ((curr > prev) && (curr > next)) {
        c++
    }
    frame = ""
    // process.stdout.write(colors[a % colors.length])
    for (x = 0; x < Xmax; x++) {
        for (y = 0; y < Ymax; y++) {
            frame = frame + colors[Math.round(img[x][y] * 3) + 3] + chr[c % chr.length]
            // process.stdout.write(chr[a%chr.length])
        }
        // process.stdout.write('\n')
        frame = frame + '\n'
    }
    process.stdout.write(frame)
    // if (a < chr.length - 1) {
    console.log("D: " + d + " -- " + prev + "," + curr + "," + next + "\u001b[1A")
    msleep(100)
    process.stdout.write(shiftUp)
    // }
    process.stdout.write(colorReset)
}
// for (a = 0; a > -1; a++) {
//     frame = colors[a % colors.length]
//     // process.stdout.write(colors[a % colors.length])
//     for (x = 0; x < Xmax; x++) {
//         for (y = 0; y < Ymax; y++) {
//             frame = frame+chr[a%chr.length]
//             // process.stdout.write(chr[a%chr.length])
//         }
//         // process.stdout.write('\n')
//         frame=frame+'\n'
//     }
//     process.stdout.write(frame)
//     // if (a < chr.length - 1) {
//         process.stdout.write(shiftUp)
//     // }
// }
// process.stdout.write(colorReset)