const next3:HTMLElement|null = document.getElementById('Submit')

const user_info_main:HTMLElement|null = document.getElementById('log_details')
const feedback2:HTMLElement|null = document.getElementById('feedback2')


const email_element = document.getElementById('email') as HTMLInputElement
const password_element = document.getElementById('password') as HTMLInputElement

function shake(element: HTMLElement|null) {
    if (!element) return
    element.classList.remove("shake");

    // force reflow so animation can restart
    void element.offsetWidth;

    element.classList.add("shake");
}

//Initially load the first section
if (user_info_main){
    user_info_main.style.display = 'flex'
}

function checkEmail(email:string|null):boolean{
    if (!email){return false}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

next3?.addEventListener('click', () => {
    
    feedback2 && (feedback2.innerHTML = '')
    const email:string = email_element.value
    if (!checkEmail(email)){
        feedback2 && (feedback2.innerHTML = 'Invalid email.')
        shake(feedback2)
        return
    }

    const password:string = password_element.value.trim()

    if (!password){
        feedback2 && (feedback2.innerHTML = 'Invalid password')
        shake(feedback2)
        return
    }

    window.location.href = 'app.html'
    feedback2 && (feedback2.innerHTML = '')
})