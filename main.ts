namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function _5wire () {
    BlackCount = 0
    YellowCount = 0
    RedCount = 0
    for (let value of WireList) {
        if (value == 0) {
            RedCount += 1
        } else if (value == 2) {
            BlackCount += 1
        } else if (value == 3) {
            YellowCount += 1
        }
    }
    if (WireList[4] == 4 && SerialNumber % 2 == 1) {
        game.splash("Cut the 4th wire")
    } else if (RedCount == 1 && YellowCount == 1) {
        game.splash("Cut the 1st wire")
    } else if (BlackCount == 0) {
        game.splash("Cut the 2nd wire")
    } else {
        game.splash("Cut the 1st wire")
    }
}
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        _3wire()
    }
    if (wireCount == 4) {
        _4wire()
    } else if (wireCount == 5) {
        _5wire()
    } else if (wireCount == 6) {
        _6wire()
    }
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function InitCursor () {
    mySprite = img`
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        ................................................................................................................................................................
        `
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function InitColours () {
    colourList = [
    2,
    1,
    8,
    5,
    15
    ]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index = 0; index <= wireCount - 1; index++) {
        WireList.push(0)
        mySprite = img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `
        mySprite.fill(colourList[WireList[index]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index + 1)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function _4wire () {
    BlueCount = 0
    YellowCount = 0
    RedCount = 0
    for (let value of WireList) {
        if (value == 0) {
            RedCount += 1
        } else if (value == 2) {
            BlueCount += 1
        } else if (value == 3) {
            YellowCount += 1
        }
    }
    if (RedCount > 1 && SerialNumber % 2 == 1) {
        if (WireList[3] == 0) {
            game.splash("Cut the last wire")
        } else if (WireList[2] == 0) {
            game.splash("Cut Wire 3")
        } else {
            game.splash("Cut Wire 2")
        }
    } else if (WireList[3] == 3 && RedCount == 0) {
        game.splash("Cut the 1st wire")
    } else if (BlueCount == 1) {
        game.splash("Cut the 1st wire")
    } else if (YellowCount == 0) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the 2nd wire")
    }
}
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function _6wire () {
    WhiteCount = 0
    YellowCount = 0
    RedCount = 0
    for (let value of WireList) {
        if (value == 0) {
            RedCount += 1
        } else if (value == 2) {
            WhiteCount += 1
        } else if (value == 3) {
            YellowCount += 1
        }
    }
    if (YellowCount == 0 && SerialNumber % 2 == 1) {
        game.splash("Cut the 3rd wire")
    } else if (YellowCount == 1 && WhiteCount == 1) {
        game.splash("Cut the 4th wire")
    } else if (RedCount == 0) {
        game.splash("Cut the last wire")
    } else {
        game.splash("Cut the 4th wire")
    }
}
function _3wire () {
    RedCount = 0
    BlueCount = 0
    for (let value of WireList) {
        if (value == 0) {
            RedCount += 1
        } else if (value == 1) {
            BlueCount += 1
        }
    }
    if (RedCount == 0) {
        game.splash("Cut the 2nd wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut the last wire")
    } else if (BlueCount == 1) {
        if (WireList[2] == 2) {
            game.splash("Cut the 3rd wire ")
        } else if (WireList[1] == 2) {
            game.splash("Cut the 2nd wire")
        }
    } else {
        game.splash("Cut the last wire")
    }
}
let WhiteCount = 0
let BlueCount = 0
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let SerialNumber = 0
let WireList: number[] = []
let RedCount = 0
let YellowCount = 0
let BlackCount = 0
let Ratio = 0
let cursor: Sprite = null
let cursorPos = 0
let wireCount = 0
wireCount = 0
enum phase {start, wire, solve}
let state:phase=phase.start
startPhase()
if (wireCount > 3) {
    InitSerial()
}
state += 1
scene.setBackgroundColor(1)
InitWirePhase()
