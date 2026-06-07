const next:HTMLElement|null = document.getElementById('next')
const prev2:HTMLElement|null = document.getElementById('prev2')
const next2:HTMLElement|null = document.getElementById('next2')
const prev3:HTMLElement|null = document.getElementById('prev3')
const next3:HTMLElement|null = document.getElementById('Submit')

const user_info_main:HTMLElement|null = document.getElementById('UserInfo')
const contact_details_main:HTMLElement|null = document.getElementById('Contact_details')
const authentication_main:HTMLElement|null = document.getElementById('authentication')

const feedback:HTMLElement|null = document.getElementById('feedback')
const feedback1:HTMLElement|null = document.getElementById('feedback1')
const feedback2:HTMLElement|null = document.getElementById('feedback2')

const name_element = document.getElementById('name') as HTMLInputElement
const middle_name_element = document.getElementById('middle_name') as HTMLInputElement
const surname_element = document.getElementById('surname') as HTMLInputElement
const birth_date_element = document.getElementById('birth_date') as HTMLInputElement
const email_element = document.getElementById('email') as HTMLInputElement
const phone_element = document.getElementById('phone') as HTMLInputElement
const street_element = document.getElementById('street') as HTMLInputElement
const city_element = document.getElementById('city') as HTMLInputElement
const province_element = document.getElementById('province') as HTMLInputElement
const country_element = document.getElementById('country') as HTMLInputElement
const password_element = document.getElementById('password') as HTMLInputElement
const confirm_password_element = document.getElementById('confirm_password') as HTMLInputElement


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

function moveFromTo(current:HTMLElement|null, target:HTMLElement|null){
    if (target){
        target.style.display = 'flex'
    }
    else{ //An error must've occured, feature currently unavailable
        alert('An error must\'ve occured, feature currently unavailable')
        return
    }
    if (current){
        current.style.display = 'none'
    }
    else{
        alert('Mulfunctioned')
    }
}

function checkName(name:string|null, min_size = 1):boolean{
    if (!name){return false}
    if (name.trim().length < min_size){return false}
    return /[a-zA-Z]+/.test(name)
}

function getYearDifference(a: Date, b: Date) {
    let years = a.getFullYear() - b.getFullYear();

    // adjust if birthday hasn't happened yet this year
    const hasHadBirthday =
        a.getMonth() > b.getMonth() ||
        (a.getMonth() === b.getMonth() && a.getDate() >= b.getDate());

    if (!hasHadBirthday) {
        years--;
    }

    return years;
}

function checkDate(date:string, min_years = 0):boolean{
    if (!date){return false}
    const inputDate = new Date(date);
    const currentDate = new Date();

    inputDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const diffYears = getYearDifference(currentDate, inputDate)
    return diffYears > min_years
}

function checkEmail(email:string|null):boolean{
    if (!email){return false}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

function checkPhone(phone:string|null):boolean{
    if (!phone){return false}
    const phone_regex = /^\+?[1-9]\d{7,14}$/;
    return phone_regex.test(phone)
}

function checkStreet(street: string | null): boolean {
    if (!street) return false;

    const value = street.trim().replace(/\s+/g, " ");

    return /^[a-zA-Z0-9\s.'-]+$/.test(value);
}

function checkStrictText(name: string | null, max_words = 2): boolean {
    if (!name) return false;

    const words = name.trim().split(/\s+/);

    if (words.length > max_words) return false;

    for (const word of words) {
        if (!/^[a-zA-Z]+$/.test(word)) {
            return false;
        }
    }

    return true;
}
type PasswordStrengthResult = {
    passed: boolean;
    message: string;
    score: number; // 0–10
};

function passwordStrength(password: string): PasswordStrengthResult {
    let score = 0;

    if (!password) {
        return {
            passed: false,
            message: "Password is required",
            score: 0
        };
    }

    // length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // lowercase
    if (/[a-z]/.test(password)) score++;

    // uppercase
    if (/[A-Z]/.test(password)) score++;

    // numbers
    if (/\d/.test(password)) score++;

    // special characters
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // bonus for strong mix
    if (score >= 5) score++;

    const passed = score >= 5;

    let message = "";
    if (score <= 2) message = "Weak password";
    else if (score <= 4) message = "Moderate password";
    else if (score <= 6) message = "Strong password";
    else message = "Very strong password";

    return {
        passed,
        message,
        score: Math.min(score, 10)
    };
}
next?.addEventListener('click', () => {    
    feedback && (feedback.innerHTML = '')
    //Check for user info input validity
    const name:string|null = name_element?.value || null
    const surname:string|null = surname_element?.value || null
    if (!checkName(name,3) || !checkName(surname,3)){
        feedback && (feedback.innerHTML = 'Invalid names')
        shake(feedback)
        return
    }

    if (!checkDate(birth_date_element.value,5)){
        feedback && (feedback.innerHTML = 'Either your date is invalid or you\'re from the future')
        shake(feedback)
        return
    }

    moveFromTo(user_info_main, contact_details_main)
    feedback && (feedback.innerHTML = '')
})
prev2?.addEventListener('click', () => {
    moveFromTo(contact_details_main, user_info_main)
})
next2?.addEventListener('click', () => {
    const email:string|null = email_element?.value || null
    const phone:string|null = phone_element?.value || null
    const street:string|null = street_element?.value || null
    const city:string|null = city_element?.value || null
    const province:string|null = province_element?.value || null
    const country:string|null = country_element?.value || null

    feedback1 && (feedback1.innerHTML = '')

    if (!checkEmail(email)){
        feedback1 && (feedback1.innerHTML = 'Invalid email.')
        shake(feedback1)
        return
    }
    if (!checkPhone(phone)){
        feedback1 && (feedback1.innerHTML = 'Invalid phone number. Use the format +27 00 000 000 depending on your country')
        shake(feedback1)
        return
    }
    if (!checkStreet(street)){
        feedback1 && (feedback1.innerHTML = 'Invalid street.')
        shake(feedback1)
        return
    }

    if (!checkName(city,3)){
        feedback1 && (feedback1.innerHTML = 'Invalid city')
        shake(feedback1)
        return
    }
    
    if (!checkName(province,3)){
        feedback1 && (feedback1.innerHTML = 'Invalid province')
        shake(feedback1)
        return
    }

    if (!checkStrictText(country,5)){
        feedback1 && (feedback1.innerHTML = 'Invalid country')
        shake(feedback1)
        return
    }

    moveFromTo(contact_details_main, authentication_main)
})
prev3?.addEventListener('click', () => {
    moveFromTo(authentication_main, contact_details_main)
})

password_element.addEventListener('input',()=>{
    const password:string = password_element.value.trim()
    const passwords_results:PasswordStrengthResult = passwordStrength(password)
    feedback2 && (feedback2.innerHTML = passwords_results.message) && (feedback2.style.color = '#22C55E')
})
next3?.addEventListener('click', () => {
    
    feedback2 && (feedback2.innerHTML = '')

    const password:string = password_element.value.trim()

    if (!password){
        feedback2 && (feedback2.innerHTML = 'Invalid password')
        shake(feedback2)
        return
    }
    const passwords_results:PasswordStrengthResult = passwordStrength(password)
    if (!passwords_results.passed){
        feedback2 && (feedback2.innerHTML = 'Your password is too weak to access this') && (feedback2.style.color = '#EF4444') 
        shake(feedback2)
        return
    }

    if (password != confirm_password_element.value.trim()){
        feedback2 && (feedback2.innerHTML = 'Passwords don\'t match') && (feedback2.style.color = '#EF4444') 
        shake(feedback2)
        return
    }
    window.location.href = 'app.html'
    feedback2 && (feedback2.innerHTML = '')
})