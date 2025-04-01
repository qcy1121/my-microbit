let 距离 = 0
let 有人 = 0
let 暗度 = 0
let 黑天 = 0
// 触摸P2播放音乐
basic.forever(function () {
    if (input.pinIsPressed(TouchPin.P2)) {
        music.play(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
    }
})
// 光线控制P16引脚
basic.forever(function () {
    暗度 = pins.analogReadPin(AnalogPin.P1)
    if (暗度 >= 700) {
        黑天 = 1
    } else {
        黑天 = 0
    }
    pins.digitalWritePin(DigitalPin.P16, 黑天)
})
// 人体检测与超声波测距
basic.forever(function () {
    有人 = pins.digitalReadPin(DigitalPin.P14)
    basic.showNumber(有人)
    if (有人 == 1) {
        距离 = sonar.ping(
        DigitalPin.P11,
        DigitalPin.P12,
        PingUnit.Centimeters
        )
        if (距离 > 0 && 距离 < 20) {
            music.play(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.UntilDone)
        }
        // 避免频繁触发
        basic.pause(500)
    }
})
