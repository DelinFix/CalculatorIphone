
let a = ''
let b = ''
let sign = ''
let finish = false

const out = document.querySelector('.calc-screen p')

function clearAll() {
    a = ''
    b = ''
    sign = ''
    finish = false
    out.textContent = 0
}

document.querySelectorAll('.btn').forEach(button =>{
    button.addEventListener('click', ()=>{
        const key = button.innerHTML

        //'Clear All' to clicked
        if(button.innerHTML === 'AC') clearAll()

        //Is the number or '.' pressed
        if(/\d|\./.test(key)){
            //Don't add many zeros
            if(out.textContent == 0 && key === '0') return
            //Don't add many dots
            else if((/\.$/.test(a) || /\.$/.test(b)) && key === '.') return
            //Add first number to a
            else if(b === '' && sign === ''){
                a += key
                out.textContent = a
            }
            //Add new number to b on a new repetition
            else if(a!=='' && b!=='' && finish){
                b = key
                finish = false
                out.textContent = b
            }
            //Add second number to b
            else{
                b+=key
                out.textContent = b
            }
            return true
        }

        //'=' to clicked
        if(key === '='){
            //If b = '.' don't do anything
            if (b === '.') return
            //Assign b to a and do the previous operation
            if (b === '') b = a
            //Choosing an operation
            switch (sign) {
                case "+":
                    a = (+a) + (+b)
                    break
                case "-":
                    a = a - b
                    break
                case "X":
                    a = a * b
                    break
                case "/":
                    if(b === '0'){
                        out.textContent = 'Error'
                        setTimeout(()=>{
                            out.textContent = 0
                        }, 1000)
                        a = ''
                        b = ''
                        sign = ''
                        return
                    }
                    a = a / b
                    break
                case "%":
                    a = a % b
                    break
            }
            finish = true
            out.textContent = a
            return
        }

        //Is the sign pressed
        if(/\W|X/.test(key)){
            //If '+/-' is pressed, then I change the sign
            if(key === '+/-') {
                if (b === '') {
                    a = -a
                    out.textContent = a
                    return
                } else if (a === '') {
                    b = -b
                    out.textContent = b
                    return
                } else {
                    a = -a
                    out.textContent = a
                    return
                }
            }

            //Don't add a sign if there are no numbers
            if(a === '') return
            sign = key
            out.textContent = sign
            return true
        }
    })
})