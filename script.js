class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // Methods
    // An operand is just number that's currently being computed upon
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.previousOperandTextElement.innerText = '' 
        this.updateDisplay()
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.indexOf('.') != -1) {
            return
        } else {
            this.currentOperand = this.currentOperand + number.toString() //V.G
        }
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        //compute first if we already have a previousOperand
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    compute() {
        let computation
       let prev = parseFloat(this.previousOperand)
       let current = parseFloat(this.currentOperand)

       if (isNaN(prev) || isNaN(current)) return
       switch (this.operation) {
        case "+":
            computation = prev + current
            break;
        case "-":
            computation = prev - current
            break;
        case "/":
            computation = prev / current
            break;
        case "*":
            computation = prev * current
            break;  
        default:
            return
       } 
    
       this.currentOperand = computation
       this.operation = undefined
       this.previousOperand = ''
    }

    updateDisplay() {
        
        this.currentOperandTextElement.innerText = this.currentOperand
        if (this.operation != undefined) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear')
const previousOperandTextElement = document.querySelector('[data-previous-operand')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


deleteButton.addEventListener('click', () => { 
    calculator.delete()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})


operationButtons.forEach( button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()

})