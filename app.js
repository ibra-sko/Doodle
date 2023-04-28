document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.grid')
    const kakashi = document.createElement('div')
    let speed = 3
    let kakashiLeftSpace = 50
    let startPoint = 150
    let kakashiBottomSpace = startPoint
    const gravity = 1.0
    let isGameOver = false
    let woodCount = 5
    let woods = []
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0


    class Plateforme {
        constructor(newWoodBottom) {
            this.bottom = newWoodBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('wood')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)

        }
    }

    function createwoods() {
        for (let i = 0; i < woodCount; i++) {
            let woodGap = 600 / woodCount
            let newWoodBottom = 100 + i * woodGap
            let newWood = new Plateforme(newWoodBottom)
            woods.push(newWood)
            console.log(woods)
        }
    }

    function movewoods() {
        if (kakashiBottomSpace > 200) {
            woods.forEach(wood => {
                wood.bottom -= 4
                let visual = wood.visual
                visual.style.bottom = wood.bottom + 'px'

                if (wood.bottom < 10) {
                    let firstWood = woods[0].visual
                    firstWood.classList = plateforme[0].visual
                    woods.shift()
                    console.log(woods)
                    score++
                    var newWood = new Plateforme(600)
                    woods.push(newWood)
                }
            })
        }
    }

    function createkakashi() {
        grid.appendChild(kakashi)
        kakashi.classList.add("kakashi")
        kakashiLeftSpace = woods[0].left
        kakashi.style.left = kakashiLeftSpace + 'px'
        kakashi.style.bottom = kakashiBottomSpace + 'px'
        setInterval(movewoods, 30)
    }

    function fall() {
        isJumping = false
        clearInterval(upTimerId)
        downTimerId = setInterval(function () {
            kakashiBottomSpace -= 5
            kakashi.style.bottom = kakashiBottomSpace + 'px'
            kakashiBottomSpace *= gravity
            if (kakashiBottomSpace <= 0) {
                gameOver()
            }
            woods.forEach(wood => {
                if (
                    (kakashiBottomSpace >= wood.bottom) &&
                    (kakashiBottomSpace <= wood.bottom + 15) &&
                    ((kakashiLeftSpace + 60) >= wood.left) &&
                    (kakashiLeftSpace <= (wood.left + 85)) &&
                    !isJumping
                ) {
                    console.log('tick')
                    startPoint = kakashiBottomSpace
                    jump()
                    console.log('start', startPoint)
                    isJumping = true
                }
            })
        }, 20)
    }



    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
            console.log(startPoint)
            console.log('1', kakashiBottomSpace)
            kakashiBottomSpace += 20
            kakashi.style.bottom = kakashiBottomSpace + 'px'
            console.log('2', kakashiBottomSpace)
            console.log('s', startPoint)
            if (kakashiBottomSpace > startPoint + 200) {
                fall()
                isJumping = false
            }
        }, 30)
    }



    function controle(e) {
        kakashi.style.bottom = kakashiBottomSpace + 'px'
        if (e.key === "ArrowLeft") {
            moveLeft()
        } else if (e.key === "ArrowRight") {
            moveRight()
        } else if (e.key === "ArrowUp") {
            moveStaight()
        }
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            if (kakashiLeftSpace >= 0) {
                console.log('going left')
                kakashiLeftSpace -= 5
                kakashi.style.left = kakashiLeftSpace + 'px'
            } else moveRight()
        }, 20)


    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function () {
            if (kakashiLeftSpace <= 313) {
                console.log('going right')
                kakashiLeftSpace += 5
                kakashi.style.left = kakashiLeftSpace + 'px'
            } else moveLeft()
        }, 20)

    }

    function moveStaight() {
        isGoingLeft = false
        isGoingRight = false
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function gameOver() {

        isGameOver = true
        while (grid.firstChild) {
            console.log('remove')
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function start() {
        if (!isGameOver) {
            createwoods()
            createkakashi()
            setInterval(movewoods,30)
            jump(startPoint)
            document.addEventListener('keyup', controle)
        }
    }
    start()

})
