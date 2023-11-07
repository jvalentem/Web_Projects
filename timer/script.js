//inputs de horas, minutos e segundos
const hoursInput = document.getElementById('hours')
const minutesInput = document.getElementById('minutes')
const secondsInput = document.getElementById('seconds')
//botões de inicializar contagem e parar contagem
const initializeButton = document.getElementById('initialize')
const abortButton = document.getElementById('abort')

//constantes = valores
//variaveis = valores q podem mudar durante a execução do codigo


//função que ativa/desativa todos os inputs
const inputSetActiveAll = (active)=>
{
    return active? 
    [hoursInput,minutesInput,secondsInput].forEach(input => input.removeAttribute('disabled')) 
    : 
    [hoursInput,minutesInput,secondsInput].forEach(input => input.setAttribute('disabled','true'))
}
const inputSetAllValuesTo = (value)=>{
    [hoursInput,minutesInput,secondsInput].forEach(input => input.value = value)
}
const initialMethods = ()=>{
    const btSection = document.getElementById('buttonSection')
    initializeButton.style.visibility = 'hidden'
    btSection.style.flexDirection = 'column'
    inputSetActiveAll(false)
}
const restart = ()=>{
    const btSection = document.getElementById('buttonSection')
    btSection.style.flexDirection = 'row'
    inputSetActiveAll(true)
}
const iniciarContagem = ()=>
{
    
    if(minutesInput.value <= 60 && minutesInput.value >= 0 && secondsInput.value <= 60 && secondsInput.value >= 0){
        initialMethods()
        console.log('contagem iniciada')
    //desativar inputs
    const tick = setInterval(() => 
    {

         if(hoursInput.value == 0 && minutesInput.value == 0 && secondsInput.value == 0)
         {
            //se todos os contadores chegarem a 0 o timer para
            stop()
            warn()
         }
        else
        {

            secondsInput.value--        

            if(secondsInput.value < 0 && minutesInput.value > 0)
            {
                minutesInput.value--
                secondsInput.value = 59
            }

            if(secondsInput.value < 0 && minutesInput.value <= 0 && hoursInput.value > 0)
            {
                minutesInput.value = 59
                secondsInput.value = 59
                hoursInput.value--
            }
        }
    }, 1000);
            
    
    const stop = ()=>
    {
        initializeButton.style.visibility = 'visible'
        clearInterval(tick)
        //reiniciar tudo
        restart()        
    }
    const warn = ()=>
    {
    window.alert('Contagem finalizada!')
    }
    }else{
        alert('Verifique os valores inseridos e tente novamente')
    }
    

   
}

const abortarContagem = ()=>{
    inputSetAllValuesTo(0)
    inputSetActiveAll(true)
}
initializeButton.addEventListener('click',iniciarContagem)

abortButton.addEventListener('click',abortarContagem)