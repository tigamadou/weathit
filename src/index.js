require('bulma')
import './assets/styles/style.sass';
import APP from './App'
const OPENWEATHERAPIKEY = '25e20d8a63f5eb97b505f3e11f9d38b2';
const IPINFOAPIKEY='ac80e2fd7ebd42';



const app = new APP(OPENWEATHERAPIKEY,IPINFOAPIKEY);
app.init()

document.querySelector('form').addEventListener('submit',(event)=>{
    event.preventDefault()
    app.submit()
})