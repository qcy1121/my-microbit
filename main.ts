let 距离 = 0
let 有人 = 0
let 黑天 = 0
let 暗度 = 0
pins.setPull(DigitalPin.P4, PinPullMode.PullUp)
basic.forever(function () {
    暗度 = pins.analogReadPin(AnalogReadWritePin.P3)
    if (暗度 >= 600) {
        黑天 = 1
    } else {
        黑天 = 0
    }
    有人 = pins.digitalReadPin(DigitalPin.P5)
    if (有人 == 1) {
        if (黑天 == 1) {
            pins.digitalWritePin(DigitalPin.P16, 1)
        } else {
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
        距离 = sonar.ping(
        DigitalPin.P11,
        DigitalPin.P12,
        PingUnit.Centimeters
        )
        if (距离 < 20) {
            music.play(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        }
    } else {
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
})
// 触摸P2播放音乐
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P4) == 0) {
        music.play(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
    }
})
