import UI from './Ui'
class App{
    
    constructor(OPENWEATHERAPIKEY,IPINFOAPIKEY){        
        this.OPENWEATHERAPIKEY = OPENWEATHERAPIKEY
        this.IPINFOAPIKEY = IPINFOAPIKEY
        this.isLoading = false;
        this.UI = new UI()
    }

    async init(){
        let that = this
        this.toggleLoading()
        await fetch('https://ipinfo.io/?token=ac80e2fd7ebd42', {mode: 'cors'})
                .then((response)=>{
                    return response.json();
                }).then(function(response) {
                    that.toggleLoading()
                    that.user = response                    
                    that.UI.setInputValue(that.user.city)
                    that.getWeather()
                  }).catch((error)=>{
                    console.log(error)
                    return false
                });
    }

    toggleLoading(){
        this.isLoading = !this.isLoading
        this.UI.toggleLoading(this.isLoading);
    }

    
    async getWeather(){
        this.toggleLoading()
        let that = this
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.user.city}&appid=${this.OPENWEATHERAPIKEY}`, {mode: 'cors'})
                .then((response)=>{
                    return response.json();
                })
                .then(function(response) {
                    that.toggleLoading()
                    that.parseResponse(response)     
                })
                .catch((error)=>{
                    console.log(error)
                    this.toggleError()
                    return false
                });
    }

    parseResponse(response){
        console.log(response)
        if(response.cod !== 200){this.toggleError()}
    }
    submit(){
        let value = this.UI.getInputValue();
        if(value.trim() ==='' && typeof value === 'undefined'){
            return false
        }
        this.user.city = value
        this.getWeather()
    }

    toggleError(error){
        this.UI.toggleError();
    }
}

export default App