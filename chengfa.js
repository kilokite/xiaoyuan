function doit() {
    boundsContains(0, 560, 1082, 787).findOne()
    let selector = boundsContains(0, 560, 1082, 787)
    let depth = 11
    if (!selector.depth(depth).find()[0]) {
        console.log("找不到")
        if (depth == 11) {
            depth = 10
        } else {
            depth = 11
        }
    }
    let question = boundsContains(0, 560, 1082, 787).depth(depth).find()[0]
    let questionText1 = question.children()[0].text()
    console.log("questionText1:", questionText1)
    if (questionText1.indexOf("=") == -1) {
        let children = question.children()
        let questionText2 = ""
        if (children.length == 3) {
            questionText2 = question.children()[2].text()
        } else {
            questionText2 = question.children()[1].text()
            let nums = questionText2.match(/\d+/g)
            console.log(nums[1] / nums[0])
            safeDraw(nums[1] / nums[0])
            return
        }
        if (questionText2.indexOf("=") != -1) {
            let num1 = questionText1.match(/\d+/g)[0]
            let num2 = questionText2.match(/\d+/g)[0]
            console.log(num2 / num1)
            safeDraw(num2 / num1)
        }
    } else {
        let questionText = questionText1.replace("×", "*").replace("=", "")
        let answer = eval(questionText)
        console.log(answer)
        safeDraw(answer)

    }
}
for (let i = 0; i < 330; i++) {
    try {
        doit()
    } catch (e) {
    }
}
function drawNumber(startX, startY, number) {
    const duration = 100; // 手势的时长，可以根据需要调整
    if (number == "1") {
        duration = 50
    }
    // 定义每个数字的绘制路径
    const paths = {
        0: [[0, 0], [0, -100], [50, -100], [50, 0], [0, 0]],
        1: [[0, -100], [0, 0]],
        2: [[0, -100], [50, -100], [50, -50], [0, -50], [0, 0], [50, 0]],
        3: [[0, -100], [50, -100], [50, -50], [0, -50], [50, -50], [50, 0], [0, 0]],
        4: [[0, -100], [0, -50], [50, -50], [25, -100], [25, 0]],
        5: [[50, -100], [0, -100], [0, -50], [50, -50], [50, 0], [0, 0]],
        6: [[50, -150], [0, -100], [0, 0], [50, 0], [50, -50], [0, -50]],
        7: [[0, -100], [50, -100], [50, 0]],
        8: [[0, 100], [40, 60], [-40, -60], [0, -100], [60, -60], [-60, 60], [0, 100]],
        9: [[50, 0], [50, -50], [0, -50], [0, -100], [50, -100], [50, -50]],
    };

    // 获取对应数字的路径
    const path = paths[number];

    if (!path) {
        console.error(`Unsupported number: ${number}`);
        return;
    }
    const gesturePath = path.map(point => {
        return [startX + point[0] * 3, startY + point[1] * 3];
    });

    gesture(duration, gesturePath);
}
let last = ""
function safeDraw(num) {
    // if(num == 0){
    //     return
    // }
    if (num.toString() == last) {
        sleep(100)
        return
    }
    last = num.toString()
    let nums = num.toString().split("")
    log(nums)
    drawNumber(200, 1538, nums[0])
    if (nums.length == 1) {
        return
    }
    sleep(20)
    drawNumber(800, 1538, nums[1])
}
