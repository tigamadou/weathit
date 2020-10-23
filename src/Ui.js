class UI{
    constructor(){
        this.form = document.querySelector('form');
        this.formButton = document.querySelector('form .button');
        this.formInput = document.querySelector('form .input');
        this.resultCard = document.querySelector('#result')
        this.loadingSpinner = document.querySelector('#loadingSpinner')
        this.errorBlock = document.querySelector('#errorBlock')
    }
    sayHi(){
        console.log('Hi from UI class')
    }

    toggleLoading(isLoading){
        this.formButton.classList.toggle('is-loading')
        this.loadingSpinner.classList.toggle('is-hidden')
        this.formButton.toggleAttribute('disabled')
        this.formInput.toggleAttribute('disabled')
        if(!this.errorBlock.classList.contains('is-hidden')){this.toggleError()}

    }

    toggleError(){
        this.errorBlock.classList.toggle('is-hidden')
    }
    setInputValue(value){
        this.formInput.value = value
    }

    getInputValue(){
        return this.formInput.value
    }

    
}

export default UI