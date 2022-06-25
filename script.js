const lenght            = document.querySelector('.input-lenght')
const btn               = document.querySelector('.btn')
const generatedPassword = document.querySelector('.generated-password')
const label             = document.querySelectorAll('.label-chekbox')
const check             = document.querySelectorAll('.checkbox')
const complexityBar     = document.querySelector('.complexity-bar').children[0]
const copy              = document.querySelector('.copy')

const Lchar = document.querySelector('.lowerCase')
const Uchar = document.querySelector('.upperCase')
const Nchar = document.querySelector('.number')  
const Schar = document.querySelector('.special') 

const max = lenght.max = 30
const min = lenght.min = 12
const lenghtValue = lenght.value = min
const lenghtBtn = document.querySelector('.lenght-increment-button').childNodes


lenghtValue.onchange = () => {
    lenght.style.border = '1px solid #1c90f4'
    console.log('e');
}

function getLenght(inc, dec,) {
   inc.onmousedown = () => { if ( lenght.value < max ) lenght.value++ }
   dec.onmousedown = () => { if ( lenght.value > min ) lenght.value-- }
} getLenght(lenghtBtn[1],lenghtBtn[3])



function getPassword() {
    
    let chars    = ''
    let password = ''
    let passwordlLenght 

    let lowerCase = `abcdefghijklmnopqrstuvwxyz`
    let upperCase = lowerCase.toUpperCase()
    let num       = `1234567890`
    let special   = `/[!@#$%^&*()_+=[]{};:|,.<>/?]+`

    btn.onclick = () => {

        if ( Lchar.checked ) chars += lowerCase
        if ( Uchar.checked ) chars += upperCase
        if ( Nchar.checked ) chars += num
        if ( Schar.checked ) chars += special
        else generatedPassword.placeholder = 'Check a setting please'

        passwordlLenght = lenght.value
        for (let i = 0; i < passwordlLenght; i++) {
            let random = Math.floor(Math.random() * chars.length)
            password =  password + chars.substring(random, random + 1)
        }

        generatedPassword.value = password
        getPassword()
    }

} getPassword()



function toggle() {
    let setArray = [Lchar, Uchar, Nchar, Schar]
    let setColor = ['#ff4757', '#ff6348', '#ffa502', '#eccc68', '#1dd1a1']
    let setBar   = [1,5,45,55,65]
    let x        = setBar.length - 1

    complexityBar.style =  ` width :  ${setBar[x]}% ; background : ${setColor[x]}`

    for (let i = 0; i < setArray.length; i++) {

        // If checkbox is checked
        if ( setArray[i].hasAttribute('checked') ) setArray[i].parentElement.children[1].children[0].classList.add('checked') 
        // Toggle check
        setArray[i].onclick = () => {
            setArray[i].toggleAttribute('checked')
            setArray[i].parentElement.children[1].children[0].classList.toggle('checked') 
            complexity()
        }     

        function complexity() {
            let lenghtOnChange = parseInt(lenght.value)
            if ( setArray[i].checked == true ) {
                x++
                complexityBar.style =  ` width : ${setBar[x] + lenghtOnChange}% ; background : ${setColor[x]}`
            }
            else {
                x--
                complexityBar.style =  ` width : ${setBar[x] + lenghtOnChange}% ; background : ${setColor[x]}`
            }
        }
    }
    
} toggle()




function hashPassword() {
    let hash = document.querySelector('.hash')
    hash.onclick = () => {
        generatedPassword.classList.toggle('hashed')
        generatedPassword.type = 'password'
        if (  generatedPassword.classList.value == 'generated-password' ) generatedPassword.type = 'text' 
        hash.classList.toggle('hashed')
    }

} hashPassword()



function copyPaste() {
    copy.onclick = () =>  {
        generatedPassword.select() ; generatedPassword.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(generatedPassword.value)
    } 

    copy.onmouseenter = () => copy.classList.add('hover')
    copy.onmouseleave = () => copy.classList.remove('hover')
} copyPaste()




btn.onmousedown = () => btn.style.background = '#1c90f4c7'
btn.onmouseup = () => btn.style.background = ''
