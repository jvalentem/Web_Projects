//inputs de horas, minutos e segundos
const hoursInput = document.getElementById('hours')
const minutesInput = document.getElementById('minutes')
const secondsInput = document.getElementById('seconds')
//botões de inicializar contagem e parar contagem
const initializeButton = document.getElementById('initialize')
const abortButton = document.getElementById('abort')
const pause = document.getElementById('pause')
const tempstatus = document.getElementById('status')
let estaPausado = false

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
    pause.removeAttribute('disabled')
    abortButton.removeAttribute('disabled')
    inputSetActiveAll(false)
}
const restart = ()=>{
    const btSection = document.getElementById('buttonSection')
    btSection.style.flexDirection = 'row'
    inputSetActiveAll(true)
    pause.setAttribute('disabled','true')
    abortButton.setAttribute('disabled','true')
}
const unpauseFun = ()=>{
    pause.innerText = 'Pausar'
    estaPausado = false 
    tempstatus.innerText = ''
}
const pauseFun = ()=>{
    estaPausado = true
    pause.innerText = 'Retomar'
    tempstatus.innerText = 'Temporizador pausado'
}

const iniciarContagem = ()=>
{
    

    //o temporizador so se inicia se os valores corretos forem inseridos
    if(minutesInput.value <= 60 && minutesInput.value >= 0 && secondsInput.value <= 60 && secondsInput.value >= 0 && hoursInput.value >= 0){
        initialMethods() //metodos iniciais antes do temporizador começar (estão acima)
        console.log('contagem iniciada')
    
        const tick = setInterval(() => 
        {
            //esse event listener dentro da função faz com que o usuario so possa clicar no botao de pause caso o temporizador ja tenha sido iniciado
            pause.addEventListener('click',
            ()=>
            {
            console.log('pausado/despausado')
            return estaPausado? unpauseFun() : pauseFun()
            })
                
            if(!estaPausado){ //
                if(hoursInput.value == 0 && minutesInput.value == 0 && secondsInput.value == 0)
            {
                //se todos os contadores chegarem a 0 o timer para
                stop()
                warn()
            }
            else
            {

                secondsInput.value--        
                
                //se os segundos chegarem a 0 e ainda tiver minutos
                if(secondsInput.value < 0 && minutesInput.value > 0)
                {
                    //diminuir os minutos e redefinir os segundos
                    minutesInput.value--
                    secondsInput.value = 59
                }
                //se os minutos e segundos chegarem a 0 e as horas restantes forem maiores que 0
                if(secondsInput.value < 0 && minutesInput.value <= 0 && hoursInput.value > 0)
                {
                    //redefina os minutos e segundos e diminua as horas
                    minutesInput.value = 59
                    secondsInput.value = 59
                    hoursInput.value--
                }
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
    unpauseFun()
}
initializeButton.addEventListener('click',iniciarContagem)

abortButton.addEventListener('click',abortarContagem)
