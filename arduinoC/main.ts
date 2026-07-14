enum PS4BUTTON {
    //% block="Cross (叉)"
    Cross,
    //% block="Triangle (三角)"
    Triangle,
    //% block="Circle (圓圈)"
    Circle,
    //% block="Square (方塊)"
    Square,
    //% block="Share (分享)"
    Share,
    //% block="Options (選項)"
    Options,
    //% block="UP (上)"
    Up,
    //% block="DOWN (下)"
    Down,
    //% block="LEFT (左)"
    Left,
    //% block="RIGHT (右)"
    Right,
    //% block="L1"
    L1,
    //% block="L2 (按鍵)"
    L2,
    //% block="L3 (左搖桿下壓)"
    L3,
    //% block="R1"
    R1,
    //% block="R2 (按鍵)"
    R2,
    //% block="R3 (右搖桿下壓)"
    R3,
    //% block="PS Button"
    PSButton,
    //% block="Touchpad (觸控板按下)"
    Touchpad
}

enum PS4ROCK {
    //% block="LX (左搖桿X軸)"
    LStickX,
    //% block="LY (左搖桿Y軸)"
    LStickY,
    //% block="RX (右搖桿X軸)"
    RStickX,
    //% block="RY (右搖桿Y軸)"
    RStickY,
    //% block="L2_Value (左扳機數值)"
    L2Value,
    //% block="R2_Value (右扳機數值)"
    R2Value
}

enum PS4SENSOR {
    //% block="Battery (電池電量)"
    Battery,
    //% block="GyrX (陀螺儀 X)"
    GyrX,
    //% block="GyrY (陀螺儀 Y)"
    GyrY,
    //% block="GyrZ (陀螺儀 Z)"
    GyrZ,
    //% block="AccX (加速度 X)"
    AccX,
    //% block="AccY (加速度 Y)"
    AccY,
    //% block="AccZ (加速度 Z)"
    AccZ
}

//% color="#003399" iconWidth=50 iconHeight=40
namespace ps4_controller {

    //% block="init PS4 handle and set handle Mac [MAC]" blockType="command"
    //% MAC.shadow="string" MAC.defl="1A:2B:3C:4D:5E:6F"
    export function initPS4SetMac(parameter: any, block: any) {
        let mac = parameter.MAC.code;
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        Generator.addSetup(`ps4.begin`, `PS4.begin(${mac});`);
    }

    //% block="is PS4 handle connected" blockType="boolean"
    export function isConnectedPS4(parameter: any, block: any) {
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        Generator.addCode(`PS4.isConnected()`);
    }
    
    //% block="get PS4 button [BUTTON] value" blockType="boolean"
    //% BUTTON.shadow="dropdown" BUTTON.options="PS4BUTTON" BUTTON.defl="PS4BUTTON.Cross"
    export function getPS4ButtonValue(parameter: any, block: any) {
        let button = parameter.BUTTON.code;
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        // 動態生成如 PS4.Cross() 的呼叫
        Generator.addCode(`PS4.${button}()`);
    }
    
    //% block="get PS4 joystick [ROCK] value" blockType="reporter"
    //% ROCK.shadow="dropdown" ROCK.options="PS4ROCK" ROCK.defl="PS4ROCK.LStickX"
    export function getPS4RockValue(parameter: any, block: any) {
        let rock = parameter.ROCK.code;
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        // 動態生成如 PS4.LStickX() 的呼叫
        Generator.addCode(`PS4.${rock}()`);
    }

    //% block="get PS4 sensor [SENSOR] value" blockType="reporter"
    //% SENSOR.shadow="dropdown" SENSOR.options="PS4SENSOR" SENSOR.defl="PS4SENSOR.Battery"
    export function getPS4SensorValue(parameter: any, block: any) {
        let sensor = parameter.SENSOR.code;
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        // 動態生成如 PS4.Battery() 或 PS4.GyrX() 的呼叫
        Generator.addCode(`PS4.${sensor}()`);
    }

// --- 以下為新增的控制輸出積木 ---

    //% block="set PS4 handle LED color R [R] G [G] B [B]" blockType="command"
    //% R.shadow="range" R.params.min=0 R.params.max=255 R.defl=255
    //% G.shadow="range" G.params.min=0 G.params.max=255 G.defl=0
    //% B.shadow="range" B.params.min=0 B.params.max=255 B.defl=0
    export function setPS4Led(parameter: any, block: any) {
        let r = parameter.R.code;
        let g = parameter.G.code;
        let b = parameter.B.code;
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        Generator.addCode(`PS4.setLed(${r}, ${g}, ${b});`);
    }

    //% block="set PS4 handle LED flash rate on-time [ONTIME] off-time [OFFTIME]" blockType="command"
    //% ONTIME.shadow="range" ONTIME.params.min=0 ONTIME.params.max=255 ONTIME.defl=0
    //% OFFTIME.shadow="range" OFFTIME.params.min=0 OFFTIME.params.max=255 OFFTIME.defl=0
    export function setPS4FlashRate(parameter: any, block: any) {
        let onTime = parameter.ONTIME.code;
        let offTime = parameter.OFFTIME.code;
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        Generator.addCode(`PS4.setFlashRate(${onTime}, ${offTime});`);
    }

    //% block="set PS4 handle rumble weak [WEAK] strong [STRONG]" blockType="command"
    //% WEAK.shadow="range" WEAK.params.min=0 WEAK.params.max=255 WEAK.defl=0
    //% STRONG.shadow="range" STRONG.params.min=0 STRONG.params.max=255 STRONG.defl=0
    export function setPS4Rumble(parameter: any, block: any) {
        let weak = parameter.WEAK.code;
        let strong = parameter.STRONG.code;
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        Generator.addCode(`PS4.setRumble(${weak}, ${strong});`);
    }

    //% block="send settings to PS4 handle" blockType="command"
    export function sendToPS4Controller(parameter: any, block: any) {
        Generator.addInclude(`ps4Init`, `#include <PS4Controller.h>`);
        Generator.addCode(`PS4.sendToController();`);
    }
}
